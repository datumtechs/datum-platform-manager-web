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

  // TODO : 这个接口不见了
  // 查询数据关联任务 /task/listTaskByMetaDataId
  listTaskByMetaDataId: params => {
    return http({
      method: 'get',
      url: '/flow/task/listTaskByMetaDataId',
      params
    })
  }
}

export default taskApi
