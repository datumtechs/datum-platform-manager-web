import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import {
  getOrganization,
  getNodes,
  queryAllModelByProjectId,
} from '@/api/workflow'
export interface WFlowState {
  algorithms: any
  workflowNodeInputVoList: any
  workflowNodeOutputVoList: any
  organizationsId: any
  organizationList: any
  orgOptions: any
  valueListNumber: number
  nodeList: any
  currentIndex: number
}
@Module({ dynamic: true, store, name: 'workflow' })
class Workflow extends VuexModule implements WFlowState {
  // 节点数据结构
  public nodeList = []
  // 模型列表
  public modelList = []
  // 当前节点
  public currentIndex = 0
  public valueListNumber = 0
  // 概述
  public algorithms = {
    algorithmName: '',
    algorithmDesc: '',
    author: '',
    maxNumbers: '',
    minNumbers: '',
    supportLanguage: '',
    inputModel: '',
  }
  // 输入
  public workflowNodeInputVoList = []
  // 输出
  public workflowNodeOutputVoList = []
  // 输入数据方id
  public organizationsId = []
  public organizationList = []
  public orgOptions = []
  get modelValue() {
    return this.nodeList[this.currentIndex]['modelId'] || 0
  }
  @Mutation
  public SET_INPUT_LEN(state: number) {
    this.valueListNumber = state
  }
  @Mutation
  public SET_DATA(data: any) {
    // eslint-disable-next-line no-debugger
    // debugger
    const index = this.currentIndex
    if (data[index] && data[index]['nodeAlgorithmVo']) {
      this.algorithms = data[index]['nodeAlgorithmVo']
    }
    this.workflowNodeInputVoList = data[index]['workflowNodeInputVoList'] || []
    this.workflowNodeOutputVoList = data[index]['workflowNodeOutputVoList']
  }
  @Mutation
  public SET_ORG_ID(state: any) {
    this.organizationsId = state
  }

  @Mutation
  public SET_ORG(state: any) {
    this.organizationList = state
  }
  @Mutation
  public SET_MODELS(state: any) {
    if (state && state.length) {
      state.map((item: any) => {
        item.fileName = `${item.algorithmName}——${item.fileName} `
      })
      this.modelList = state
    } else {
      this.modelList = []
    }
  }
  @Mutation
  public SET_MODEL_VALUE(state: any) {
    const { currentIndex } = this
    ;(this.nodeList[currentIndex] as any)['modelId'] = state
  }
  @Mutation
  public SET_ORG_DISABLED(state: any) {
    this.organizationList.map((item: any) => {
      if (state.indexOf(item['identityId']) !== -1) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    })
  }
  /*
    输入的组织
    list：[
      {identityId:1,name:'组织1'},
      {identityId:2,name:'组织2'},
      {identityId:3,name:'组织3'},
    ]
    ids:[1,2]
    res:[
      {identityId:1,name:'组织1',senderFlag:1},
      {identityId:2,name:'组织2',senderFlag:0},
    ]
  */
  @Mutation
  public SAVE_ORG_OPTIONS() {
    const list = this.organizationList
    const ids = this.organizationsId
    // 过滤选择的组织
    let data: any = list.filter((v) => {
      return (
        ids.indexOf(v['identityId']) !== -1 && ids.includes(v['identityId'])
      )
    })
    let selectData: any = JSON.parse(JSON.stringify(data))
    selectData.map((item: any) => {
      if (item.identityId === ids[0]) {
        item.senderFlag = 1
      } else {
        item.senderFlag = 0
      }
    })
    let res = selectData.sort((a: any, b: any) => b.senderFlag - a.senderFlag)
    this.orgOptions = selectData
  }
  @Mutation
  public INIT_DATA() {
    this.algorithms = {
      algorithmName: '',
      algorithmDesc: '',
      author: '',
      maxNumbers: '',
      minNumbers: '',
      supportLanguage: '',
      inputModel: '',
    }
    this.workflowNodeInputVoList = []
    this.workflowNodeOutputVoList = []
    this.organizationsId = []
    this.organizationList = []
    this.orgOptions = []
    this.nodeList = []
  }
  @Mutation
  public SET_NODES(data: any) {
    this.nodeList = data
  }
  @Mutation
  public SET_NODES_INDEX(index: number) {
    this.currentIndex = index
  }
  @Mutation
  public SET_INPUT_LIST(state: any) {
    const index = this.currentIndex
    ;(this.nodeList[index] as any)['workflowNodeInputVoList'] = state
  }
  @Mutation
  public SET_NODES_OUTPUT(state: any) {
    const index = this.currentIndex
    ;(this.nodeList[index] as any)['workflowNodeOutputVoList'] = state
  }
  @Mutation
  public SET_NODES_CODE(state: any) {
    const index = this.currentIndex
    ;(this.nodeList[index] as any)['nodeAlgorithmVo'][
      'calculateContractCode'
    ] = state
  }
  @Mutation
  public SET_NODES_RESOURCE(state: any) {
    const { costBandwidth, costCpu, runTime, costMem } = state
    const index = this.currentIndex
    ;(this.nodeList[index] as any)['nodeAlgorithmVo'][
      'costBandwidth'
    ] = costBandwidth
    ;(this.nodeList[index] as any)['nodeAlgorithmVo']['costCpu'] = costCpu
    ;(this.nodeList[index] as any)['nodeAlgorithmVo']['runTime'] = runTime
    ;(this.nodeList[index] as any)['nodeAlgorithmVo']['costMem'] = costMem
  }
  @Action
  public async setOrganizationId(data: any) {
    this.SET_ORG_ID(data)
  }

  @Action
  public async getOrganizations(id: string) {
    const { data } = await getOrganization({ projectId: Number(id) })
    this.SET_ORG(data)
  }
  @Action
  public async getModels(params: any) {
    const { data } = await queryAllModelByProjectId(params)
    this.SET_MODELS(data)
  }

  @Action
  public async getNodeList(id: string) {
    const { data } = await getNodes(id)
    this.SET_NODES(data.workflowNodeVoList || [])
  }
}
export const WorkflowModule = getModule(Workflow)
