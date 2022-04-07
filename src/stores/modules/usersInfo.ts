import { defineStore } from "pinia";

export default defineStore('usersInfo', {
  state: () => ({
    users: '', // 用户改变名称
    token: '',
    address: '' || localStorage.getItem('address') // 钱包地址
  }),
  getters: {
    getUsers: state => state.users,
    getToken: state => state.token,
    getAddress: state => state.address,
  },
  actions: {
    setUsers(str: string) {
      this.users = str
    },
    setToken(str: string) {
      this.token = str
    },
    setAddress(str: string) {
      this.address = str
      localStorage.setItem('address', str)
    },
    clean() {
      this.address = ''
      this.token = ''
      this.users = ''
    }
  }
})