import { Context } from 'koa';

export interface Controller {
  method: string;
  url: string;
  route: (ctx: Context) => Promise<void>;
}
