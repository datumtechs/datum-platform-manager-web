import { USEWALLET, USEUSERSINFO } from '@/stores'
import I18n from '../i18n/index'
import { ElMessage } from 'element-plus'
// import Web3 from 'web3'
const Web3 = window.Web3

class Web3Service {
  private web3: any
  private eth: any | undefined
  protected useWallet: any
  protected useUsersInfo: any
  protected i18n: any
  constructor() {
    this.web3 = null
    this.useWallet = USEWALLET()
    this.useUsersInfo = USEUSERSINFO()
    this.i18n = I18n

    try {
      this.initAlaya()
    } catch (error) {
      console.log('initialization error!')
    }
  }

  initAlaya() {
    const {
      eth
    } = this
    if (typeof eth === 'undefined') {
      console.log('no metamask you should check you chrome chrome-extension')
    } else {
      this.useWallet.setIsWallet(true)
      this.web3 = new Web3(eth)
      eth.on('accountsChanged', (account: any) => {
        console.log(account, eth.chainId)
        // this.store.dispatch('app/getLogout')
        this.useUsersInfo.clean()
      })

      // 切换网络
      eth.on('chainChanged', () => {
        console.log('chain changed')
        // this.store.dispatch('app/getLogout')
        this.useUsersInfo.clean()
      })
    }
  }

  _getAbiForLogin() {
    // const uuId = this.store.getters['app/nonceId']
    const uuId = this.useWallet.getNonceId()
    return JSON.stringify({
      domain: {
        name: 'Moirae'
      },
      message: {
        key: uuId,
        desc: 'Welcome to Moirae!'
      },
      primaryType: 'Login',
      types: {
        EIP712Domain: [{
          name: 'name',
          type: 'string'
        }],
        Login: [{
          name: 'key',
          type: 'string'
        },
        {
          name: 'desc',
          type: 'string'
        }
        ]
      }
    })
  }

  _getAbiForTx() {
    // const address = this.store.getters['app/address']
    const address: string = this.useUsersInfo.getAddress()
    return JSON.stringify({
      domain: {
        name: 'Moirae'
      },
      message: {
        address
      },
      primaryType: 'sign',
      types: {
        EIP712Domain: [{
          name: 'name',
          type: 'string'
        }],
        sign: [{
          name: 'address',
          type: 'string'
        }]
      }
    })
  }

  // 连接钱包

  async connectWallet() {
    const {
      eth
    } = this
    if (typeof eth === 'undefined') {
      console.log('no metamask you should check you chrome chrome-extension')
      // this.store.commit('app/SET_ISWALLET', false)
    } else {
      try {
        this.useWallet.setIsWallet(true)
        // 注意metamask版本更新, 是否取消eth._metamask.isUnlocked方法 后续是否修复锁定弹窗
        const isLocked = await eth._metamask.isUnlocked()
        if (!isLocked) {
          if (this.i18n && this.i18n.locale === 'zh') return ElMessage.error('请先解锁metamask钱包')
          return ElMessage.error('Please unlock metamask wallet first')
        }
        const data = await eth.request({
          method: 'eth_requestAccounts'
        })
        // this.store.dispatch('app/saveAddress', data)
        this.useUsersInfo.setAddress(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  signForWallet(type?: string) {
    const abi = type === 'login' ? this._getAbiForLogin() : this._getAbiForTx()
    // const from = this.store.getters['app/address']
    const from = this.useUsersInfo.getAddress()
    const result = new Promise((resolve, reject) => {
      this.web3.currentProvider.sendAsync({
        method: 'eth_signTypedData_v4',
        params: [from, abi],
        from
      },
        (err: any, res: any) => {
          if (err) return reject(err)
          const {
            result
          } = res
          // this.store.commit('app/SET_SIGN', result)
          this.useWallet.setSign(result)
          resolve(result)
        }
      )
    })
    return result
  }

  loginParams() {
    return {
      address: this.useUsersInfo.getAddress(),
      sign: this.useWallet.getSign(),
      signMessage: this._getAbiForLogin()
    }
  }

  checkAddress() {
    const address = this.useUsersInfo.getAddress()
    if (address && address.length) return true
    if (this.eth && this.eth.selectedAddress) {
      const address = this.eth.selectedAddress
      if (address && address.length) {
        // this.store.commit.SET_ADDRESS(address)
        this.useUsersInfo.setAddress(address)
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
export default Web3Service