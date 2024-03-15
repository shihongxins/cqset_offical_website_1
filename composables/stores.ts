import type { ICategory, IBrief } from '~/types';
import type { IResponseDataList } from "~/types/request";

export const categoriesStore = {
  _state: () => useState<Array<ICategory>>('categories', () => []),
  get state() {
    return this._state();
  },
  set state(categories) {
    this._state().value = categories.value;
  },
  actions: {
    queryCategories: () => {
      const req = useRequest('/product_class/list', {
        query: {
          page: 1,
          pageSize: 20,
        },
        transform: (res: any) => {
          const resData = res as IResponseDataList<ICategory>;
          let categories: Array<ICategory> = [];
          if (resData?.code === 0 && resData?.data?.list) {
            categories = [...resData?.data?.list].filter((item) => item?.id);
          }
          return categories;
        }
      });
      categoriesStore.state.value = req.data.value || [];
      return req;
    }
  }
}

export const briefStore = {
  _state: () => useState<IBrief|null>('brief', () => null),
  get state() {
    return this._state();
  },
  set state(brief) {
    this._state().value = brief.value;
  },
  actions: {
    queryBrief: () => {
      const req = useQueryArticleDetail({
        title: '公司简介',
      });
      briefStore.state.value = req.data.value || null;
      return req;
    }
  }
}
