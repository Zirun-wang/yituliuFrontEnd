module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '明日方舟一图流',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=0.68, maximum-scale=0.68, user-scalable=no' },
      { hid: 'description', name: 'keywords', content: '素材获取,一图流,明日方舟,攒抽计算器,公招招募计算,基建排班生成器,刷图推荐,性价比,公开招募,掉率' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' },
    ],

  },



  loading: { color: '#3B8070' },

  plugins: [
    {src: '~plugins/myPlugin',ssr: true},
  ],
  // css: [
  //   'element-ui/lib/theme-chalk/index.css'
  // ],


  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['element-ui'],
    // transpile: [/^element-ui/],
    // babel: {
    //   plugins: [
    //     [
    //       'component',
    //       {
    //         libraryName: 'element-ui',
    //         styleLibraryName: 'theme-chalk'
    //       }
    //     ]
    //   ]
    // },

  },


}

