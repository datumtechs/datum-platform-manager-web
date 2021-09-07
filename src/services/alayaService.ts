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
      platon.on('accountsChanged', (account: string[]) => {
        if (account.length === 0) {
          UserModule.SET_ADDRESS('')
        } else if (account.length > 0) {
          UserModule.SET_ADDRESS(account[0])
        } else {
          console.log('Alaya account changed but same address')
        }
      })
      // 切换网络
      platon.on('chainChanged', () => {
        UserModule.SET_ADDRESS(platon.selectedAddress)
      })
    }
  }
  /**
   * 链接钱包方法
   * @returns  返回一个钱包地址的数组
   */
  async connectWallet() {
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
  /**
   * 签名方法
   * @returns  签名结果
   */
  signAlaya() {
    const that = this
    const msgParams = this.msgParams()
    var from = UserModule.user_info.address
    var params = [from, msgParams]
    var method = 'platon_signTypedData_v4'
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
  // loginParams
  private loginParams() {
    const userType = this.handleUserType()
    return {
      address: UserModule.user_info.address,
      sign: UserModule.user_info.sign,
      signMessage: this.msgParams(),
      userType,
    }
  }
  private handleUserType() {
    const address = UserModule.user_info.address
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

export default new alayaService()
