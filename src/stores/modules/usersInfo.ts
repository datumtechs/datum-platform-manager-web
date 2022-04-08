import { defineStore } from "pinia";
import {
  str_encrypt,
  str_decrypt
} from '@/utils'
const userName = str_encrypt('userName') //%7D%C3%A8%C3%98%C3%97%C3%80%C2%AF%C3%8E%C3%92
const token = str_encrypt('token') //y%C3%A3%C3%9A%C3%90%C3%93
const address = str_encrypt('address') //h%C3%85%C3%88%C3%96%C3%97%C3%98%C3%A6
const getLocalstorage = (data: string | null | undefined): string => {
  return data && str_decrypt(data) || ''
}

export default defineStore('usersInfo', {
  state: () => ({
    userName: getLocalstorage(localStorage[userName]),
    token: getLocalstorage(localStorage[token]),
    address: getLocalstorage(localStorage[address])
  }),

  getters: {
    getUsers: state => state.userName,
    getToken: state => state.token,
    getAddress: state => state.address,
  },

  actions: {
    setUsers(str: string) {
      localStorage.setItem(userName, (str && str_encrypt(str)) || '')
      this.userName = str
    },
    setToken(str: string) {
      localStorage.setItem(token, (str && str_encrypt(str)) || '')
      this.token = str
    },
    setAddress(str: string) {
      localStorage.setItem(address, (str && str_encrypt(str)) || '')
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