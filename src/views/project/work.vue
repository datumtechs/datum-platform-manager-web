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
        <template v-if="pageType === 'work'">
          <JzButton type="jz-button--primary" :width="120" :height="48">
            {{ $t('project.createWork') }}
          </JzButton>
        </template>
        <template v-if="pageType === 'jobs'">
          <JzButton type="jz-button--primary" :width="120" :height="48">
            {{ $t('project.createJobs') }}
          </JzButton>
        </template>
      </div>
    </Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Table from './components/Table.vue'
import JzButton from '@/components/JzButton.vue'
interface PlaceholderType {
  work: string
  jobs: string
}
@Component({
  name: 'projectWork',
  components: {
    JzButton,
    Table,
  },
})
export default class WorkIndex extends Vue {
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
  }
  private handleBtn(data: any) {
    const { index, row } = data
    console.log(data)
    // this.$router.push(path)
  }
}
</script>

<style scoped lang="stylus">
.work
  margin 20px 60px
</style>
