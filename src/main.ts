import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './stores'

import '@/assets/css/base.scss';
import '@/assets/font/font.scss'
import 'virtual:windi.css'

const app = createApp(App)

app.use(i18n).use(store).use(router).mount('#app')