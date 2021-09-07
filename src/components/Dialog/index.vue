<template>
  <div class="dialog-view">
    <el-dialog
      :visible.sync="walletVisible"
      width="20%"
      :before-close="handleClose"
    >
      <div class="walle-wrap" v-if="isInitWallet">
        <div class="title">连接钱包</div>
        <div class="info">
          <input type="radio" />
          <span>阅读并同意<i>用户协议</i>和<i>隐私声明</i></span>
        </div>
        <div class="wallet-btn">
          <div @click="handleLogin">
            Samurai
          </div>
          <div class="mathWallet">
            MathWallet
          </div>
        </div>
      </div>
      <div class="walle-wrap walle-init" v-else>
        <div class="init-button">
          <span>Samurai扩展</span>
          <el-button type="primary" @click="handleSamurai">安装</el-button>
        </div>
        <div class="init-info">
          <div>一键连接区块链应用</div>
          <div>账户隐私保留在本地</div>
          <div>无缝适配PlatON网络</div>
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

  get address() {
    return UserModule.user_info.address
  }
  get walletVisible() {
    return this.visible
  }
  get isInitWallet() {
    return UserModule.isInitWallet
  }
  @Emit('update:visible')
  private handleClose() {
    return false
  }
  private async handleLogin() {
    this.handleClose()
    // 连接钱包
    await alayaService.connectWallet()
    // 获取uuid
    await UserModule.GetLoginNonce()
    // alaya签名
    const res: any = await alayaService.signAlaya()
    if (res.length) {
      // 登录
      const params = (alayaService as any).loginParams()
      await UserModule.GetLogin(params)
    }
  }
  // 安装钱包插件
  private handleSamurai() {
    this.handleClose()
    window.open(
      ' https://devdocs.platon.network/docs/zh-CN/Samurai_user_manual ',
    )
  }
  @Watch('address', { deep: true })
  routerChange(val: any): void {
    if (val.length > 0) {
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
    .title
      color #000
      font-size 18px
      margin-bottom 20px
    .info
      i
        font-style normal
        color rgb(0, 0, 255)
      margin-bottom 20px
  .walle-init
    display flex
    flex-direction row
    justify-content center
    height 140px
    padding-top 26px
    box-sizing border-box
    .init-button
      display flex
      flex-direction column
      margin-right 35px
      line-height 25px
      color #000
      span
        text-align center
        font-size: 18px;
        display inline-block
        margin-bottom 15px
      >>> .el-button
            width: 142px;
    .init-info
      line-height 28px
  .wallet-btn
    width 240px
    display flex
    flex-direction column
    div
      width 100%
      height 35px
      line-height 35px
      background rgba(141, 141, 141, 1)
      text-align center
      margin-bottom 10px
      color #fff
      cursor pointer
    .mathWallet
      background rgb(0, 0, 255)
>>> .el-dialog__header
      padding: 0 !important;
      background-color: #fff !important;
</style>
