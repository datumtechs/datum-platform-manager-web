import { defineStore } from "pinia";

export default defineStore('Wallet', {
  state: () => ({
    isWallet: false,
    nonceId: '',
    sign: ''
  }),
  getters: {
    getIsWallet: state => state.isWallet,
    getNonceId: state => state.nonceId,
    getSign: state => state.sign
  },
  actions: {
    setIsWallet(boool: boolean) {
      this.isWallet = boool
    },
    setNonceId(str: string) {
      this.nonceId = str
    },
    setSign(str: string) {
      this.sign = str
    }
  }
})