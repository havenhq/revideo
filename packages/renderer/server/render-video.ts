import {
  FfmpegSettings,
  concatenateMedia,
  createSilentAudioFile,
  doesFileExist,
  getVideoDuration,
  mergeAudioWithVideo,
} from '@revideo/ffmpeg';
import {EventName, sendEvent} from '@revideo/telemetry';
import motionCanvas from '@revideo/vite-plugin';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import puppeteer, {Browser, PuppeteerLaunchOptions} from 'puppeteer';
import {v4 as uuidv4} from 'uuid';
import {InlineConfig, ServerOptions, ViteDevServer, createServer} from 'vite';
import {rendererPlugin} from './renderer-plugin';

/**
 * We pass a lot of render settings to the client side of the renderer
 * via the URL. This function builds the URL with the necessary parameters.
 */
function buildUrl(
  port: number,
  fileName: string,
  workerId: number,
  totalNumOfWorkers: number,
  range: [number, number] = [0, Infinity],
  hiddenFolderId: string,
  dimensions?: [number, number],
) {
  const fileNameEscaped = encodeURIComponent(fileName);
  const hiddenFolderIdEscaped = encodeURIComponent(hiddenFolderId);
  const dimensionsString = dimensions
    ? `&videoWidth=${dimensions[0]}&videoHeight=${dimensions[1]}`
    : '';

  return (
    `http://localhost:${port}/render?fileName=${fileNameEscaped}&workerId=${workerId}&totalNumOfWorkers=${totalNumOfWorkers}&startInSeconds=${range[0]}&endInSeconds=${range[1]}&hiddenFolderId=${hiddenFolderIdEscaped}` +
    dimensionsString
  );
}

export interface RenderSettings {
  // Name of the video file (default is 'video.mp4')
  outFile?: `${string}.mp4`;

  // Folder where the video will be saved (default is './out')
  outDir?: string;

  // Start and end in seconds
  range?: [number, number];

  ffmpeg?: FfmpegSettings;

  puppeteer?: PuppeteerLaunchOptions;

  workers?: number;
  dimensions?: [number, number];
  logProgress?: boolean;

  /**
   * When using multiple workers, this is the port of the first worker.
   * Each worker will increment the port by 1.
   * If the port is already in use, the next port will be used.
   *
   * Default is 9000
   */
  viteBasePort?: number;

  /**
   * @deprecated Use `viteConfig.server` instead.
   */
  viteServerOptions?: Omit<ServerOptions, 'port'>;
  viteConfig?: InlineConfig;
  progressCallback?: (worker: number, progress: number) => void;
}

/**
 * Starts the vite server and creates a puppeteer browser instance
 */
async function initBrowserAndServer(
  fixedPort: number,
  projectFile: string,
  outputFolderName: string,
  settings: RenderSettings,
  variables?: Record<string, unknown>,
) {
  const args = settings.puppeteer?.args ?? [];
  //args.includes('--single-process') || args.push('--single-process');

  const resolvedProjectPath = path.join(process.cwd(), projectFile);
  const [browser, server] = await Promise.all([
    puppeteer.launch({headless: true, ...settings.puppeteer, args}),
    createServer({
      configFile: false,
      plugins: [
        motionCanvas({project: resolvedProjectPath, output: outputFolderName}),
        rendererPlugin(variables, settings.ffmpeg, projectFile),
      ],
      ...settings.viteConfig,
      server: {
        port: fixedPort,
        hmr: false,
        ...settings.viteServerOptions,
        ...settings.viteConfig?.server,
      },
    }).then(server => server.listen()),
  ]);

  if (!server.httpServer) {
    throw new Error('HTTP server is not initialized');
  }
  const address = server.httpServer.address();
  const resolvedPort =
    address && typeof address === 'object' ? address.port : null;
  if (resolvedPort === null) {
    throw new Error('Server address is null');
  }

  return {browser, server, resolvedPort};
}

function trackProgress(
  tracker: Map<number, number>,
  id: number,
  progress: number,
) {
  tracker.set(id, progress);
}

/**
 * Navigates to the URL and renders the video on the page
 */
async function renderVideoOnPage(
  id: number,
  browser: Browser,
  server: ViteDevServer,
  url: string,
  progressTracker: Map<number, number>,
  progressCallback?: (worker: number, progress: number) => void,
  logProgress?: boolean,
) {
  function printProgress() {
    let line = '';
    for (const [key, value] of progressTracker.entries()) {
      line += `Render progress, worker ${key}: ${(value * 100).toFixed(0)}% `;
    }

    if (line === '') {
      return;
    }

    console.log(line);
  }

  const interval = setInterval(() => {
    printProgress();
  }, 1000);

  console.log('id', id);
  console.log('url', url);

  const page = await browser.newPage();
  if (!server.httpServer) {
    throw new Error('HTTP server is not initialized');
  }
  const address = server.httpServer.address();
  const port = address && typeof address === 'object' ? address.port : null;
  if (port === null) {
    throw new Error('Server address is null');
  }

  // only report for worker 0
  if (id === 0) {
    sendEvent(EventName.RenderStarted);
  }

  // Attach logs from puppeteer to the console
  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i) {
      const message = msg.args()[i];
      if (message.toString().includes('[vite]')) {
        continue;
      }

      console.log(`Worker ${id}: ${msg.args()[i]}`);
    }
  });

  page.exposeFunction('logProgress', (progress: number) => {
    if (progressCallback) {
      progressCallback(id, progress);
    }
    if (logProgress) {
      trackProgress(progressTracker, id, progress);
    }
  });

  const renderingComplete = new Promise<void>((resolve, reject) => {
    page.exposeFunction('onRenderComplete', async () => {
      clearInterval(interval);
      resolve();
    });

    page.exposeFunction('onRenderFailed', async (errorMessage: string) => {
      await Promise.all([browser.close(), server.close()]);
      console.error('Rendering failed:', errorMessage);
      clearInterval(interval);
      reject(new Error(errorMessage));
    });

    page.exposeFunction('browserError', (message: string) => {
      reject(new Error(message));
    });
  });

  await page.goto(url);
  console.log('went to', url);

  return renderingComplete;
}

/**
 * Initializes the browser and starts rendering the video
 */
async function initializeBrowserAndStartRendering(
  projectFile: string,
  outputFileName: string,
  outputFolderName: string,
  i: number,
  numOfWorkers: number,
  settings: RenderSettings,
  hiddenFolderId: string,
  variables?: Record<string, unknown>,
  progressCallback?: (worker: number, progress: number) => void,
) {
  const port =
    (settings.viteBasePort !== undefined ? settings.viteBasePort : 9000) + i;

  const progressTracker = new Map<number, number>();

  const {browser, server, resolvedPort} = await initBrowserAndServer(
    port,
    projectFile,
    outputFolderName,
    settings,
    variables,
  );

  const url = buildUrl(
    resolvedPort,
    `${outputFileName}-${i}`,
    i,
    numOfWorkers,
    settings.range,
    hiddenFolderId,
    settings.dimensions,
  );

  return renderVideoOnPage(
    i,
    browser,
    server,
    url,
    progressTracker,
    progressCallback,
    settings.logProgress,
  );
}

/**
 * Collects audio and video files from each worker and returns them.
 * If audio file does not exist, creates a silent audio file with the same duration as the video file.
 */
async function collectAudioAndVideoFiles(
  numOfWorkers: number,
  outputFileName: string,
  hiddenFolderId: string,
) {
  const audioFiles = [];
  const videoFiles = [];
  for (let i = 0; i < numOfWorkers; i++) {
    const videoFilePath = `${os.tmpdir()}/revideo-${outputFileName}-${i}-${hiddenFolderId}/visuals.mp4`;
    const audioFilePath = `${os.tmpdir()}/revideo-${outputFileName}-${i}-${hiddenFolderId}/audio.wav`;

    if (!(await doesFileExist(audioFilePath))) {
      const videoDuration = await getVideoDuration(videoFilePath);
      await createSilentAudioFile(audioFilePath, videoDuration);
    }
    videoFiles.push(videoFilePath);
    audioFiles.push(audioFilePath);
  }

  return {audioFiles, videoFiles};
}

/**
 * Concatenates audio and video files and merges them into a single video file.
 */
async function concatenateAudioAndVideoFiles(
  outputFileName: string,
  outputFolder: string,
  audioFiles: string[],
  videoFiles: string[],
) {
  await concatenateMedia(
    videoFiles,
    path.join(outputFolder, `${outputFileName}-visuals.mp4`),
  );
  await concatenateMedia(
    audioFiles,
    path.join(outputFolder, `${outputFileName}-audio.wav`),
  );
  await mergeAudioWithVideo(
    path.join(outputFolder, `${outputFileName}-audio.wav`),
    path.join(outputFolder, `${outputFileName}-visuals.mp4`),
    path.join(outputFolder, `${outputFileName}.mp4`),
  );
}

/**
 * Deletes all partial files after concatenation is done
 */
async function cleanup(
  outputFileName: string,
  outputFolderName: string,
  numOfWorkers: number,
  hiddenFolderId: string,
) {
  const cleanupFolders = [];
  const cleanupFiles = [];
  for (let i = 0; i < numOfWorkers; i++) {
    cleanupFolders.push(
      `${os.tmpdir()}/revideo-${outputFileName}-${i}-${hiddenFolderId}`,
    );
    cleanupFiles.push(
      path.join(process.cwd(), outputFolderName, `${outputFileName}-${i}.mp4`),
    );
  }

  cleanupFiles.push(
    path.join(process.cwd(), outputFolderName, `${outputFileName}-audio.wav`),
  );
  cleanupFiles.push(
    path.join(process.cwd(), outputFolderName, `${outputFileName}-visuals.mp4`),
  );

  const folderCleanupPromises = cleanupFolders.map(folder =>
    fs.promises.rm(folder, {recursive: true, force: true}).catch(() => {}),
  );

  const fileCleanupPromises = cleanupFiles.map(file =>
    fs.promises.unlink(file).catch(() => {}),
  );

  await Promise.all([...folderCleanupPromises, ...fileCleanupPromises]);
}

function getPropDefaults(settings: RenderSettings) {
  if (settings.outFile && !settings.outFile.endsWith('.mp4')) {
    throw new Error('outFile must end with ".mp4"');
  }

  const outFile = settings.outFile?.slice(0, -4) ?? 'video';

  return {
    outputFileName: outFile,
    outputFolderName: settings.outDir ?? './output',
    numOfWorkers: settings.workers ?? 1,
    hiddenFolderId: uuidv4(),
  };
}

interface RenderVideoProps {
  projectFile: string;
  variables?: Record<string, unknown>;
  settings?: RenderSettings;
}

/**
 * Renders a video to a file.
 * @param projectFile - Path to the project.ts file.
 * @param variables - Variables to pass to your project (see https://docs.re.video/parameterized-video)
 * @param progressCallback - Callback function to track rendering progress. Progress is a number between 0 and 1.
 * @param settings - Settings for the rendering process.
 * @returns - Path to the rendered video file.
 */
export const renderVideo = async ({
  projectFile,
  variables,
  settings = {},
}: RenderVideoProps) => {
  const {outputFileName, outputFolderName, numOfWorkers, hiddenFolderId} =
    getPropDefaults(settings);

  const port =
    settings.viteBasePort !== undefined ? settings.viteBasePort : 9000;

  const {browser, server, resolvedPort} = await initBrowserAndServer(
    port,
    projectFile,
    outputFolderName,
    settings,
    variables,
  );

  const renderPromises = [];
  for (let i = 0; i < numOfWorkers; i++) {
    const url = buildUrl(
      resolvedPort,
      `${outputFileName}-${i}`,
      i,
      numOfWorkers,
      settings.range,
      hiddenFolderId,
      settings.dimensions,
    );

    const progressTracker = new Map<number, number>();

    renderPromises.push(
      renderVideoOnPage(
        i,
        browser,
        server,
        url,
        progressTracker,
        settings.progressCallback,
        settings.logProgress,
      ),
    );
  }

  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log('now going');
  await activateTabs(browser);

  // Wait for workers to finish rendering
  await Promise.all(renderPromises);
  await Promise.all([browser.close(), server.close()]);

  // Collect and concatenate audio and video files
  const {audioFiles, videoFiles} = await collectAudioAndVideoFiles(
    numOfWorkers,
    outputFileName,
    hiddenFolderId,
  );
  await concatenateAudioAndVideoFiles(
    outputFileName,
    outputFolderName,
    audioFiles,
    videoFiles,
  );
  await cleanup(outputFileName, outputFolderName, numOfWorkers, hiddenFolderId);

  return path.join(outputFolderName, `${outputFileName}.mp4`);
};

async function activateTabs(browser: Browser) {
  const pages = await browser.pages();
  for (const page of pages) {
    await page.bringToFront();
  }
}

interface RenderPartialVideoProps extends RenderVideoProps {
  workerId: number;
  numWorkers: number;
  settings: Omit<RenderSettings, 'workers'>;
}

export const renderPartialVideo = async ({
  projectFile,
  variables,
  settings,
  numWorkers,
  workerId,
}: RenderPartialVideoProps) => {
  const {outputFileName, outputFolderName, hiddenFolderId} =
    getPropDefaults(settings);

  await initializeBrowserAndStartRendering(
    projectFile,
    outputFileName,
    outputFolderName,
    workerId,
    numWorkers,
    settings,
    hiddenFolderId,
    variables,
    settings.progressCallback,
  );

  const videoFilePath = `${os.tmpdir()}/revideo-${outputFileName}-${workerId}-${hiddenFolderId}/visuals.mp4`;
  const audioFilePath = `${os.tmpdir()}/revideo-${outputFileName}-${workerId}-${hiddenFolderId}/audio.wav`;

  if (!(await doesFileExist(audioFilePath))) {
    const videoDuration = await getVideoDuration(videoFilePath);
    await createSilentAudioFile(audioFilePath, videoDuration);
  }

  return {audioFile: audioFilePath, videoFile: videoFilePath};
};
