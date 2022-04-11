import { defineStore } from "pinia";

const userName = 'userName'
const token = 'token'
const address = 'address'

export default defineStore('usersInfo', {
  state: () => ({
    userName: localStorage[userName] || '',
    token: localStorage[token] || '',
    address: localStorage[address] || ''
  }),

  getters: {
    getUsers: state => state.userName,
    getToken: state => state.token,
    getAddress: state => state.address,
  },

  actions: {
    setUsers(str: string) {
      localStorage.setItem(userName, str)
      this.userName = str
    },
    setToken(str: string) {
      localStorage.setItem(token, str)
      this.token = str
    },
    setAddress(str: string) {
      localStorage.setItem(address, str)
      this.address = str
    },

    clean() {
      this.address = ''
      this.token = ''
      this.userName = ''
      localStorage.setItem(address, '')
      localStorage.setItem(token, '')
      localStorage.setItem(userName, '')
    }
  }
})