import Vue, { DirectiveOptions } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang'
import ElementUI from 'element-ui'
import { message } from '@/plugins/message.ts'
import store from './store'
import Vuex from 'vuex'
import '@/permission'
import * as directives from '@/directives'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value),
})
Vue.use(Vuex)
Vue.prototype.$message = message
Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
