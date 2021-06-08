import 'tsconfig-paths/register';
import 'reflect-metadata';
import { Server } from './class';
import bootConfig from './config/port';

const server = new Server({
  controllerPath: `${__dirname}/controller`,
  middlewarePath: `${__dirname}/middleware`,
  rootPath: __dirname,
  bootConfig,
});

export default server.startServer();
