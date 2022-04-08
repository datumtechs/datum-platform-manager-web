import { defineStore } from "pinia";

export default defineStore('usersInfo', {
  state: () => ({
    user: '' || localStorage.getItem('user'), // 用户改变名称
    token: '' || localStorage.getItem('token'),
    address: '' || localStorage.getItem('address'), // 钱包地址
  }),
  getters: {
    getUsers: state => state.user,
    getToken: state => state.token,
    getAddress: state => state.address,

  },
  actions: {
    setUsers(str: string) {
      this.user = str
      localStorage.setItem('user', str)
    },
    setToken(str: string) {
      this.token = str
      localStorage.setItem('token', str)
    },
    setAddress(str: string) {
      this.address = str
      localStorage.setItem('address', str)
    },

    clean() {
      this.address = ''
      this.token = ''
      this.user = ''
      localStorage.setItem('user', '')
      localStorage.setItem('token', '')
      localStorage.setItem('address', '')
    }
  }
})