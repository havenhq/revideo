import {
  concatenateMedia,
  createSilentAudioFile,
  doesFileExist,
  getVideoDuration,
  mergeAudioWithVideo,
} from '@revideo/ffmpeg';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import puppeteer, {Browser, BrowserLaunchArgumentOptions} from 'puppeteer';
import * as readline from 'readline';
import {v4 as uuidv4} from 'uuid';
import {ViteDevServer, createServer} from 'vite';
import {rendererPlugin} from './RendererPlugin';

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
) {
  return `http://localhost:${port}/render?fileName=${fileName}&workerId=${workerId}&totalNumOfWorkers=${totalNumOfWorkers}&startInSeconds=${range[0]}&endInSeconds=${range[1]}&hiddenFolderId=${hiddenFolderId}`;
}

interface RenderVideoSettings {
  // Name of the video file
  name?: string;

  // Start and end in seconds
  range?: [number, number];

  puppeteer?: BrowserLaunchArgumentOptions;
  workers?: number;
}

/**
 * Starts the vite server and creates a puppeteer browser instance
 */
async function initBrowserAndServer(
  fixedPort: number,
  resolvedConfigPath: string,
  params?: Record<string, unknown>,
  puppeteerOptions?: BrowserLaunchArgumentOptions,
) {
  const [browser, server] = await Promise.all([
    puppeteer.launch({headless: true, ...puppeteerOptions}),
    createServer({
      configFile: resolvedConfigPath,
      server: {
        port: fixedPort,
      },
      plugins: [rendererPlugin(params)],
    }).then(server => server.listen()),
  ]);

  if (!server.httpServer) {
    throw new Error('HTTP server is not initialized');
  }
  const address = server.httpServer.address();
  const port = address && typeof address === 'object' ? address.port : null;
  if (port === null) {
    throw new Error('Server address is null');
  }

  return {browser, server, port};
}

/**
 * Navigates to the URL and renders the video on the page
 */
async function renderVideoOnPage(
  browser: Browser,
  server: ViteDevServer,
  url: string,
) {
  const page = await browser.newPage();
  if (!server.httpServer) {
    throw new Error('HTTP server is not initialized');
  }
  const address = server.httpServer.address();
  const port = address && typeof address === 'object' ? address.port : null;
  if (port === null) {
    throw new Error('Server address is null');
  }

  // Attach logs from puppeteer to the console
  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i) {
      console.log(`${port}: ${msg.args()[i]}`);
    }
  });

  page.exposeFunction('logProgress', (progress: number) => {
    const percentage = Math.floor(progress * 100);
    const barLength = 20;
    const filledLength = Math.floor((percentage / 100) * barLength);
    const bar = '█'.repeat(filledLength) + '-'.repeat(barLength - filledLength);
    const consoleLine = process.stdout.rows + port - 9000;

    readline.cursorTo(process.stdout, 0, consoleLine);
    readline.clearLine(process.stdout, 0);
    process.stdout.write(
      `Progress for worker on port ${port}: [${bar}] ${percentage}%`,
    );
  });

  const renderingComplete = new Promise<void>((resolve, reject) => {
    page.exposeFunction('onRenderComplete', async () => {
      await Promise.all([browser.close(), server.close()]);
      resolve();
    });

    page.exposeFunction('onRenderFailed', async (errorMessage: string) => {
      await Promise.all([browser.close(), server.close()]);
      console.error('Rendering failed:', errorMessage);
      reject(new Error(errorMessage));
    });
  });

  await page.goto(url);

  return renderingComplete;
}

/**
 * Initializes the browser and starts rendering the video
 */
async function initializeBrowserAndStartRendering(
  resolvedConfigPath: string,
  projectName: string,
  i: number,
  numOfWorkers: number,
  settings: RenderVideoSettings,
  hiddenFolderId: string,
  params?: Record<string, unknown>,
) {
  const port = 9000 + i;

  const {browser, server} = await initBrowserAndServer(
    port,
    resolvedConfigPath,
    params,
    settings.puppeteer,
  );

  const url = buildUrl(
    port,
    `${projectName}-${i}`,
    i,
    numOfWorkers,
    settings.range,
    hiddenFolderId,
  );

  return renderVideoOnPage(browser, server, url);
}

/**
 * Collects audio and video files from each worker and returns them.
 * If audio file does not exist, creates a silent audio file with the same duration as the video file.
 */
async function collectAudioAndVideoFiles(
  numOfWorkers: number,
  projectName: string,
  hiddenFolderId: string,
) {
  const audioFiles = [];
  const videoFiles = [];
  for (let i = 0; i < numOfWorkers; i++) {
    const videoFilePath = `${os.tmpdir()}/revideo-${projectName}-${i}-${hiddenFolderId}/visuals.mp4`;
    const audioFilePath = `${os.tmpdir()}/revideo-${projectName}-${i}-${hiddenFolderId}/audio.wav`;

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
  projectName: string,
  audioFiles: string[],
  videoFiles: string[],
) {
  await concatenateMedia(
    videoFiles,
    path.join(process.cwd(), `output/${projectName}-visuals.mp4`),
  );
  await concatenateMedia(
    audioFiles,
    path.join(process.cwd(), `output/${projectName}-audio.wav`),
  );
  await mergeAudioWithVideo(
    path.join(process.cwd(), `output/${projectName}-audio.wav`),
    path.join(process.cwd(), `output/${projectName}-visuals.mp4`),
    path.join(process.cwd(), `output/${projectName}.mp4`),
  );
}

/**
 * Deletes all partial files after concatenation is done
 */
async function cleanup(
  projectName: string,
  numOfWorkers: number,
  hiddenFolderId: string,
) {
  const cleanupFolders = [];
  const cleanupFiles = [];
  for (let i = 0; i < numOfWorkers; i++) {
    cleanupFolders.push(
      `${os.tmpdir()}/revideo-${projectName}-${i}-${hiddenFolderId}`,
    );
    cleanupFiles.push(
      path.join(process.cwd(), `output/${projectName}-${i}.mp4`),
    );
  }

  cleanupFiles.push(
    path.join(process.cwd(), `output/${projectName}-audio.wav`),
  );
  cleanupFiles.push(
    path.join(process.cwd(), `output/${projectName}-visuals.mp4`),
  );

  const folderCleanupPromises = cleanupFolders.map(folder =>
    fs.promises.rm(folder, {recursive: true, force: true}).catch(() => {}),
  );

  const fileCleanupPromises = cleanupFiles.map(file =>
    fs.promises.unlink(file).catch(() => {}),
  );

  await Promise.all([...folderCleanupPromises, ...fileCleanupPromises]);
}

export const renderVideo = async (
  configFile: string,
  params?: Record<string, unknown>,
  settings: RenderVideoSettings = {},
) => {
  // Get settings
  const resolvedConfigPath = path.resolve(process.cwd(), configFile);
  const projectName = settings.name ?? 'project';
  const hiddenFolderId = uuidv4();
  const numOfWorkers = settings.workers ?? 1;

  // Start rendering
  const renderPromises = [];
  for (let i = 0; i < numOfWorkers; i++) {
    renderPromises.push(
      initializeBrowserAndStartRendering(
        resolvedConfigPath,
        projectName,
        i,
        numOfWorkers,
        settings,
        hiddenFolderId,
        params,
      ),
    );
  }

  // Wait for workers to finish rendering
  await Promise.all(renderPromises);

  // Collect and concatenate audio and video files
  const {audioFiles, videoFiles} = await collectAudioAndVideoFiles(
    numOfWorkers,
    projectName,
    hiddenFolderId,
  );
  await concatenateAudioAndVideoFiles(projectName, audioFiles, videoFiles);
  await cleanup(projectName, numOfWorkers, hiddenFolderId);

  return `output/${projectName}.mp4`;
};
