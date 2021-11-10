<template>
  <div class="data">
    <div class="data-wrap">
      <div class="title">
        {{ $t('route.resources') }}
      </div>
      <div class="block">
        <jz-nav :tabs="tabs" :tabIndex="tabIndex"></jz-nav>
        <div class="block-table">
          <JzTable
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
          </JzTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzTable from '@/components/JzTable.vue'
import JzNav from '@/components/JzNav.vue'
import { getListByOwner } from '@/api/resources'
import { TableNameType } from '@/api/types'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'
@Component({
  name: 'resourcesData',
  components: {
    JzNav,
    JzTable,
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
      prop: 'authValueStr',
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
  private dataName = ''
  private tabs: string[] = ['data']
  private tabIndex = 0
  private btnList = [
    {
      lable: 'worke.edit',
    },
  ]
  private handleName(data: TableNameType) {
    const { id, metaDataId, name, metaDataPkId } = data
    BreadcrumbModule.SET_RESOUR(name)
    this.$router.push(`/resources/detail/${metaDataPkId}/${id}/${metaDataId}`)
  }
  private handleBtn() {}
  private async getList() {
    const { current, size } = this.listQuery
    const { dataName } = this
    const { data } = await getListByOwner({ current, size, dataName })
    this.list = this.formatData(data.items)
    this.total = data.total
  }
  changeList(parmams: any) {
    this.listQuery = parmams.list
    this.dataName = parmams.input
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
    return list
  }
}
</script>

<style scoped lang="stylus">
.data
  margin: 20px auto;
  width 1200px
  .data-wrap
    padding 30px
    padding-top 0px
    .title
      margin-top 10px
      margin-bottom 40px
      font-weight: 400;
      font-style: normal;
      font-size: 24px;
    .block
      .block-table
        padding 30px
        background #fff
        box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
</style>
