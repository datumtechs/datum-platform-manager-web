const mutations = {
    SET_NODELIST: (state, data) => {
        state.nodeList = data
    },
    ADD_TO_NODELIST: (state, data) => {
        state.nodeList.push(data)
    },
    SET_NODE_PANEL: (state, data) => {
        state.showNodePanel = data
    },
    SET_CUR_WORKFLOW (state, data) {
        state.curFlowTab = data
    },
    SET_NODE_INDEX: (state, data) => {
        state.curNodeIndex = data
    },
    SET_CUR_NODE_ID: (state, data) => {
        state.curNodeId = data
    },
    DELETE_NODE: (state, data) => {
        // const index = state.nodeList.findIndex(item => data === item.algorithmId)
        state.nodeList.splice(data, 1)
        // state.orgsIds = []
        // state.orgOptions = []
        state.algorithms = {
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
        }
        state.workflowNodeSenderIdentityId = ''
        state.workflowNodeInputVoList = []
        state.workflowNodeOutputVoList = []
    },
    SET_DRAG_STATUS: (state, data) => {
        state.dragStatus = data
    },
    RESET_NODE_LIST: (state) => {
        state.algorithms = {
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
        }
        state.workflowNodeInputVoList = []
        state.workflowNodeOutputVoList = []
        state.nodeList = []
        state.showNodePanel = false
    },
    SET_ORGS: (state, data) => {
        state.orgs = data
    },
    SET_CUR_DATA: (state, data) => {
        state.algorithms = data[ state.curNodeIndex ][ 'nodeAlgorithmVo' ]
        state.curModel = data[ state.curNodeIndex ][ 'model']
        state.workflowNodeSenderIdentityId = data[ state.curNodeIndex ][ 'workflowNodeSenderIdentityId' ] || ''
        state.workflowNodeInputVoList = data[ state.curNodeIndex ][ 'workflowNodeInputVoList' ] || []
        state.workflowNodeOutputVoList = data[ state.curNodeIndex ][ 'workflowNodeOutputVoList' ] || []
    },
    SET_ORG_DISABLED: (state, data) => {
        state.orgs.map(item => {
            if (data.includes(item.identityId)) {
                item.disabled = true
            } else {
                item.disabled = false
            }
        })
    },
    SET_INPUT_LIST: (state, data) => {
        state.nodeList[ state.curNodeIndex ][ 'workflowNodeInputVoList' ] = data
    },
    // SET_ORG_ID: (state, data) => {
    //     state.orgsIds = data
    // },
    SET_INPUT_LEN: (state, data) => {
        state.valueListNumber = data
    },
    SET_ENV: (state, data) => {
        Object.keys(data).forEach((key) => {
            state.nodeList[ state.curNodeIndex ].nodeAlgorithmVo[ key ] = data[ key ]
        })
    },
    SET_OUTPUT: (state, data) => {
        const output = []
        state.orgList.map(item => {
            if (data.length && data.includes(item.identityId)) {
                output.push({
                    identityId: item.identityId,
                    // senderFlag: item.senderFlag,
                    storePattern: 1
                })
            }
        })
        state.nodeList[ state.curNodeIndex ].workflowNodeOutputVoList = output
    },
    SET_NODE_NAME: (state, data) => {
        state.nodeList[ state.curNodeIndex ].nodeName = data
    },
    SET_ORG_LIST: (state, data) => {
        state.orgList = data
    },
    SET_TASK_SENDER: (state, data) => {
        state.workflowNodeSenderIdentityId = data
        state.nodeList[ state.curNodeIndex ].workflowNodeSenderIdentityId = data
    },
    SET_ENV_BY_TYPE: (state, data) => {
        state.nodeList[ state.curNodeIndex ].nodeAlgorithmVo[data.type] = data.data
    },
    SET_CUR_MODEL: (state, data) => {
        state.nodeList[ state.curNodeIndex ]['model'] = data
    },
    SET_VO_LIST: (state, data) => {
        if (!state.nodeList[ state.curNodeIndex].workflowNodeInputVoList) {
            state.nodeList[ state.curNodeIndex].workflowNodeInputVoList = []
        } 
        state.nodeList[ state.curNodeIndex].workflowNodeInputVoList[data.transferIndex] = data.params
    }
}

export default mutations