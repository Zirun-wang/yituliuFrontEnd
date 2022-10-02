module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '明日方舟一图流',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=0.68, maximum-scale=0.68, user-scalable=no' },
      { hid: 'description', name: 'description', content: '明日方舟一图流' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    
  },

  loading: { color: '#3B8070' },

  plugins: [{
    src: '~plugins/myPlugin',
    ssr: true,
  }],
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
//   modules: [
//     '@nuxtjs/axios','@nuxtjs/proxy'
//   ],
//   axios: {
//     proxy: true, // 表示开启代理
//     prefix: '', // 表示给请求url加个前缀 /api
//     credentials: true // 表示跨域请求时是否需要使用凭证
// },
// proxy: {
//   '/api': {
//     target: 'https://ak.hypergryph.com', // 目标接口域名
//     changeOrigin: true, // 表示是否跨域
//     pathRewrite: {
//       '^/api': '/', // 把 /api 替换成 /
//     }
//   }
// },

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
    // vendor: ['axios'] //为防止重复打包
  },

  
}

