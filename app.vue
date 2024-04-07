<script lang="ts" setup>
import type { ICategory, IBrief, IContactInfomation } from '~/types';
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


const { data: brief } = await useQueryProductDetail({
  title: '公司简介',
});
useState('brief', () => brief.value as IBrief);

useState<IContactInfomation>('contact-infomation', () => ({
  company: '重庆南电科技股份有限公司',
  phone: '023-67652845',
  address: '重庆市江北区港安二路48号总部大楼 2，3 楼',
  bMapLink: 'https://map.baidu.com/search/@11868070.3,3434963.955,19z?querytype=s&wd=%E9%87%8D%E5%BA%86%E5%8D%97%E7%94%B5%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8',
  website: 'www.cqset.com',
}));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
