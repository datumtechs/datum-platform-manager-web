import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
import { IPermissionState } from './modules/permission'
import { IAppState } from './modules/app'
import { WFlowState } from './modules/workflow'
Vue.use(Vuex)
export interface IRootState {
  app: IAppState
  user: IUserState
  permission: IPermissionState
  workflow: WFlowState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
