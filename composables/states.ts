export interface IProductCategory {
  id: number,
  name: string,
}

export const useProductCategories = () => useState<(IProductCategory|never)[]>('product-categories', () => []);
