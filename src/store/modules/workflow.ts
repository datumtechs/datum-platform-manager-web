import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import { getOrganization, getNodes } from '@/api/workflow'
export interface WFlowState {
  algorithms: any
  inputVoList: any
  outputVoList: any
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
  }
  // 输入
  public inputVoList = []
  // 输出
  public outputVoList = []
  // 输入数据方id
  public organizationsId = []
  public organizationList = []
  public orgOptions = {}
  @Mutation
  public SET_INPUT_LEN(state: number) {
    this.valueListNumber = state
  }
  @Mutation
  public SET_DATA(data: any) {
    const index = this.currentIndex
    if (data[index] && data[index]['nodeAlgorithmVo']) {
      this.algorithms = data[index]['nodeAlgorithmVo']
    }
    this.inputVoList = data[index]['workflowNodeInputVoList']
    this.outputVoList = data[index]['workflowNodeOutputVoList']
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
  public SET_ORG_DISABLED(state: any) {
    this.organizationList.map((item: any) => {
      if (state.indexOf(item['identityId']) !== -1) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    })
  }
  @Mutation
  public SET_ORG_INIT() {
    this.organizationList.map((item: any) => {
      item.disabled = false
    })
  }
  @Mutation
  public SAVE_ORG_OPTIONS() {
    // 过滤选择的组织
    const list = this.organizationList
    const ids = this.organizationsId
    const data = list.filter((v) => {
      return ids.indexOf(v['identityId']) !== -1
    })
    // 转换为map
    const res: any = {}
    data.map((item: any) => {
      const key = item['identityId']
      const val = item['identityName']
      res[key] = val
    })
    this.orgOptions = res
  }
  @Mutation
  public SET_ORG_OPTIONS() {
    const res: any = {}
    this.outputVoList.map((item: any) => {
      const key = item['identityId']
      const val = item['identityName']
      res[key] = val
    })
    this.orgOptions = res
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
    }
    this.inputVoList = []
    this.outputVoList = []
    this.organizationsId = []
    this.organizationList = []
    this.orgOptions = {}
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
    ;(this.nodeList[index] as any)['inputVoList'] = state
  }
  @Mutation
  public SET_NODES_OUTPUT(state: any) {
    const index = this.currentIndex
    ;(this.nodeList[index] as any)['outputVoList'] = state
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
  public async getOrganizations() {
    const { data } = await getOrganization()
    this.SET_ORG(data)
  }

  @Action
  public async getNodeList(id: string) {
    const { data } = await getNodes(id)
    this.SET_NODES(data.workflowNodeVoList || [])
  }
}
export const WorkflowModule = getModule(Workflow)
