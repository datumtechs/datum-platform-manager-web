const Web3 = require('web3')
import { UserModule } from '@/store/modules/user'
class alayaService {
  private web3: any = null
  private win: any = window
  private alaya: any = this.win.alaya
  private platon: any = this.win.platon
  constructor() {
    this.web3 = null //web3对象
    try {
      this.initAlaya()
    } catch (error) {
      console.log('initral failed', error)
    }
  }
  initAlaya() {
    const { alaya, platon } = this
    //判断是否存在alaya
    if (typeof alaya === 'undefined') {
      console.log('No alaya, You should consider trying MetaMask!')
      UserModule.SET_ADDRESS('')
      UserModule.IS_INIT_WALLET(false)
    } else {
      this.web3 = new Web3(alaya)
      // 切换用户
      alaya.on('accountsChanged', (account: string[]) => {
        if (account.length === 0) {
          UserModule.SET_ADDRESS('')
        } else if (account.length > 0) {
          UserModule.SET_ADDRESS(account[0])
        } else {
          console.log('Alaya account changed but same address')
        }
      })
      // 切换网络
      alaya.on('chainChanged', () => {
        setTimeout(() => {
          UserModule.SET_ADDRESS(platon.selectedAddress)
        }, 0)
      })
    }
  }
  /**
   * 链接钱包方法
   * @returns  返回一个钱包地址的数组
   */
  async connectWallet() {
    console.log('connectWallet')
    UserModule.SET_LOADING(true)
    const { alaya } = this
    if (typeof alaya == 'undefined') {
      UserModule.IS_INIT_WALLET(false)
      UserModule.SET_LOADING(false)
      // 旧的配置
      // 提示语：Please download and install Alaya browser plug-in wallet Samurai.Please refresh after completion.，
      // 下载链接https://github.com/AlayaNetwork/Samurai/releases/download/v8.0.11/samurai-chrome-8.0.11.zip
      // 新的配置待确定
    } else {
      try {
        const data = await alaya.request({
          method: 'platon_requestAccounts',
        })
        console.log('adder', data)
        UserModule.ConnectWallet(data)
        UserModule.SET_LOADING(false)
      } catch (error) {
        console.log(error)
        UserModule.SET_LOADING(false)
      }
    }
  }
  private msgParams() {
    const uuid = UserModule.user_info.uuid
    return JSON.stringify({
      domain: {
        name: 'Moirae',
      },
      message: {
        key: uuid,
        desc: 'Welcome to Moirae!',
      },
      primaryType: 'Login',
      types: {
        EIP712Domain: [
          {
            name: 'name',
            type: 'string',
          },
        ],
        Login: [
          {
            name: 'key',
            type: 'string',
          },
          {
            name: 'desc',
            type: 'string',
          },
        ],
      },
    })
  }
  private singParams() {
    const address = UserModule.user_info.address
    return JSON.stringify({
      domain: {
        name: 'Moirae',
      },
      message: {
        address,
      },
      primaryType: 'sign',
      types: {
        EIP712Domain: [
          {
            name: 'name',
            type: 'string',
          },
        ],
        sign: [
          {
            name: 'address',
            type: 'string',
          },
        ],
      },
    })
  }
  /**
   * 签名方法
   * @returns  签名结果
   */
  signAlaya(type: string = '') {
    const that = this
    var from = UserModule.user_info.address
    // login： this.msgParams()
    // workflow：  this.singParams()
    const msgParams = type === 'login' ? this.msgParams() : this.singParams()
    var params = [from, msgParams]
    var method = 'platon_signTypedData_v4'
    console.log({
      method,
      params,
      from,
    },)
    const signPromise = new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync(
        {
          method,
          params,
          from,
        },
        async function(err: any, result: any) {
          if (err) return reject(err)
          if (result.error) {
            console.dir(result.error.message)
            reject(result.error.message)
          }
          if (result.error) return reject(result)
          const singn = result.result
          console.log('TYPED SIGNED:', singn)
          await UserModule.SET_SIGN(singn)
          resolve(singn)
        },
      )
    })
    return signPromise
  }
  /**
   * 登录参数
   * @returns  登录参数
   */
  private loginParams() {
    const userType = UserModule.userType
    return {
      address: UserModule.user_info.address,
      sign: UserModule.user_info.sign,
      signMessage: this.msgParams(),
      userType,
    }
  }
  /**
   * 检测Address
   * vuex 查看
   * window 查看
   * @returns  false
   */
  public checkAddress() {
    if (UserModule.user_info.address.length) return true
    const address = this.platon.selectedAddress
    if (address.length) {
      UserModule.SET_ADDRESS(address)
      return true
    } else {
      return false
    }
  }
}

export default new alayaService()
