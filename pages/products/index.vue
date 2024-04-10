<script lang="ts" setup>
const { data: productList } = useQueryProductList();
</script>

<template>
  <main>
    <PageBanner banner-img-file-key="banner_product"></PageBanner>
    <!-- 
    <aside class="product__category--list">
      <ul>
        <li v-for="category in data?.data"> {{ category.product_class }} </li>
      </ul>
    </aside>
    -->
    <div class="container">
      <article class="w-full overflow-hidden flex flex-wrap justify-start items-start" v-for="category in productList">
        <h4 class="my-4 w-full text-lg text-center truncate" :id="'' + category.product_class"> {{
        category.product_class
      }}
        </h4>
        <section class="grow-0 overflow-hidden basis-full p-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
          v-for="product in category.list">
          <ProductCard :product="product"></ProductCard>
        </section>
      </article>
    </div>
  </main>
</template>
