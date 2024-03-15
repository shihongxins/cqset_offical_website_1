<script lang="ts" setup>
import { briefStore } from './composables/stores';

categoriesStore.actions.queryCategories();
briefStore.actions.queryBrief();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
