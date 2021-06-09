import 'reflect-metadata';
import 'tsconfig-paths/register';
import { getEnv, ENV } from './common';
import { Server } from './class';
import bootConfig from './config/port';

const server = new Server({
  controllerPath: `${__dirname}/controller`,
  middlewarePath: `${__dirname}/middleware`,
  rootPath: __dirname,
  bootConfig,
});

if (getEnv() !== ENV.JEST) {
  server.startServer();
}

export default server;
