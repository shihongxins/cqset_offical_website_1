<script lang="ts" setup>
import type { IBrief, IContactInfomation, IArticle } from '~/types';
import type { IResponseDataList } from '~/types/request';

const runtimeConfig = useRuntimeConfig();

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const brief = useState<IBrief>('brief');
const refDOMBriefCoverImg = ref<HTMLImageElement>();
const briefCoverImgURL = computed(() => {
  let url = '';
  if (brief.value.cover && mounted.value) {
    const { devicePixelRatio = 1 } = window;
    const { clientWidth = 0, clientHeight = 0 } = refDOMBriefCoverImg.value || {};
    const maxAttribute = clientWidth > clientHeight ? 'width' : 'height';
    const maxValue = Math.max(clientWidth, clientHeight) * devicePixelRatio;
    url = `${runtimeConfig.public.resourceOrigin}/${brief.value.cover}?${maxAttribute}=${maxValue}`.replace('/uploads', '/api/file/uploads');
  }
  return url;
});
const contactInfomation = useState<IContactInfomation>('contact-infomation');

const { data: productList } = useQueryProductList({
  pageSize: 3,
});
const top3Products = computed(() => {
  let list: IArticle[] = [];
  if (productList.value?.length) {
    list = productList.value.map((category) => {
      return category.list[0];
    }).filter((product, i) => i < 3 && product);
  }
  return list;
});

const advantages = [
  {
    title: '平台优势',
    content: '重庆市知识产权优势企业、重庆市“专精特新”企业、重庆高新技术企业等',
  },
  {
    title: '定制化开发',
    content: '软件、硬件和结构产品的定制化开发',
  },
  {
    title: '丰富的产品线',
    content: '机器人系列、物联网系列、输变配电故障预警系列和无人机搭载系列产品',
  },
  {
    title: '定制化服务',
    content: '可为代理商和第三方企业提供技术方案、标书编写等服务',
  },
].map((advantage, i) => {
  return {
    image: `/images/icon-advantage_${i + 1}.png`,
    ...advantage,
  }
});

const { data: top4NewsInfo } = useRequest<IArticle[]>('/news/list', {
  method: 'GET',
  params: {
    page: 1,
    pageSize: 4,
  },
  transform: (input: any) => {
    let newsList: IArticle[] = [];
    const res = input as IResponseDataList<IArticle>;
    if (res.code === 0 && res.data) {
      newsList = res.data.list.filter((_, i) => i < 4).map((news) => {
        return {
          ...news,
          createdAt: datetimeFormatter(news.createdAt),
        }
      });
    }
    return newsList;
  }
});
</script>

<template>
  <main>
    <PageBanner banner-img-file-key="carousel"></PageBanner>
    <section class="about-us container">
      <h2 class="index__section__h2" id="关于我们">
        <span>about us</span>
        <NuxtLink to="/aboutus">关于我们</NuxtLink>
      </h2>
      <article class="company__brief--container flex flex-col md:space-x-8 md:flex-row">
        <div class="company__brief__cover flex-1 overflow-hidden">
          <img class="w-full h-full object-cover" loading="lazy" ref="refDOMBriefCoverImg" :src="briefCoverImgURL"
            :alt="contactInfomation.company" />
        </div>
        <div
          class="company__brief__content flex-1 overflow-hidden bg-sky-600/10 flex flex-col justify-center items-center text-sm md:text-base">
          <p class="m-8 indent-8" v-html="brief.brief"></p>
          <NuxtLink class="my-4 font-semibold text-sky-500" to="/aboutus#公司简介">了解更多</NuxtLink>
        </div>
      </article>
    </section>
    <section class="products-center container">
      <h2 class="index__section__h2" id="产品中心">
        <span>products center</span>
        <NuxtLink to="/products">产品中心</NuxtLink>
      </h2>
      <ul class="top-3-products overflow-hidden flex flex-col flex-wrap md:flex-row">
        <li class="flex-auto grow-0 p-2 w-full overflow-hidden md:w-1/3" v-for="product in top3Products"
          :key="product.id">
          <ProductCard :product="product"></ProductCard>
        </li>
      </ul>
    </section>
    <section class="our-advantages container flex flex-col">
      <h2 class="index__section__h2 grow" id="我们的优势">
        <span>our advantages</span>
        <span>我们的优势</span>
      </h2>
      <div class="our-advantages__bg w-screen self-center">
        <ul class="container p-4 flex flex-col md:flex-row md:flex-wrap">
          <li
            class="flex-1 m-4 rounded p-4 overflow-hidden flex md:basis-2/5 hover:shadow hover:bg-stone-400/20 transition-all transform-gpu duration-300"
            v-for="advantage in advantages" :key="advantage.title">
            <img class="object-contain mr-4" :src="advantage.image" :alt="advantage.title">
            <div class="flex-1 overflow-hidden flex flex-col">
              <strong class="truncate underline decoration-sky-600 decoration-8">{{ advantage.title }}</strong>
              <p class="flex-1 overflow-hidden">{{ advantage.content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="news-and-infomation container">
      <h2 class="index__section__h2" id="新闻资讯">
        <span>news and infomation</span>
        <span>新闻资讯</span>
      </h2>
      <ul class="news-and-infomation__list w-full overflow-hidden flex flex-col items-end">
        <li class="news-and-infomation__item flex-1 w-full overflow-hidden" v-for="newsInfo in top4NewsInfo"
          :key="newsInfo.id">
          <NewsListItem :news-info="newsInfo" />
        </li>
      </ul>
      <NuxtLink class="block w-full mt-4 text-center text-sky-500 font-semibold" to="/news">更多资讯</NuxtLink>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.index__section__h2 {
  @apply relative my-4 h-8 md:h-16 lg:h-20;

  >* {
    @apply absolute bottom-0 left-0 w-full text-xl font-bold text-center truncate md:text-2xl lg:text-3xl;

    &:first-child {
      @apply text-3xl font-extrabold uppercase text-white md:text-6xl lg:text-8xl;
      text-shadow: 0 0 1px #999;
    }
  }
}

.our-advantages {
  &__bg {
    background: url('/images/bg_advantage.png') center/cover no-repeat;
  }
}

@media screen and (min-width: 768px) {
  .news-and-infomation {
    &__list {
      position: relative;
    }

    &__item {
      width: 50%;

      &:first-child {
        position: absolute;
        top: 0;
        right: 50%;
        bottom: 0;
        left: 0;
        width: auto;

        :deep() .news-info {
          height: calc(100% - 2rem);
          flex-direction: column-reverse;

          &__cover {
            flex: 1 1 auto;
            margin: 0;
            margin-bottom: .5rem;
            max-width: none;
            width: 100%;
            height: auto;
          }

          &__detail {
            flex: 0 0 auto;
            height: 8rem;
          }
        }
      }
    }
  }
}
</style>
