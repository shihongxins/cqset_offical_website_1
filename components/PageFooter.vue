<script lang="ts" setup>
import type { ICategory, IContactInfomation } from '~/types';

const currentYear = new Date().getFullYear();
const { state, unWatch } = useIsMobileState();
const linksGroupInitState = computed(() => !state.value);
onBeforeUnmount(() => {
  unWatch();
});
const categories = useState<ICategory[]>('categories');
const productCategories = computed(() => {
  return categories.value.filter(item => item.category === 'product');
});
const aboutmeCategories = computed(() => {
  return categories.value.filter(item => item.category === 'aboutme');
});
const contactInfomation = useState<IContactInfomation>('contact-infomation');
const { data: visitedIPCount } = await useRequest('/info/ip', {
  transform: (res: any) => {
    let count = 0;
    if (res?.code === 0) {
      count = res?.data || 0;
    }
    return count;
  }
});
</script>

<template>
  <footer class="footer mt-8 p-4 text-sm text-center bg-stone-900 text-white md:mt-16 lg:mt-24 lg:px-16 lg:py-8">
    <div class="footer__layout container">
      <div
        class="links__layout flex flex-col flex-nowrap items-stretch sm:flex-row sm:flex-wrap lg:flex-nowrap lg:items-start lg:justify-between">
        <CompDetails class="links__group" name="footer__links__group__details" :open="linksGroupInitState">
          <template v-slot:summary>
            <h6>产品中心</h6>
          </template>
          <ul class="links__list">
            <li class="links__item" v-for="productCategory in productCategories" :key="productCategory.id">
              <NuxtLink :to="`/products#${productCategory.name}`">{{ productCategory.name }}</NuxtLink>
            </li>
          </ul>
        </CompDetails>
        <CompDetails class="links__group" name="footer__links__group__details" :open="linksGroupInitState">
          <template v-slot:summary>
            <h6>新闻资讯</h6>
          </template>
          <ul class="links__list">
            <li class="links__item">
              <NuxtLink to="/news#公司新闻">公司新闻</NuxtLink>
            </li>
            <li class="links__item">
              <NuxtLink to="/management/#/management" target="_blank">内容管理</NuxtLink>
            </li>
          </ul>
        </CompDetails>
        <CompDetails class="links__group" name="footer__links__group__details" :open="linksGroupInitState">
          <template v-slot:summary>
            <h6>关于我们</h6>
          </template>
          <ul class="links__list">
            <li class="links__item" v-for="aboutmeCategory in aboutmeCategories" :key="aboutmeCategory.id">
              <NuxtLink :to="`/aboutus#${aboutmeCategory.name}`">{{ aboutmeCategory.name }}</NuxtLink>
            </li>
            <li class="links__item">
              <NuxtLink to="/aboutus#联系我们">联系我们</NuxtLink>
            </li>
            <li class="links__item">
              <NuxtLink to="/aboutus#意见反馈">意见反馈</NuxtLink>
            </li>
          </ul>
        </CompDetails>
        <CompDetails class="links__group" name="footer__links__group__details" :open="linksGroupInitState">
          <template v-slot:summary>
            <h6>联系我们</h6>
          </template>
          <ul class="links__list">
            <li class="links__item">
              <NuxtLink :to="'tel:+86' + contactInfomation.phone">
                {{ contactInfomation.phone }}
              </NuxtLink>
            </li>
            <li class="links__item">
              <NuxtLink :to="contactInfomation.bMapLink" target="_blank">
                <address>
                  {{ contactInfomation.address }}
                </address>
              </NuxtLink>
            </li>
          </ul>
        </CompDetails>
      </div>
      <p class="copyright">
        <span class="block sm:inline">
          {{ contactInfomation.company }}
        </span>
        <span>
          &copy;
        </span>
        <NuxtLink :to="contactInfomation.website" :title="contactInfomation.company">
          cqset.com {{ currentYear }}
        </NuxtLink>
        <span>
          All Rights Reserved.
        </span>
        <br>
        <NuxtLink to="//beian.miit.gov.cn/#/Integrated/index" target="_blank">
          渝ICP备16002017号-1
        </NuxtLink>
        <span class="px-1"></span>
        <NuxtLink to="https://beian.mps.gov.cn/#/query/webSearch?code=50010502503498" target="_blank">
          <img src="https://beian.mps.gov.cn/favicon.ico" alt="渝公网安备图标" class="inline-block w-4 h-4 mr-1 align-baseline"
            loading="lazy">
          <span>渝公网安备 50010502503498 号</span>
        </NuxtLink>
      </p>
      <small class="visitor">
        网站访问量：{{ visitedIPCount || 0 }} 人/次
      </small>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {

  .links {

    &__group {

      :deep(.details__summary) {
        border-bottom: 1px solid;
        height: 3rem;
        pointer-events: all;

        .details__icon {
          display: inline-flex;
        }

        @apply border-white;

        h6 {
          border-bottom: 2px solid;
          height: 3rem;
          line-height: 3rem;
          @apply border-white truncate;
        }
      }
    }

    &__list {
      margin-top: .625rem;
    }
  }
}

@media screen and (min-width: 640px) {
  .footer {

    .links__group {
      width: 18rem;
      min-width: 50%;

      :deep(.details__summary) {
        .details__icon {
          display: none;
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .footer {

    .links__group {
      min-width: auto;
      text-align: left;
    }
  }
}
</style>
