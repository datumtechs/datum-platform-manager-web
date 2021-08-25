<template>
  <div class="authorize">
    <h3>{{ $t('apply.title') }}</h3>
    <div class="authorize-block">
      <div class="block-info">
        <div class="row-lable">数据名称：</div>
        <div class="row-value">贷款逾期数据</div>
        <div class="row-lable">数据方：</div>
        <div class="row-value">银行A</div>
        <div class="row-lable">数据大小：</div>
        <div class="row-value">1.06MB</div>
        <div class="row-lable">数据条数：</div>
        <div class="row-value">2000</div>
        <div class="row-lable">字段：</div>
        <div class="row-value">20</div>
      </div>
      <div class="block-input">
        <div>
          <el-radio v-model="radio" label="1">按时间</el-radio>
          <div class="time-input">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
        <div>
          <el-radio v-model="radio" label="2">按次数</el-radio>
          <div class="num-input">
            <el-input-number v-model="num" :min="1" size="small">
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

@Component({
  name: 'Authorize',
  components: {
    JzButton,
  },
})
export default class Authorize extends Vue {
  private radio = '1'
  private value1 = ''
  private value2 = ''
  private num = 1
  // private handleChange(currentValue: number, oldValue: number) {
  //   console.log(currentValue, oldValue)
  // }
  private handleAuthorize() {
    // 发生授权请求
    this.$router.push('/user/data')
  }
  private handlecancel() {
    this.$router.go(-1)
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
