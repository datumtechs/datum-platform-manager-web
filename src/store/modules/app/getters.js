
const getters = {
  language: state => localStorage.getItem('lang') || state.language,
  isMobile: state => state.isMobile,
  curFullpage: state => state.curFullpage,
  curPageIndex: state => state.curPageIndex,
  sign: state => state.sign,
  isLogin: state => state.isLogin,
  address: state => state.address,
  // address: state => state.address,
  nonceId: state => state.nonceId,
  user: state => state.user,
  // user: state => state.user,
  token: state => state.token,
  // token: state => state.token,
  isWallet: state => state.isWallet

}
export default getters