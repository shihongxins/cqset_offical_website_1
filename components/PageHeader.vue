<script lang="ts" setup>
const { headerOpacityStyle } = useHeaderOpacityStyle();
</script>

<template>
  <header class="header fixed top-0 left-0 right-0 z-50 px-4 bg-stone-900" :style="headerOpacityStyle">
    <div class="header__layout container h-16 flex justify-between items-center">
      <NuxtLink to="/" class="h-8 flex items-center">
        <img class="logo mr-4 h-full object-contain" alt="logo"
          srcset="https://www.cqset.com/uploads/129d018a2bedce166915bb1b71bf8cfd_20240305165703.png 180w,https://www.cqset.com/uploads/138db59c896b7ebcaf7206219dd3afc9_20240305165703.png"
          sizes="(max-width: 750px) 180px, 100vw"
          src="https://www.cqset.com/uploads/129d018a2bedce166915bb1b71bf8cfd_20240305165703.png" />
        <h1 class="title font-semibold text-xl text-sky-600 truncate hidden sm:block">
          重庆南电科技
        </h1>
      </NuxtLink>
      <HeaderNav></HeaderNav>
    </div>
  </header>
</template>
