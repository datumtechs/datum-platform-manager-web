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
  projectName: string
}
@Module({ dynamic: true, store, name: 'breadcrumb' })
class Breadcrumb extends VuexModule implements BreadcrumbState {
  public dataDetail = ''
  public algorithmDetail = ''
  public projectName = ''

  @Mutation
  public SET_DATA(state: string) {
    this.dataDetail = state
  }
  @Mutation
  public SET_ALGOR(state: string) {
    this.algorithmDetail = state
  }
  @Mutation
  public SET_PROJECT(state: string) {
    this.projectName = state
  }
}
export const BreadcrumbModule = getModule(Breadcrumb)
