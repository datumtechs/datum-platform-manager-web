const state = () => ({
    nodeList: [],
    nodeMax: 2, // 目前节点上限为2个
    nodeMin: 1,
    showNodePanel: false,
    curNodeId: '',
    curNodeIndex: 0,
    dragStatus: false,
    orgs: [],
    curModel: 0,
    // orgsIds: [],
    orgList: [],
    // orgOptions: [],
    curFlowTab: 'workflows',
    valueListNumber: 0,
    algorithms: {
        algorithmDesc: '',
        algorithmId: '',
        algorithmName: '',
        author: '',
        calculateContractCode: '',
        costBandwidth: '',
        costCpu: '',
        costMem: '',
        editType: '',
        inputModel: '',
        maxNumbers: '',
        minNumbers: '',
        runStatus: '',
        runTime: '',
        storePattern: '',
        supportLanguage: '',
        workflowNodeId: ''
    },
    // 当前发起方
    workflowNodeSenderIdentityId: '',
    // 输入
    workflowNodeInputVoList: [],
    // 输出
    workflowNodeOutputVoList: []
})

export default state