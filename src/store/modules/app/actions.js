// @ts-ignore
import { loginApi } from 'apis'

const actions = {
  saveAddress ({ commit }, data) {
    data[ 0 ] && commit('SET_ADDRESS', data[ 0 ])
  },

  checkAddress ({ getters }) {
    if (getters.user) return true
    return false
  },

  async getLoginNonce ({ commit, getters }) {
    try {
      const address = getters.address
      const {
        data, code
      } = await loginApi.getLoginNonce(address)
      if (code !== 10000) {
        throw new Error('Wallet address exception')
      }
      commit('SET_NONCE_ID', data.nonce)
    } catch (error) {
      console.log(error)
    }
  },

  async getLogin ({ commit }, params) {
    try {
      const res = await loginApi.getLogin(params)
      const { data, code } = res
      if (code === 10000) {
        commit('SET_USER', data.userName)
        commit('SET_TOKEN', data.token)
      }
    } catch (error) {
      console.log(error)
    }
  },

  async getLogout ({ commit }) {
    try {
      const res = await loginApi.getLogout()
      const { code } = res
      if (code === 10000) {
        commit('SET_USER', '')
        commit('SET_TOKEN', '')
        commit('SET_ADDRESS', '')
      }
    } catch (error) {
      console.log(error)
    }
  },

  async updateAuth ({ commit }, params) {
    try {
      const res = await loginApi.upDateAuth(params)
      const { code } = res
      if (code === 10000) {
        commit('SET_USER', params.nickName)
      }
    } catch (error) {
      console.log(error)
    }
  },

  resetLogin ({ commit }) {
    commit('SET_USER', '')
    commit('SET_TOKEN', '')
    commit('SET_ADDRESS', '')
  },

  getUserType ({ getters }) {
    const address = getters.address
    // 0x : 以太坊，atp，atx: alaya lat,lax:platon
    const typeList = {
      '0x': 1,
      atp: 2,
      atx: 2,
      lat: 3,
      lax: 3
    }
    let type = 0
    for (const key in typeList) {
      if (address.startsWith(key)) {
        type = typeList[ key ]
      }
    }
    return type
  }
}

export default actions
