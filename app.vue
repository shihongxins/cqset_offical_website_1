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
  aMapLink: 'https://uri.amap.com/marker?position=106.605013,29.625999&name=重庆南电科技股份有限公司&callnative=1',
  bMapLink: 'https://api.map.baidu.com/marker?location=29.625999,106.605013&coord_type=gcj02&title=重庆南电科技&content=重庆南电科技股份有限公司&output=html&src=webapp.baidu.openAPIdemo',
  website: 'https://www.cqset.com',
}));
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
