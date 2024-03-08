<script setup>
import { useMediaQuery } from "@vueuse/core";

const navState = ref('closed');
const toggleNav = () => {
  navState.value = navState.value === 'open' ? 'closed' : 'open';
}
const isMobile = useMediaQuery('(max-width: 768px)');

const navClass = computed(() => {
  return {
    'nav--open': navState.value === 'open',
    'is-mobile': isMobile.value,
  }
});

</script>

<template>
  <nav class="nav" :class="navClass">
    <ul class="nav__list">
      <li class="nav__list__item">
        <NuxtLink to="/products">产品中心</NuxtLink>
      </li>
      <li class="nav__list__item">
        <NuxtLink to="/news">新闻资讯</NuxtLink>
      </li>
      <li class="nav__list__item">
        <Details :icon="isMobile">
          <template v-slot:summary>
            <NuxtLink to="/aboutus">关于我们</NuxtLink>
          </template>
          <ul class="nav__list direction--column">
            <li class="nav__list__item">
              <NuxtLink to="/aboutus/#/公司简介">公司简介</NuxtLink>
            </li>
            <li class="nav__list__item">
              <NuxtLink to="/aboutus/#/联系我们">联系我们</NuxtLink>
            </li>
            <li class="nav__list__item">
              <NuxtLink to="/aboutus/#/意见建议">意见建议</NuxtLink>
            </li>
          </ul>
        </Details>
      </li>
    </ul>
    <UButton class="nav__hamburger" :icon="navState === 'closed' ? 'i-heroicons-bars-3' : 'i-heroicons-x-mark'"
      variant="link" @click="toggleNav" />
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  align-self: flex-start;
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

      a {
        height: 4rem;
        line-height: 4rem;
        padding: 0 1rem;
        white-space: nowrap;
      }

      .details {
        flex: 1;
        padding: 0;

        &:deep(.details__content) {
          padding: 0;
        }
      }

    }
  }

  &__hamburger {
    display: none;
  }

  &.is-mobile {
    align-self: center;
    justify-content: center;

    &>.nav__list {
      display: none;

      .nav__list__item {
        display: flex;

        &>a {
          flex: 1;
        }
      }
    }

    &>.nav__hamburger {
      display: block;
      flex-shrink: 0;
    }

    &.nav--open {
      >.nav__list {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        width: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
