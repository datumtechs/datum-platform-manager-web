<template>
  <!-- 创建作业 -->
  <div class="subjob-dialog">
    <el-dialog
      :visible.sync="subjobVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
      :modal="modalState"
    >
      <div class="wrap">
        <div class="wrap-tab">
          <div
            class="tab-item"
            v-for="(item, index) in tabs"
            :key="index"
            :class="tabsIndex === index ? 'avtive' : ''"
            @click="handleTable(index)"
          >
            <span
              :class="[
                !index && isEnglish ? 'first-info' : '',
                isEnglish ? 'span-en' : '',
              ]"
            >
              {{ $t(item) }}
            </span>
            <i :class="tabsIndex !== index ? 'hover' : ''"></i>
          </div>
        </div>
        <div class="wrap-view">
          <template v-if="tabsIndex === 0">
            <div class="workflow">
              <span class="lable">{{ $t('project.selectWorkflow') }}</span>
              <el-select
                v-model="workflowId"
                :placeholder="$t('project.selectWorkflowP')"
                :disabled="type === 1"
                class="workflowInfo"
              >
                <el-option
                  v-for="item in workflowOptions"
                  :key="item.value"
                  :label="item.workflowName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <div class="workflow-btn">
                <jz-button
                  type="jz-button--primary"
                  align="left"
                  :height="40"
                  :width="120"
                  @click="handleNext"
                  class="submit"
                >
                  {{ $t('jobs.next') }}
                </jz-button>
              </div>
            </div>
          </template>
          <template v-if="tabsIndex === 1">
            <div class="baseInfor">
              <span class="lable">{{ $t('project.name') }}</span>
              <el-input
                v-model="name"
                :placeholder="$t('tips.jobName')"
              ></el-input>
              <span class="lable">{{ $t('project.descriptionOptional') }}</span>
              <el-input
                type="textarea"
                :rows="3"
                :placeholder="$t('tips.jobNameDes')"
                v-model="desc"
              >
              </el-input>
              <div class="baseInfor-btn">
                <jz-button
                  type="jz-button--primary"
                  align="left"
                  :height="40"
                  :width="100"
                  @click="handleNext"
                  class="submit"
                >
                  {{ $t('jobs.next') }}
                </jz-button>
                <jz-button
                  :height="40"
                  :width="100"
                  align="left"
                  @click="handlePrevious"
                >
                  {{ $t('jobs.previous') }}
                </jz-button>
              </div>
            </div>
          </template>
          <template>
            <Dispatch
              v-show="tabsIndex === 2"
              @create="handleCreate"
              @previous="handlePrevious"
              :type="type"
              ref="Dispatch"
            ></Dispatch>
          </template>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import Dispatch from './Dispatch.vue'
import { addJob, setJobBase, queryWorkflow } from '@/api/jobs'
import { AppModule } from '@/store/modules/app'
@Component({
  name: 'SubjobDialog',
  components: {
    JzButton,
    Dispatch,
  },
})
export default class WorkDialog extends Vue {
  // 是否遮罩层
  @Prop({ default: true }) private modalState!: boolean

  // 0. 创建 1.编辑
  private type = 0
  private subjobVisible = false
  private tabs = ['jobs.relatedWorkflow', 'jobs.baseInfor', 'jobs.dispatch']
  private tabsIndex = 0

  // 关联工作流
  private workflowOptions = []
  private workflowId: string | number = ''
  private name = ''
  private desc = ''
  private jobId = ''
  get isEnglish() {
    return AppModule.language === 'en'
  }
  private handleTable(index: number) {
    if (!this.tabsIndex) {
      if (!this.workflowId) {
        const tips: any = this.$t('tips.workflowName')
        this.$message.warning(tips)
        return false
      }
    }
    if (this.tabsIndex === 1) {
      if (!this.name) {
        const tips: any = this.$t('tips.jobName')
        this.$message.warning(tips)
        return false
      }
      if (this.name.length > 30) {
        const tips: any = this.$t('tips.maxJobName')
        this.$message.warning(tips)
        return false
      }
      if (this.desc.length > 200) {
        const tips: any = this.$t('tips.maxJobInfo')
        this.$message.warning(tips)
        return false
      }
    }
    this.tabsIndex = index
  }
  private handleOpen(type: number, row?: any) {
    this.type = type
    // 创建
    if (!type) {
      this.name = ''
      this.desc = ''
      this.workflowId = ''
      this.subjobVisible = true
      setTimeout(() => {
        const dom = this.$refs as any
        if (dom && dom.Dispatch && dom.Dispatch.resetTime) {
          dom.Dispatch.resetTime()
        }
        const route = this.$route
        if (route.name === 'workflow') {
          this.workflowId = Number(route.query.wid)
        }
      }, 13)
    } else {
      // 编辑
      this.name = row.name
      this.desc = row.desc
      this.workflowId = row.workflowId
      this.jobId = row.id
      this.subjobVisible = true
      setTimeout(() => {
        const dom = this.$refs as any
        if (dom && dom.Dispatch && dom.Dispatch.handleEcho) {
          dom.Dispatch.handleEcho(row)
        }
      }, 13)
    }
  }
  // 下一步
  private handleNext() {
    if (!this.tabsIndex) {
      if (!this.workflowId) {
        const tips: any = this.$t('tips.workflowName')
        this.$message.warning(tips)
        return false
      }
    }
    if (this.tabsIndex === 1) {
      if (!this.name) {
        const tips: any = this.$t('tips.jobName')
        this.$message.warning(tips)
        return false
      }
      if (this.name.length > 30) {
        const tips: any = this.$t('tips.maxJobName')
        this.$message.warning(tips)
        return false
      }
      if (this.desc.length > 200) {
        const tips: any = this.$t('tips.maxJobInfo')
        this.$message.warning(tips)
        return false
      }
    }
    this.tabsIndex++
  }
  private handlePrevious() {
    this.tabsIndex--
  }
  private handleClose() {
    this.subjobVisible = false
    this.tabsIndex = 0
    const dom = this.$refs as any
    if (dom && dom.Dispatch && dom.Dispatch.resetTime) {
      dom.Dispatch.resetTime()
    }
  }
  // 创建作业
  @Emit('createJob')
  private async handleCreate(data: any) {
    if (!data) return
    const { beginTime, endTime, repeatInterval, repeatFlag, endRadio } = data
    const { name, desc, workflowId } = this
    if (!workflowId) {
      const tips: any = this.$t('tips.workflowName')
      this.$message.warning(tips)
      return false
    }
    if (!name) {
      const tips: any = this.$t('tips.jobName')
      this.$message.warning(tips)
      return false
    }
    if (this.name.length > 30) {
      const tips: any = this.$t('tips.maxJobName')
      this.$message.warning(tips)
      return false
    }
    if (this.desc.length > 200) {
      const tips: any = this.$t('tips.maxJobInfo')
      this.$message.warning(tips)
      return false
    }
    const parmams: any = {
      beginTime,
      name,
      desc,
      workflowId,
      repeatFlag: repeatFlag ? 1 : 0,
      endTimeFlag: endRadio ? 1 : 0,
    }
    if (repeatFlag) {
      parmams['repeatInterval'] = repeatInterval
    }
    // 勾选结束时间
    if (endRadio) {
      parmams['endTime'] = endTime
    }
    if (this.type) {
      parmams['id'] = this.jobId
    }
    const { code, msg } = await this.postApi(parmams)
    if (code === 10000) {
      this.$message.success(msg)
      this.subjobVisible = false
      return true
    }
    this.subjobVisible = false
  }
  private async postApi(parmams: any) {
    if (this.type) {
      const data = {
        id: parmams.id,
        name: parmams.name,
        desc: parmams.desc,
      }
      const { code, msg } = await setJobBase(data)
      return { code, msg }
    } else {
      const { code, msg } = await addJob({ ...parmams })
      return { code, msg }
    }
  }
  // 工作流列表
  private async getWorkflow() {
    const id = this.$route.query.pid
    const params = {
      projectId: id,
    }
    const { data } = await queryWorkflow(params)
    this.workflowOptions = data
  }
  created() {
    this.getWorkflow()
  }
}
</script>

<style scoped lang="stylus">
.subjob-dialog
  >>> .el-dialog
        margin-top 25vh!important
        width 576px!important
  >>> .el-dialog__header
        padding 0!important
        background-color #fff!important
  >>> .el-dialog__body
        padding 0!important
  .wrap
    width 100%
    height 360px
    display flex
    .wrap-tab
      width 50px
      display flex
      flex-direction column
      .tab-item
        flex 1
        width 100%
        padding: 0 15px;
        box-sizing border-box
        cursor pointer
        position relative
        text-align: center;
        writing-mode vertical-rl
        span
          font-size: 14px;
          color: #393939;
          line-height: 18px;
        .span-en
          display block
          transform: rotate(-180deg)
        .first-info
          width 26px
          height: 72%
          margin-top 14%
        i.hover
          position absolute
          left 0px
          top 0
          width 3px
          height 100%
          background #867b7b
          display none
      .avtive
        background rgba(224, 224, 224, 1)
        border-left 3px solid #0353e9
      .tab-item:hover .hover
        display block
    .wrap-view
      flex 1
      background rgba(224, 224, 224, 1)
      .workflow,.baseInfor
        padding 40px
        width: 280px;
        .lable
          display block
          margin-bottom 10px
        .workflowInfo
          width 100%
        >>> .el-input__inner
              height 42px!important
              line-height 42px!important
        .workflow-btn
          margin-top 120px
      .baseInfor
        .lable
          margin-top 10px
        .baseInfor-btn
          margin-top 45px
          .submit
            margin-right 40px
        >>> .el-textarea textarea
              resize: none;
</style>
