import { useWallet, useUsersInfo, userNetwork } from '@/stores'
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
  private chainId: number | string
  constructor() {
    this.web3 = null
    this.useWallet = useWallet()
    this.useUsersInfo = useUsersInfo()
    this.i18n = I18n.global
    this.eth = undefined
    this.chainId = 0
    try {
      this.initWeb3()
    } catch (error) {
      console.log('initialization error!')
    }
  }

  async initWeb3() {
    this.eth = window.ethereum || undefined
    if (this.eth) {
      this.useWallet.setIsWallet(true)

      this.web3 = new Web3(this.eth)
      const chainId = await this._queryChainID()
      if (this._getDecimalChainID(chainId) !== config.chainId) await this._addNetwork()

      const account = await this.eth.request({
        method: 'eth_accounts'
      })

      // 切换账号
      this.eth.on('accountsChanged', (account: any) => {
      })

      // 切换网络
      this.eth.on('chainChanged', async () => {
      })
    }
  }
  _queryChainID() {
    return this.eth.request({
      method: 'eth_chainId'
    })
  }
  _addNetwork() {
    return this.eth.request({
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

  _getDecimalChainID(originId: string, decimal: number = 10): number {
    return parseInt(originId, decimal)
  }

  // 连接钱包
  async connectWallet() {
    if (this.eth) {
      this.useWallet.setIsWallet(true)
      try {
        const chainId = await this._queryChainID()
        console.log("chainId:=======>", chainId);

        if (this._getDecimalChainID(chainId) !== config.chainId) await this._addNetwork()
        console.log("step===========>", 'finish add network');
        const data = await this.eth.request({
          method: 'eth_requestAccounts'
        })
        this.useUsersInfo.setAddress(data[0])
        console.log('start get address', this.useUsersInfo.getAddress);

      } catch (error) {
        console.log('connect wallet error：', error)
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