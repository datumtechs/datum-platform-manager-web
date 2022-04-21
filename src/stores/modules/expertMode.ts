import { defineStore } from "pinia";

export default defineStore('expertMode', {
    state: () => ({
        status: '',
        showDotted: false,
        nodeList: <any>[]
    }),
    getters: {
        getStatus: state => state.status,
        getDotted: state => state.showDotted,
        getNodeList: state => state.nodeList
    },
    actions: {
        setStatus(str: string) {
            this.status = str
        },
        setDotted(flag: boolean) {
            this.showDotted = flag
        },
        setNodeList(node: any) {
            this.nodeList.push(node)
        }
    }
})