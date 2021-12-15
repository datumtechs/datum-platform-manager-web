<template>
  <div class="subjob">
    <Table
      :pathName="false"
      @clickBtn="handleBtn"
      :list="list"
      :total="total"
      :btnList="btnList"
      :keyList="subjobKey"
      @changeList="changeList"
      @clickDelete="handleDelete"
      @selectDelete="selectDelete"
      :placeholder="$t('jobs.serach')"
    >
    </Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Table from '@/components/JzTable.vue'
import JzButton from '@/components/JzButton.vue'
import { ParamsType, TableParams, QueryType } from '@/api/types'
import { subJoblist, subJobaction, subDeleteBatch } from '@/api/jobs'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'
import { AppModule } from '@/store/modules/app'
@Component({
  name: 'subjob',
  components: {
    Table,
    JzButton,
  },
})
export default class subjobIndex extends Vue {
  private btnList = [
    {
      lable: 'jobs.pause',
      disabled: 'pause',
    },
    {
      lable: 'jobs.restart',
      disabled: 'restart',
    },
  ]
  private stateList: any = {
    zh: ['未开始', '运行中', '运行成功', '运行失败'],
    en: ['not started', 'in progress', 'failed', 'success'],
  }
  private subjobKey = [
    {
      label: 'table.id',
      prop: 'id',
    },
    {
      label: 'table.status',
      prop: 'state', // 0-未开始,1-运行中,2-运行成功,3-运行失败
    },
    {
      label: 'table.startTime',
      prop: 'beginTime',
    },
    {
      label: 'table.endTime',
      prop: 'endTime',
    },
    {
      label: 'table.duration',
      prop: 'runTime',
    },
  ]
  private projectName = ''
  private list = []
  private total = 0
  private listQuery: QueryType = {
    current: 1,
    size: 10,
  }
  get language() {
    return AppModule.language
  }
  private async getList() {
    const { language } = this
    // 过滤空格
    const subJobId = this.projectName.replace(/\s+/g, '')
    const project = this.$route.params.id
    const jobId = this.$route.params.subjob
    const params: ParamsType = {
      current: 1,
      size: 6,
      jobId: jobId,
      subJobId: subJobId,
    }
    const { current, size } = this.listQuery
    params.current = current
    params.size = size
    params.projectId = this.$route.params.id
    const { data } = await subJoblist({ ...params })
    data.items.map((item: any) => {
      item.state = this.stateList[language][item.subJobStatus]
      item.btnStatus = item.subJobStatus
    })
    this.list = data.items
    this.total = data.total
  }
  private changeList(data: TableParams) {
    this.projectName = data.input
    this.listQuery = data.list
    this.getList()
  }
  private async handleBtn(data: any) {
    const { index, row } = data
    // 1 暂停 2 重启
    const actionType = index ? '2' : '1'
    const id = row.id
    await subJobaction({
      actionType,
      id,
    })
    this.getList()
  }
  // 删除子作业
  private async handleDelete(id: number) {
    const { code, msg } = await subDeleteBatch({ subJobIds: id })
    if (code === 10000) {
      this.$message.success(msg)
      this.getList()
    }
  }
  private async selectDelete(id: number[]) {
    const { code, msg } = await subDeleteBatch({ subJobIds: id })
    if (code === 10000) {
      this.$message.success(msg)
      this.getList()
    }
  }
  created() {
    this.getList()
    const name = this.$route.query.task
    BreadcrumbModule.SET_SUBJOB(name)
  }
}
</script>

<style scoped lang="stylus">
.subjob
  padding 30px
  background #fff
  box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
</style>
