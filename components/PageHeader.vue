<template>
  <header class="header">
    <div class="header__layout container container--large">
      <NuxtLink to="/" class="h-8 flex items-center">
        <img class="logo" alt="logo"
          srcset="https://www.cqset.com/uploads/129d018a2bedce166915bb1b71bf8cfd_20240305165703.png 180w,https://www.cqset.com/uploads/138db59c896b7ebcaf7206219dd3afc9_20240305165703.png"
          sizes="(max-width: 750px) 180px, 100vw"
          src="https://www.cqset.com/uploads/129d018a2bedce166915bb1b71bf8cfd_20240305165703.png" />
        <h1 class="title">
          重庆南电科技
        </h1>
      </NuxtLink>
      <HeaderNav></HeaderNav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 0 1rem;
  @apply bg-stone-950;

  .header__layout {
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      height: 100%;
      object-fit: contain;
      margin-right: 1rem;
    }

    .title {
      display: none;
      font-weight: 600;
      letter-spacing: 0.1rem;
      font-size: 1.25rem;
      white-space: nowrap;
      @apply text-blue-800;
    }
  }
}

@media screen and (max-width: 768px) {
  .header {
    .header__layout {
      .title {
        display: block;
      }
    }
  }
}
</style>
