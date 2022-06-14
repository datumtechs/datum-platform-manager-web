import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'



// https://vitejs.dev/config/ 
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      // importStyle: 'sass',
      useSource: true,
    }),
    WindiCSS(),
    AutoImport({
      dts: 'src/auto-import.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        // {
        //   'element-plus/es': ['ElMessageBox', 'ElMessage', 'ElLoading'],
        // },
        {
          '@vueuse/core': [
            // @vueuse
          ],
          axios: [
            // default imports
            ['default', 'axios'] // import { default as axios } from 'axios',
          ],

        }
      ],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      deep: true,
      dirs: ['src/components/'],
      extensions: ['vue'],
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@layout': fileURLToPath(new URL('./src/layout', import.meta.url)),
      '@route': fileURLToPath(new URL('./src/route', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      'web3': path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
      'vue-i18n': path.resolve(__dirname, './node_modules/vue-i18n/dist/vue-i18n.cjs.js'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/element/index.scss" as *;`,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,//启动端口
    open: true,
    proxy: {
      // 选项写法
      '/flow': {
        // target: 'http://192.168.10.145:10000/',
        target: 'http://192.168.10.157:8234', // test env
        changeOrigin: true,
        rewrite: path => path
      }
    },
    cors: true
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
