<script lang="ts" setup>
const route = useRoute();
const { data } = await useQueryProductDetail({
  id: +route.params.id,
});
</script>

<template>
  <div>
    <PageBanner banner-img-file-key="banner_product"></PageBanner>
    <main class="product__detail container">
      <article class="ck-content" v-html="data?.content"></article>
    </main>
  </div>
</template>
