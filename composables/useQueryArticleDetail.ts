import type { IRequestRes } from "./useRequest";

export interface IArticleQuery {
  id?: number;
  title?: string;
}

export interface IArticle {
	id: number;
	class: number;
	title: string;
	content: string;
	key: string;
	category: string;
	brief: string;
	cover: string;
	createdAt: string;
	updatedAt: string;
}

export const useQueryArticleDetail = (query:IArticleQuery = {}) => {
  return useRequest<IArticle | null>('/product/get', {
    query,
    transform: (res: any) => {
      let article: IArticle | null = null;
      const resData = res as IRequestRes<null|{ detail: IArticle }>;
      if (resData?.code === 0 && resData?.data?.detail) {
        article = resData.data.detail;
      }
      return article;
    }
  });
}
