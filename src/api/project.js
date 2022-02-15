import http from 'request'

const projectApi = {
  // 查询资产数据列表
  queryProjectPageList: params => {
    return http({
      method: 'get',
      url: '/flow/project/queryProjectPageList',
      params
    })
  },
  // 查询项目模板  /flow/projectTemplate/list
  queryTemplatelist: params => {
    return http({
      method: 'get',
      url: '/flow/projectTemplate/list',
      params
    })
  },
  // 新增项目  /flow/project/addProject
  addProject: data => {
    return http({
      method: 'post',
      url: '/flow/project/addProject',
      data
    })
  },

  // 删除项目 /flow/project/deleteProject
  deleteProject: data => {
    return http({
      method: 'post',
      url: '/flow/project/deleteProject',
      data
    })
  },

  // 工作流 /flow/workflow/list
  queryWorkflowlist: params => {
    return http({
      method: 'get',
      url: '/flow/workflow/list',
      params
    })
  },
  // 查询作业列表 /flow/job/list
  queryJobList: data => {
    return http({
      method: 'post',
      url: '/flow/job/list',
      data
    })
  },
  // 查询子作业列表 /flow/subJob/list
  querySubjobList: params => {
    return http({
      method: 'get',
      url: '/flow/subJob/list',
      params
    })
  },

  // 查询成员列表  /flow/project/queryProjMemberPageList
  queryProjMemberPageList: params => {
    return http({
      method: 'get',
      url: '/flow/project/queryProjMemberPageList',
      params
    })
  },

  // 查询项目详情 /flow/project/queryProjectDetails
  queryProjectDetails: params => {
    return http({
      method: 'get',
      url: '/flow/project/queryProjectDetails',
      params
    })
  },

  // 删除成员 /flow/project/deleteProjMember
  deleteProjMember: data => {
    return http({
      method: 'post',
      url: '/flow/project/deleteProjMember',
      data
    })
  },

  // 查询所有用户名称 /flow/project/queryAllUserNickname/{projectId}
  queryAllUserNickname: projectId => {
    return http({
      method: 'get',
      url: `/flow/user/queryAllUserNickname`
    })
  },

  // 新增项目成员 /flow/project/addProjMember
  addProjMember: data => {
    return http({
      method: 'post',
      url: '/flow/project/addProjMember',
      data
    })
  },

  // 修改项目成员 /flow/project/updateProjMember
  updateProjMember: data => {
    return http({
      method: 'post',
      url: '/flow/project/updateProjMember',
      data
    })
  },

  // 查询工程下 /flow/project/queryAllUserNickname/{projectId}
  queryProjectUsers: projectId => {
    return http({
      method: 'get',
      url: `/flow/project/queryAllUserNickname/${projectId}`
    })
  },

  // 新增工作流 /flow/workflow/add
  addWorkflow: data => {
    return http({
      method: 'post',
      url: '/flow/workflow/add',
      data
    })
  },

  // 编辑工作流 /flow/workflow/edit
  editWorkflow: data => {
    return http({
      method: 'post',
      url: '/flow/workflow/edit',
      data
    })
  },

  // 删除工作 /flow/workflow/delete/{id}
  deleteWorkflow: id => {
    return http({
      method: 'post',
      url: `/flow/workflow/delete/${id}`
    })
  },

  // 创建作业 /flow/job/add
  addJob: data => {
    return http({
      method: 'post',
      url: `/flow/job/add`,
      data
    })
  },

  //  编辑作业/flow/job/edit
  editJob: data => {
    return http({
      method: 'post',
      url: `/flow/job/edit`,
      data
    })
  },

  // 编辑作业基本信息 /flow/job/editBasicInfo
  editJobBaseInfo: data => {
    return http({
      method: 'post',
      url: `/flow/job/editBasicInfo`,
      data
    })
  },

  // 查询自作业列表 /flow/subJob/list
  querySubJobList: data => {
    return http({
      method: 'POST',
      url: '/flow/subJob/list',
      data
    })
  },

  // 查询算法列表 /flow/algorithm/queryAlgorithmTreeList
  queryAlgorithmTreeList: params => {
    return http({
      method: 'get',
      url: '/flow/algorithm/queryAlgorithmTreeList',
      params
    })
  },

  // 查询算法详情 /flow/algorithm/details/{id}
  queryAlgorithmDetails: id => {
    return http({
      method: 'get',
      url: `/flow/algorithm/details/${id}`
    })
  },

  // 获取工作流详情 /flow/workflow/detail/{id}
  queryWorkflowDetails: id => {
    return http({
      method: 'get',
      url: `/flow/workflow/detail/${id}`
    })
  },

  // 获取工作流节点详情 /flow/workflowNode/queryNodeDetailsList/{id}
  queryNodeDetailsList: data => {
    return http({
      method: 'get',
      url: `/flow/workflowNode/queryNodeDetailsList/${data.workflowId}/${data.runningRecordId}`
    })
  },

  // 获取工作流节点状态  /flow/workflow/getWorkflowStatus 
  getWorkflowStatus: data => {
    return http({
      method: 'get',
      url: `/flow/workflow/getWorkflowStatus`,
      params: {
        id: data.workflowId,
        runningRecordId: data.runningRecordId
      }
    })
  },

  // 获取关联接地点 /flow/job/queryRelatedWorkflowName projectId
  queryRelatedWorkflowName: params => {
    return http({
      method: 'get',
      url: `/flow/job/queryRelatedWorkflowName`,
      params
    })
  },

  // 获取工作流运行日志 /flow/workflow/getLog/{workflowId}
  getWorkflowLog: params => {
    return http({
      method: 'POST',
      url: `/flow/workflow/getLog/${params.workflowId}/${params.runningRecordId}`,
      data: params
    })
  },

  // 保存工作流节点 /flow/workflowNode/save

  saveWorkflowNodes: data => {
    return http({
      method: 'post',
      url: `/flow/workflowNode/save`,
      data
    })
  },

  // 查询工作流输入组织 /flow/data/getAllAuthOrganization

  getAllAuthOrganization: params => {
    return http({
      method: 'get',
      url: `/flow/data/getAllAuthOrganization`,
      params
    })
  },

  // 查询工作流输入表 /flow/data/getAllAuthTables

  getAllAuthTables: params => {
    return http({
      method: 'get',
      url: `/flow/data/getAllAuthTables`,
      params
    })
  },

  // 查询当前项目的算法模型 model /flow/project/queryCurrentProjAlgModel
  getModels: data => {
    return http({
      method: 'get',
      url: `/flow/project/queryCurrentProjAlgModel`,
      data
    })
  },

  // 查询工作流输入字段 /flow/data/getAllAuthColumns/{metaDataId}
  getAllAuthColumns: metaDataId => {
    return http({
      method: 'get',
      url: `/flow/data/getAllAuthColumns/${metaDataId}`
    })
  },

  // 查询项目模型 // 查询项目模型
  queryCurrentProjAlgModel: params => {
    return http({
      method: 'get',
      url: `/flow/project/queryCurrentProjAlgModel`,
      params
    })
  },

  // 清空工作流 /flow/workflowNode/clear
  clearWorkflow: data => {
    return http({
      method: 'post',
      url: `/flow/workflowNode/clear`,
      data
    })
  },
  // 启动工作流 /flow/workflow/start
  startWorkflow: data => {
    return http({
      method: 'post',
      url: `/flow/workflow/start`,
      data
    })
  },

  //  停止工作流 /flow/workflow/terminate
  endWorkflow: data => {
    return http({
      method: 'post',
      url: `/flow/workflow/terminate`,
      data
    })
  },

  getTaskResult: params => {
    return http({
      method: 'get',
      url: `/flow/workflowNode/getTaskResult/${params.taskId}`
    })
  },

  // 操作作业 /flow/job/action 操作作业类型: 1、暂停 2、重启
  actionJob: data => {
    return http({
      method: 'post',
      url: `/flow/job/action`,
      data
    })
  },
  // 操作子作业 /flow/subJob/action  1、暂停 2、重启
  actionSubJob: data => {
    return http({
      method: 'post',
      url: `/flow/subJob/action`,
      data
    })
  },
  // 批量删除子作业 /flow/subJob/deleteBatch
  deleteBatchSubJob: data => {
    return http({
      method: 'post',
      url: `/flow/subJob/deleteBatch`,
      data
    })
  },
  // 批量删除作业 /flow/job/deleteBatch
  deleteBatchJob: data => {
    return http({
      method: 'post',
      url: `/flow/job/deleteBatch`,
      data
    })
  },
  // 更新项目名称
  updateProject: data => {
    return http({
      method: 'post',
      url: '/flow/project/updateProject',
      data
    })
  },
  queryModelsByOrg: data => {
    return http({
      method: 'get',
      url: '/flow/model/queryAvailableModel',
      params: data
    })
  },

  // /rosettaflow/workflow/runningRecordList 工作流运行记录
  queryRecordList: data => {
    return http({
      method: 'get',
      url: '/flow/workflow/runningRecordList',
      params: data
    })
  }
}

export default projectApi