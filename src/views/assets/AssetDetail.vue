<template>
  <div class="common-wrapper">
    <div class="data-wrapper">
      <Breadcrumb :cur-name="curName" />
      <div class="pd20">
        <div class="data-wrapper-title">{{ curName }}</div>
        <ul class="tabs-box">
          <li
            v-for="tab in tabList"
            :key="tab.id"
            class="tabs-mini-box pointer"
            :class="{ activeTab: tab.name === activeName }"
            @click="tabClick(tab.name)"
          >
            {{ tab.label }}
          </li>
        </ul>
        <div class="tabs-table-box">
          <Info v-if="activeName === 'baseInfo'" :detail-obj="detailObj" />
          <Metadata
            v-if="activeName === 'metadata'"
            :table-data="tableData"
            :total-num="totalNum"
            @handlePageChange="handlePageChange"
            @handleSizeChange="handleSizeChange"
          />
          <Auth v-if="activeName === 'authorization'" :detail-obj="detailObj" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from 'components/breadcrumb/Breadcrumb.vue'
import Info from './components/Info.vue'
import Metadata from './components/Metadata.vue'
import Auth from './components/Auth.vue'
import { assetsApi } from 'apis'
export default {
  components: { Breadcrumb, Info, Auth, Metadata },
  data () {
    return {
      curPage: 1,
      pageSize: 10,
      totalNum: 0,
      activeName: 'baseInfo',
      detailObj: {},
      tableData: []
    }
  },
  computed: {
    curName: function () {
      return this.$route.query.curName
    },
    metaDataId: function () {
      return this.$route.query.metaDataId
    },
    metaDataPkId: function () {
      return this.$route.query.metaDataPkId
    },
    userMetaDataId: function () {
      return this.$route.query.id
    },
    tabList: function () {
      return [
        {
          id: 0,
          name: 'baseInfo',
          label: this.$t('node.baseInfo')
        },
        {
          id: 1,
          name: 'metadata',
          label: this.$t('assets.metadata')
        },
        {
          id: 3,
          name: 'authorization',
          label: this.$t('assets.authorization')
        }
      ]
    }
  },
  watch: {},
  mounted () {
    this.initData()
    this.queryMetaList()
  },
  methods: {
    initData () {
      assetsApi
        .getMetaDetail({
          metaDataPkId: this.metaDataPkId,
          userMetaDataId: this.userMetaDataId
        })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            this.detailObj = data
          }
        })
    },
    queryMetaList () {
      const self = this
      assetsApi
        .getMetaList({
          metaDataId: self.metaDataId,
          current: self.curPage,
          size: self.pageSize
        })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            this.tableData = data.items
            self.totalNum = data.total
          }
        })
    },
    tabClick (tab) {
      this.activeName = tab
    },
    handlePageChange (page) {
      this.curPage = page
      this.queryMetaList()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.queryMetaList()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>