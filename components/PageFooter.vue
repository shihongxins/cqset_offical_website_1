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
  <footer class="footer">
    <div class="footer__layout container">
      <div class="links__layout">
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
              <NuxtLink to="/news#内容管理">内容管理</NuxtLink>
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
        <NuxtLink :to="contactInfomation.website" :title="contactInfomation.company">
          {{ contactInfomation.company }}
        </NuxtLink>
        <span>
          Copyright &copy; {{ currentYear }}
        </span>
        <NuxtLink to="//beian.miit.gov.cn/#/Integrated/index" target="_blank">
          渝ICP备16002017号-1
        </NuxtLink>
        <NuxtLink to="https://beian.mps.gov.cn/#/query/webSearch?code=50010502503498" target="_blank">
          <img src="https://beian.mps.gov.cn/favicon.ico" alt="渝公网安备图标"
            class="inline-block w-4 h-4 mr-1 align-baseline">
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
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  @apply bg-stone-950 text-slate-50;

  .links {
    &__layout {
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
    }

    &__group {
      width: auto;

      :deep(.details__summary) {
        border-bottom: 1px solid;
        height: 3rem;
        pointer-events: none;

        .details__icon {
          display: none;
        }

        @apply border-slate-50;

        h6 {
          border-bottom: 2px solid;
          height: 3rem;
          line-height: 3rem;
          @apply border-slate-50 truncate;
        }
      }
    }

    &__list {
      margin-top: .625rem;
    }
  }
}

@media screen and (max-width: 640px) {
  .footer {
    margin-top: 2rem;

    .links {
      &__layout {
        flex-flow: column nowrap;
      }

      &__group {
        width: auto;

        :deep(.details__summary) {
          pointer-events: all;

          .details__icon {
            display: inline-flex;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 640px) and (max-width: 1024px) {
  .footer {
    margin-top: 4rem;

    .links {
      &__layout {
        flex-flow: row wrap;
      }

      &__group {
        width: 18rem;
        min-width: 50%;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .footer {
    margin-top: 6rem;
    padding: 2rem 4rem;

    .links {
      &__layout {
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
      }

      &__group {
        min-width: auto;
        width: 18rem;
        text-align: left;
      }
    }
  }
}
</style>
