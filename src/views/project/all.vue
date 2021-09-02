<template>
  <div class="projectAll">
    <div class="project-wrap">
      <div class="title">
        <div class="title-info">
          {{ $t('project.title') }}
        </div>
        <div class="search-button">
          <JzButton
            type="jz-button--primary"
            :width="116"
            :height="41"
            @click="createProject"
          >
            {{ $t('project.createProject') }}
          </JzButton>
        </div>
      </div>
      <div class="block">
        <Table
          @clickName="handleName"
          @clickBtn="handleBtn"
          :list="list"
          :total="total"
          :btnList="btnList"
          :keyList="keyList"
          :placeholder="$t('project.searchProject')"
        >
        </Table>
      </div>
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
  private keyList = [
    {
      label: '名称',
      prop: 'projectName',
    },
    {
      label: '创建者',
      prop: 'userName',
    },
    {
      label: '创建时间',
      prop: 'createTime',
    },
  ]
  private list = [
    {
      id: 1,
      createTime: '2016-05-02',
      projectName: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 2,
      createTime: '2016-05-02',
      projectName: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 3,
      createTime: '2016-05-02',
      projectName: '王小虎',
      describe: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 4,
      createTime: '2016-05-02',
      projectName: '王小虎',
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
  margin: 20px auto
  width 1200px
  .project-wrap
    padding 0 30px
    .title
      .title-info
        margin-top 35px
        margin-bottom 5px
        font-weight: 400;
        font-style: normal;
        font-size: 24px;
      .search-button
        display flex
        justify-content: flex-end;
        margin-bottom 20px
    .block
      background #fff
      box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
      padding 30px
</style>
