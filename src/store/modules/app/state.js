import cookies from 'js-cookie'
const state = () => ({
  language: '',
  isMobile: false,
  curFullpage: 'dataExchange',
  curPageIndex: 0,
  nonceId: '',
  address: '' || cookies.get('address'),
  isLogin: false,
  sign: '',
  token: '' || cookies.get('token'),
  user: '' || cookies.get('user'),
  isWallet: true
})

export default state