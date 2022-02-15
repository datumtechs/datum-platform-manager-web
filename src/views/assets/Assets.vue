<template>
  <div class="common-wrapper">
    <div class="data-wrapper pd20">
      <div class="data-wrapper-title">{{ $t('assets.assets') }}</div>
      <!-- <el-tabs v-model="activeName" class="data-tabs" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      </el-tabs> -->
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
        <SearchBar
          :placeholder="activeName === 'data' ? $t('data.searchForData') : $t('data.searchForAlgo')"
          @searchCb="searchCb"
        />
        <DataTable
          v-if="activeName === 'data'"
          :total-data-num="totalDataNum"
          :table-data="dataTableData"
          :data-loading="dataLoading"
          :page-size.sync="dataPageSize"
          :cur-page.sync="curDataPage"
        />
        <AlgoTable
          v-if="activeName === 'algorithms'"
          :total-algo-num="totalAlgoNum"
          :table-data="algoTableData"
          :algo-loading="algoLoading"
          :page-size.sync="algoPageSize"
          :cur-page.sync="curAlgoPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import Breadcrumb from 'components/breadcrumb/Breadcrumb'
import SearchBar from 'components/SearchBar'
import DataTable from './components/DataTable.vue'
import AlgoTable from './components/AlgoTable.vue'
import { assetsApi } from 'apis'
export default {
  // components: { Breadcrumb },
  components: { SearchBar, DataTable, AlgoTable },
  data () {
    return {
      curDataPage: 1,
      curAlgoPage: 1,
      dataPageSize: 10,
      algoPageSize: 10,
      totalAlgoNum: 0,
      totalDataNum: 0,
      activeName: 'data',
      dataTableData: [],
      algoTableData: [],
      dataLoading: false,
      algoLoading: false
    }
  },
  computed: {
    tabList: function () {
      return [
        {
          id: 0,
          name: 'data',
          label: this.$t('assets.data')
        },
        {
          id: 1,
          name: 'algorithms',
          label: this.$t('assets.algorithms')
        }
      ]
    },
    paginationParams: function () {
      return {
        curDataPage: this.curDataPage,
        curAlgoPage: this.curAlgoPage,
        dataPageSize: this.dataPageSize,
        algoPageSize: this.algoPageSize
      }
    }
  },
  watch: {
    paginationParams () {
      this.initData()
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      if (this.activeName === 'data') {
        this.dataLoading = true
        assetsApi
          .listByOwner({ dataName: this.searchText, current: this.curDataPage, size: this.dataPageSize })
          .then(res => {
            this.dataLoading = false
            if (res.code === 10000) {
              this.totalDataNum = res.data.total
              this.dataTableData = res.data.items
            }
          })
          .catch(e => {
            this.dataLoading = false
          })
      } else {
        this.algoLoading = true
        assetsApi
          .getAlgoList({ algorithmName: this.searchText, current: this.curAlgoPage, size: this.algoPageSize })
          .then(res => {
            this.algoLoading = false
            const { code, data } = res
            if (code === 10000) {
              this.totalAlgoNum = data.total
              this.algoTableData = data.items
            }
          })
          .catch(e => {
            this.algoLoading = false
          })
      }
    },
    searchCb (text) {
      this.searchText = text
      this.initData()
    },
    tabClick (tab) {
      this.activeName = tab
      this.initData()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>