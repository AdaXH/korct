import { CommonObj } from '../typings';

// 记录依赖实例，避免多次实例化
export class InstanceMap {
  private readonly instanceMap: Map<string, CommonObj> = new Map();

  public setInstance(key: string, value: CommonObj): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }
  public getInstance(key: string): CommonObj {
    if (this.instanceMap.has(key)) return this.instanceMap.get(key);
  }
}

export const instanceMap = new InstanceMap();
