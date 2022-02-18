import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'

const app = createApp(App)

app.use(i18n).use(createPinia()).use(router)

app.mount('#app')
