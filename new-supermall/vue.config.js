module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/", //部署应用包时的基本 URL
  publicPath: '/',
  outputDir: "dist", //打包目录
  indexPath: "index.html",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      // 不用写，已经配置过了
      extensions: [],
      alias: {
        // '@': 'src', 已经配置过了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    },
    externals: {
      'axios': 'axios',
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
    }
  }
}
