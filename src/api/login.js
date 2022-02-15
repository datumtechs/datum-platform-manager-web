import http from 'request'

const loginApi = {
  getLoginNonce: address => {
    return http({
      method: 'GET',
      url: `/flow/user/getLoginNonce/${address}`
    })
  },

  // /flow/user/login
  getLogin: data => {
    return http({
      method: 'POST',
      url: '/flow/user/login',
      data
    })
  },

  getAuth: data => {
    // /flow/data/auth
    return http({
      method: 'POST',
      url: '/flow/data/auth',
      data
    })
  },

  getLogout: data => {
    return http({
      method: 'POST',
      url: '/flow/user/logout',
      data
    })
  },

  upDateAuth: data => {
    return http({
      method: 'POST',
      url: '/flow/user/updateNickName',
      data
    })
  }
}

export default loginApi
