import { defineStore } from "pinia";

export default defineStore('workFlow', {
    state: () => ({
        mode: 'normal', // 工作流默认展示是引导模式
    }),
    getters: {
        getMode: state => state.mode,
    },
    actions: {
        setMode(str: string) {
            this.mode = str
        },
    }
})