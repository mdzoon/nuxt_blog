
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'WD Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My cool Web Development blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#4e7a00'
  // }      for SPA mode
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css' // - including global .css files
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-f0b13.firebaseio.com',
    credentials: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    fbAPIKey: 'AIzaSyARTQEARKupm-TX8QgU1RD9Z3u-SGsaHYk'
    //baseUrl: process.env.BASE_URL || 'https://nuxt-blog-f0b13.firebaseio.com'  //- not needed with axios settings
  },
  //rootDir: '/', //default
  router: {
    //base: 'my-app' - in case of subfolder
    linkActiveClass: 'active',
    middleware: 'log'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
