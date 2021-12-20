<template>
  <div class="setup">
    <div class="setup-wrap">
      <jz-nav
        type="project"
        :tabs="tabs"
        @clickTable="handleTable"
        :tabIndex="tabIndex"
      ></jz-nav>
      <div class="search-button" v-if="tabIndex">
        <JzButton
          type="jz-button--primary"
          :width="120"
          :height="48"
          @click="addMember"
        >
          {{ $t('project.participant') }}
        </JzButton>
      </div>
      <div class="wrap">
        <!-- 编辑 -->
        <template v-if="!tabIndex">
          <Edit> </Edit>
        </template>
        <!-- 管理成员 -->
        <template v-else>
          <Table
            @clickBtn="handleBtn"
            @clickDelete="handleDelete"
            @selectDelete="selectDelete"
            :list="list"
            :total="total"
            :btnList="btnList"
            :placeholder="$t('project.searchCollaborators')"
            :pathName="false"
            :keyList="keyList"
            @changeList="changeList"
            tableId="memberId"
          >
          </Table>
          <MemberDialog
            ref="MemberDialog"
            @clickSubmit="clickSubmit"
          ></MemberDialog>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzNav from '@/components/JzNav.vue'
import Edit from './components/Edit.vue'
import Table from '@/components/JzTable.vue'
import JzButton from '@/components/JzButton.vue'
import MemberDialog from './components/MemberDialog.vue'
import { getMember, delProjMember, delProjMembers } from '@/api/project'
import { ParamsType, TableParams, QueryType } from '@/api/types'
import { formatDate } from '@/utils/format'
import { roleOptionMap } from '@/status'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'projectSetup',
  components: {
    JzNav,
    Edit,
    Table,
    JzButton,
    MemberDialog,
  },
})
export default class SetupIndex extends Vue {
  private userName = ''
  private listQuery: QueryType = {
    current: 1,
    size: 10,
  }
  private total = 0
  private keyList = [
    {
      label: 'table.nickname',
      prop: 'userName',
    },
    {
      label: 'table.role',
      prop: 'roleName',
    },
    {
      label: 'table.creationTime',
      prop: 'time',
    },
  ]
  private list = []
  private btnList = [
    {
      lable: 'worke.edit',
    },
  ]
  get language() {
    return AppModule.language
  }
  get queryId() {
    return Number(this.$route.query.pid)
  }
  private tabs: string[] = ['edit', 'manage']
  private tabIndex = 0
  // 点击tab 跳转对应页面
  private handleTable(index: number) {
    const { pid, rid } = this.$route.query
    const query: any = {
      pid,
      rid,
    }
    if (this.tabIndex !== index) {
      this.tabIndex = index
      const type = this.tabIndex ? 'manage' : 'edit'
      this.$router.push({
        path: `/project/${type}`,
        query,
      })
    }
  }
  private handleBtn(data: any) {
    const list: number[] = this.list.map((item: any) => item.userId)
    ;(this.$refs.MemberDialog as any).handleOpen(1, list, data.row)
  }
  private clickSubmit(state: boolean) {
    if (state) {
      this.getList()
    }
  }
  private addMember() {
    const list: number[] = this.list.map((item: any) => item.userId)
    ;(this.$refs.MemberDialog as any).handleOpen(0, list)
  }
  private async handleDelete(id: number) {
    const { msg } = await delProjMember({ projMemberId: id })
    this.$message.success(msg)
    this.getList()
  }
  private async selectDelete(ids: number[]) {
    if (!ids.length) return
    const params = ids.join(',')
    const { msg } = await delProjMembers({ projMemberIds: params })
    this.$message.success(msg)
    this.getList()
  }
  private changeList(data: TableParams) {
    this.userName = data.input
    this.listQuery = data.list
    this.getList()
  }
  private async getList() {
    const userName = this.userName.replace(/\s+/g, '')
    const params: ParamsType = {
      current: 1,
      size: 10,
      projectId: this.queryId,
    }
    const { current, size } = this.listQuery
    params.current = current
    params.size = size
    if (userName.length) {
      params['userName'] = userName
    }
    const { data } = await getMember({ ...params })
    const { language } = this
    data.items.map((item: any) => {
      item.time = formatDate(new Date(item.createTime), 'Y-M-D h:m:s')
      item.roleName = roleOptionMap[language][item.role]
    })
    this.list = data.items
    this.total = data.total
  }
  created() {
    this.tabIndex = this.$route.name === 'manage' ? 1 : 0
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.setup
  width 1200px
  margin 0 auto
  .setup-wrap
    padding 30px
    position relative
    .search-button
      position absolute
      right 30px
      top 30px
    .wrap
      padding 30px
      background #fff
      box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
      min-height 700px
      box-sizing border-box
</style>
