<template>
  <div class="nickname-wrap">
    <div class="title">
      {{ $t('route.account') }}
    </div>
    <div class="block">
      <jz-nav :tabs="tabs" :tabIndex="tabIndex" type="account"></jz-nav>
      <div class="block-info">
        <div class="address">
          {{ $t('account.address') }}：
          <span>{{ address }}</span>
          <svg-icon name="record" width="24" height="24" color="#515151" />
          <span class="scan" @click="handleScan">
            {{ $t('account.scan') }}
          </span>
        </div>
        <div class="nickname">
          <!-- <div>{{ $t('account.name') }}</div> -->
          <el-input type="input" v-model="nickname" class="nickname-input">
          </el-input>
        </div>
        <div class="button-item">
          <jz-button
            @click="handleCancel"
            :height="41"
            :width="116"
            class="submit"
          >
            {{ $t('account.cancel') }}
          </jz-button>
          <jz-button
            type="jz-button--primary"
            :width="116"
            :height="41"
            @click="handleSubmit"
          >
            {{ $t('account.submit') }}
          </jz-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Table from '@/components/JzTable.vue'
import JzButton from '@/components/JzButton.vue'
import JzNav from '@/components/JzNav.vue'
import { setNickName } from '@/api/user'
import { UserModule } from '@/store/modules/user'
import { strlen } from '@/utils/validateRules'
@Component({
  name: 'resourcesData',
  components: {
    JzButton,
    Table,
    JzNav,
  },
})
export default class resourcesData extends Vue {
  private nickname = UserModule.user_info.userName
  private tabs: string[] = ['nickname']
  private tabIndex = 0
  get address() {
    return UserModule.user_info.address
  }
  private async handleSubmit() {
    const { nickname, address } = this
    if (strlen(nickname) > 40) {
      this.$message.error('昵称最大支持20个汉字！')
      return
    }
    if (nickname === '') {
      this.$message.error('昵称不能为空！')
      return
    }
    const params = {
      address,
      nickName: nickname,
    }
    const data: any = await setNickName({ ...params })
    if (data.code === 10000) {
      this.$message.success('修改昵称成功')
      this.nickname = params.nickName
      UserModule.SET_USER({ userName: this.nickname })
      setTimeout(() => {
        this.$router.go(-1)
      }, 1000)
    }
  }
  private handleCancel() {
    this.$router.go(-1)
  }
  private handleScan() {
    window.open('https://scan.platon.network/', '_blank')
  }
}
</script>

<style scoped lang="stylus">
.nickname-wrap
  width 1164px
  margin 20px auto
  .title
    margin-top 10px
    margin-bottom 40px
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
  .block
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 0.16px;
    color: #161616;
    text-align: left;
    .block-info
      height: 654px;
      background #fff
      box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
      padding 30px
      box-sizing border-box
    .address
      margin-bottom 40px
      color: rgba(0,0,0,0.5);
      font-size 16px
      margin-left 10px
      display inline-block
      .scan
        color #0F62FE
        cursor pointer
        margin-left 10px
        font-size 16px
      .scan:hover
        text-decoration: underline
    .nickname
      width 300px
      margin 10px 0 30px 0
      color: rgba(0,0,0,0.5);
      font-size 16px
      .nickname-input
        height 40px
        >>> .el-input__inner
          height 40px!important
          line-height 40px!important
      div
        padding-bottom 10px
    .button-item
      padding 10px 0
      display flex
      .submit
        margin-right 60px
</style>
