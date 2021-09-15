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
          @clickDelete="handleDelete"
          @selectDelete="selectDelete"
          :list="list"
          :total="total"
          :btnList="btnList"
          :keyList="keyList"
          :placeholder="$t('project.searchProject')"
          @changeList="changeList"
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
import { getProject, delProject, delProjects } from '@/api/project'
import { ParamsType, TableParams, QueryType } from '@/api/types'
import { formatDate } from '@/utils/format'
import { TableNameType } from '@/api/types'
@Component({
  name: 'projectAll',
  components: {
    Table,
    JzButton,
  },
})
export default class AllIndex extends Vue {
  private projectName = ''
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
      prop: 'time',
    },
  ]
  private list = []
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
  private listQuery: QueryType = {
    current: 1,
    size: 10,
  }
  private total = 0
  private handleName(data: TableNameType) {
    const { id, name } = data
    console.log(id, name)
    this.$router.push({
      path: '/project/' + id,
      // query: { name },
    })
  }
  private handleBtn(data: any) {
    const { index, row } = data
    const path: string = this.btnList[index]['path'] + row['id']
    this.$router.push(path)
  }
  private createProject() {
    this.$router.push('/project/create')
  }
  private changeList(data: TableParams) {
    this.projectName = data.input
    this.listQuery = data.list
    this.getList()
  }
  private async handleDelete(id: number) {
    const { msg } = await delProject({ id })
    this.$message.success(msg)
    this.getList()
  }
  private async selectDelete(ids: number[]) {
    if (!ids.length) return
    const params = ids.join(',')
    console.log(params)
    const { msg } = await delProjects({ ids: params })
    this.$message.success(msg)
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
    if (projectName.length) {
      params['projectName'] = projectName
    }
    const { data } = await getProject({ ...params })
    data.items.map((item: any) => {
      item.time = formatDate(new Date(item.createTime), 'Y-M-D h:m:s')
    })
    this.list = data.items
    this.total = data.total
  }
  created() {
    this.getList()
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
