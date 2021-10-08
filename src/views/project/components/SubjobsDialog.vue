<template>
  <div class="subjob-dialog">
    <el-dialog
      :visible.sync="subjobVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
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
            <span>
              {{ $t(item) }}
            </span>
            <i :class="tabsIndex !== index ? 'hover' : ''"></i>
          </div>
        </div>
        <div class="wrap-view">
          <template v-if="tabsIndex === 0">
            <div class="workflow">
              <span class="lable">选择工作流</span>
              <el-select
                v-model="workflowId"
                placeholder="请选择"
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
              <span class="lable">名称</span>
              <el-input v-model="name" placeholder="请输入项目名称"></el-input>
              <span class="lable">描述（选填）</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入项目描述"
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
              ref="Dispatch"
            ></Dispatch>
          </template>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import Dispatch from './Dispatch.vue'
import { addJob, setJob, queryWorkflow } from '@/api/jobs'
@Component({
  name: 'SubjobDialog',
  components: {
    JzButton,
    Dispatch,
  },
})
export default class WorkDialog extends Vue {
  // 0. 创建 1.编辑
  private type = 0
  private subjobVisible = false
  private tabs = ['jobs.relatedWorkflow', 'jobs.baseInfor', 'jobs.dispatch']
  private tabsIndex = 0

  // 关联工作流
  private workflowOptions = []
  private workflowId = ''
  private name = ''
  private desc = ''
  private jobId = ''

  private handleTable(index: number) {
    if (!this.tabsIndex) {
      if (!this.workflowId) {
        this.$message.warning('请选择工作流')
        return false
      }
    }
    if (this.tabsIndex === 1) {
      if (!this.name) {
        this.$message.warning('请输入项目名称')
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
        this.$message.warning('请选择工作流')
        return false
      }
    }
    if (this.tabsIndex === 1) {
      if (!this.name) {
        this.$message.warning('请输入项目名称')
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
    const { beginTime, endTime, repeatInterval, repeatFlag } = data
    const { name, desc, workflowId } = this
    if (!workflowId) {
      this.$message.warning('请选择工作流')
      return false
    }
    if (!name) {
      this.$message.warning('请选择名称')
      return false
    }
    const parmams: any = {
      beginTime,
      name,
      desc,
      workflowId,
      repeatFlag: repeatFlag ? 1 : 0,
    }
    if (repeatFlag) {
      parmams['repeatInterval'] = repeatInterval
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
      const { code, msg } = await setJob({ ...parmams })
      return { code, msg }
    } else {
      const { code, msg } = await addJob({ ...parmams })
      return { code, msg }
    }
  }
  // 工作流列表
  private async getWorkflow() {
    const id = this.$route.params.id
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
        writing-mode vertical-lr
        span
          font-size: 14px;
          color: #393939;
          line-height: 18px;
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
</style>
