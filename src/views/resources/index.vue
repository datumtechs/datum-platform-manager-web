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
            @clickReapply="handleReapply"
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
import { AppModule } from '@/store/modules/app'

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
      label: 'table.name',
      prop: 'dataName',
    },
    {
      label: 'table.method',
      prop: 'authType', // 1-按时间, 2-按次数, 3-永久
    },
    {
      label: 'table.value',
      prop: 'authValueStr',
    },
    {
      label: 'table.owner',
      prop: 'identityName',
    },
    {
      label: 'table.applyTime',
      prop: 'applyTime',
    },
    {
      label: 'table.status',
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
  private authTypeList: any = {
    zh: ['按次数/按时间', '按时间', '按次数'],
    en: ['Usage count/Usage period', 'Usage period', 'Usage count'],
  }
  private authStateList: any = {
    zh: ['已申请', '已授权', '已拒绝', '已撤销', '已失效'],
    en: ['Applied', 'Authorized', 'Declined', 'Canceled', 'Invalid'],
  }
  get language() {
    return AppModule.language
  }
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
    const list = data
    const { language, authStateList, authTypeList } = this
    /*
    授权状态 
    authStatus 0:已申请 1:已授权 2:已拒绝 3: 已撤销  4:已失效
  */
    list.map((item: any) => {
      item.authStatus = authStateList[language][item.authStatus]
      item.authType = authTypeList[language][item.authType]
    })
    return list
  }
  // 重新申请
  private handleReapply(item: any) {
    this.$router.push(
      `/data/${item.metaDataPkId}/${item.id}/authorize/${item.metaDataId}`,
    )
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
