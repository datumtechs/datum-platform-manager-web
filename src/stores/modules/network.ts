import { defineStore } from "pinia";

export default defineStore('userNetwork', {
    state: () => ({
        isCorrectNetWork: true
    }),
    getters: {
        getNetworkStatus: state => state.isCorrectNetWork
    },
    actions: {
        setNetworkStatus(flag: boolean) {
            this.isCorrectNetWork = flag
        },
    }
})