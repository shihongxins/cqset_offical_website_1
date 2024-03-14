<script lang="ts" setup>
import type { IProductCategory } from "~/composables/states";
const { data: productCategories } = await useRequest('/product_class/list', {
  method: 'GET',
  query: {
    category: "product",
    page: 1,
    pageSize: 20,
  },
  transform: (res: any) => {
    let categories: IProductCategory[] = [];
    if (res?.code === 0) {
      categories = [].concat(res?.data?.list).map((category: IProductCategory) => {
        return {
          id: category?.id,
          name: category?.name,
        }
      }).filter((category) => category?.id);
    }
    return categories;
  }
});
const stateProductCategories = useProductCategories();
stateProductCategories.value = productCategories.value || [];
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
