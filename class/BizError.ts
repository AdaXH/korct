/**
 * 业务逻辑error
 */
export class BizError<E> extends Error {
  private errorCode: string;
  private errorMessage: string;
  private errorStack: E;
  constructor(message?: string, errorCode?: string, errorStack?: E) {
    super(message);
    this.errorCode = errorCode;
    this.errorStack = errorStack;
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  public setErrorCode(errorCode: string): void {
    this.errorCode = errorCode;
  }

  public setErrorStack(errorStack: E): void {
    this.errorStack = errorStack;
  }
}

/**
 * 错误枚举映射
 */
export enum ErrorCodeEnum {
  'NOT_FOUND' = 'NOT_FOUND',
  'ARGUMENUT_ERROR' = 'ARGUMENUT_ERROR',
  'ARGUMENUT_TYPE_ERROR' = 'ARGUMENUT_TYPE_ERROR',
  'REQUIRED_ARGUMENUT' = 'REQUIRED_ARGUMENUT',
  'PERMISSION_DENIED' = 'PERMISSION_DENIED',
  'NEED_LOGIN' = 'NEED_LOGIN',
  'EXSIT_DATA' = 'EXSIT_DATA',
}
