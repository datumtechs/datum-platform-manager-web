import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './stores'

// import 'element-plus/dist/index.css'
import '@/assets/css/base.scss';
import '@/assets/font/font.scss'
import 'virtual:windi.css'
import { ElLoading } from 'element-plus'

const app = createApp(App)
app.use(i18n).use(store).use(router).use(ElLoading)
app.mount('#app')