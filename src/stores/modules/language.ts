import { defineStore  } from "pinia";

export default  defineStore('language', {
  state: () => ({
    langue: localStorage.langue || 'zh'
  }),
  getters: {
    getLang: state => state.langue
  },
  actions: {
    saveLang(langue: string) {
      localStorage.setItem('langue', langue)
      this.langue = langue
    }
  }
})