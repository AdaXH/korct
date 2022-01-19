import Application, { Context } from 'koa';
import * as fs from 'fs';
import BodyParser from 'koa-body';
import KoaStatic from 'koa-static';
import KoaViews from 'koa-views';
import Json from 'koa-json';
import chalk from 'chalk';
import { CommonObj, ServerConfig } from '@/typings';
import { CommonResponse } from '@/class';
import {
  BODY_META_KEY,
  PARAM_META_KEY,
  QUERY_ITEM_META_KEY,
  QUERY_META_KEY,
  logger,
  RENDER_HTML_META_KEY_PREFIX,
} from '.';
import { API_PREFIX } from './constant';

/**
 * 加载controller文件夹
 * @param controllerPath
 * @returns
 */
export async function loadController(controllerPath: string): Promise<unknown[]> {
  const list = await fs.readdirSync(controllerPath);
  const controllers = [];
  await list.forEach(async item => {
    if (item === 'BaseController.ts') return;
    const Controller = await import(`${controllerPath}/${item}`);
    const instance = new Controller.default();
    const property = Object.getPrototypeOf(instance);
    const fnNames = Object.getOwnPropertyNames(property).filter(
      item => item !== 'constructor' && typeof property[item] === 'function',
    );
    fnNames.forEach(fn => {
      const { method, url } = Reflect.getMetadata(fn, property);
      const prefix = Reflect.getMetadata(API_PREFIX, Controller.default) || '';
      const targetUrl = `${prefix}${url}`;
      logger.info(`register route: ${chalk.blue(`[${method}]`)} ${chalk.green(targetUrl)} `);
      controllers.push({
        method: method.toLowerCase(),
        url: prefix ? targetUrl : url,
        route: async (ctx: Context) => {
          try {
            const {
              params,
              query,
              request: { body },
              // headers: { authorization },
            } = ctx;
            const target = property[fn];
            property.ctx = ctx;
            // 获取param参数信息元数据 - restful
            const paramData = Reflect.getMetadata(PARAM_META_KEY, target);
            const args = [];
            // 获取param元数据 - restful
            if (paramData) {
              const { paramName, index } = paramData;
              args[index] = params[paramName];
            }
            // 获取query参数obj元数据
            const queryObjectIndex = Reflect.getMetadata(QUERY_META_KEY, target);
            if (queryObjectIndex) {
              args[queryObjectIndex] = query;
            }
            // 获取query参数元数据
            const queryItem = Reflect.getMetadata(QUERY_ITEM_META_KEY, target);
            if (queryItem) {
              const { index, queryItemName } = queryItem;
              args[index] = query[queryItemName];
            }
            // 获取request元数据
            const requestIndex = Reflect.getMetadata(BODY_META_KEY, target);
            if (requestIndex >= 0) {
              args[requestIndex] = body;
            }
            // 是否是渲染html
            const checkHtml = Reflect.getMetadata(`${RENDER_HTML_META_KEY_PREFIX}-${fn}`, property);
            const result: CommonObj | string = await property[fn](...args);
            const response = CommonResponse.success(result);
            if (checkHtml !== true) {
              return (ctx.body = response);
            } else {
              await ctx.render(result as string);
            }
          } catch (error) {
            ctx.body = CommonResponse.error(error);
          }
        },
      });
    });
  });
  return controllers;
}

/**
 * 获取env
 * @return {string}
 */
export function getEnv(): string {
  const args = process.argv;
  return args[args.length - 1].replace(/--env=/, '');
}

/**
 * 加载插件
 * @returns
 */
export function loadPlugin(app: Application, config: ServerConfig): VoidFunction[] {
  return [
    BodyParser({
      jsonLimit: '9mb',
      formLimit: '9mb',
      textLimit: '9mb',
    }),
    new Json(),
    KoaStatic(config.staticPath),
    KoaViews(config.viewPath, {
      extension: 'html',
      map: {
        html: 'ejs',
      },
    }),
  ];
}

/**
 * 加载中间价
 * @param middlewarePath
 */
export async function loadMiddleware(middlewarePath: string): Promise<Promise<VoidFunction>[]> {
  const list = await fs.readdirSync(middlewarePath);
  return await list.map(async item => {
    const middlewareFile = await import(`${middlewarePath}/${item}`);
    return middlewareFile.default;
  });
}
