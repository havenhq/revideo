import * as path from 'path';
import puppeteer from 'puppeteer';
import {createServer} from 'vite';
import {rendererPlugin} from './plugin';

export const renderVideo = async (
  configFile: string,
  params?: Record<string, unknown>,
) => {
  console.log('Rendering...');

  const resolvedConfigPath = path.resolve(process.cwd(), configFile);

  const [browser, server] = await Promise.all([
    puppeteer.launch({headless: true}),
    createServer({
      configFile: resolvedConfigPath,
      server: {
        port: 9000,
      },
      plugins: [rendererPlugin(params)],
    }).then(server => server.listen()),
  ]);

  const page = await browser.newPage();
  if (!server.httpServer) {
    throw new Error('HTTP server is not initialized');
  }
  const address = server.httpServer.address();
  const port = address && typeof address === 'object' ? address.port : null;
  if (port === null) {
    throw new Error('Server address is null');
  }

  await page.goto(`http://localhost:${port}/render`);
  return new Promise<void>((res, rej) => {
    return page
      .exposeFunction('onRenderComplete', async () => {
        await Promise.all([browser.close(), server.close()]).catch(rej);
        console.log('Rendering complete.');
        res();
      })
      .catch(rej);
  });
};
