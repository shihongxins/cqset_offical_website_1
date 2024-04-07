<script lang="ts" setup>
import type { IArticle } from '~/types';
import type { IListRequestParams, IResponseDataList } from '~/types/request';
import { useInfiniteScroll } from '@vueuse/core';

const newsList = ref<Array<IArticle>>([]);
const newsListParams = reactive<IListRequestParams>({
  page: 1,
  pageSize: 10,
});
const total = ref(0);
const noMore = computed(() => {
  return total.value > 100 || newsListParams.page * newsListParams.pageSize >= total.value;
});
const { pending, error, data: newsListResponse } = await useRequest<IResponseDataList<IArticle>>('/news/list', {
  method: 'get',
  params: newsListParams,
  watch: [newsListParams],
});
const syncNewsList = () => {
  if (pending.value) return;
  if (newsListResponse.value?.code === 0) {
    const toRenderedNewsList = (newsListResponse.value.data?.list || []).map((newsListItem) => {
      return {
        ...newsListItem,
        createdAt: datetimeFormatter(newsListItem.createdAt),
      };
    });
    newsList.value = newsList.value.concat(toRenderedNewsList);
    total.value = newsListResponse.value.data?.total || newsList.value.length;
  }
}
watchEffect(syncNewsList);

const dividerAttrs = computed(() => {
  const attrs = {
    show: false,
    label: '',
    icon: '',
  }
  if (pending.value || error.value || noMore.value) {
    attrs.show = true;
  }
  if (pending.value) {
    attrs.label = '加载中...';
    attrs.icon = 'i-heroicons-arrow-path';
  }
  if (error.value) {
    attrs.label = '加载失败，点击重试';
    attrs.icon = 'i-heroicons-exclamation-circle';
  }
  if (noMore.value) {
    attrs.label = '没有更多了';
    attrs.icon = 'i-heroicons-minus-circle';
  }
  return attrs;
});

const backTopVisible = ref(false);
const backTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  document.documentElement.scrollTop = 0;
}

const handleScroll = () => {
  backTopVisible.value = window.innerHeight < (window.scrollY || document.documentElement.scrollTop);
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  backTop();
  let distance = 0;
  const footerDOM = document.querySelector('footer.footer');
  if (footerDOM) {
    distance = (footerDOM as HTMLElement).offsetHeight;
  }
  useInfiniteScroll(
    window,
    () => {
      if (dividerAttrs.value.show) return;
      newsListParams.page += 1;
    },
    {
      distance,
    }
  );
});
</script>

<template>
  <main>
    <PageBanner banner-img-file-key="banner_news"></PageBanner>
    <ul ref="refDOMNewsList" class="news__list container">
      <li class="new__list__item p-4 rounded shadow" v-for="newsInfo in newsList" :key="newsInfo.id">
        <NuxtLink :to="`/news/${newsInfo.id}`" class="w-full overflow-hidden">
          <NewsListItem :news-info="newsInfo" />
        </NuxtLink>
      </li>
    </ul>
    <ClientOnly>
      <UDivider v-show="dividerAttrs.show" :icon="dividerAttrs.icon" :label="dividerAttrs.label"></UDivider>
      <UButton v-show="backTopVisible" class="fixed right-8 bottom-60 z-50 bg-sky-600"
        icon="i-heroicons-arrow-up-circle-solid" @click="backTop"></UButton>
    </ClientOnly>
  </main>
</template>
