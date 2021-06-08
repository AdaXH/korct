import { CommonResponse } from '@/class';
import { CommonObj } from '@/typings';
import { v4 as uuid } from 'uuid';

export default async function (ctx: CommonObj, next: VoidFunction): Promise<void> {
  try {
    await next();
    const { body } = ctx;
    const traceId = uuid();
    ctx.set('Trace-id', traceId);
    if (!body) {
      // 404
      ctx.body = `not found, with requestId: ${traceId}`;
      return;
    }
    console.log('body', body);
    ctx.body = { ...JSON.parse(body || '{}'), traceId, pid: process.pid };
  } catch (error) {
    console.log('error', error);
    ctx.body = CommonResponse.error(error);
  }
}
