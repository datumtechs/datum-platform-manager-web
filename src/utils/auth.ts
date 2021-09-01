import VueCookies from 'vue-cookies'
const Cookies: any = VueCookies

const TokenKey = 'Token'
const languageKey = 'language'
const sign = 'sign'

export function getCookie(key: string) {
  return Cookies.get(key)
}

export function setCookie(key: string, token: any) {
  return Cookies.set(key, token)
}

export function removeCookie(key: string) {
  return Cookies.remove(key)
}
export function getToken() {
  return (
    Cookies.get(TokenKey) || '16293695969440BFE75D408DF4F7BB62461BB9A404C97'
  )
}

export function setToken(token: any) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLanguage() {
  return Cookies.get(languageKey)
}
export function setLanguage(language: string) {
  return Cookies.set(languageKey, language)
}
export function getSign() {
  return (
    Cookies.get(sign) ||
    'HPXfBL0ZYeSMt6GcG8h8zOlPtlA8+LIQvF1AhEq4YZQLNfsgujDFDCzCSr/4ayfw4USAffxxA9OL0xMCVgE5Eg4='
  )
}
export function setSign(val: string) {
  return Cookies.set(sign, val)
}
