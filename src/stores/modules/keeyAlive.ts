import { defineStore } from "pinia";

export default defineStore('keepAliveStamp', {
    state: () => ({
      stamp: Date.now()
    }),
    getters: {
      getStamp: state => state.stamp
    },
    actions: {
        setKeepAliveStamp() {
            this.stamp = Date.now()
        },
    }
})