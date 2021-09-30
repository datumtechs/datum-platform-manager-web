<template>
  <div class="content-container">
    <div class="search-wrap">
      <el-button
        @click="getList"
        type="primary"
        icon="el-icon-search"
        class="icon-search"
        >搜索</el-button
      >
      <el-input
        v-model="inputInfo"
        :placeholder="$t('home.search' + placeholder)"
        @keyup.enter.native="getList"
      ></el-input>
    </div>
    <div class="block-wrap">
      <div
        class="block-wrap-item"
        v-for="(item, index) in marketList"
        :key="index"
      >
        <div class="item-icon">
          <svg-icon name="data-card" width="40" height="40" color="#fff" />
        </div>
        <div class="item-title">{{ item.dataName }}</div>
        <div class="item-describe">{{ item.dataDesc }}</div>
        <div class="item-button">
          <jz-button
            @click="handleDetail(item.id, item.metaDataId)"
            class="button"
          >
            {{ $t('home.detail') }}
          </jz-button>
          <template v-if="!tabIndex">
            <jz-button
              v-if="item.authStatus === 1"
              type="jz-button--primary"
              class="button passed"
            >
              {{ $t('home.authorizePassed') }}
            </jz-button>
            <jz-button
              v-else
              type="jz-button--primary"
              @click="
                handleAuthorize(
                  item.id,
                  item.authStatus,
                  item.authMetadataState,
                )
              "
              class="button "
            >
              {{ $t('home.authorize') }}
            </jz-button>
          </template>
        </div>
      </div>
    </div>
    <div class="pagination-wrap">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.current"
        :limit.sync="listQuery.size"
        :pageSizes="[6, 10, 20, 30, 50]"
        @pagination="getList"
        layout="sizes, total, jumper, next, pager, prev"
        class="pagination"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import Pagination from '@/components/Pagination/index.vue'
import { UserModule } from '@/store/modules/user'
import { getDataList } from '@/api/home'
import { geAlgorithms } from '@/api/algorithm'
import alayaService from '@/services/alayaService'
import { ParamsType } from '@/api/types'
@Component({
  name: 'HomeList',
  components: {
    JzButton,
    Pagination,
  },
})
export default class HomeList extends Vue {
  private total = 0
  private tabIndex = 0
  private listQuery = {
    current: 1,
    size: 6,
  }
  private inputInfo = ''
  private tabs: string[] = ['data', 'algorithm', 'service']
  private handleTabIndex() {
    const name: string = this.$route.name || ''
    this.tabIndex = this.tabs.indexOf(name)
    this.getList()
  }
  @Watch('$route', { deep: true })
  changeRoute() {
    this.handleTabIndex()
  }
  get isLogin() {
    return !!UserModule.token && alayaService.checkAddress()
  }
  get placeholder() {
    const info = this.tabs[this.tabIndex]
    return info
  }
  private marketList = []
  private handleDetail(id: string | number, metaid: string) {
    if (!this.tabIndex) {
      this.$router.push(`/data/detail/${id}/${metaid}`)
    }
    if (this.tabIndex === 1) {
      this.$router.push(`/algorithm/detail/${id}`)
    }
  }
  private handleAuthorize(
    id: string | number,
    authStatus: number,
    authMetadataState: number,
  ) {
    if (!this.isLogin) {
      ;(this as any).$bus.$emit('connectWallet')
      return
    }
    if (authStatus === 0) {
      this.$message.warning('等待审核中')
      return
    }
    if (authMetadataState === 0 || authMetadataState === 1) {
      this.$message.error('数据授权未知错误')
      return
    }
    this.$router.push(`/data/${id}/authorize`)
  }
  private async getList() {
    // 过滤空格
    const inputInfo = this.inputInfo.replace(/\s+/g, '')
    const params: ParamsType = {
      current: 1,
      size: 6,
    }
    const { current, size } = this.listQuery
    params.current = current
    params.size = size
    if (inputInfo.length) {
      params['dataName'] = inputInfo
    }
    if (!this.tabIndex) {
      params['dataName'] = inputInfo
      const { data } = await getDataList({ ...params })
      this.marketList = data.items
      this.total = data.total
    }
    if (this.tabIndex === 1) {
      // TODO 接口 缺少total
      params['algorithmName'] = inputInfo
      const { data } = await geAlgorithms({ ...params })
      data.map((item: any) => {
        item.id = item.algorithmId
        item.dataName = item.algorithmName
        item.dataDesc = item.algorithmDesc
      })
      this.marketList = data
      this.total = data.length
    }
  }
  created() {
    this.handleTabIndex()
  }
}
</script>
<style lang="stylus" scoped>
.content-container
  width 100%
  .search-wrap
    width: 991px;
    height: 60px;
    margin 60px auto
    position relative
    .icon-search
      position absolute
      width: 120px;
      height: 44px;
      right 8px
      top 8px
      background #5F4FFB
      border-color #5F4FFB
      z-index 99
    >>> .el-input__inner
      border: 0!important;
      padding: 5px 5px 5px 15px;
      height 60px!important;
      line-height 60px!important;
      font-size 18px
      border-radius: 12px!important;
      border: 2px solid rgba(95,79,251,0.2)!important;
    >>> .el-input__inner:focus
      border: 2px solid #5F4FFB!important;
  .block-wrap
    transform: translatex(50px);
    max-width 1260px
    min-height 876px
    overflow hidden
    margin 0 auto
    margin-top 70px
    display flex
    flex-flow: row wrap;
    .block-wrap-item
      width: 368px;
      height: 414px;
      box-sizing border-box
      margin 0 48px 48px 0
      background: #fff;
      box-sizing: border-box;
      background: #FFFFFF;
      box-shadow: 0px 20px 40px 0px rgba(205,205,205,0.18);
      border-radius: 12px;
      padding 10px 25px
      .item-icon
        margin 50px auto
        width: 64px;
        height: 64px;
        background: #5F4FFB;
        box-shadow: 0px 10px 20px 0px rgba(95,79,251,0.32);
        border-radius: 16px;
        box-sizing: border-box;
        padding: 12px 0 0 14px;
      .item-title
        font-size: 18px;
        color: #263B5E;
        letter-spacing: 0;
        font-weight: 500;
        padding-bottom 15px
        text-align center
        word-wrap:break-word;
      .item-describe
        height 87px
        line-height 22px
        font-size: 16px;
        color: #6A7695;
        letter-spacing: 0.5px;
        font-weight: 400;
        text-align center
        word-wrap:break-word;
        word-break:break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow hidden
      .item-button
        display flex
        justify-content center
        .button
          margin-right 20px
          width: 84px;
          height: 30px;
          font-size 12px
        .passed
          background #1CC037
          border: 1px solid #1cc037;
  .pagination-wrap
    max-width 1200px
    margin 20px auto
    height 100px
    >>> .el-pagination
      .btn-prev, .el-pager, .btn-next, .el-pagination__jump
        float right
      .btn-next
        margin-right 40px
</style>
