import http from 'request'

const taskApi = {
  // 指定组织参与任务列表  /task/listTaskByIdentityId
  queryTaskListByNodeId: params => {
    return http({
      method: 'get',
      url: '/scan/task/listTaskByIdentityId',
      params
    })
  },
  queryTaskDetailById: params => {
    return http({
      method: 'get',
      url: '/scan/task/getTaskDetails',
      params
    })
  },

  // 任务日志列表 /task/listTaskEvent
  listTaskEvent: params => {
    return http({
      method: 'get',
      url: '/scan/task/listTaskEvent',
      params
    })
  },

  // 查询数据关联任务 /task/listTaskByMetaDataId
  listTaskByMetaDataId: params => {
    return http({
      method: 'get',
      url: '/scan/task/listTaskByMetaDataId',
      params
    })
  }
}

export default taskApi
