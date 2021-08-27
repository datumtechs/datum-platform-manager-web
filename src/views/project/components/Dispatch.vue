<template>
  <div class="dispatch">
    <div class="block-input">
      <div>
        <el-radio v-model="radio" label="1">开始时间</el-radio>
        <div class="num-input">
          <el-date-picker
            class="input-date"
            v-model="startDate"
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
          <el-time-picker
            class="input-date"
            v-model="startTime"
            :picker-options="{
              selectableRange: '0:0:00 - 23:59:00',
            }"
            format="HH:mm:A"
            placeholder="开时间"
          >
          </el-time-picker>
        </div>
      </div>
      <div>
        <el-radio v-model="radio" label="2"
          >重复 <span class="num-lable"></span> 每</el-radio
        >
        <div class="num-input">
          <el-input-number v-model="num" :min="1" size="small">
          </el-input-number>
        </div>
      </div>
      <div>
        <el-radio v-model="radio" label="3">结束时间</el-radio>
        <div class="num-input">
          <el-date-picker
            class="input-date"
            v-model="endDate"
            type="date"
            placeholder="结束日期"
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

@Component({
  name: 'dispatch',
  components: {
    JzButton,
  },
})
export default class DispatchIndex extends Vue {
  private radio = '1'
  private startDate = ''
  private startTime = ''
  private endDate = ''
  private endTime = ''
  private num = 1
  @Emit('create')
  private handleCreate() {
    const { radio, startDate, startTime, endDate, endTime, num } = this
    return {
      radio,
      startDate,
      startTime,
      endDate,
      endTime,
      num,
    }
  }
  @Emit('previous')
  private handlePrevious() {
    return
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
    .num-input
      display inline-block
      margin-left -10px
      position relative
      .input-date
        width 140px
        display: inline-block;
        margin-right: 10px;
      .el-icon-caret-top
        position absolute
        top 0
        right 0
        z-index 99
      >>> .el-radio
            margin-right 15px!important
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
