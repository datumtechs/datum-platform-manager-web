import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
// import alayaService from '@/services/alayaService'
import { decodeBech32Address } from 'web3/packages/web3-utils'
import { getLoginNonce, getLogin } from '@/api/user'
import store from '@/store'
import router, { resetRouter } from '@/router'
import {
  // setUserId,
  setToken,
  // removeUserId,
  getToken,
  removeToken,
} from '@/utils/auth'
import { getUserInfo } from '@/api/user'
export interface UserInfo {
  user_cell: string | null
  user_name: string | null
  // 钱包地址
  address: string
  sign: string
}
export interface IUserState {
  token: string
  roles: number[]
  user_info: UserInfo
}
@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public roles: number[] = []
  public alayatWalletLoading: boolean = false
  // 钱包插件：true 已安装  false 未安装
  public isInitWallet: boolean = true
  public user_info = {
    user_cell: null,
    user_name: null,
    address: '',
    sign: '',
    uuid: '',
  }
  @Mutation
  public SET_LOADING(state: boolean) {
    this.alayatWalletLoading = state
  }
  @Mutation
  public IS_INIT_WALLET(state: boolean) {
    this.isInitWallet = state
  }
  @Mutation
  public SET_ADDRESS(val: string) {
    this.user_info.address = val
  }
  @Mutation
  public SET_SIGN(val: string) {
    this.user_info.sign = val
  }
  @Mutation
  public SET_UUID(val: string) {
    this.user_info.uuid = val
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
    // removeUserId()
    this.SET_TOKEN('')
    this.SET_ROLES([])
    this.SET_USER({})
  }

  // @Action
  // public async GetUserInfo() {
  //   if (this.token === '') {
  //     throw Error('GetUserInfo: token is undefined!')
  //   }
  //   try {
  //     const { data } = await getUserInfo()
  //     const { permissions, uid, user_cell, user_name } = data
  //     if (!permissions || permissions.length <= 0) {
  //       throw Error('登录异常，请重新登录')
  //     }
  //     // setUserId(uid)
  //     this.SET_ROLES(permissions)
  //     this.SET_USER({ uid, user_cell, user_name })
  //   } catch (e) {
  //     throw Error('登录异常，请重新登录')
  //   }
  // }
  @Action
  public async ConnectWallet(data: string[]) {
    // const address = decodeBech32Address(data[0])
    const address = data[0]
    this.SET_ADDRESS(address)
  }
  @Action
  public async GetLoginNonce() {
    try {
      const address = this.user_info.address
      const { data } = await getLoginNonce(address)
      this.SET_UUID(data.nonce)
    } catch (error) {
      console.log(error)
    }
  }
  @Action
  public async GetLogin(params: any) {
    try {
      const { data } = await getLogin(params)
      // this.SET_UUID(data.nonce)
      console.log(data)
    } catch (error) {
      console.log(error)
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
