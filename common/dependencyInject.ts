import {
  instanceMap,
  PARAM_META_KEY,
  QUERY_META_KEY,
  QUERY_ITEM_META_KEY,
  BODY_META_KEY,
  RENDER_HTML_META_KEY_PREFIX,
  API_PREFIX,
} from '.';

type DecratorReturn<T = any> = (target: T, propertyName?: string, index?: any) => T;

/**
 * 路由反射
 * @param options { method?: string; url?: string }
 */
export function Controller(options?: { method?: string; url?: string | RegExp }) {
  return (target: unknown, propertyName: string): void => {
    Reflect.defineMetadata(propertyName, options, target);
  };
}

/**
 * 依赖注入
 */
export function Inject(): DecratorReturn {
  return (target: unknown, propertyName: string): void => {
    const propertyType = Reflect.getMetadata('design:type', target, propertyName);
    let instance = instanceMap.getInstance(propertyType);
    if (!instance) {
      instance = new propertyType();
      instanceMap.setInstance(propertyType, instance);
    }
    target[propertyName] = instance;
  };
}

/**
 * get
 * @param url string
 */
export function GetMapping(url: string | RegExp): DecratorReturn {
  return Controller({ method: 'GET', url });
}

/**
 * post
 * @param url string
 */
export function PostMapping(url: string): DecratorReturn {
  return Controller({ method: 'POST', url });
}

/**
 * 接口前缀
 * @param prefix
 * @returns
 */
export function ApiPrefix<T = any>(prefix: string): DecratorReturn<T> {
  return (target: T) => {
    Reflect.defineMetadata(API_PREFIX, prefix, target);
    return target;
  };
}

/**
 * restful 参数注入
 * @param paramName string
 */
export function param(paramName: string): DecratorReturn {
  return (target: unknown, propertyName: string, index?: number): void => {
    Reflect.defineMetadata(PARAM_META_KEY, { paramName, index }, target[propertyName]);
  };
}

/**
 * query参数注入-所有参数object
 */
export function queryObj(): DecratorReturn {
  return (target: unknown, propertyName: string, index?: number) => {
    Reflect.defineMetadata(QUERY_META_KEY, index, target[propertyName]);
  };
}

/**
 * 单个query参数注入
 * @param queryName {string}
 */
export function queryItem(queryItemName: string): DecratorReturn {
  return (target: unknown, propertyName: string, index?: number) => {
    Reflect.defineMetadata(QUERY_ITEM_META_KEY, { queryItemName, index }, target[propertyName]);
  };
}

/**
 * 注入request
 */
export function request(): DecratorReturn {
  return (target: unknown, propertyName: string, index?: number): void => {
    Reflect.defineMetadata(BODY_META_KEY, index, target[propertyName]);
  };
}

/**
 * 渲染html
 */
export function renderHtml(): DecratorReturn {
  return (target: unknown, propertyName: string): void => {
    Reflect.defineMetadata(`${RENDER_HTML_META_KEY_PREFIX}-${propertyName}`, true, target);
  };
}
