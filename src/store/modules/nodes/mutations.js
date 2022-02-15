const mutations = {
    SET_NODE_DETAIL_DATA_PAGE: (state, data) => {
        state.nodeDetailDataPage = data
    },
    SET_NODE_DETAIL_TASK_PAGE: (state, data) => {
        state.nodeDetailTaskPage = data
    },
    SET_NODE_DETAIL_TAB: (state, data) => {
        state.nodeDetailTab = data
    }
}

export default mutations