import cookies from 'js-cookie'
// const expiresTime = new Date(new Date().getTime() + 60 * 1000 * 1)
const mutations = {
  SET_LANGS: (state, data) => {
    state.language = data
    localStorage.setItem('language', data)
  },
  SET_MOBILE: (state, data) => {
    state.isMobile = data
  },
  SET_CURFULLPAGE: (state, data) => {
    state.curFullpage = data
  },
  SET_CURPAGEINDEX: (state, data) => {
    state.curPageIndex = data
  },
  SET_NONCE_ID: (state, data) => {
    state.nonceId = data
  },
  SET_ADDRESS (state, data) {
    state.address = data
    cookies.set('address', data)
  },
  SET_SIGN: (state, data) => {
    state.sign = data
  },
  SET_USER (state, data) {
    cookies.set('user', data)
    state.user = data
  },
  SET_TOKEN (state, data) {
    cookies.set('token', data)
    state.token = data
  },
  SET_ISWALLET (state, data) {
    state.isWallet = data
  }
}

export default mutations