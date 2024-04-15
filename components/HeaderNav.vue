<script lang="ts" setup>
import type { ICategory } from '~/types';

const navState = ref('closed');
const toggleNav = (ev?: MouseEvent | TouchEvent) => {
  const target = ev?.target || ev?.srcElement;
  const parentElement = target instanceof Element ? target.parentElement : null;
  if (!ev || parentElement?.classList.contains('nav')) {
    navState.value = navState.value === 'open' ? 'closed' : 'open';
  }
}
const navClass = computed(() => {
  return {
    'nav--open': navState.value === 'open',
  }
});
const { headerOpacityStyle } = useHeaderOpacityStyle();

const { state: showNavIcon } = useIsMobileState();

const categories = useState<ICategory[]>('categories');
const productCategories = computed(() => {
  return categories.value.filter(item => item.category === 'product');
});
const aboutmeCategories = computed(() => {
  return categories.value.filter(item => item.category === 'aboutme');
});

const route = useRoute();
watch(() => [route.fullPath], () => {
  navState.value = 'closed';
});
</script>

<template>
  <nav class="nav" :class="navClass">
    <UButton class="nav__hamburger shrink-0 block sm:hidden"
      :icon="navState === 'closed' ? 'i-heroicons-bars-3' : 'i-heroicons-x-mark'" variant="link"
      @click.="toggleNav()" />
    <ul class="nav__list" :style="headerOpacityStyle" @click="toggleNav" @touchend="toggleNav">
      <li class="nav__list__item">
        <CompDetails name="nav__list__item__details" :icon="showNavIcon" auto-close>
          <template v-slot:summary>
            <NuxtLink to="/products">产品中心</NuxtLink>
          </template>
          <ul class="nav__list nav__list--sub direction--column" :style="headerOpacityStyle">
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
        <CompDetails name="nav__list__item__details" :icon="showNavIcon" auto-close>
          <template v-slot:summary>
            <NuxtLink to="/aboutus">关于我们</NuxtLink>
          </template>
          <ul class="nav__list nav__list--sub direction--column" :style="headerOpacityStyle">
            <li class="nav__list__item" v-for="aboutmeCategory in aboutmeCategories" :key="aboutmeCategory.id">
              <NuxtLink :to="`/aboutus#${aboutmeCategory.name}`">{{ aboutmeCategory.name }}</NuxtLink>
            </li>
            <li class="nav__list__item">
              <NuxtLink to="/aboutus#联系我们">联系我们</NuxtLink>
            </li>
            <li class="nav__list__item">
              <NuxtLink to="/aboutus#意见反馈">意见反馈</NuxtLink>
            </li>
          </ul>
        </CompDetails>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  .nav__list {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    @apply bg-stone-950 text-slate-50;

    a:hover,
    .nav__link--active {
      @apply text-sky-600;
    }

    &:deep() {
      a {
        flex: 1;
        height: 4rem;
        line-height: 4rem;
        padding: 0 1rem;
        white-space: nowrap;
      }

      .details,
      .details__content {
        flex: 1;
        padding: 0;
      }
    }

    .nav__list__item {
      padding: 0 0.5rem;
      display: flex;
    }

    &.nav__list--sub,
    &.direction--column {
      flex-flow: column nowrap;
    }
  }

  &>.nav__list {
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    overflow: hidden auto;
    display: none;
  }

  &.nav--open>.nav__list {
    display: flex;
  }
}

@media screen and (min-width: 640px) {
  .nav {
    .nav__list {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;

      .nav__list__item {
        position: relative;

        .nav__list--sub {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 9999;
          transform: translate(-50%, -100%);
          transition: all 0.3s ease-in-out;
        }

        &:hover .nav__list--sub {
          top: 100%;
          transform: translate(-50%, 0);
        }
      }
    }

    &>.nav__list {
      position: static;
      display: flex;
      overflow: unset;
    }
  }
}
</style>
