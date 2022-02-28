import http from 'request'

const taskApi = {
  // 指定组织参与任务列表  /task/listTaskByIdentityId
  queryTaskListByNodeId: params => {
    return http({
      method: 'get',
      url: '/flow/task/getOrgTaskListByIdentityId',
      params
    })
  },
  queryTaskDetailById: params => {
    return http({
      method: 'get',
      url: '/flow/task/getTaskDetails',
      params
    })
  },

  // 任务日志列表 /task/listTaskEvent
  listTaskEvent: params => {
    return http({
      method: 'get',
      url: '/flow/task/getTaskEventList',
      params
    })
  },

  // 查询数据关联任务 /task/getTaskByMetaDataId
  getTaskByMetaDataId: params => {
    return http({
      method: 'get',
      url: '/flow/task/getTaskByMetaDataId',
      params
    })
  }
}

export default taskApi
