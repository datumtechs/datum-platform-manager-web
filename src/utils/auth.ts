import VueCookies from 'vue-cookies'
const Cookies: any = VueCookies

const TokenKey = 'Token'
const UserKey = 'User'

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

export function getUserId() {
  return Cookies.get(UserKey)
}

export function setUserId(userId: any) {
  return Cookies.set(UserKey, userId)
}

export function removeUserId() {
  return Cookies.remove(UserKey)
}

const languageKey = 'language'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language: string) =>
  Cookies.set(languageKey, language)
