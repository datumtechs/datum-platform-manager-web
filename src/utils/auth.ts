import VueCookies from 'vue-cookies'
const Cookies: any = VueCookies

const TokenKey = 'token'
const languageKey = 'language'
const signKey = 'sign'
const nameKey = 'name'

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
  return Cookies.get(TokenKey)
}

export function setToken(token: any) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLanguage() {
  const lan = Cookies.get(languageKey)
  return lan ? lan : 'zh-CN'
}
export function setLanguage(language: string) {
  return Cookies.set(languageKey, language)
}

export function getUserName() {
  return Cookies.get(nameKey)
}
export function setUserName(val: string) {
  return Cookies.set(nameKey, val)
}
export function removeUserName() {
  return Cookies.remove(nameKey)
}
