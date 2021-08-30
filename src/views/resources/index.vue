<template>
  <div class="data-wrap">
    <div class="title">
      {{ $t('route.resources') }}
    </div>
    <div class="blick">
      <jz-nav :tabs="tabs" :tabIndex="tabIndex"></jz-nav>
      <Table
        @clickName="handleName"
        @clickBtn="handleBtn"
        :keyList="keyList"
        :list="list"
        :total="total"
        :btnList="btnList"
        :isOperate="false"
        :placeholder="$t('home.searchdata')"
        @changeList="changeList"
      >
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Table from '../project/components/Table.vue'
import JzButton from '@/components/JzButton.vue'
import JzNav from '@/components/JzNav.vue'
import { getListByOwner } from '@/api/resources'
@Component({
  name: 'resourcesData',
  components: {
    JzButton,
    Table,
    JzNav,
  },
})
export default class resourcesData extends Vue {
  private keyList = [
    {
      label: '名称',
      prop: 'dataName',
    },
    {
      label: '授权方式',
      prop: 'authType', // 1-按时间, 2-按次数, 3-永久
    },
    {
      label: '授权值',
      prop: 'authValue',
    },
    {
      label: '机构',
      prop: 'identityName',
    },
    {
      label: '申请时间',
      prop: 'applyTime',
    },
    {
      label: '状态',
      prop: 'authStatus', //0-等待审核中, 1-审核通过, 2-已拒绝
    },
  ]
  private list = []
  private total = 0
  private listQuery = {
    current: 1,
    size: 20,
  }
  private tabs: string[] = ['data']
  private tabIndex = 0
  private btnList = [
    {
      lable: 'worke.edit',
    },
  ]
  private handleName(id: number) {
    this.$router.push('/resources/detail/' + id)
  }
  private handleBtn() {}
  private async getList() {
    const { data } = await getListByOwner()
    console.log(data)
    this.list = this.formatData(data.items)
    this.total = data.total
  }
  changeList(parmams: any) {
    this.listQuery = parmams
    this.getList()
  }
  created() {
    this.getList()
  }
  private formatData(data: any) {
    const authTypeList: any = {
      1: '按时间',
      2: '按次数',
      3: '永久',
    }
    const authStatusList: any = {
      0: '等待审核中',
      1: '审核通过',
      2: '已拒绝',
    }
    const list = data
    list.map((item: any) => {
      item.authStatus = authStatusList[item.authStatus]
      item.authType = authTypeList[item.authType]
    })
    console.log(list)
    return list
  }
}
</script>

<style scoped lang="stylus">
.data-wrap
  margin: 20px 0 0 65px;
  .title
    margin-bottom 50px
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
</style>
