import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
// import en from './lang/en'
// import zh from './lang/zh'
import axios from 'axios'

Vue.use(VueI18n)
const i18n = new VueI18n({
  // locale: preLang,
  // messages: {
  //   en: {
  //     ...en,
  //     ...enLocale
  //   },
  //   zh: {
  //     ...zh,
  //     ...zhLocale
  //   }
  // },
  silentTranslationWarn: true
})
const ELEMENT_LANG = {
  zh: zhLocale,
  en: enLocale
}
const loadedLanguages = []

export const setI18nLanguage = (lang) => {
  i18n.locale = lang
  axios.defaults.headers.common[ 'Accept-Language' ] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}
export const loadLanguageAsync = (lang) => {
  // 如果语言相同
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果尚未加载语言
  return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/lang/${lang}.js`).then(
    messages => {
      const _temp = Object.assign(messages.default, ELEMENT_LANG[ lang ])
      i18n.setLocaleMessage(lang, _temp)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}

ElementLocale.i18n((key, value) => i18n.t(key, value))
export default i18n
