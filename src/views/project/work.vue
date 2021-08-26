<template>
  <div class="work">
    <Table
      @clickName="handleName"
      @clickBtn="handleBtn"
      :list="list"
      :total="total"
      :btnList="btnList[pageType]"
      :placeholder="$t(placeholder)"
    >
      <div slot="search-button">
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
    </Table>
    <work-dialog ref="workDialog"></work-dialog>
    <subjob-dialog ref="subjobDialog"></subjob-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Table from './components/Table.vue'
import JzButton from '@/components/JzButton.vue'
import WorkDialog from './components/work-dialog.vue'
import SubjobDialog from './components/subjob-dialog.vue'
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
  private workDialog: boolean = false
  private list = [
    {
      number: 1,
      field: '2016-05-02',
      type: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      number: 2,
      field: '2016-05-02',
      type: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      number: 3,
      field: '2016-05-02',
      type: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      number: 4,
      field: '2016-05-02',
      type: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
  ]
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
  get total() {
    return this.list.length
  }
  private handleName(number: number) {
    if (this.pageType === 'work') {
      const id = this.$route.params.id
      this.$router.push('/project/' + id + '/workflow/' + number)
    }
    if (this.pageType === 'jobs') {
      const id = this.$route.params.id
      this.$router.push('/project/' + id + '/subjob/' + number)
    }
  }
  private handleBtn(data: any) {
    const { index, row } = data
    console.log(data)
    if (this.pageType === 'work') {
      const type = index + 1
      ;(this.$refs.workDialog as any).handleOpen(type, row)
    }
    if(this.pageType === 'jobs'){
      if(!index){
        // 编辑
        console.log('编辑')
      }
      if(index === 1){
        // 暂停
        console.log('暂停')
      }
      if(index === 2){
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
}
</script>

<style scoped lang="stylus">
.work
  margin 20px 60px
</style>
