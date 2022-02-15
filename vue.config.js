const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    open: true,
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    // host: 'localhost',
    port: 8080,
    hotOnly: false,
    disableHostCheck: true,
    // proxy: proxyUtil.localProxy,
    proxy: {
      '/scan': {
        target: 'http://39.103.230.158:8087',
        // target: 'http://192.168.10.146:8087', // 146
        pathRewrite: {
          '^/scan': '/metis-scan',
          changeOrigin: true
        }
      },
      '/flow': { // moirae  
        target: 'http://39.103.230.158:8234/',
        // target: 'http://10.10.8.174:8234/', // 146
        pathRewrite: {
          '^/flow': '/rosettaflow',
          changeOrigin: true
        }
      }
    },
    before: app => { }
  },
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [ {
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    } ])
    if (isProduction) {
      config.optimization.minimizer('js')
        .use(require.resolve('terser-webpack-plugin'), [ {
          terserOptions: {
            // 打包删掉注释
            comments: true,
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          }
        } ])
      config.performance.set('maxAssetSize', 100 * 1024)
      config.performance.set('assetFilter', (assetFilename) => {
        return assetFilename.endsWith('.js')
      })
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        constants: '@/config/constants',
        assets: '@/assets',
        views: '@/views',
        utils: '@/utils/utils',
        apis: '@/api',
        request: '@/utils/request'
      }
    },
    plugins: [
      new LodashModuleReplacementPlugin()
    ]
  }
}