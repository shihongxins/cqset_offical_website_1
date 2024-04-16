<script setup>
const props = defineProps({
  bannerImgFileKey: {
    type: String,
    required: true,
  }
});

const onFocus = ref(false);
const handleFocus = (f = false) => {
  onFocus.value = f;
}
const CompCarouselRef = ref(null);
const handleCarouselChange = (increase = 1) => {
  if (CompCarouselRef.value?.pages > 1) {
    let nextPage = CompCarouselRef.value.page + increase;
    if (nextPage < 1 || nextPage > CompCarouselRef.value.pages) {
      nextPage = 1;
    }
    CompCarouselRef.value.select(nextPage);
  }
}

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
  setInterval(() => {
    if (onFocus.value) return;
    handleCarouselChange();
  }, 2000);
});

const { data: bannerImgFiles } = useQueryUploadedFiles({
  key: props.bannerImgFileKey,
});

const { state: isMobile } = useIsMobileState();
const runtimeConfig = useRuntimeConfig();
const bannerImgFileURLs = computed(() => {
  let urls = [];
  if (mounted.value && bannerImgFiles.value?.data?.list?.length) {
    const { devicePixelRatio = 1, innerWidth } = window;
    const bannerImgWidth = Math.round(innerWidth * devicePixelRatio);
    const bannerImgRatio = isMobile.value ? 10 / 16 : 5 / 16;
    const bannerImgHeight = Math.round(bannerImgWidth * bannerImgRatio);
    urls = bannerImgFiles.value.data.list.filter((file) => file.url).map((file) => {
      return `${runtimeConfig.public.resourceOrigin}/${file.url}?width=${bannerImgWidth}&height=${bannerImgHeight}`.replace('/uploads', '/api/file/uploads');
    });
  }
  return urls;
});
</script>

<template>
  <div class="banner__container">
    <UCarousel ref="CompCarouselRef" :items="bannerImgFileURLs" v-slot="{ item }" :ui="{ item: 'basis-full' }"
      :indicators="bannerImgFileURLs.length > 1" @mouseenter="handleFocus(true)" @mouseleave="handleFocus(false)"
      @touchstart="handleFocus(true)" @touchend="handleFocus(false)">
      <img class="banner_img w-full h-full object-cover" alt="banner" loading="lazy" :src="item" />
    </UCarousel>
  </div>
</template>

<style lang="scss" scoped>
.banner__container {
  box-sizing: border-box;
  padding-bottom: calc(10 / 16 * 100%); // 16:10
  height: 0;
  position: relative;
  background-color: #ddd;

  >* {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
}

@media screen and (min-width: 640px) {
  .banner__container {
    padding-bottom: calc(5 / 16 * 100%); // 16:5
  }
}
</style>
