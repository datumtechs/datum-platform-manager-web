// vue.config.js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  outputDir: 'dist',
  assetsDir: '',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/rosettaflow/': {
        target: 'http://10.10.8.182:8234',
        // target: 'http://10.11.48.47:8234',
        // target: 'http://10.11.55.71:8234',
        changeOrigin: true,
        pathRewrite: { '^/rosettaflow/': '/rosettaflow/' },
      },
    },
  },
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
