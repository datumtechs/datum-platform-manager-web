import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import router, { resetRouter } from '@/router'
import {
  setUserId,
  setToken,
  removeUserId,
  getToken,
  removeToken,
} from '@/utils/auth'
import { getUserInfo } from '@/api/user'
export interface IUserState {
  token: string
  roles: number[]
  user_info: {
    uid: number | null
    user_cell: string | null
    user_name: string | null
  }
}
@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public roles: number[] = []
  public user_info = {
    uid: null,
    user_cell: null,
    user_name: '0X…0x50',
  }
  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token
    setToken(token)
  }
  @Mutation
  private SET_ROLES(roles: number[]) {
    this.roles = roles
  }
  @Mutation
  private SET_USER(data: any) {
    this.user_info = data
  }
  @Action
  public ResetToken() {
    removeToken()
    removeUserId()
    this.SET_TOKEN('')
    this.SET_ROLES([])
    this.SET_USER({})
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    try {
      const { data } = await getUserInfo()
      const { permissions, uid, user_cell, user_name } = data
      if (!permissions || permissions.length <= 0) {
        throw Error('登录异常，请重新登录')
      }
      setUserId(uid)
      this.SET_ROLES(permissions)
      this.SET_USER({ uid, user_cell, user_name })
    } catch (e) {
      throw Error('登录异常，请重新登录')
    }
  }
  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    removeToken()
    resetRouter()
    this.SET_TOKEN('')
    this.SET_ROLES([])
    this.SET_USER({})
  }
}
export const UserModule = getModule(User)
