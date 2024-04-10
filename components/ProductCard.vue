<script lang="ts" setup>
import type { IArticle } from '~/types';

const props = defineProps<{
  product: IArticle
}>();

const runtimeConfig = useRuntimeConfig();

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const refDOMImgCover = ref<HTMLImageElement>();
const productCoverURL = computed(() => {
  let url = '';
  if (props.product.cover && mounted.value) {
    const { devicePixelRatio = 1 } = window;
    const { clientWidth = 0, clientHeight = 0 } = refDOMImgCover.value || {};
    const maxAttribute = clientWidth > clientHeight ? 'width' : 'height';
    const maxValue = Math.max(clientWidth, clientHeight) * devicePixelRatio;
    url = `${runtimeConfig.public.resourceOrigin}/${props.product.cover}?${maxAttribute}=${maxValue}`.replace('/uploads', '/api/file/uploads');
  }
  return url;
});
</script>

<template>
  <NuxtLink
    class="product--card w-full h-full overflow-hidden relative flex flex-col shadow cursor-pointer hover:scale-95 hover:shadow-xl group transform-gpu transition-all duration-500"
    :to="`/products/${product.id}`">
    <div class="product__cover--wrapper grow p-10 overflow-hidden bg-sky-600/10">
      <img ref="refDOMImgCover" class="w-full h-full object-cover" :src="productCoverURL" :alt="product.title">
    </div>
    <h6
      class="product__name grow-0 px-8 w-full box-border leading-10 text-center truncate text-stone-600 bg-white group-hover:text-sky-600 transform-gpu transition-all duration-500">
      {{ product.title }}
    </h6>
    <div
      class="product__brief flex text-sm text-stone-400 group-hover:text-white group-hover:bg-sky-600/80 lg:absolute lg:top-0 lg:bottom-10 lg:-z-10 lg:overflow-hidden lg:translate-y-full lg:group-hover:z-10 lg:group-hover:translate-y-0 transform-gpu transition-all duration-500">
      <p
        class="product__brief--content flex-1 m-2 indent-8 line-clamp-4 lg:m-8 lg:line-clamp-none lg:leading-6 lg:overflow-hidden">
        {{ product.brief }}
      </p>
    </div>
  </NuxtLink>
</template>
