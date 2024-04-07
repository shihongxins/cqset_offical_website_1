import type { IArticle, IArticleQuery, INewsDetail } from '~/types';
import type { IResponseDataDetail, IResponseData } from "~/types/request";

export const useQueryProductDetail = (query:IArticleQuery = {}) => {
  return useRequest<IArticle | null>('/product/get', {
    query,
    transform: (res: any) => {
      let article: IArticle | null = null;
      const resData = res as IResponseDataDetail<IArticle>;
      if (resData?.code === 0 && resData?.data?.detail) {
        article = resData.data.detail;
      }
      return article;
    }
  });
}

export const useQueryNewsDetail = (id: string) => {
  return useRequest<INewsDetail | null>('/news/get/'+id, {
    transform: (res: any) => {
      let data: INewsDetail|null = null;
      const resData = res as IResponseData<INewsDetail>;
      if (resData?.code === 0 && resData?.data?.detail) {
        data = resData.data;
      }
      return data;
    }
  });
}
