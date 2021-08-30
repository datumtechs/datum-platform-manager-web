<template>
  <div class="authorize">
    <h3>{{ $t('apply.title') }}</h3>
    <div class="authorize-block">
      <div class="block-info">
        <div class="row-lable">数据名称：</div>
        <div class="row-value">{{ dataInfo.dataName }}</div>
        <div class="row-lable">数据方：</div>
        <div class="row-value">{{ dataInfo.identityName }}</div>
        <div class="row-lable">数据大小：</div>
        <div class="row-value">{{ dataInfo.size }}</div>
        <div class="row-lable">数据条数：</div>
        <div class="row-value">{{ dataInfo.rows }}</div>
        <!-- <div class="row-lable">字段：</div>
        <div class="row-value">{{dataInfo.size}}</div> -->
      </div>
      <div class="block-input">
        <div>
          <el-radio v-model="authType" label="1">按时间</el-radio>
          <div class="time-input">
            <el-date-picker
              :disabled="authType != '1'"
              v-model="dateTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
        <div>
          <el-radio v-model="authType" label="2">按次数</el-radio>
          <div class="num-input">
            <el-input-number
              v-model="authValue"
              :min="0"
              size="small"
              :disabled="authType != '2'"
            >
            </el-input-number>
          </div>
        </div>
      </div>
      <div class="block-btn">
        <jz-button
          type="jz-button--primary"
          align="left"
          :height="48"
          @click="handleAuthorize"
        >
          {{ $t('apply.authorize') }}
        </jz-button>
        <jz-button @click="handlecancel" :height="48" align="left">
          {{ $t('apply.cancel') }}
        </jz-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { getDataDetail } from '@/api/home'
import { getDataAuth } from '@/api/authorize'
import { getSign } from '@/utils/auth'
@Component({
  name: 'Authorize',
  components: {
    JzButton,
  },
})
export default class Authorize extends Vue {
  private dataInfo = {}
  private authType = '1'
  private dateTime = []
  private authValue = 1
  private detailId = ''
  // private handleChange(currentValue: number, oldValue: number) {
  //   console.log(currentValue, oldValue)
  // }
  private async handleAuthorize() {
    const { authType, detailId } = this
    // 校验
    const checks: any = {
      '1': () => {
        if (!this.dateTime.length) {
          this.$message.error('请输入时间')
          return true
        }
      },
      '2': () => {
        if (!this.authValue) {
          this.$message.error('请输入次数')
          return true
        }
      },
    }
    const ischecks = checks[authType]()

    if (!ischecks) {
      // 发送授权请求
      const params = {
        authBeginTime: '',
        authEndTime: '',
        authType: authType,
        authValue: 1,
        id: Number(detailId),
        sign: getSign(),
      }
      if (authType == '1') {
        params.authBeginTime = this.dateTime[0]
        params.authEndTime = this.dateTime[1]
      }
      if (authType == '2') {
        params.authValue = this.authValue
      }
      const { code } = await getDataAuth({ ...params })
      if (code === 10000) {
        this.$message.success('授权成功')
        setTimeout(() => {
          this.$router.push('/resources/data')
        }, 2000)
      }
    }
  }
  private handlecancel() {
    this.$router.go(-1)
  }

  private async getList() {
    this.detailId = this.$route.params.id
    const { data } = await getDataDetail(this.detailId)
    this.dataInfo = data
  }
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.authorize
  padding 30px 60px
  h3
    font-weight: 650;
    font-style: normal;
    font-size: 24px;
    margin-bottom 20px
  .authorize-block
    .block-info
      max-width: 620px;
      flex-flow: row wrap;
      display flex
      font-size: 14px;
      letter-spacing: 0.16px;
      color: #161616;
      text-align: left;
      line-height: 18px;
      div
        margin-bottom 18px
      .row-lable
        width 130px
      .row-value
        width 180px
    .block-input
      .time-input,.num-input
        margin 10px 20px
      .num-input
        display inline-block
        margin-left 10px
        position relative
        .el-icon-caret-top
          position absolute
          top 0
          right 0
          z-index 99
        >>> .el-icon-plus:before
              vertical-align: -2px;
              content: "\e78f"
              font-size 18px
         >>> .el-icon-minus:before
              vertical-align: -2px;
              content: "\e790"
              font-size 18px
    .block-btn
      margin-top 50px
      display  flex
      div
        width: 109px;
        height: 48px;
        line-height 46px
        margin-right 50px
        text-align: left;
        text-indent: 20px;
</style>
