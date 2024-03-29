<template>
  <div class="work">
    <div class="search-button">
      <!-- 工作流 -->
      <template v-if="pageType === 'work'">
        <JzButton
          type="jz-button--primary"
          :width="120"
          :height="48"
          @click="createWork"
        >
          {{ $t('project.createWork') }}
        </JzButton>
      </template>
      <!-- 作业 -->
      <template v-if="pageType === 'jobs'">
        <JzButton
          type="jz-button--primary"
          :width="120"
          :height="48"
          @click="createJobs"
        >
          {{ $t('project.createJobs') }}
        </JzButton>
      </template>
    </div>
    <Table
      @clickName="handleName"
      @clickBtn="handleBtn"
      :list="list"
      :total="total"
      :keyList="keyList[pageType]"
      :btnList="btnList[pageType]"
      :placeholder="$t(placeholder)"
      @changeList="changeList"
      @clickDelete="handleDelete"
      @selectDelete="selectDelete"
    >
    </Table>
    <work-dialog ref="workDialog" @submit="handleSubmit"></work-dialog>
    <subjob-dialog ref="subjobDialog" @createJob="handleSubjob"></subjob-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Table from '@/components/JzTable.vue'
import JzButton from '@/components/JzButton.vue'
import WorkDialog from './components/WorkeDialog.vue'
import SubjobDialog from './components/SubjobsDialog.vue'
import { ParamsType, TableParams, QueryType } from '@/api/types'
import { deleteBatch } from '@/api/project'
import { jobList, actionJob, deleteJobBatch } from '@/api/jobs'
import {
  getWorkflows,
  addWorkflow,
  setWorkflow,
  delWorkflow,
  copyWorkflow,
} from '@/api/project'
import { TableNameType } from '@/api/types'

interface PlaceholderType {
  work: string
  jobs: string
}
@Component({
  name: 'projectWork',
  components: {
    JzButton,
    Table,
    WorkDialog,
    SubjobDialog,
  },
})
export default class WorkIndex extends Vue {
  private projectName = ''
  private workDialog: boolean = false
  private listQuery: QueryType = {
    current: 1,
    size: 10,
  }
  private total = 0
  private keyList = {
    work: [
      {
        label: 'table.name',
        prop: 'workflowName',
      },
      {
        label: 'table.creator',
        prop: 'userName',
      },
      // {
      //   label: '数据协同方',
      //   prop: 'authValue', // TODO 没有字段
      // },
      {
        label: 'table.creationTime',
        prop: 'createTime',
      },
    ],
    jobs: [
      {
        label: 'table.name',
        prop: 'name',
      },
      {
        label: 'table.associatedWorkflow',
        prop: 'workflowName', // 工作流ID
      },
      {
        label: 'table.creationTime',
        prop: 'createTime',
      },
    ],
  }
  private list = []
  private btnList = {
    work: [
      {
        lable: 'worke.edit',
      },
      {
        lable: 'worke.duplicate',
      },
    ],
    jobs: [
      {
        lable: 'jobs.edit',
      },
      {
        lable: 'jobs.pause',
        disabled: 'pause',
      },
      {
        lable: 'jobs.restart',
        disabled: 'restart',
      },
    ],
  }
  private placeholderList: any = {
    work: 'project.searchWork',
    jobs: 'project.searchJobs',
  }
  get pageType() {
    return this.$route.name
  }
  get placeholder() {
    const pageType: any = this.pageType
    return this.placeholderList[pageType]
  }
  private handleName(data: TableNameType) {
    const { id, name } = data
    const pid = this.$route.query.pid
    const rid = this.$route.query.rid
    const projectName = this.$route.query.name
    const wquery: any = { workflow: name, name: projectName, pid, rid, wid: id }
    if (this.pageType === 'work') {
      this.$router.push({
        path: '/project/workflow',
        query: wquery,
      })
    }
    const jquery: any = { task: name, name: projectName, pid, rid, jid: id }
    if (this.pageType === 'jobs') {
      this.$router.push({
        path: '/project/subjob',
        query: jquery,
      })
    }
  }
  private async handleBtn(data: any) {
    const { index, row } = data
    if (this.pageType === 'work') {
      const type = index + 1
      ;(this.$refs.workDialog as any).handleOpen(type, row)
    }
    if (this.pageType === 'jobs') {
      if (!index) {
        // 编辑
        ;(this.$refs.subjobDialog as any).handleOpen(1, row)
      }
      if (index === 1) {
        // 暂停
        const id = row.id
        const { code, msg } = await actionJob({
          actionType: '1',
          id,
        })
        if (code === 10000) {
          this.$message.success(msg)
        }
        this.getList()
      }
      if (index === 2) {
        // 重启
        const id = row.id
        const { code, msg } = await actionJob({
          actionType: '2',
          id,
        })
        if (code === 10000) {
          this.$message.success(msg)
        }
        this.getList()
      }
    }
  }
  private async selectDelete(id: number[]) {
    const ids = id.join()
    if (this.pageType === 'jobs') {
      const { msg, code } = await deleteJobBatch({ jobIds: id })
      if (code === 10000) {
        this.$message.success(msg)
        this.getList()
      }
    }
    if (this.pageType === 'work') {
      const { msg, code } = await deleteBatch({ ids })
      if (code === 10000) {
        this.$message.success(msg)
        this.getList()
      }
    }
  }
  private createWork() {
    if (Number(this.$route.query.role) === 3) {
      const tips: any = this.$t('tips.noAddAuth')
      this.$message.warning(tips)
      return true
    }
    // this.workDialog = true
    ;(this.$refs.workDialog as any).handleOpen(0)
  }
  private createJobs() {
    if (Number(this.$route.query.role) === 3) {
      const tips: any = this.$t('tips.noAddAuth')
      this.$message.warning(tips)
      return true
    }
    ;(this.$refs.subjobDialog as any).handleOpen(0)
  }
  private changeList(data: TableParams) {
    this.projectName = data.input
    this.listQuery = data.list
    this.getList()
  }
  private handleSubjob() {
    this.getList()
  }
  private async getList() {
    // 过滤空格
    const projectName = this.projectName.replace(/\s+/g, '')
    const params: ParamsType = {
      current: 1,
      size: 6,
    }
    const { current, size } = this.listQuery
    params.current = current
    params.size = size
    params.projectId = this.$route.query.pid
    if (this.pageType === 'work') {
      if (projectName.length) {
        params['workflowName'] = projectName
      }
      const { data } = await getWorkflows({ ...params })
      this.list = data.items
      this.total = data.total
    }
    if (this.pageType === 'jobs') {
      if (projectName.length) {
        params['jobName'] = projectName
      }
      const { data } = await jobList({ ...params })
      data.items.map((item: any) => {
        item.btnStatus = item.jobStatus
      })
      this.list = data.items
      this.total = data.total
    }
    // data.items.map((item: any) => {
    //   item.time = formatDate(new Date(item.createTime), 'Y-M-D h:m:s')
    // })
  }
  created() {
    this.getList()
  }
  private async handleSubmit(params: any) {
    if (!params) return
    const { type, data } = params
    let res
    if (type === 0) {
      res = await addWorkflow(data)
    } else if (type === 1) {
      res = await setWorkflow(data)
    } else if (type === 2) {
      res = await copyWorkflow(data)
    }
    if (res.code === 10000) {
      this.$message.success(res.msg)
    }
    this.getList()
  }
  private async handleDelete(id: number) {
    if (this.pageType === 'work') {
      await delWorkflow(id)
      this.getList()
    }
    // 删除作业
    if (this.pageType === 'jobs') {
      await deleteJobBatch({ jobIds: [id] })
      this.getList()
    }
  }
  @Watch('$route')
  private onRouteChange(route: any) {
    this.list = []
    this.total = 0
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.work
  width: 1164px;
  padding 30px
  box-sizing: border-box
  background #fff
  box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
  position relative
  .search-button
    position absolute
    top -57px
    right 0
</style>
