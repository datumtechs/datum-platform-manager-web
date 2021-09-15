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
    >
    </Table>
    <work-dialog ref="workDialog" @submit="handleSubmit"></work-dialog>
    <subjob-dialog ref="subjobDialog"></subjob-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Table from './components/Table.vue'
import JzButton from '@/components/JzButton.vue'
import WorkDialog from './components/WorkeDialog.vue'
import SubjobDialog from './components/SubjobsDialog.vue'
import { ParamsType, TableParams, QueryType } from '@/api/types'
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
        label: '名称',
        prop: 'workflowName',
      },
      {
        label: '创造者',
        prop: 'userName',
      },
      {
        label: '数据协同方',
        prop: 'authValue', // TODO 没有字段
      },
      {
        label: '创建时间',
        prop: 'createTime',
      },
    ],
    jobs: [
      {
        label: '名称',
        prop: 'name',
      },
      {
        label: '关联工作流',
        prop: 'workflowId', // 工作流ID
      },
      {
        label: '创建时间',
        prop: 'beginTime',
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
      },
      {
        lable: 'jobs.restart',
        disabled: true,
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
    const project = this.$route.params.id
    if (this.pageType === 'work') {
      this.$router.push('/project/' + project + '/workflow/' + id)
    }
    if (this.pageType === 'jobs') {
      this.$router.push('/project/' + project + '/subjob/' + id)
    }
  }
  private handleBtn(data: any) {
    const { index, row } = data
    if (this.pageType === 'work') {
      const type = index + 1
      ;(this.$refs.workDialog as any).handleOpen(type, row)
    }
    if (this.pageType === 'jobs') {
      if (!index) {
        // 编辑
        ;(this.$refs.subjobDialog as any).handleOpen(1)
        console.log('编辑')
      }
      if (index === 1) {
        // 暂停
        console.log('暂停')
      }
      if (index === 2) {
        // 重启
        console.log('重启')
      }
    }
  }

  private createWork() {
    // this.workDialog = true
    ;(this.$refs.workDialog as any).handleOpen(0)
  }
  private createJobs() {
    ;(this.$refs.subjobDialog as any).handleOpen(0)
  }
  private changeList(data: TableParams) {
    this.projectName = data.input
    this.listQuery = data.list
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
    params.projectId = this.$route.params.id
    if (projectName.length) {
      params['workflowName'] = projectName
    }
    const { data } = await getWorkflows({ ...params })
    // data.items.map((item: any) => {
    //   item.time = formatDate(new Date(item.createTime), 'Y-M-D h:m:s')
    // })
    this.list = data.items
    this.total = data.total
  }
  created() {
    this.getList()
  }
  private async handleSubmit(params: any) {
    const { type, data } = params
    console.log(type, data)
    if (type === 0) {
      const { msg } = await addWorkflow(data)
      this.$message.success(msg)
    } else if (type === 1) {
      const { msg } = await setWorkflow(data)
      this.$message.success(msg)
    } else if (type === 2) {
      const { msg } = await copyWorkflow(data)
      this.$message.success(msg)
    }
    this.getList()
  }
  private async handleDelete(id: number) {
    await delWorkflow(id)
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.work
  width: 1164px;
  padding 30px
  background #fff
  box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
  position relative
  .search-button
    position absolute
    top -57px
    right 0
</style>
