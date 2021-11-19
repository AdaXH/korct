import { CommonObj } from '../typings';

/**
 * 统一返回的数据格式
 */
export class CommonResponse<T> {
  private data: T;
  private success: boolean;
  private errorMessage: string = null;
  private errorCode: string = null;
  private errorStack: CommonObj = null;

  public setData(data: T): void {
    this.data = data;
  }

  public setSuccess(success: boolean): void {
    this.success = success;
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  public setErrorCode(errorCode: string): void {
    this.errorCode = errorCode;
  }

  public setErrorStack(errorStack: CommonObj): void {
    this.errorStack = errorStack;
  }

  static success<T>(data: T): Partial<CommonResponse<T> & CommonObj> {
    const instance = new CommonResponse<T>();
    instance.setData(data);
    instance.setSuccess(true);
    return instance;
  }

  static error(error: Error & CommonObj): CommonResponse<null> {
    const instance = new CommonResponse<null>();
    instance.setErrorMessage(error?.message);
    instance.setErrorCode(error?.errorCode);
    instance.setErrorStack(error?.errorStack);
    instance.setSuccess(false);
    return instance as CommonResponse<null>;
  }
}
