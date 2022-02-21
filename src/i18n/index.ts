import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'

type MessageSchema = typeof en

const messages = {
  en: {
    ...en
  },
  zh: {
    ...zh
  }
}
const getLocale = () => {
  const storagelanguage = localStorage.lang
  if (storagelanguage) {
    return storagelanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}

const i18n = createI18n<[MessageSchema], 'en' | 'zh'>({
  globalInjection: true,
  fallbackLocale: 'zh',
  locale: getLocale(),
  messages
})

export default i18n
