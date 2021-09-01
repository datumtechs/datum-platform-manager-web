import Vue, { DirectiveOptions } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/fonts/font.css'
import i18n from './lang'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import { message } from '@/plugins/message.ts'
import store from './store'
import Vuex from 'vuex'
import '@/permission'
import '@/icons/components'

import * as directives from '@/directives'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value),
})
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
})
Vue.use(Vuex)
Vue.prototype.$message = message
Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})
const win: any = window
win.vm = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
