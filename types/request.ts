export interface IListRequestParams {
  /**
   * 页码
   */
  page: number;
  /**
   * 页数
   */
  pageSize: number;
}

export interface IResponseData<T = any> {
  /**
   * 自定义状态码
   */
  code: number;
  /**
   * 自定义消息
   */
  msg?: string;
  /**
   * 具体数据
   */
  data?: T;
}

export type IResponseDataList<T = any> = IResponseData<null|({ list: Array<T>, total: number } & IListRequestParams)>

export type IResponseDataDetail<T = any> = IResponseData<null|({ detail: T })>
