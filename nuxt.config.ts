// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],
  css: [
    '~/assets/styles/globals.scss',
  ],
  app: {
    head: {
      title: '重庆南电科技',
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: '重庆南电科技股份有限公司' },
        { name: 'keywords', content: '重庆南电科技,南电科技,南电,CQSET' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://www.cqset.com/uploads/d02a42d9cb3dec9320e5f550278911c7_20240305165703.ico' },
        { rel: 'apple-touch-icon', sizes: '32x32', href: 'https://www.cqset.com/uploads/e67964e74c633761973c9cb3b0953737_20240305165703.png'},
        { rel: 'apple-touch-icon', sizes: 'any', href: 'https://www.cqset.com/uploads/129d018a2bedce166915bb1b71bf8cfd_20240305165703.png'},
      ],
      htmlAttrs: {
        lang: 'zh-CN'
      },
    },
  },
  nitro: {
    routeRules: {
      '/backend/**': {
        proxy: {
          to: 'http://www.cqset.com/api/**',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBaseURL: '/backend/',
    },
  },
});
