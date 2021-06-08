import {
  instanceMap,
  PARAM_META_KEY,
  QUERY_META_KEY,
  QUERY_ITEM_META_KEY,
  BODY_META_KEY,
} from '.';

type DecratorReturn = (target: unknown, propertyName: string, index?: number) => void;

/**
 * 路由反射
 * @param options { method?: string; url?: string }
 */
export function Controller(options?: { method?: string; url?: string }) {
  return (target: unknown, propertyName: string): void => {
    Reflect.defineMetadata(propertyName, options, target);
  };
}

/**
 * 依赖注入
 */
export function Autowired(): (target: unknown, propertyKey: string) => void {
  return (target: unknown, propertyKey: string): void => {
    const propertyType = Reflect.getMetadata('design:type', target, propertyKey);
    let instance = instanceMap.getInstance(propertyType);
    if (!instance) {
      instance = new propertyType();
      instanceMap.setInstance(propertyType, instance);
    }
    target[propertyKey] = instance;
  };
}

/**
 * get
 * @param url string
 */
export function GetMapping(url: string): (target: unknown, propertyName: string) => void {
  return Controller({ method: 'GET', url });
}

/**
 * post
 * @param url string
 */
export function PostMapping(
  url: string,
): (target: unknown, propertyName: string) => void {
  return Controller({ method: 'POST', url });
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
    Reflect.defineMetadata(
      QUERY_ITEM_META_KEY,
      { queryItemName, index },
      target[propertyName],
    );
  };
}

/**
 * 注入request
 */
export function request() {
  return (target: unknown, propertyName: string, index?: number): void => {
    Reflect.defineMetadata(BODY_META_KEY, index, target[propertyName]);
  };
}
