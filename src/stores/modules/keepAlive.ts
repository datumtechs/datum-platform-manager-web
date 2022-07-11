import { defineStore } from "pinia";

export default defineStore('keepAliveInfo', {
  state: () => ({
    comTabs: {},
    current: {},
    searchParams: {}
  }),
  getters: {
    getComTabs: state => state.comTabs,
    getCurrent: state => state.current,
    getSearchParams: state => state.searchParams
  },
  actions: {
    setComTabs(i: number, path: string) {
      this.comTabs[path] = i
    },
    setCurrent(i: number, path: string) {
      this.current[path] = i
    },
    setSearchParams(obj: any, path: string) {
      this.searchParams[path] = obj
    },
    reset() {
      this.comTabs = {}
      this.current = {}
      this.searchParams = {}
    }
  }
})