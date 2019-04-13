module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'NA.TN 短链接服务 - 为你缩短一切',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
      { hid: 'Description', name: 'Description', content: 'NA.TN 短链接服务为您提供：短链接生成，短链接程序，短链接服务，淘宝链接压缩，做专业的链接缩短网站。我们的宗旨是：为你缩短一切！' },
      { hid: 'Keywords', name: 'Keywords', content: 'NA.TN,短链接,压缩链接,短链接服务,短链接生成,短网址,短网址生成,链接缩短,缩短网址,长链接缩短' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['~/assets/css/general.css'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    analyze: true,
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
    publicPath: 'https://staticserv-10056609.file.myqcloud.com/na_tn/public/'
  },
  modules: [
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome'
  ],
  plugins: [
    {
      src: '~/plugins/font-awesome'
    },
    {
      src: '~/plugins/vue-resource'
    },
    {
      src: '~/plugins/vue-qrcode'
    },
    {
      src: '~/plugins/vue-cookie'
    }
  ],
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faExclamationCircle', 'faHome', 'faLink', 'faCog', 'faSignOutAlt', 'faInfoCircle', 'faCheckCircle', 'faUserPlus', 'faTimesCircle', 'faSignInAlt', 'faHeart', 'faCopy', 'faExclamationTriangle']
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['faEnvelope', 'faCalendarCheck']
      },
      /*{
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      },*/
    ]
  },
  bootstrapVue: {
    componentPlugins: ['Badge', 'Button', 'ButtonGroup', 'ButtonToolbar', 'Card', 'Dropdown', 'Form', 'FormCheckbox', 'FormGroup', 'FormInput', 'InputGroup', 'Link', 'Modal', 'Nav', 'Navbar'],
    directivePlugins: []
  }
}

