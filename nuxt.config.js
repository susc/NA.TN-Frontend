
export default {
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost,
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no' },
      { hid: 'Description', name: 'Description', content: 'NA.TN 短链接服务为您提供：短链接生成，短链接程序，短链接服务，淘宝链接压缩，做专业的链接缩短网站。我们的宗旨是：为你缩短一切！' },
      { hid: 'Keywords', name: 'Keywords', content: 'NA.TN,短链接,压缩链接,短链接服务,短链接生成,短网址,短网址生成,链接缩短,缩短网址,长链接缩短' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  generate: {
    routes: ['/', '/urlerror']
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    publicPath: 'https://staticserv-10056609.file.myqcloud.com/na_tn/public/'
  }

}
