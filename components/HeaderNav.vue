<script setup>
const props = defineProps({
  bgOpacityStyle: {
    type: Object,
    default: () => ({})
  },
});
const navState = ref('closed');
const toggleNav = () => {
  navState.value = navState.value === 'open' ? 'closed' : 'open';
}
const navClass = computed(() => {
  return {
    'nav--open': navState.value === 'open',
  }
});
const { state: showNavIcon, unWatch } = useIsMobileState();
onUnmounted(() => {
  unWatch();
});
const productCategories = computed(() => {
  return categoriesStore.state.value.filter(item => item.category === 'product');
});
const aboutmeCategories = computed(() => {
  return categoriesStore.state.value.filter(item => item.category === 'aboutme');
});
</script>

<template>
  <nav class="nav" :class="navClass">
    <ul class="nav__list" :style="bgOpacityStyle">
      <li class="nav__list__item">
        <CompDetails :icon="showNavIcon">
          <template v-slot:summary>
            <NuxtLink to="/products">产品中心</NuxtLink>
          </template>
          <ul class="nav__list direction--column" :style="bgOpacityStyle">
            <li class="nav__list__item" v-for="productCategory in productCategories" :key="productCategory.id">
              <NuxtLink :to="`/products#${productCategory.name}`">{{ productCategory.name }}</NuxtLink>
            </li>
          </ul>
        </CompDetails>
      </li>
      <li class="nav__list__item">
        <NuxtLink to="/news">新闻资讯</NuxtLink>
      </li>
      <li class="nav__list__item">
        <CompDetails :icon="showNavIcon">
          <template v-slot:summary>
            <NuxtLink to="/aboutus">关于我们</NuxtLink>
          </template>
          <ul class="nav__list direction--column" :style="bgOpacityStyle">
            <li class="nav__list__item" v-for="aboutmeCategory in aboutmeCategories" :key="aboutmeCategory">
              <NuxtLink :to="`/aboutus#${aboutmeCategory.name}`">{{ aboutmeCategory.name }}</NuxtLink>
            </li>
            <li class="nav__list__item">
              <NuxtLink to="/aboutus#联系我们">联系我们</NuxtLink>
            </li>
            <li class="nav__list__item">
              <NuxtLink to="/aboutus#意见建议">意见建议</NuxtLink>
            </li>
          </ul>
        </CompDetails>
      </li>
    </ul>
    <UButton class="nav__hamburger" :icon="navState === 'closed' ? 'i-heroicons-bars-3' : 'i-heroicons-x-mark'"
      variant="link" @click="toggleNav" />
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;

  &__list {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    @apply bg-stone-950 text-slate-50;

    &.direction--column {
      flex-flow: column nowrap;
    }

    &__item {
      padding: 0 0.5rem;

      :deep(a) {
        height: 4rem;
        line-height: 4rem;
        padding: 0 1rem;
        white-space: nowrap;

        &:hover,
        &.router-link-active {
          @apply text-sky-600;
        }
      }

      .details {
        flex: 1;
        padding: 0;

        &:deep(.details__content) {
          padding: 0;
        }
      }

      position: relative;

      .nav__list {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -100%);
        transition: all 0.3s ease-in-out;

        &,
        & a {
          @apply text-slate-50;

          &:hover {
            @apply text-sky-600;
          }
        }
      }

      &:hover {
        .nav__list {
          top: 100%;
          transform: translate(-50%, 0);
        }
      }
    }
  }

  &__hamburger {
    display: none;
  }
}

@media screen and (max-width: 640px) {
  .nav {
    align-self: center;
    justify-content: center;

    &>.nav__list {
      display: none;

      .nav__list__item {
        display: flex;

        a {
          flex: 1;
        }

        .nav__list {
          position: static;
          transform: none;
        }
      }
    }

    &>.nav__hamburger {
      display: block;
      flex-shrink: 0;
    }

    &.nav--open {
      .nav__list {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
      }

      >.nav__list {
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        z-index: 99;
        width: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
