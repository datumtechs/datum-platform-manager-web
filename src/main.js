import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import globalMixin from './mixin/mixin'
import './vendor/index.js'
import '../element-variables.scss'
import './utils/bus'
import 'assets/css/index.scss'
import { getLanguage } from '@/utils/lang'
import { loadLanguageAsync } from '@/i18n'

loadLanguageAsync(getLanguage()).then(_ => {
  Vue.config.productionTip = false
  Vue.mixin(globalMixin)
  // Vue.use(VueCookies)
  new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
