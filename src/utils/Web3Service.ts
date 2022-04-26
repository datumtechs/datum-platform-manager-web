import { useWallet, useUsersInfo } from '@/stores'
import I18n from '@/i18n/index'
import Web3 from 'web3'
import config from '@/config/network.js'
import { abi as Erc20ABI } from '@/config/abi/DataTokenTemplate.json'
import { abi as MetisPayABI } from '@/config/abi/MetisPay.json'
import walletHelpAddress from '@/config/walletHelpAddress'
import { queryCurrentChainInfo } from '@/api/chain'



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

  /**
   * @description 判断当前是否锁定
   * @returns Promise
   */
  _hasLogin() {
    return this.eth.request({
      method: 'eth_accounts'
    }).then((accounts: any) => {
      console.log('当前账号:', accounts);
      if (accounts && accounts.length === 0) {
        this.eth.request({
          method: 'eth_requestAccounts'
        })
      }
    })
  }

  async _addNetwork() {
    const { data } = await queryCurrentChainInfo()
    return this.eth.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainName: data.chainName || config.chainName,
          chainId: '0x' + data.chainId.toString(16) || '0x' + config.chainId.toString(16),
          rpcUrls: [data.rpcUrl || config.rpcUrl],
          nativeCurrency: {
            name: 'LAT',
            symbol: data.symbol || config.symbol,
            decimals: 18,
          },
          blockExplorerUrls: [data.blockExplorerUrl || config.blockExplorerUrl],
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
        const data = await this.eth.request({
          method: 'eth_requestAccounts'
        })
        this.useUsersInfo.setAddress(data[0])

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


  /**
   * @description 判断当前是否是目标链
   * @param address 
   * @param total 
   * @returns void
   */
  async _setTargetChain() {
    const chainId = await this._queryChainID()
    if (this._getDecimalChainID(chainId) !== config.chainId) await this._addNetwork()
  }

  /**
   * @description 授权Erc20币
   * @param address 当前token合约的链上地址
   * @param total 授权erc20数量
   * @returns Promise 授权结果
   */
  async authERC20TOKEN(address: string, total: number, callback: any): Promise<any> {
    try {
      if (!address) return new Error('address is not found')
      await this._hasLogin()
      await this._setTargetChain()
      const contract = await new this.web3.eth.Contract(Erc20ABI, address)
      const userAddress = useUsersInfo().getAddress
      const res = await contract.methods.approve(walletHelpAddress, total).send({
        from: userAddress
      }).on('transactionHash', (txHash: string) => {
        console.log('txHash:', txHash);
        callback(txHash)
      })
      return Promise.resolve(res)
    } catch (error: any) {
      throw new Error(`${error.message}`)
    }
  }

  /**
   * @description 授权节点白名单
   * @param {string} address
   * @returns Promise 授权节点结果
   */
  async authNode(address: string, callback: any): Promise<any> {
    try {
      if (!address) throw new Error('ObserverWallet address was not found')
      await this._hasLogin()
      await this._setTargetChain()
      const contract = await new this.web3.eth.Contract(MetisPayABI, address)
      const userAddress = useUsersInfo().getAddress
      const res = await contract.methods.authorize(address).send({
        from: userAddress
      }).on('transactionHash', (txHash: string) => {
        console.log(txHash);
        callback(txHash)
      })
      return Promise.resolve(res)
    } catch (error: any) {
      throw new Error(`${error.message}`)
    }
  }

  /**
   * @description 取消节点白名单授权
   * @param {string} address
   * @returns Promise 取消授权节点结果
   */
  async revokeNode(address: string, callback: any): Promise<any> {
    try {
      if (!address) return new Error('address is not found')
      await this._hasLogin()
      await this._setTargetChain()
      const contract = await new this.web3.eth.Contract(MetisPayABI, address)
      const userAddress = useUsersInfo().getAddress
      const res = await contract.methods.deleteWhitelist(address).send({
        from: userAddress
      }).on('transactionHash', (txHash: string) => {
        console.log('txHash:', txHash);
        callback(txHash)
      })

      return Promise.resolve(res)
    } catch (error: any) {
      throw new Error(`${error.message}`)
    }
  }
}
export default Web3Service