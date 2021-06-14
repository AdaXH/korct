import { CommonResponse } from '@/class';
import { CommonObj } from '@/typings';
import { v4 as uuid } from 'uuid';

export default async function (ctx: CommonObj, next: VoidFunction): Promise<void> {
  try {
    await next();
    const { body } = ctx;
    console.log('body', body);
    const traceId = uuid();
    ctx.set('Trace-id', traceId);
    if (!body) {
      // 404
      ctx.body = `api or page not found, with requestId: ${traceId}`;
      return;
    }
    let isObj = true;
    try {
      JSON.parse(body);
    } catch (error) {
      isObj = false;
    }
    if (isObj) {
      ctx.body = {
        ...JSON.parse(body),
        traceId,
        // pid: process.pid,
      };
    }
  } catch (error) {
    console.log('error', error);
    ctx.body = CommonResponse.error(error);
  }
}
