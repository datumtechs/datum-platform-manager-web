import { defineStore } from "pinia";

export default defineStore('expertMode', {
    state: () => ({
        status: '',
    }),
    getters: {
        getStatus: state => state.status,
    },
    actions: {
        setStatus(str: string) {
            this.status = str
        },
    }
})