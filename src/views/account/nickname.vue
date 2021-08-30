<template>
  <div class="nickname-wrap">
    <div class="title">
      {{ $t('route.account') }}
    </div>
    <div class="block">
      <jz-nav :tabs="tabs" :tabIndex="tabIndex" type="account"></jz-nav>
      <div class="address">
        {{ $t('account.address') }}：
        <span>0xfdfdkfjdkfjdjfwe50</span>
        <i></i>
        <span class="scan" @click="handleScan">
          {{ $t('account.scan') }}
        </span>
      </div>
      <div class="nickname">
        <div>{{ $t('account.name') }}</div>
        <el-input type="input" v-model="nickname"> </el-input>
      </div>
      <div class="button-item">
        <jz-button
          type="jz-button--primary"
          align="left"
          :height="48"
          @click="handleSubmit"
          class="submit"
        >
          {{ $t('account.submit') }}
        </jz-button>
        <jz-button @click="handleCancel" :height="48" align="left">
          {{ $t('account.cancel') }}
        </jz-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Table from '../project/components/Table.vue'
import JzButton from '@/components/JzButton.vue'
import JzNav from '@/components/JzNav.vue'
import { setNickName } from '@/api/user'
@Component({
  name: 'resourcesData',
  components: {
    JzButton,
    Table,
    JzNav,
  },
})
export default class resourcesData extends Vue {
  private nickname = ''
  private tabs: string[] = ['nickname']
  private tabIndex = 0
  private async handleSubmit() {
    const params = {
      address: '501eb3eeb2a40e6f2ff6f481302435e6e8af3666',
      nickName: this.nickname,
    }
    const data: any = await setNickName({ ...params })
    if (data.code === 10000) {
      this.$message.success('修改昵称成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 2000)
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
  margin: 20px 0 0 65px;
  .title
    margin-bottom 50px
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
    .address
      margin 20px 0
      .scan
        color #0F62FE
        cursor pointer
      .scan:hover
        text-decoration: underline
    .nickname
      width 300px
      margin 10px 0
      div
        padding-bottom 10px
    .button-item
      padding 10px 0
      .submit
        margin-right 60px
</style>
