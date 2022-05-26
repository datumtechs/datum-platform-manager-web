import { defineStore } from "pinia";

export default defineStore('language', {
  state: () => ({
    language: localStorage.language || 'zh'
  }),
  getters: {
    getLang: state => state.language
  },
  actions: {
    saveLang(language: string) {
      localStorage.setItem('language', language)
      this.language = language
    }
  }
})