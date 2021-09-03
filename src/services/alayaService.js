const Web3 = require("web3");
class alayaService {
  constructor() {
    this.web3 = null; //web3对象
    try {
      this.initAlaya();
    } catch (error) {
      console.log("initral failed", error);
    }
  }
  initAlaya() {
    //判断是否存在alaya
    if (typeof alaya === "undefined") {
      console.log("No alaya, You should consider trying MetaMask!");
      localStorage.setItem("alayaAddress", ''); // TODO 根据项目情况存储钱包地址
    } else {
      this.web3 = new Web3(alaya);
      alaya.on("accountsChanged", account => {
        if (account.length === 0) {
          localStorage.setItem('myWalletAddress', '')// TODO 根据项目情况存储钱包地址
        } else if (account.length > 0) {
          localStorage.setItem('myWalletAddress', account[0])// TODO 根据项目情况存储钱包地址
        } else {
          console.log("Alaya account changed but same address");
        }
      });
    }
  }
  /**
   * 链接钱包方法
   * @returns  返回一个钱包地址的数组
   */
  async connectWallet() {
    if (typeof window.alaya == "undefined") {
      return alert('您需要下载钱包扩展')// TODO 需要UI弹窗提示
      // 旧的配置  
      // 提示语：Please download and install Alaya browser plug-in wallet Samurai.Please refresh after completion.，
      // 下载链接https://github.com/AlayaNetwork/Samurai/releases/download/v8.0.11/samurai-chrome-8.0.11.zip
      // 新的配置待确定
    } else {
      return await window.alaya.request({
        method: "platon_requestAccounts"
      });
    }
  }
  /**
   * 签名方法
   * @returns  签名结果
   */
  signAlaya() {
    const msgParams = JSON.stringify({
        "domain": {
            "name": "Moirae"
        },
        "message": {
            "key": "uuid",// TODO 需要调接口获得uuid
            "desc": "Login to Moirae"
        },
        "primaryType": "Login",
        "types": {
            "EIP712Domain": [
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "Login": [
                {
                    "name": "key",
                    "type": "string"
                },
                {
                    "name": "desc",
                    "type": "string"
                }
            ]
        }
    })
    var from = localStorage.getItem('myWalletAddress');// TODO 根据项目情况存储钱包地址
    var params = [from, msgParams];
    var method = 'platon_signTypedData_v4';
    this.web3.currentProvider.sendAsync(
      {
        method,
        params,
        from,
      },
      function (err, result) {
        if (err) return console.dir(err);
        if (result.error) {
          alert(result.error.message);
        }
        if (result.error) return console.error('ERROR', result);
        console.log('TYPED SIGNED:' + JSON.stringify(result.result));
        return JSON.stringify(result.result) // 返回签名结果
      }
    );


  }
}

export default new alayaService();