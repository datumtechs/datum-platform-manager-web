<template>
  <div class="dispatch">
    <div class="block-input">
      <div>
        <el-checkbox v-model="startRadio" class="checkbox"
          >开始时间</el-checkbox
        >
        <div class="num-input">
          <el-date-picker
            class="input-date"
            v-model="startDate"
            type="date"
            placeholder="开始日期"
            :picker-options="startPickerOptions"
          >
          </el-date-picker>
          <el-time-picker
            class="input-date"
            v-model="startTime"
            format="HH:mm:A"
            :picker-options="{
              selectableRange: '0:0:00 - 23:59:00',
            }"
            placeholder="开始时间"
          >
          </el-time-picker>
        </div>
      </div>
      <div v-show="startRadio">
        <el-checkbox v-model="repeatRadio" class="checkbox"
          >重复 <span class="num-lable"></span> 每</el-checkbox
        >
        <div class="num-input">
          <el-input-number v-model="repeatInterval" :min="1" size="small">
          </el-input-number>
          <span class="unit">分钟</span>
        </div>
      </div>
      <div v-show="repeatRadio">
        <el-checkbox v-model="endRadio" class="checkbox">结束时间</el-checkbox>
        <div class="num-input">
          <el-date-picker
            class="input-date"
            v-model="endDate"
            type="date"
            placeholder="结束日期"
            :picker-options="endPickerOptions"
          >
          </el-date-picker>
          <el-time-picker
            class="input-date"
            v-model="endTime"
            :picker-options="{
              selectableRange: '0:0:00 - 23:59:00',
            }"
            format="HH:mm:A"
            placeholder="结束时间"
          >
          </el-time-picker>
        </div>
      </div>
    </div>
    <div class="block-btn">
      <jz-button
        type="jz-button--primary"
        align="left"
        :height="40"
        @click="handleCreate"
        class="create"
      >
        {{ $t('jobs.create') }}
      </jz-button>
      <jz-button @click="handlePrevious" :height="40" align="left">
        {{ $t('jobs.previous') }}
      </jz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { formatDate } from '@/utils/format'

@Component({
  name: 'dispatch',
  components: {
    JzButton,
  },
})
export default class DispatchIndex extends Vue {
  private radio = '1'
  private startDate: any = ''
  private startTime: any = ''
  private endDate = ''
  private endTime: any = ''
  private repeatInterval = 1
  private startRadio = false
  private repeatRadio = false
  private endRadio = false
  private startPickerOptions: any = {
    disabledDate(time: any) {
      return time.getTime() < Date.now() - 8.64e7
    },
  }
  private endPickerOptions: any = {
    disabledDate: this.disabledEndDate,
  }
  private disabledEndDate(time: any) {
    let res: any = ''
    if (this.startDate.length) {
      res = this.startTime.getTime()
    } else {
      res = Date.now() - 8.64e7
    }
    return time.getTime() < res
  }
  // 创建
  @Emit('create')
  private handleCreate() {
    if (!this.startDate || !this.startTime) {
      this.$message.warning('请输入开始时间')
      return false
    }
    const beginTime =
      formatDate(new Date(this.startDate), 'Y-M-D ') +
      '' +
      formatDate(new Date(this.startTime), 'h:m:s')
    const endTime =
      formatDate(new Date(this.endDate), 'Y-M-D ') +
      '' +
      formatDate(new Date(this.endTime), 'h:m:s')
    const {
      radio,
      startDate,
      startTime,
      endDate,
      repeatInterval,
      repeatRadio,
    } = this
    if (repeatRadio) {
      if (!this.endDate) {
        this.$message.warning('请输入结束时间')
        return false
      }
      const stampStart = new Date(beginTime).getTime()
      const stampEnd = new Date(endTime).getTime()
      if (stampStart > stampEnd) {
        this.$message.warning('结束时间必须大于开始时间')
        return false
      }
    }
    return {
      radio,
      beginTime,
      endTime,
      repeatInterval,
      repeatFlag: repeatRadio,
    }
  }
  @Emit('previous')
  private handlePrevious() {
    return
  }
  // 编辑回显
  public handleEcho(row: any) {
    console.log(row, 'row')
    const { beginTime, endTime, repeatInterval } = row
    this.repeatInterval = repeatInterval
    const start = beginTime.split(' ')
    const end = endTime.split(' ')
    this.startDate = start[0]
    this.startTime = new Date(start)
    this.endDate = end[0]
    this.endTime = new Date(end)
    if (beginTime.length) {
      this.startRadio = true
    }
    if (repeatInterval) {
      this.repeatRadio = true
    }
    if (endTime.length) {
      this.endRadio = true
    }
  }
  private resetTime() {
    this.startDate = ''
    this.startTime = ''
    this.endDate = ''
    this.endTime = ''
    this.repeatInterval = 1
    this.startRadio = false
    this.repeatRadio = false
    this.endRadio = false
  }
}
</script>

<style scoped lang="stylus">
.dispatch
  padding 40px
  .block-input
    .time-input,.num-input
      margin 10px 20px
    .num-lable
      display inline-block
      width 6px
    .checkbox
      margin-right 32px
    .num-input
      display inline-block
      margin-left -10px
      position relative
      .unit
        margin-left 20px
      .input-date
        width 140px
        display: inline-block;
        margin-right: 10px;
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
    .create
      margin-right 30px
</style>
