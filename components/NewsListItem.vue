<script lang="ts" setup>
import type { IArticle } from '~/types';

const props = defineProps<{
  newsInfo: IArticle
}>();

const runtimeConfig = useRuntimeConfig();
const mounted = ref(false);

const refDOMImgCover = ref<HTMLElement>();
const coverURL = computed(() => {
  let url = '';
  if (mounted.value && props.newsInfo.cover) {
    const { devicePixelRatio = 1 } = window;
    const { clientHeight = 0, clientWidth = 0 } = refDOMImgCover.value || {};

    const maxAttribute = clientWidth > clientHeight ? 'width' : 'height';
    const maxValue = Math.max(clientWidth, clientHeight) * devicePixelRatio;
    url = `${runtimeConfig.public.resourceOrigin}/${props.newsInfo.cover}?${maxAttribute}=${maxValue}`.replace('/uploads', '/api/file/uploads');
  }
  return url;
});

onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <NuxtLink
    class="news-info m-4 rounded p-4 h-40 shadow overflow-hidden flex hover:scale-95 hover:shadow-md transform-gpu transition-all duration-200"
    :to="`/news/${props.newsInfo.id}`">
    <div class="news-info__detail flex-1 overflow-hidden flex flex-col">
      <h6 class="news-info__title text-base truncate md:text-lg">{{ props.newsInfo.title }}</h6>
      <p class="news-info__content flex-1 mb-2 line-clamp-4 indent-8 text-sm text-stone-600 md:text-base md:line-clamp-3"
        v-html="props.newsInfo.brief"></p>
      <span class="news-info__datetime text-xs text-stone-400">{{ props.newsInfo.createdAt }}</span>
    </div>
    <div ref="refDOMImgCover" class="news-info__cover shrink-0 ml-2 rounded max-w-1/4 w-40 h-full overflow-hidden">
      <img class="w-full h-full object-cover" loading="lazy" :src="coverURL" :alt="props.newsInfo.title" />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.news-info {
  &__cover {
    max-width: 25%;
  }
}
</style>
