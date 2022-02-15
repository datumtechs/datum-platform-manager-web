<template>
  <el-dialog
    :visible="showConnector"
    :append-to-body="true"
    width="538px"
    class="connector-dialog"
    :before-close="handleClose"
  >
    <div slot="title" class="connector-title">Metamask {{ $t('common.extension') }}</div>
    <div v-if="isWallet">
      <div class="connector-block">
        <div :class="['connector-btn', isRadio ? 'connector-btn-active' : '']" @click="handleLogin">
          <img src="~assets/images/default/metamask-fox.svg" alt="samurai" class="icon" />
          <span class="text">Metamask</span>
        </div>
      </div>
      <div class="connector-info">
        <span :class="['radio', isRadio ? 'active' : '']" @click="handleRadio"></span>
        <span v-if="lang === 'zh'"><span @click="handleRadio">阅读并同意</span><i>用户协议</i>和<i>隐私声明</i></span>
        <span v-else>
          <span @click="handleRadio"> I have read and agreed to the </span>
          <i>Term of Use</i> and <i> Privacy Policy</i>
        </span>
      </div>
    </div>
    <div v-else class="samurai-box">
      <div class="samurai-line">
        <img src="~assets/images/default/samurai-1.svg" alt="" class="samurai-icon" />
        <p>{{ $t('wallet.tip1') }}</p>
      </div>
      <div class="samurai-line">
        <img src="~assets/images/default/samurai-2.svg" alt="" class="samurai-icon" />
        <p>{{ $t('wallet.tip2') }}</p>
      </div>
      <!-- <div class="samurai-line">
        <img src="~assets/images/default/samurai-3.svg" alt="" class="samurai-icon" />
        <p>无缝适配PlatON网络</p>
      </div> -->
      <el-button type="primary" class="install-btn" @click="linkToSamurai">{{ $t('common.install') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ConnectorDialog',
  props: {
    showConnector: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isRadio: false
    }
  },
  computed: {
    ...mapGetters('app', [ 'isWallet' ])
  },
  mounted () {},
  methods: {
    ...mapActions('app', [ 'getLoginNonce', 'getLogin' ]),
    async loginFn () {
      try {
        await this.$Web3Service.connectWallet()
        await this.getLoginNonce()
        const res = await this.$Web3Service.signForWallet('login')
        res && this.getLogin(this.$Web3Service.loginParams())
      } catch (error) {
        console.log(error)
      }
    },
    handleRadio () {
      this.isRadio = !this.isRadio
    },
    handleClose () {
      this.$emit('update:showConnector', false)
    },
    handleLogin () {
      if (this.isRadio) {
        this.handleClose()
        this.loginFn()
      }
    },
    linkToSamurai () {
      // window.open(' https://devdocs.platon.network/docs/zh-CN/Samurai_user_manual ')
      window.open(`https://devdocs.platon.network/docs/${this.$i18n.locale !== 'en' ? 'zh-CN' : 'en'}/MetaMask`)
      this.handleClose()
    }
  }
}
</script>
<style lang="scss" scoped>
.connector-block {
  width: 424px;
  height: 84px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
  margin: 0 auto;
  background: #f8f7ff;
  border: 1px solid #5f4ffb;
  border-radius: 12px;
  margin-bottom: 20px;
  .connector-btn {
    width: 100%;
    color: #000;
    font-size: 18px;
    font-weight: 400;
    cursor: not-allowed;
    .icon {
      display: inline-block;
      margin-left: 20px;
      width: 40px;
      height: 40px;
      vertical-align: inherit;
    }
    .text {
      vertical-align: 14px;
      display: inline-block;
      margin-left: 20px;
    }
  }
  .connector-btn-active {
    cursor: pointer;
  }
}
.connector-info {
  margin-left: 40px;
  color: rgba(0, 0, 0, 0.6);
  .radio {
    display: inline-block;
    vertical-align: -1px;
    margin-right: 5px;
    width: 12px;
    height: 12px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
  .active {
    border: 1px solid #2377ff;
    position: relative;
  }
  .active:before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 80%;
    height: 80%;
    background: #2377ff;
  }
  i {
    font-style: normal;
    color: #2377ff;
    cursor: pointer;
  }
}
.samurai-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .samurai-line {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    gap: 10px;
    .samurai-icon {
      width: 20px;
      height: 20px;
      vertical-align: -3px;
    }
  }
  .samurai-line:nth-child(3) {
    margin-bottom: 30px;
  }
  .install-btn {
    width: 114px;
    margin-top: 20px;
  }
}
</style>
