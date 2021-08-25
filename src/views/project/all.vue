<template>
  <div class="projectAll">
    <div class="title">
      {{ $t('project.title') }}
    </div>
    <div class="blick">
      <Table
        @clickName="handleName"
        @clickBtn="handleBtn"
        :list="list"
        :total="total"
        :btnList="btnList"
        :placeholder="$t('project.searchProject')"
      >
        <div slot="search-button">
          <JzButton
            type="jz-button--primary"
            :height="48"
            @click="createProject"
          >
            {{ $t('project.createProject') }}
          </JzButton>
        </div>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Table from './components/Table.vue'
import JzButton from '@/components/JzButton.vue'

@Component({
  name: 'projectAll',
  components: {
    Table,
    JzButton,
  },
})
export default class AllIndex extends Vue {
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
  private btnList = [
    {
      lable: 'project.edit',
      path: '/project/edit/',
    },
    {
      lable: 'project.manage',
      path: '/project/manage/',
    },
  ]
  get total() {
    return this.list.length
  }
  private handleName(number: number) {
    this.$router.push('/project/' + number)
  }
  private handleBtn(data: any) {
    const { index, row } = data
    const path: string = this.btnList[index]['path'] + row['number']
    this.$router.push(path)
  }
  private createProject() {
    this.$router.push('/project/create')
  }
}
</script>

<style scoped lang="stylus">
.projectAll
  margin: 20px 0 0 65px;
  .title
    margin-bottom 50px
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
</style>
