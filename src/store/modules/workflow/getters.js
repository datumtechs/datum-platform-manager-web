const getters = {
    nodeList: state => state.nodeList,
    nodeMax: state => state.nodeMax,
    nodeMin: state => state.nodeMin,
    showNodePanel: state => state.showNodePanel,
    curNodeId: state => state.curNodeId,
    dragStatus: state => state.dragStatus,
    orgs: state => state.orgs,
    curNode: state => state.curNode,
    algorithms: state => state.algorithms,
    curNodeIndex: state => state.curNodeIndex,
    workflowNodeInputVoList: state => state.workflowNodeInputVoList,
    workflowNodeOutputVoList: state => state.workflowNodeOutputVoList,
    curFlowTab: state => state.curFlowTab,
    orgList: state => state.orgList,
    workflowNodeSenderIdentityId: state => state['workflowNodeSenderIdentityId'] || '',
    curModel: state => state.curModel
}

export default getters