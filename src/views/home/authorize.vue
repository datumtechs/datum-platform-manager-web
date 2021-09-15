<template>
  <div class="authorize">
    <div class="authorize-wrap">
      <h3>{{ $t('apply.title') }}</h3>
      <div class="authorize-block">
        <div class="block-info">
          <div>
            <div class="row-lable">数据名称：</div>
            <div class="row-value">{{ dataInfo.dataName }}</div>
          </div>
          <div>
            <div class="row-lable">数据方：</div>
            <div class="row-value">{{ dataInfo.identityName }}</div>
          </div>
          <div>
            <div class="row-lable">数据大小：</div>
            <div class="row-value">{{ dataInfo.size }}</div>
          </div>
          <div>
            <div class="row-lable">数据条数：</div>
            <div class="row-value">{{ dataInfo.rows }}</div>
          </div>
          <!-- <div class="row-lable">字段：</div>
          <div class="row-value">{{dataInfo.size}}</div> -->
        </div>
        <div class="block-input">
          <div>
            <el-radio v-model="authType" label="1">按时间</el-radio>
            <div class="time-input">
              <!-- <el-date-picker
                :disabled="authType != '1'"
                v-model="dateTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker> -->
              <el-date-picker
                :disabled="authType != '1'"
                class="input-date"
                v-model="startDate"
                type="date"
                placeholder="mm/dd/yy"
              >
              </el-date-picker>
              <el-time-picker
                :disabled="authType != '1'"
                class="input-date"
                v-model="startTime"
                :picker-options="{
                  selectableRange: '0:0:00 - 23:59:00',
                }"
                format="HH:mm:A"
                placeholder="hh:mm AM"
              >
              </el-time-picker>
              <span class="and">至</span>
              <el-date-picker
                :disabled="authType != '1'"
                class="input-date"
                v-model="endDate"
                type="date"
                placeholder="mm/dd/yy"
              >
              </el-date-picker>
              <el-time-picker
                :disabled="authType != '1'"
                class="input-date"
                v-model="endTime"
                :picker-options="{
                  selectableRange: '0:0:00 - 23:59:00',
                }"
                format="HH:mm:A"
                placeholder="hh:mm AM"
              >
              </el-time-picker>
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
          <jz-button @click="handlecancel" :width="116" :height="41">
            {{ $t('apply.cancel') }}
          </jz-button>
          <jz-button
            type="jz-button--primary"
            :width="116"
            :height="41"
            @click="handleAuthorize"
          >
            {{ $t('apply.authorize') }}
          </jz-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { getDataDetail } from '@/api/home'
import { getDataAuth } from '@/api/authorize'
import alayaService from '@/services/alayaService'
import { UserModule } from '@/store/modules/user'
import { formatDate } from '@/utils/format'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'

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
  private startDate = ''
  private startTime = ''
  private endDate = ''
  private endTime = ''
  private authValue = 1
  private detailId = ''
  // private handleChange(currentValue: number, oldValue: number) {
  //   console.log(currentValue, oldValue)
  // }
  private async getSign() {
    await UserModule.GetLoginNonce()
    const sign = await alayaService.signAlaya()
    return sign
  }
  private async handleAuthorize() {
    const { authType, detailId } = this
    // 校验
    const checks: any = {
      '1': () => {
        if (
          !this.startDate ||
          !this.startTime ||
          !this.endDate ||
          !this.endTime
        ) {
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
      const sign = await this.getSign()
      // 发送授权请求
      const params = {
        authBeginTime: '',
        authEndTime: '',
        authType: authType,
        authValue: 1,
        id: Number(detailId),
        sign,
        userType: UserModule.userType,
      }

      if (authType == '1') {
        params.authBeginTime =
          formatDate(new Date(this.startDate), 'Y-M-D ') +
          '' +
          formatDate(new Date(this.startTime), 'h:m:s')
        params.authEndTime =
          formatDate(new Date(this.endDate), 'Y-M-D ') +
          '' +
          formatDate(new Date(this.endTime), 'h:m:s')
      }
      if (authType == '2') {
        params.authValue = this.authValue
      }
      const data: any = await getDataAuth({ ...params })
      if (data.code === 10000) {
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
    BreadcrumbModule.SET_DATA(data.dataName)
  }
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.authorize
  padding 30px 60px
  width 1200px
  margin 20px auto
  margin-top 0
  .authorize-wrap
    padding 30px
    box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
    background #fff
    box-sizing: border-box;
    height 654px
    h3
      font-weight: 650;
      font-style: normal;
      font-size: 18px;
      margin-bottom 40px
    .authorize-block
      .block-info
        max-width: 620px;
        flex-flow: column
        display flex
        font-size: 14px;
        letter-spacing: 0.16px;
        color: #161616;
        text-align: left;
        line-height: 18px;
        div
          margin-bottom 10px
          display flex
        .row-lable
          width 130px
          color rgba(0,0,0,0.50)
        .row-value
          width 180px
          color #000
      .block-input
        .time-input,.num-input
          margin 10px 20px
        .time-input
          .input-date
            width 140px
            height 40px
            margin-right 16px
            >>> .el-input__inner
              height 40px!important;
              line-height 40px!important;
              border-radius 0
          .and
            margin-right 16px
            color rgba(0,0,0,.5);
        .num-input
          position relative
          >>> .el-input__inner
            height 40px!important;
            line-height 40px!important;
          >>> .el-input-number__decrease
            height 38px!important;
          >>> .el-input-number__increase
            height 38px!important;
          .el-icon-caret-top
            position absolute
            top 0
            right 0
            z-index 99
          >>> .el-icon-plus:before
                vertical-align: -4px;
                content: "\e78f"
                font-size 18px
          >>> .el-icon-minus:before
                vertical-align: -4px;
                content: "\e790"
                font-size 18px
      .block-btn
        margin-top 50px
        display  flex
        div
          margin-right 50px

>>> .el-radio__input.is-checked .el-radio__inner {
    border-color: #5f4ffb;
    background: #5f4ffb;
}
>>> .el-radio__input.is-checked+.el-radio__label {
    color: #5f4ffb;
}
</style>
