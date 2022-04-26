import { defineStore } from "pinia";


interface Algorithm {
    algorithmCode: {
        calculateContractCode: String | null,
        editType: String | null,
    },
    algorithmDesc: String | null,
    algorithmId: String | null,
    algorithmImageUrl: String | null,
    algorithmName: String | null,
    algorithmVariableList: [],
    author: String | null,
    costBandwidth: String | null,
    costCpu: String | null,
    costGpu: String | null,
    costMem: Number,
    inputModel: Boolean,
    isPsi: Boolean,
    maxNumbers: Number,
    minNumbers: Number,
    runTime: Number,
    storePattern: Number,
    supportDefaultPsi: Boolean,
    supportLanguage: String | null,
    supportOsSystem: String | null,
}

interface NodeEle {
    "algorithmId": Number,
    "nodeName": String,
    "nodeAlgorithmVo": Algorithm,
    "workflowId": String,
    "workflowVersion": String
}

export default defineStore('expertMode', {
    state: () => ({
        status: '',
        showDotted: false,
        curNodeIndex: 0,
        nodeList: <any>[],
        fakeNodeList: <any>[],
        curNodeId: '',
        curModel: '',
        algorithm: {
            algorithmCode: {
                calculateContractCode: '',
                editType: null,
            },
            algorithmDesc: '',
            algorithmId: null,
            algorithmImageUrl: null,
            algorithmName: '',
            algorithmVariableList: [],
            author: '',
            costBandwidth: null,
            costCpu: 1,
            costGpu: null,
            costMem: 32,
            inputModel: false,
            isPsi: false,
            maxNumbers: 3,
            minNumbers: 2,
            runTime: 3,
            storePattern: 1,
            supportDefaultPsi: false,
            supportLanguage: '',
            supportOsSystem: '',

        },
        // curNodeData: {},
        workflowNodeSenderIdentityId: '',
        orgList: <any>[],
        // 输入
        workflowNodeInputVoList: [],
        // 输出
        workflowNodeOutputVoList: [],
        disableOrg: []
    }),
    getters: {
        getStatus: state => state.status,
        getDotted: state => state.showDotted,
        getNodeList: state => state.nodeList,
        getCurNodeId: state => state.curNodeId,
        getCurNodeIndex: state => state.curNodeIndex,
        getWorkflowNodeSender: state => state.workflowNodeSenderIdentityId,
        getOrgList: state => state.orgList,
        getAlgorithm: state => state.algorithm
    },
    actions: {
        setStatus(str: string) {
            this.status = str
        },
        setDotted(flag: boolean) {
            this.showDotted = flag
        },
        setNodeList(node: any) {
            // this.fakeNodeList.push(node)
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
            // this.curNodeData = data
            this.algorithm = this.nodeList[this.curNodeIndex]['nodeAlgorithmVo']
            this.curModel = this.nodeList[this.curNodeIndex]['model'] || ''
            this.workflowNodeSenderIdentityId = this.nodeList[this.curNodeIndex]['workflowNodeSenderIdentityId'] || ''
            this.workflowNodeInputVoList = this.nodeList[this.curNodeIndex]['workflowNodeInputVoList'] || []
            this.workflowNodeOutputVoList = this.nodeList[this.curNodeIndex]['workflowNodeOutputVoList'] || []
        },
        setEnvByType(data: any) {
            this.nodeList[this.curNodeIndex].nodeAlgorithmVo[data.type] = data.data
        },
        setVariableByIndex(data: any) {
            this.nodeList[this.curNodeIndex].nodeAlgorithmVo.algorithmVariableList[data.index].varValue = data.value
        },
        setCurNodePsiStatus(data: any) {
            this.nodeList[data.index].nodeAlgorithmVo.isPsi = data.flag
        },
        setSender(data: any) {
            this.workflowNodeSenderIdentityId = data
            this.nodeList[this.curNodeIndex].workflowNodeSenderIdentityId = data
        },
        setOrgList(data: any) {
            this.orgList = data
        },
        setOutput(data: Array<any>) {
            const output: any = []
            this.orgList.map((item: any) => {
                if (data.length && data.includes(item.identityId)) {
                    output.push({
                        identityId: item.identityId,
                        storePattern: 1
                    })
                }
            })
            this.nodeList[this.curNodeIndex].workflowNodeOutputVoList = output
        },
        resetWorkflow() {
            this.nodeList = []
            this.workflowNodeInputVoList = []
            this.workflowNodeOutputVoList = []
            this.workflowNodeSenderIdentityId = ''
            this.algorithm = {
                algorithmCode: {
                    calculateContractCode: '',
                    editType: null,
                },
                algorithmDesc: '',
                algorithmId: null,
                algorithmImageUrl: null,
                algorithmName: '',
                algorithmVariableList: [],
                author: '',
                costBandwidth: null,
                costCpu: 1,
                costGpu: null,
                costMem: 32,
                inputModel: false,
                isPsi: false,
                maxNumbers: 3,
                minNumbers: 2,
                runTime: 3,
                storePattern: 1,
                supportDefaultPsi: false,
                supportLanguage: '',
                supportOsSystem: '',
            }
        },
        setDisableOrg(data: Array<any>) {
            this.orgList.map((item: any) => {
                if (data.includes(item.identityId)) {
                    item.disabled = true
                } else {
                    item.disabled = false
                }
            })
        },
        setVoList(data: any) {
            if (!this.nodeList[this.curNodeIndex].workflowNodeInputVoList) {
                this.nodeList[this.curNodeIndex].workflowNodeInputVoList = []
            }
            this.nodeList[this.curNodeIndex].workflowNodeInputVoList[data.transferIndex] = data.params
        }
    }
})