<script lang="ts" setup>
import type { ICategory, IBrief } from '~/types';
import type { IResponseDataList } from "~/types/request";

const { data: categories } = await useRequest('/product_class/list', {
  query: {
    page: 1,
    pageSize: 20,
  },
  transform: (res: any) => {
    const resData = res as IResponseDataList<ICategory>;
    let categories: Array<ICategory> = [];
    if (resData?.code === 0 && resData?.data?.list) {
      categories = [...resData.data.list].filter((item) => item?.id);
    }
    return categories;
  }
});
useState('categories', () => categories.value || []);


const { data: brief } = await useQueryArticleDetail({
  title: '公司简介',
});
useState('brief', () => brief.value);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
