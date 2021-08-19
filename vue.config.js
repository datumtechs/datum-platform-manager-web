// vue.config.js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  outputDir: 'dist',
  assetsDir: '',
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.externals = {
      // vue: 'Vue',
      // 'element-ui': 'ELEMENT',
      // 'vue-router': 'VueRouter',
      // axios: 'axios',
      // AMap: 'AMap',
      // AMapUI: 'AMapUI',
    }
    const plugins = [new MonacoWebpackPlugin()]

    // Begin 生成 gzip 压缩文件
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
      }),
    )
    // End 生成 gzip 压缩文件

    config.plugins = [...config.plugins, ...plugins]
  },
}
