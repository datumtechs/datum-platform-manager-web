<template>
  <div class="setup">
    <jz-nav
      type="project"
      :tabs="tabs"
      @clickTable="handleTable"
      :tabIndex="tabIndex"
    ></jz-nav>
    <div class="wrap">
      <template v-if="!tabIndex">
        <Edit> </Edit>
      </template>
      <template v-else>
        <Table
          @clickBtn="handleBtn"
          :list="list"
          :total="total"
          :btnList="btnList"
          :placeholder="$t('project.searchCollaborators')"
          :pathName="false"
        >
          <div slot="search-button">
            <JzButton type="jz-button--primary" :width="120" :height="48">
              {{ $t('project.createWork') }}
            </JzButton>
          </div>
        </Table>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzNav from '@/components/JzNav.vue'
import Edit from './components/Edit.vue'
import Table from './components/Table.vue'
import JzButton from '@/components/JzButton.vue'

@Component({
  name: 'projectSetup',
  components: {
    JzNav,
    Edit,
    Table,
    JzButton,
  },
})
export default class SetupIndex extends Vue {
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
      lable: '编辑',
    },
  ]
  get total() {
    return this.list.length
  }
  get queryId() {
    return Number(this.$route.params.id)
  }
  private tabs: string[] = ['edit', 'manage']
  private tabIndex = 0
  // 点击tab 跳转对应页面
  private handleTable(index: number) {
    if (this.tabIndex !== index) {
      this.tabIndex = index
      const type = this.tabIndex ? 'manage' : 'edit'
      this.$router.push(`/project/${type}/${this.queryId}`)
    }
  }
  private handleBtn(data: any) {}
  created() {
    this.tabIndex = this.$route.name === 'manage' ? 1 : 0
  }
}
</script>

<style scoped lang="stylus">
.wrap
  margin 20px 60px
</style>
