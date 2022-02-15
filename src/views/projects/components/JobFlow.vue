<template>
  <EditDialog
    v-loading="loading"
    win-width="600px"
    class="edit-dialog"
    :show-footer="false"
    :close-on-click-modal="false"
    :show="showAddDialog"
    :title="$t('projects.createJob')"
    @handleClose="handleClose"
  >
    <div slot="content">
      <JobStep :step="curStep" />
      <el-form ref="infoForm" label-position="top" :model="jobForm">
        <div v-if="curStep === 1">
          <div class="content-box">
            <el-form-item
              prop="workflow"
              :label="`${$t('common.choose') + $t('projects.workflows')}`"
              :rules="selectTules"
            >
              <el-select v-model="jobForm.workflow" size="small" class="select-box">
                <el-option v-for="item in workflowList" :key="item.id" :label="item.workflowName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="btn-box">
            <el-button type="primary" class="next-btn" @click="nextFn">{{ $t('projects.nextStep') }}</el-button>
          </div>
        </div>
        <div v-if="curStep === 2">
          <div class="content-box">
            <el-form-item prop="name" :label="$t('common.name')" :rules="rules">
              <el-input v-model="jobForm.name" size="small" class="select-box"></el-input>
            </el-form-item>
            <el-form-item :label="$t('projects.desc')">
              <el-input v-model="jobForm.desc" rows="3" type="textarea" size="small" class="select-box"></el-input>
            </el-form-item>
          </div>
          <div class="btn-box">
            <el-button class="next-btn" @click="previousFn">{{ $t('projects.previous') }}</el-button>
            <el-button type="primary" class="next-btn" @click="nextFn">{{ $t('projects.nextStep') }}</el-button>
          </div>
        </div>
        <div v-if="curStep === 3">
          <!-- <div> -->
          <div class="content-box">
            <div class="content-line">
              <el-form-item :label="$t('projects.startTime')" prop="startTime" :rules="dateRules">
                <div class="date-box">
                  <el-date-picker
                    ref="pickerDate"
                    key="jobFormStartTimeDate"
                    v-model="jobForm.startTime.date"
                    size="small"
                    class="input-date"
                    :format="dateFormat"
                    :value-format="dateFormat"
                    :placeholder="$t('tip.selectStartDate')"
                    type="date"
                    :picker-options="dataPickerOptions"
                    @change="datePickerChange"
                  >
                  </el-date-picker>
                  <el-time-picker
                    v-model="jobForm.startTime.time"
                    :disabled="!jobForm.startTime.date"
                    size="small"
                    :format="timeFormat"
                    :value-format="timeFormat"
                    :placeholder="$t('tip.selectStartTime')"
                    class="input-date"
                    :picker-options="timePickerOptions"
                    @change="timePickerChange"
                  >
                  </el-time-picker>
                </div>
              </el-form-item>
            </div>
            <div class="content-line">
              <!-- // 产品反馈底层暂时未实现 TODO后期再加上 2021-12-02 -->
              <el-form-item>
                <p class="title-box">
                  <el-checkbox id="male-checkbox" v-model="jobForm.repeatFlag"></el-checkbox>
                  {{ $t('projects.repeatRule') }}
                </p>
                <div v-if="jobForm.repeatFlag" class="date-box">
                  <span class="data-box-text">{{ $t('common.every') }}</span>
                  <el-input-number
                    v-model="jobForm.repeat.value"
                    size="small"
                    :min="1"
                    label="描述文字"
                  ></el-input-number>
                  <el-select v-model="jobForm.repeat.unit" size="small">
                    <el-option
                      v-for="item in timeTypeList"
                      :key="item.id"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div v-if="jobForm.repeatFlag" class="content-line">
              <el-form-item prop="endTime" :rules="dateRules2">
                <p class="title-box">
                  <el-checkbox v-model="jobForm.endTimeFlag"></el-checkbox>
                  {{ $t('projects.endTime') }}
                </p>
                <div class="date-box">
                  <el-date-picker
                    key="jobFormEndTimeDate"
                    v-model="jobForm.endTime.date"
                    size="small"
                    class="input-date"
                    :placeholder="$t('tip.selectEndDate')"
                    type="date"
                    :disabled="!jobForm.startTime.time"
                    :format="dateFormat"
                    :value-format="dateFormat"
                    :picker-options="dataPickerOptions1"
                    @change="datePickerChange1"
                  >
                  </el-date-picker>
                  <el-time-picker
                    v-model="jobForm.endTime.time"
                    :disabled="!jobForm.endTime.date"
                    size="small"
                    :format="timeFormat"
                    :value-format="timeFormat"
                    :placeholder="$t('tip.selectEndTime')"
                    class="input-date"
                    :picker-options="timePickerOptions1"
                  >
                  </el-time-picker>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="btn-box">
            <el-button class="next-btn" @click="previousFn">{{ $t('projects.previous') }}</el-button>
            <el-button type="primary" class="next-btn" @click="validate">{{ $t('projects.create') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </EditDialog>
</template>
<script>
import { projectApi } from 'apis'
import projectMixin from './mixin'
import EditDialog from './EditDialog.vue'
import JobStep from './JobStep.vue'
import { mapMutations } from 'vuex'
const jobForm = {
  name: '',
  desc: '',
  workflow: '',
  endTimeFlag: false,
  repeatFlag: false,
  startTime: {
    date: '',
    time: ''
  },
  endTime: {
    date: '',
    time: ''
  },
  repeat: {
    value: 1,
    unit: 'min'
  }
}
export default {
  components: { EditDialog, JobStep },
  mixins: [ projectMixin ],
  props: {
    showAddDialog: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: String,
      default: ''
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
      loading: false,
      workflowList: [],
      curStep: 1,
      jobForm: { ...jobForm },
      dateFormat: 'yyyy-MM-dd',
      timeFormat: 'HH:mm:ss',
      timestamp,
      dataPickerOptions: {
        disabledDate (time) {
          return time.getTime() < timestamp
        }
      },
      dataPickerOptions1: {
        disabledDate (time) {
          return time.getTime() < new Date(`${self.jobForm.startTime.date} 00:00:00`).getTime()
        }
      },
      timePickerOptions: {
        selectableRange: '00:00:00-23:59:59'
      },
      timePickerOptions1: {
        selectableRange: '00:00:00-23:59:59'
      },
      dateRules: [
        // dateRules 必填验证
        {
          required: true,
          // eslint-disable-next-line no-empty-pattern
          validator: ({}, value, callback) => {
            if (!value.date) {
              callback(new Error(`${self.$t('tip.selectStartDate')}`))
            } else if (!value.time) {
              callback(new Error(`${self.$t('tip.selectStartTime')}`))
            } else {
              callback()
            }
          }
        }
      ],
      dateRules2: [
        {
          // eslint-disable-next-line no-empty-pattern
          validator: ({}, value, callback) => {
            if (value.date && !value.time) {
              callback(new Error(`${self.$t('tip.selectEndTime')}`))
            } else {
              callback()
            }
          }
        }
      ]
    }
  },
  computed: {
    timeTypeList () {
      return [ { id: 1, value: 'min', label: this.$t('common.minute') } ]
    },
    isInWorkflowEdit () {
      return this.$route.name === 'workflowEdit'
    }
  },
  mounted () {
    this.queryFlowList()
  },
  methods: {
    ...mapMutations('workflow', [ 'SET_CUR_WORKFLOW' ]),
    nextFn () {
      this.validateCom(() => this.curStep++)
    },
    previousFn () {
      this.clearValidate()
      this.curStep--
    },
    validate () {
      this.validateCom(this.createFn)
    },
    validateCom (cd) {
      this.$refs['infoForm'].validate(valid => {
        if (valid) {
          cd()
        }
      })
    },
    queryFlowList () {
      this.loading = true
      projectApi
        .queryWorkflowlist({
          projectId: this.projectId,
          current: 1,
          size: 100,
          workflowName: ''
        })
        .then(res => {
          this.loading = false
          const { code, data } = res
          if (code === 10000) {
            this.workflowList = data.items
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    resetJobDate () {
      try {
        this.$refs['infoForm'].resetField()
      } catch {
        console.log('this.$refs.infoForm出错了')
      }
      this.jobForm = { ...jobForm }
      this.jobForm.startTime.date = ''
      this.jobForm.endTime.date = ''
      this.jobForm.startTime.time = ''
      this.jobForm.endTime.time = ''
    },
    handleClose () {
      this.resetJobDate()
      this.close()
    },
    close () {
      this.curStep = 1
      this.$emit('update:showAddDialog', false)
    },
    datePickerChange () {
      this.jobForm.endTime.date = ''
      this.jobForm.endTime.time = ''
      if (!this.jobForm.startTime.date) {
        this.jobForm.startTime.time = ''
      }
    },
    timePickerChange () {
      this.jobForm.endTime.time = ''
      if (!this.jobForm.startTime.time) {
        this.jobForm.endTime.date = ''
      }
    },
    datePickerChange1 () {
      this.jobForm.endTime.time = ''
      const timestamp1 = new Date(`${this.jobForm.startTime.date} 00:00:00`).getTime()
      const timestamp2 = new Date(`${this.jobForm.endTime.date} 00:00:00`).getTime()
      if (timestamp1 === timestamp2) {
        this.timePickerOptions1.selectableRange = `${this.jobForm.startTime.time}-23:59:59`
      } else {
        this.timePickerOptions1.selectableRange = `00:00:00-23:59:59`
      }
    },
    createFn () {
      projectApi
        .addJob({
          beginTime: this.jobForm.startTime.date + ' ' + this.jobForm.startTime.time,
          desc: this.jobForm.desc,
          endTime: this.jobForm.endTimeFlag ? this.jobForm.endTime.date + ' ' + this.jobForm.endTime.time : '',
          endTimeFlag: this.jobForm.endTimeFlag ? 1 : 0,
          name: this.jobForm.name,
          repeatFlag: this.jobForm.repeatFlag ? 1 : 0,
          repeatInterval: this.jobForm.repeat.value, // 默认分钟
          workflowId: this.jobForm.workflow
        })
        .then(res => {
          const { code, msg } = res
          if (code === 10000) {
            this.close()
            this.$message.success(msg)
            this.resetJobDate()
            if (this.isInWorkflowEdit) {
              this.SET_CUR_WORKFLOW('jobs')
              this.$router.push({
                name: 'projectView'
              })
            }
            this.$emit('initData')
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-dialog {
  ::v-deep .el-dialog {
    min-height: 325px;
  }
  .content-box {
    margin: 20px auto;
    width: 100%;
    .content-line {
      margin-bottom: 22px;
      // &:last-child {
      // margin-bottom: 76px;
      // }
    }
    .date-box {
      white-space: nowrap;
      display: flex;
      gap: 10px;
      align-items: center;
      .input-date {
        width: 265px;
      }
      .data-box-text {
        line-height: 32px;
      }
    }
    .title-box {
      font-size: 12px;
      color: #333333;
      line-height: 12px;
      margin-bottom: 10px;
    }
    .select-box {
      width: 100%;
    }
  }
  .btn-box {
    // position: absolute;
    // bottom: 20px;
    // right: 30px;
    display: flex;
    justify-content: flex-end;
    .next-btn {
      width: 120px;
      height: 36px;
      border: 1px solid #3c3588;
      border-radius: 2px;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 12px;
    }
    :nth-child(2) {
      margin-left: 20px;
    }
  }
}
.content-box-title {
  margin-bottom: 20px;
  font-family: DINPro-Medium, Ali-Medium;
  font-size: 16px;
  color: #120d33;
  letter-spacing: 0;
  line-height: 18px;
}
</style>