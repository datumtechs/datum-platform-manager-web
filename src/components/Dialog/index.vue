<template>
  <div class="dialog-view">
    <el-dialog
      :visible.sync="walletVisible"
      width="538px"
      class="dialog"
      :before-close="handleClose"
    >
      <div class="walle-wrap" v-if="isInitWallet">
        <div class="title">连接钱包</div>
        <div class="wallet-block">
          <div
            @click="handleLogin"
            :class="['wallet-btn', isRadio ? 'wallet-btn-active' : '']"
          >
            <img
              src="@/assets/images/icons/metamask-fox.svg"
              alt="samurai"
              class="icon"
            />
            <span class="text">MetaMask</span>
          </div>
        </div>
        <div class="info">
          <span
            :class="['radio', isRadio ? 'active' : '']"
            @click="handleRadio"
          ></span>
          <span
            ><span @click="handleRadio">阅读并同意</span><i>用户协议</i>和<i
              >隐私声明</i
            ></span
          >
        </div>
      </div>
      <div class="walle-wrap walle-init" v-else>
        <div class="title">MetaMask扩展</div>
        <div class="init-info">
          <div>
            <svg-icon
              name="samurai-1"
              width="20"
              height="20"
              class="init-icon"
              color="#606266"
            />
            一键连接区块链应用
          </div>
          <div>
            <svg-icon
              name="samurai-2"
              width="18"
              height="18"
              class="init-icon"
              color="#606266"
            />
            账户隐私保留在本地
          </div>
          <!-- <div>
            <svg-icon
              name="samurai-3"
              width="20"
              height="20"
              class="init-icon"
              color="#606266"
            />
            无缝适配Ethereum网络
          </div> -->
          <el-button type="primary" @click="handleSamurai">安装</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import alayaService from '@/services/alayaService'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'dialogView',
})
export default class DialogIndex extends Vue {
  @Prop({ default: false }) private visible!: boolean
  private isRadio = false
  get address() {
    return UserModule.user_info.address
  }
  get walletVisible() {
    return this.visible
  }
  get isInitWallet() {
    return UserModule.isInitWallet
  }
  private handleRadio() {
    this.isRadio = !this.isRadio
  }
  @Emit('update:visible')
  private handleClose() {
    this.isRadio = false
    return false
  }
  private async handleLogin() {
    if (!this.isRadio) return false
    this.handleClose()
    // 连接钱包
    await alayaService.connectWallet()
    // 获取uuid
    await UserModule.GetLoginNonce()
    // alaya签名
    const res: any = await alayaService.signAlaya('login')
    if (res.length) {
      // 登录
      const params = (alayaService as any).loginParams()
      await UserModule.GetLogin(params)
    }
  }
  // 安装钱包插件
  private handleSamurai() {
    window.open('https://metamask.io')
    setTimeout(() => {
      this.handleClose()
    }, 13)
  }
  @Watch('address', { deep: true })
  addressChange(val: any): void {
    if (val && val.length > 0) {
      this.handleClose()
    }
  }
}
</script>

<style scoped lang="stylus">
.dialog-view
  .walle-wrap
    padding 20px
    padding-top 5px
    height 280px
    .title
      text-align center
      color #000
      font-weight 500
      font-size 24px
      margin-bottom 60px
    .info
      margin-left 40px
      color rgba(0,0,0,0.6);
      .radio
        display: inline-block;
        vertical-align -1px
        margin-right 5px
        width 10px
        height 10px
        border 1px solid rgba(0,0,0,0.6)
        cursor pointer
      .active
        border 1px solid #2377FF
        position relative
      .active:before
        content: ''
        position absolute
        top 1px
        left 1px
        width 80%
        height 80%
        background #2377FF
      i
        font-style normal
        color #2377FF
        cursor pointer
      margin-bottom 20px
  .walle-init
    height 310px
    text-align center
    padding-top 26px
    box-sizing border-box
    color rgba(0,0,0,0.75)
    .title
      margin-bottom 30px
    .init-info
      line-height 28px
      div
        font-size 14px
        margin-bottom 15px
        .init-icon
          vertical-align: -3px;
          margin-right: 5px;
      >>> .el-button
            margin-top 20px
            width: 114px;
            background #5F4FFB
            border 1px solid #5F4FFB
  .wallet-block
    width: 424px;
    height: 84px;
    box-sizing border-box
    padding 20px
    margin 0 auto
    background: #F8F7FF;
    border: 1px solid #5F4FFB;
    border-radius: 12px;
    margin-bottom 20px
    .wallet-btn
      width 100%
      color #000
      font-size: 18px;
      font-weight: 400;
      cursor not-allowed
      .icon
        display inline-block
        margin-left 20px
        width: 40px;
        height: 40px;
        vertical-align: inherit;
      .text
        vertical-align: 14px;
        display inline-block
        margin-left 20px
    .wallet-btn-active
      cursor pointer
    .mathWallet
      background rgb(0, 0, 255)
>>> .el-dialog__header
      padding: 0 !important;
      background-color: #fff !important;
>>> .el-dialog__close
      font-size 24px
>>> .el-dialog
      border-radius 16px
</style>
