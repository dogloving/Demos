module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/", //部署应用包时的基本 URL
  publicPath: '././',
  outputDir: "dist", //打包目录
  indexPath: "index.html",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
