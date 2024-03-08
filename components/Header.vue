<template>
  <div class="header__wrapper">
    <header class="header">
      <NuxtLink to="/" class="h-8 flex items-center">
        <img class="logo" alt="logo"
          srcset="https://www.cqset.com/uploads/129d018a2bedce166915bb1b71bf8cfd_20240305165703.png 180w,https://www.cqset.com/uploads/138db59c896b7ebcaf7206219dd3afc9_20240305165703.png"
          sizes="(max-width: 750px) 180px, 100vw"
          src="https://www.cqset.com/uploads/129d018a2bedce166915bb1b71bf8cfd_20240305165703.png" />
        <h1 class="title">
          重庆南电科技
        </h1>
      </NuxtLink>
      <Navigation></Navigation>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.header__wrapper {
  padding: 0 1rem;
  height: 4rem;
  @apply bg-stone-950;

  .header {
    margin: auto;
    width: 100%;
    max-width: 1440px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      height: 100%;
      object-fit: contain;
      margin-right: 1rem;
    }

    .title {
      font-weight: 600;
      letter-spacing: 0.1rem;
      font-size: 1.25rem;
      white-space: nowrap;
      @apply text-blue-800;
    }
  }
}
</style>
