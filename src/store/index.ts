import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
import { IPermissionState } from './modules/permission'
import { IAppState } from './modules/app'
import { WFlowState } from './modules/workflow'
import { BreadcrumbState } from './modules/breadcrumb'
Vue.use(Vuex)
export interface IRootState {
  app: IAppState
  user: IUserState
  permission: IPermissionState
  workflow: WFlowState
  breadcrumb: BreadcrumbState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
