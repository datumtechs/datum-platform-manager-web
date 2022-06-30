import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './stores'
import {waves,tableTooltip} from '@/directives'

import '@/assets/css/base.scss';
import '@/assets/font/font.scss'
import '@/assets/css/waves.css'
import 'virtual:windi.css'
import { ElLoading } from 'element-plus'

const app = createApp(App)
app.directive('waves', (el,binding) => {
 waves.bind(el,binding)
 waves.bind(el,binding)
})
app.directive('tableTooltip', (el,binding) => {
  tableTooltip.updated(el,binding)
})
app.use(i18n).use(store).use(router).use(ElLoading)
app.mount('#app')