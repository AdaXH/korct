import bootConfig from './config/port';
import { ServerConfig } from './typings';

export default {
  controllerPath: `${__dirname}/controller`,
  middlewarePath: `${__dirname}/middleware`,
  rootPath: __dirname,
  bootConfig,
  staticPath: `${__dirname}/public`,
  viewPath: `${__dirname}/public/web-dist`,
} as ServerConfig;
