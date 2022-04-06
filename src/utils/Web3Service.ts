import { useWallet, useUsersInfo } from '@/stores'
import I18n from '../i18n/index'
import { ElMessage } from 'element-plus'
import Web3 from 'web3'
import config from '../config/network.js'

class Web3Service {
  private web3: any
  private eth: any | undefined
  protected useWallet: any
  protected useUsersInfo: any
  protected i18n: any
  constructor() {
    this.web3 = null
    this.useWallet = useWallet()
    this.useUsersInfo = useUsersInfo()
    this.i18n = I18n.global
    this.eth = undefined
    try {
      this.initWeb3()
    } catch (error) {
      console.log('initialization error!')
    }
  }

  initWeb3() {
    this.eth = window.ethereum || undefined
    if (this.eth) {
      this.useWallet.setIsWallet(true)
      this.web3 = new Web3(this.eth)
      this._addNetwork()
      this.eth.on('accountsChanged', (account: any) => {
        this.useUsersInfo.clean()
      })

      // 切换网络
      this.eth.on('chainChanged', () => {
        this.useUsersInfo.clean()
      })
    }
  }
  _addNetwork() {
    this.eth
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainName: config.chainName,
            chainId: '0x' + config.chainId.toString(16),
            rpcUrls: [config.rpcUrl],
            nativeCurrency: config.symbol,
            blockExplorerUrls: [config.blockExplorerUrl],
          },
        ],
      })
      .then((res: any) => console.log(res))
      .catch(console.log())
  }
  _getAbiForLogin() {
    // const uuId = this.store.getters['app/nonceId']
    const uuId = this.useWallet.getNonceId
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
    const address: string = this.useUsersInfo.getAddress
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
    if (this.eth) {
      this.useWallet.setIsWallet(true)
      try {
        // 注意metamask版本更新, 是否取消eth._metamask.isUnlocked方法 后续是否修复锁定弹窗
        const isLocked = await this.eth._metamask.isUnlocked()
        if (!isLocked) {
          if (this.i18n && this.i18n.locale === 'zh') return ElMessage.error('请先解锁metamask钱包')
          return ElMessage.error('Please unlock metamask wallet first')
        }
        const data = await this.eth.request({
          method: 'eth_requestAccounts'
        })
        this.useUsersInfo.setAddress(data[0])
        console.log(this.useUsersInfo.getAddress);

      } catch (error) {
        console.log('连接钱包错误，原因：', error)
      }
    }
  }

  signForWallet(type?: string) {
    const abi = type === 'login' ? this._getAbiForLogin() : this._getAbiForTx()
    const from = this.useUsersInfo.getAddress
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
          this.useWallet.setSign(result)
          resolve(result)
        }
      )
    })
    return result
  }

  loginParams() {
    return {
      address: this.useUsersInfo.getAddress,
      sign: this.useWallet.getSign,
      signMessage: this._getAbiForLogin()
    }
  }

  checkAddress() {
    let address = this.useUsersInfo.getAddress
    if (address) return true
    if (this.eth && this.eth.selectedAddress) {
      address = this.eth.selectedAddress
      if (address) {
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