import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import { getOrganization } from '@/api/workflow'
export interface WFlowState {
  algorithms: any
  inputVoList: any
  outputVoList: any
  organizationsId: any
  organizationList: any
  orgOptions: any
}
@Module({ dynamic: true, store, name: 'workflow' })
class Workflow extends VuexModule implements WFlowState {
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
  public SET_DATA(state: any) {
    const { data, index } = state
    if (data[index] && data[index]['nodeAlgorithmVo']) {
      this.algorithms = data[index]['nodeAlgorithmVo']
    }
    this.inputVoList = data[index]['workflowNodeInputVoList']
    this.outputVoList = data[index]['workflowNodeOutputVoList']
  }
  @Mutation
  public SET_ALGOR(state: any) {
    this.algorithms = state
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

  @Action
  public async setOrganizationId(data: any) {
    this.SET_ORG_ID(data)
  }

  @Action
  public async getOrganizations() {
    // let data: any = []
    // if (!this.organizationList.length) {
    //   const res = await getOrganization()
    //   data = res.data
    // } else {
    //   data = this.organizationList
    // }
    // this.SET_ORG(data)
    const { data } = await getOrganization()
    this.SET_ORG(data)
  }
}
export const WorkflowModule = getModule(Workflow)
