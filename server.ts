import 'reflect-metadata';
import 'tsconfig-paths/register';
import { getEnv, ENV } from './common';
import { Server } from './class';
import serverConfig from './serverConfig';

const server = new Server(serverConfig);

if (getEnv() !== ENV.JEST) {
  server.startServer();
}

export default server;
