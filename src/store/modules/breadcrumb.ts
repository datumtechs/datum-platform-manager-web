import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
export interface BreadcrumbState {
  dataDetail: string
  algorithmDetail: string
  project: string
  workflow: string
}
@Module({ dynamic: true, store, name: 'breadcrumb' })
class Breadcrumb extends VuexModule implements BreadcrumbState {
  public dataDetail = ''
  public algorithmDetail = ''
  public project = ''
  public workflow = ''

  @Mutation
  public SET_DATADETAIL(state: string) {
    this.dataDetail = state
  }
  @Mutation
  public SET_ALGOR(state: string) {
    this.algorithmDetail = state
  }
  @Mutation
  public SET_PROJECT(state: string) {
    this.project = state
  }
  @Mutation
  public SET_WORKFLOW(state: string) {
    this.workflow = state
  }
}
export const BreadcrumbModule = getModule(Breadcrumb)
