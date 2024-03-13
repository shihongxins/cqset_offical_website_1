<script lang="ts" setup>
const currentYear = new Date().getFullYear();
const { state, unWatch } = useIsMobileState();
const linksGroupInitState = computed(() => !state.value);
onBeforeUnmount(() => {
  unWatch();
});
</script>

<template>
  <footer class="footer">
    <div class="footer__layout container container--large">
      <div class="links__layout">
        <CompDetails class="links__group" :open="linksGroupInitState">
          <template v-slot:summary>
            <h6>产品中心</h6>
          </template>
          <ul class="links__list">
            <li class="links__item">
              <a href="/products#智慧电网机器人">智慧电网机器人</a>
            </li>
            <li class="links__item">
              <a href="/products#物联网系列">物联网系列</a>
            </li>
            <li class="links__item">
              <a href="/products#输变配电故障预警系列">输变配电故障预警系列</a>
            </li>
            <li class="links__item">
              <a href="/products#无人机搭载系列">无人机搭载系列</a>
            </li>
            <li class="links__item">
              <a href="/products#其他">其他</a>
            </li>
          </ul>
        </CompDetails>
        <CompDetails class="links__group" :open="linksGroupInitState">
          <template v-slot:summary>
            <h6>新闻资讯</h6>
          </template>
          <ul class="links__list">
            <li class="links__item">
              <a href="/news#公司新闻">公司新闻</a>
            </li>
            <li class="links__item">
              <a href="/news#内容管理">内容管理</a>
            </li>
          </ul>
        </CompDetails>
        <CompDetails class="links__group" :open="linksGroupInitState">
          <template v-slot:summary>
            <h6>关于我们</h6>
          </template>
          <ul class="links__list">
            <li class="links__item">
              <a href="/aboutus#公司简介">公司简介</a>
            </li>
          </ul>
        </CompDetails>
        <CompDetails class="links__group" :open="linksGroupInitState">
          <template v-slot:summary>
            <h6>联系我们</h6>
          </template>
          <ul class="links__list">
            <li class="links__item">
              <a href="tel:+86 023-67652845">023-67652845</a>
            </li>
            <li class="links__item">
              <a href="https://map.baidu.com/search/@11868070.3,3434963.955,19z?querytype=s&wd=%E9%87%8D%E5%BA%86%E5%8D%97%E7%94%B5%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8"
                target="_blank">
                <address>
                  重庆市江北区港安二路48号总部大楼 2，3 楼
                </address>
              </a>
            </li>
          </ul>
        </CompDetails>
      </div>
      <p class="copyright">
        <span>
          版权所有：
        </span>
        <a href="//www.cqset.com" title="重庆南电科技股份有限公司">
          重庆南电科技股份有限公司
        </a>
        <span>
          Copyright &copy; {{ currentYear }}
        </span>
        <a target="_blank" href="//beian.miit.gov.cn/#/Integrated/index">
          渝ICP备16002017号-1
        </a>
      </p>
      <small class="visitor">
        网站访问量：{{ 183744 }} 人/次
      </small>
    </div>

  </footer>
</template>

<style lang="scss" scoped>
.footer {
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

@media screen and (max-width: 768px) {
  .footer {
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

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .footer {
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
