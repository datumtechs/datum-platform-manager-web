import http from 'request'

const userApi = {
  getOrgList: params => {
    return http({
      method: 'GET',
      url: `/flow/org/list`,
      params
    })
  },

  postDisconnectIdentity: data => {
    return http({
      method: 'POST',
      url: '/flow/org/disconnectIdentity',
      data
    })
  },

  postConnectIdentity: data => {
    return http({
      method: 'POST',
      url: '/flow/org/connectIdentity',
      data
    })
  },

  deletsConnectIdentity: data => {
    return http({
      method: 'POST',
      url: '/flow/org/delIpPortBind',
      data
    })
  },

  postAddNode: data => {
    return http({
      method: 'POST',
      url: '/flow/org/addIpPortBind',
      data
    })
  }
}

export default userApi
