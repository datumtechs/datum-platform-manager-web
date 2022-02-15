<template>
  <div class="dialog-form-box">
    <div class="title">{{ $t('node.baseInfo') }}</div>
    <el-row class="dialog-line">
      <el-col :span="lang === 'zh' ? 6 : 8">{{ $t('node.dataName') }}:</el-col>
      <el-col :span="16">{{ formObj.dataName }}</el-col>
    </el-row>
    <el-row class="dialog-line">
      <el-col :span="lang === 'zh' ? 6 : 8">{{ $t('roles.dataProvider') }}:</el-col>
      <el-col :span="16">{{ formObj.identityName }}</el-col>
    </el-row>
    <el-row class="dialog-line">
      <el-col :span="lang === 'zh' ? 6 : 8">{{ $t('node.dataSize') }}:</el-col>
      <el-col :span="16">{{ changeSizeFn(formObj.size) }}</el-col>
    </el-row>
    <el-row class="dialog-line">
      <el-col :span="lang === 'zh' ? 6 : 8">{{ $t('node.rowNum') }}:</el-col>
      <el-col :span="16">{{ formObj.rows }}</el-col>
    </el-row>
    <div class="title">{{ $t('assets.authType') }}</div>
    <el-row class="dialog-line">
      <el-radio v-model="curMode" label="1">{{ $t('data.byTime') }}</el-radio>
    </el-row>
    <el-row align="middle" :gutter="10" class="dialog-line">
      <el-col :span="10">
        <el-date-picker
          v-model="startDate"
          size="small"
          :disabled="curMode != '1'"
          class="input-date"
          type="date"
          :format="dateFormat"
          :value-format="dateFormat"
          :placeholder="$t('tip.selectStartDate')"
          :picker-options="dataPickerOptions"
          @change="datePickerChange"
        ></el-date-picker>
      </el-col>
      <el-col :span="10">
        <el-time-picker
          v-model="startTime"
          size="small"
          :format="timeFormat"
          :value-format="timeFormat"
          :disabled="curMode != '1' || !startDate"
          :picker-options="timePickerOptions"
          :placeholder="$t('tip.selectStartTime')"
          class="input-date"
          @change="timePickerChange"
        >
        </el-time-picker>
      </el-col>
    </el-row>
    <el-row>
      <div class="and">至</div>
    </el-row>
    <el-row align="middle" :gutter="10" class="dialog-line">
      <el-col :span="10">
        <el-date-picker
          v-model="endDate"
          size="small"
          :disabled="curMode != '1' || !startTime"
          class="input-date"
          :format="dateFormat"
          :value-format="dateFormat"
          :placeholder="$t('tip.selectEndDate')"
          type="date"
          :picker-options="dataPickerOptions1"
          @change="datePickerChange1"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="10">
        <el-time-picker
          v-model="endTime"
          size="small"
          :format="timeFormat"
          :value-format="timeFormat"
          :disabled="curMode != '1' || !endDate"
          :picker-options="timePickerOptions1"
          :placeholder="$t('tip.selectEndTime')"
          class="input-date"
        >
        </el-time-picker>
      </el-col>
    </el-row>
    <el-row class="dialog-line">
      <el-radio v-model="curMode" label="2">{{ $t('data.byNumber') }}</el-radio>
    </el-row>
    <el-row class="dialog-line">
      <el-input-number v-model="authValue" :min="0" size="small" :disabled="curMode != '2'"> </el-input-number>
    </el-row>
  </div>
</template>
<script>
import { changeSizeFn } from '@/utils/utils'
export default {
  props: {
    formObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    const self = this
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const defaultDate = `${year}-${month}-${day} 00:00:00`
    const timestamp = new Date(defaultDate).getTime()
    return {
      curMode: '1',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      authValue: 0,
      dateFormat: 'yyyy-MM-dd',
      timeFormat: 'HH:mm:ss',
      dataPickerOptions: {
        disabledDate (time) {
          return time.getTime() < timestamp
        }
      },
      dataPickerOptions1: {
        disabledDate (time) {
          return time.getTime() < new Date(`${self.startDate} 00:00:00`).getTime()
        }
      },
      timePickerOptions: {
        selectableRange: '00:00:00-23:59:59'
      },
      timePickerOptions1: {
        selectableRange: '00:00:00-23:59:59'
      }
    }
  },
  methods: {
    changeSizeFn,
    queryParams () {
      return {
        curMode: this.curMode,
        startDate: this.startDate,
        startTime: this.startTime,
        endDate: this.endDate,
        endTime: this.endTime,
        authValue: this.authValue
      }
    },
    datePickerChange () {
      this.endDate = ''
      this.endTime = ''
      this.startTime = ''
    },
    timePickerChange () {
      this.endTime = ''
      if (!this.startTime) {
        this.endDate = ''
      }
    },
    datePickerChange1 () {
      const timestamp1 = new Date(`${this.startDate} 00:00:00`).getTime()
      const timestamp2 = new Date(`${this.endDate} 00:00:00`).getTime()
      if (timestamp1 === timestamp2) {
        this.timePickerOptions1.selectableRange = `${this.startTime}-23:59:59`
      } else {
        this.timePickerOptions1.selectableRange = `00:00:00-23:59:59`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-form-box {
  padding: 0 20px;
  .dialog-line {
    margin-bottom: 20px;
    ::v-deep .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: unset;
    }
  }
  .and {
    position: relative;
    top: -10px;
    left: 10px;
  }
  .title {
    padding-bottom: 20px;
    font-family: DINPro-Medium, Ali-Medium;
    font-size: 16px;
    color: #120d33;
    line-height: 18px;
  }
}
</style>