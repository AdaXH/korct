import Application, { Context, DefaultContext, ParameterizedContext } from 'koa';
import { Server as HttpServer } from 'http';
import {
  loadController,
  getEnv,
  loadPlugin,
  loadMiddleware,
  logger,
  PROCESS_EVENT,
  ENV,
} from '@/common';
import { ServerConfig } from '@/typings';
import { Process } from '.';
import Router from 'koa-router';
import { IncomingMessage, ServerResponse } from 'http';
import { Controller } from '@/common/types';

export class Server extends Application {
  private config: ServerConfig;
  public app: Application;
  private controllers: Controller[];
  private router: Router = new Router();
  private plugins: Application.Middleware[];
  private middlewares: Promise<Application.Middleware>[];
  public server: HttpServer;

  constructor(config: ServerConfig) {
    super();
    this.config = config;
  }

  /**
   * 初始化server，加载路由、中间件
   */
  async init(): Promise<void> {
    this.app = new Application();
    this.app.keys = ['some secret for session'];
    this.app.env = getEnv();

    this.middlewares = await loadMiddleware(this.config.middlewarePath);
    this.controllers = await loadController(this.config.controllerPath);
    this.plugins = await loadPlugin(this.app, this.config);

    await this.useMiddleware();
    this.registerPlugin();
    this.registerController();
  }

  createContext(
    req: IncomingMessage,
    res: ServerResponse,
  ): ParameterizedContext<any, DefaultContext, unknown> {
    const context = super.createContext(req, res);
    return context as Context;
  }

  /**
   * 路由注册
   */
  registerController(): void {
    this.controllers.forEach(({ url, route, method }) => {
      this.router[method](url, route);
    });
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  /**
   * 注册plugin
   */
  registerPlugin(): void {
    this.plugins.forEach(plugin => this.app.use(plugin));
  }

  /**
   * 注册中间件
   */
  async useMiddleware(): Promise<void> {
    this.middlewares.forEach(async item => {
      const middleware = await item;
      this.app.use(middleware);
    });
  }

  /**
   * 启动服务
   */
  async startServer(): Promise<void> {
    const processInstance = new Process();
    const env = getEnv();
    if (env === ENV.DEV) {
      processInstance.setMaxProcess(1);
    }
    // 测试环境
    if (env === ENV.JEST) {
      await this.init();
      const { port = 3000 } = this.config.bootConfig[env] || {};
      this.server = this.app.listen(port);
      return;
    }
    processInstance.setCallback(async () => {
      await this.init();
      const { env } = this.app;
      const { port } = this.config.bootConfig[env];
      // this.db.connect(host);
      this.server = this.app.listen(port);
      logger.info(`server on ${port} at process: ${process.pid}`);
    });

    processInstance.setEventListener([
      {
        eventName: PROCESS_EVENT.RELOAD_DB,
        callback: async () => {
          // const { host } = this.config.bootConfig[this.env];
          // await this.db.disConnect();
          // this.db.connect(host);
        },
      },
    ]);

    processInstance.init();
  }
}
