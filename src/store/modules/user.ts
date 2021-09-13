import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
// import alayaService from '@/services/alayaService'
import { getLoginNonce, getLogin, getLogOut } from '@/api/user'
import store from '@/store'
import router, { resetRouter } from '@/router'
import {
  setToken,
  getToken,
  removeToken,
  setUserName,
  getUserName,
  removeUserName,
} from '@/utils/auth'
export interface UserInfo {
  userName: string | null
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
    userName: getUserName() || '',
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
  private SET_USER(data: any) {
    this.user_info.userName = data.userName
    setUserName(data.userName)
  }
  @Mutation
  private RESET_USER() {
    this.user_info = {
      userName: '',
      address: '',
      sign: '',
      uuid: '',
    }
  }
  @Action
  public ResetToken() {
    removeToken()
    removeUserName()
    this.SET_TOKEN('')
    this.RESET_USER()
  }

  @Action
  public async ConnectWallet(data: string[]) {
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
      this.SET_USER(data)
      this.SET_TOKEN(data.token)
    } catch (error) {
      console.log(error)
    }
  }
  @Action
  public async LogOut() {
    const address = this.user_info.address
    console.log(address)
    const { data, code } = await getLogOut({ address })
    if (code === 10000) {
      resetRouter()
      this.ResetToken()
    }
  }
  get userType() {
    const address = this.user_info.address
    //0x : 以太坊，atp，atx: alaya lat,lax:platon
    const typeList: any = {
      '0x': 1,
      atp: 2,
      atx: 2,
      lat: 3,
      lax: 3,
    }
    let type = 0
    for (let key in typeList) {
      if (address.startsWith(key)) {
        type = typeList[key]
      }
    }
    return type
  }
}
export const UserModule = getModule(User)
