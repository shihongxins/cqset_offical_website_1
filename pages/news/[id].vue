<script lang="ts" setup>
const route = useRoute();

const { data } = await useQueryNewsDetail(route.params.id + '');

</script>

<template>
  <div>
    <PageBanner banner-img-file-key="banner_news"></PageBanner>
    <main class="news__detail container">
      <h2 class="news__title text-3xl leading-10 text-stone-800 text-center"> {{ data?.detail?.title }} </h2>
      <p class="news__time text-xs text-stone-400 text-right">{{ datetimeFormatter(data?.detail?.createdAt) }}</p>
      <article class="ck-content" v-html="data?.detail?.content"></article>
    </main>
    <div class="news__actions mx-auto max-w-80 flex justify-between items-center">
      <NuxtLink v-show="data?.preview" :to="`/news/${data?.preview}`">
        <UIcon name="i-heroicons-chevron-left"></UIcon>
        上一篇
      </NuxtLink>
      <NuxtLink v-show="data?.next" :to="`/news/${data?.next}`">
        下一篇
        <UIcon name="i-heroicons-chevron-right"></UIcon>
      </NuxtLink>
      <NuxtLink to="/news">
        <UIcon name="i-heroicons-queue-list"></UIcon>
        返回列表
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news {
  &__actions {
    a {
      @apply flex items-center text-stone-400 hover:text-stone-800;
    }
  }
}
</style>
