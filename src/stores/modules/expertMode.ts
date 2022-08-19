import { defineStore } from "pinia";
import { getUserOrgList } from '@/api/login'
import { queryBaseOrgList, getPowerOrgList } from '@/api/expert'

export default defineStore('expertMode', {
    state: () => ({
        showDotted: false,
        curNodeIndex: 0,
        nodeList: <any>[],
        fakeNodeList: <any>[],
        curNodeId: '',
        curModel: '',
        algorithm: {},
        // curNodeData: {},
        workflowNodeSenderIdentityId: '',
        orgList: <any>[],
        baseOrgList: <any>[],
        powerOrgList: <any>[],
        selectLayoutOrgList: <any>[],
        // 输入
        workflowNodeInputVoList: [],
        // 输出
        workflowNodeOutputVoList: [],
        disableOrg: [],
        showPanel: false,
        isPSIModel: false,
        isFeatureModel: false,
        isPrivacy: true,
    }),
    getters: {
        getDotted: state => state.showDotted,
        getNodeList: state => state.nodeList,
        getCurNodeId: state => state.curNodeId,
        getCurNodeIndex: state => state.curNodeIndex,
        getWorkflowNodeSender: state => state.workflowNodeSenderIdentityId,
        getUserOrgList: state => state.orgList,
        getBaseOrgList: state => state.baseOrgList,
        getPowerOrgList: state => state.powerOrgList,
        getSelectLayoutOrgList: state => state.selectLayoutOrgList,
        getAlgorithm: state => state.algorithm,
        getShowPanel: state => state.showPanel,
        getInputVoList: state => state.workflowNodeInputVoList,
        getOutputVoList: state => state.workflowNodeOutputVoList,
        getIsPSIModel: state => state.isPSIModel,
        getIsFeatureModel: state => state.isFeatureModel
    },
    actions: {
        setSelectLayoutOrgList(data: any) {
            this.selectLayoutOrgList = data
        },
        setDotted(flag: boolean) {
            this.showDotted = flag
        },
        setNodeList(nodeList: any) {
            this.nodeList = nodeList
        },
        addNodeList(node: any) {
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
            this.algorithm = this.nodeList[this.curNodeIndex].alg || {}
            this.curModel = this.nodeList[this.curNodeIndex]['model'] || ''
            this.workflowNodeSenderIdentityId = this.nodeList[this.curNodeIndex].nodeInput.identityId || ''
            this.workflowNodeInputVoList = this.nodeList[this.curNodeIndex].nodeInput.dataInputList || []
            // identityId Array
            this.workflowNodeOutputVoList = this.nodeList[this.curNodeIndex].nodeOutput.identityId || []
        },
        setEnvByType(data: any) {
            this.nodeList[this.curNodeIndex].resource[data.type] = data.data
        },
        setVariableByIndex(data: any) {
            this.nodeList[this.curNodeIndex].nodeCode.variableList[data.index].varValue = data.value
        },
        setCurNodePsiStatus(data: any) {
            this.nodeList[data.index].nodeInput.isPsi = data.flag
        },
        setSender(data: any) {
            this.workflowNodeSenderIdentityId = data
            this.nodeList[this.curNodeIndex].nodeInput.identityId = data
        },
        setComputingProvider(data: any) {
            this.nodeList[this.curNodeIndex].nodeInput.powerIdentityId = data
        },
        setComputingType(data: any) {
            this.nodeList[this.curNodeIndex].nodeInput.powerType = data // 	算力提供方式 0-随机 1-指定
        },
        setUserOrgList(data: any) {
            this.orgList = data
        },
        setBaseOrgList(data: any) {
            this.baseOrgList = data
        },
        setPowerOrgList(data: any) {
            this.powerOrgList = data
        },
        setOutputVoList(data: Array<any>) {
            if (this.nodeList[this.curNodeIndex]) {
                this.nodeList[this.curNodeIndex].nodeOutput.identityId = data
            }
        },
        resetWorkflow() {
            this.nodeList = []
            this.workflowNodeInputVoList = []
            this.workflowNodeOutputVoList = []
            this.workflowNodeSenderIdentityId = ''
            this.algorithm = {
            }
            this.isPSIModel = false
            this.curNodeIndex = 0
            this.curNodeId = ''
            this.curModel = ''

            this.disableOrg = []
            this.showPanel = false
            this.isFeatureModel = false
        },

        setDisableOrg(data: Array<any>) {
            this.baseOrgList.map((item: any) => {
                if (data.includes(item.identityId)) {
                    item.disabled = true
                } else {
                    item.disabled = false
                }
            })
        },

        setInputVoList(data: any) {
            this.nodeList[this.curNodeIndex].nodeInput.dataInputList[data.transferIndex] = data.params
        },

        setInputListByChange(index: number) {
            this.nodeList[this.curNodeIndex].nodeInput.dataInputList[index] = {}
        },

        setShowPanel(data: boolean) {
            this.showPanel = data
        },

        async queryUserOrgList() {
            const { code, data } = await getUserOrgList()
            if (code === 10000) {
                this.setUserOrgList(data)
            }
        },
        async queryBaseOrgList(algorithmType: number = 0) {
            const { code, data } = await queryBaseOrgList({ algorithmType })
            if (code === 10000) {
                this.setBaseOrgList(data)
            }
        },
        async queryPowerOrgList() {
            const { code, data } = await getPowerOrgList()
            if (code === 10000) {
                this.setPowerOrgList(data)
            }
        },

        setCurModel(data: any) {
            this.nodeList[this.curNodeIndex].nodeInput.model = data
        },
        setIsPSIModel(data: boolean) {
            this.isPSIModel = data
        },
        setIsFeatureModel(data: boolean) {
            this.isFeatureModel = data
        },
        setIsPrivacy(data: boolean) {
            this.isPrivacy = data
        }
    }
})