import { defineStore } from "pinia";

export default defineStore('expertMode', {
    state: () => ({
        status: '',
        showDotted: false,
        curNodeIndex: 0,
        nodeList: <any>[],
        curNodeId: '',
        curNodeData: {}
    }),
    getters: {
        getStatus: state => state.status,
        getDotted: state => state.showDotted,
        getNodeList: state => state.nodeList,
        getCurNodeId: state => state.curNodeId
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
        },
        deleteNode(index: number) {
            this.nodeList.splice(index, 1)
        },
        setCurrentIndex(index: number) {
            this.curNodeIndex = index
        },
        setCurNodeId(id: string) {
            this.curNodeId = id
        },
        setCurData(data: any) {
            this.curNodeData = data
        }
    }
})