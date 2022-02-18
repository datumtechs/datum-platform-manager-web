import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    lang: localStorage.lang || 'zh'
  }),
  getters: {
    getLang: state => state.lang
  },
  actions: {
    saveLang(lang: string) {
      this.lang = lang
    }
  }
})
