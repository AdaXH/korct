export const PARAM_META_KEY = 'param:';

export const QUERY_META_KEY = 'query:';

export const QUERY_ITEM_META_KEY = 'query:item';

export const BODY_META_KEY = 'body:';

export const TOKEN_META_KEY_PREFIX = 'token:';

export const CTX_META_KEY_PREFIX = 'ctx:';

export const CONTEXT_META_KEY_PREFIX = 'ctx:';

export const RENDER_HTML_META_KEY_PREFIX = 'render_html:';

export const API_PREFIX = 'api_prefix:';

export enum PROCESS_EVENT {
  'CLOSE' = 'CLOSE',
  'RELOAD_DB' = 'RELOAD_DB',
}

export enum ENV {
  'DEV' = 'development',
  'PROD' = 'production',
  'JEST' = '--detectOpenHandles',
}
