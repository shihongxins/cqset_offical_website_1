import type { IArticle, IArticleQuery } from '~/types';
import type { IResponseDataDetail } from "~/types/request";

export const useQueryArticleDetail = (query:IArticleQuery = {}) => {
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
