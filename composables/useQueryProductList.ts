import type { IProductListQuery, IProductList } from '~/types';
import type { IResponseData } from '~/types/request';

export const useQueryProductList = (query?:IProductListQuery) => {
  const q = Object.assign({
    page: 1,
    pageSize: 20,
    class_id: null,
  }, query || {});
  return useRequest<IProductList[]>('/backend/product/list', {
    query: q,
    transform: (input: any) => {
      let productList: IProductList[] = [];
      const res = input as IResponseData<IProductList[]>;
      if (res.code === 0) {
        productList = res.data || [];
      } else {
        throw new Error(res.msg);
      }
      return productList;
    }
  });
}
