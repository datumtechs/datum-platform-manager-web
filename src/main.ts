import Vue, { DirectiveOptions } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { message } from '@/plugins/message.ts'
import store from './store'
import Vuex from 'vuex'
import '@/permission'
import * as directives from '@/directives'
import i18n from './lang'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$message = message
Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})
new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
