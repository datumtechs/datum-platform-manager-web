<template>
  <div class="common-wrapper">
    <div class="common-banner">
      <div class="banner-content">
        <div class="content-left">
          <div class="title">
            <span class="type">{{ $t('node.nodes') }}</span>
            <span v-if="lang === 'en'" class="desc">
              <span class="value">{{ totalNode }}</span> participant nodes in the RosettaNet
            </span>
            <span v-else class="desc">
              全网共
              <span class="value">{{ totalNode }}</span>个 可参与隐私计算任务的节点
            </span>
          </div>
          <div class="content">{{ $t('node.desc') }}</div>
        </div>
        <div class="content-right">
          <img src="@/assets/images/node/2.bj.png" alt />
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="search-box">
        <el-input
          v-model="searchInputed"
          class="search"
          :placeholder="$t('node.searchNode')"
          debounce
          clearable
          @clear="clearSearchFn"
          @change="handleSearchChange"
        >
          <!-- <el-button slot="append" icon="el-icon-search" class="search-btn" @click="searchFn"></el-button> -->
        </el-input>
        <el-select v-model="typeSelected" class="select" @change="handleSelectChange">
          <el-option v-for=" item in options" :key="item.id" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </div>
      <el-table v-loading="loading" style="width: 100%" :data="tableData" :show-header="false">
        <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod"></el-table-column>
        <el-table-column prop="bank-logo" width="120">
          <template slot-scope>
            <div>
              <img src="../../assets/images/default/node.svg" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="typeSelected === 'name'">
          <template slot-scope="{ row }">
            <div>
              <p>{{ row.nodeName }}</p>
              <p>{{ $t('node.identifier') }} : {{ row.identityId }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="typeSelected === 'data'">
          <template slot-scope="{ row }">
            <div>
              <p>{{ row.nodeName }}</p>
              <p class="detail-cell">
                <span>{{ $t('node.dataAmount') }} : {{ row.totalFile || 0 }}</span>
                <span>{{ $t('node.dataTotalSize') }} : {{ changeSizeFn(row.totalData) }}</span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="typeSelected === 'activtity'">
          <template slot-scope="{ row }">
            <div>
              <p>{{ row.nodeName }}</p>
              <div class="detail-cell">
                <span>{{ $t('node.taskInMonth') }} : {{ row.taskCount || 0 }}</span>
                <p class="detail-active-cell">
                  {{ $t('node.activeDegree') }} :
                  <Activtity :idle-days="row.idleDays || 0" />
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="typeSelected === 'power'">
          <template slot-scope="{ row }">
            <div>
              <p>{{ row.nodeName }}</p>
              <p class="detail-cell">
                <span>{{ $t('node.memory') }} : {{ changeSizeFn(row.totalMemory) }}</span>
                <span>{{ $t('node.cpu') }} : {{ row.totalCore }}</span>
                <span>{{ $t('node.bandwidth') }} : {{ changeSizeFn(row.totalBandwidth) + 'P/S' }}</span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operation" width="100">
          <template slot-scope="{ row }">
            <div class="pointer table-btn" @click="linkToDetail(row)">{{ $t('common.viewDetail') }}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <div></div>
        <el-pagination
          :current-page.sync="curPage"
          background
          :total="totalNum"
          :page-sizes="[ 4, 20, 50, 100 ]"
          layout="total,sizes, prev, pager, next"
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { orgApi, homeApi } from 'apis'
import Activtity from './components/Activtity.vue'
import { changeSizeFn } from 'utils'
import pageMix from '@/mixin/TablePaginationMinx'
export default {
  components: {
    Activtity
  },
  mixins: [ pageMix ],
  data () {
    return {
      totalNode: '',
      orderBy: 'name',
      pageSize: 4,
      curPage: 1,
      searchInputed: '',
      typeSelected: 'name',
      totalNum: 0,
      tableData: [],
      loading: false
    }
  },
  computed: {
    options () {
      return [
        { id: '1', value: 'name', label: this.$t('node.sortByName') },
        { id: '2', value: 'data', label: this.$t('node.sortByDataNum') },
        { id: '4', value: 'activtity', label: this.$t('node.sortByActiveDegree') },
        { id: '5', value: 'power', label: this.$t('node.sortByComputePower') }
      ]
    }
  },
  watch: {
    searchInputed (val) {
      this.sensitive(this)
    }
  },
  mounted () {
    this.initData()
    this.queryGlobalData()
  },
  methods: {
    changeSizeFn,
    sensitive: debounce(_this => {
      _this.initData()
    }, 500),
    clearSearchFn () {
      this.initData()
    },
    searchFn () {
      this.initData()
    },
    handleSearchChange (value) {
      console.log(value)
    },
    handleSelectChange (type) {
      this.curPage = 1
      this.typeSelected = type
      this.initData()
    },
    queryGlobalData () {
      homeApi.queryGlobalData().then(res => {
        if (res.code === 10000) {
          this.totalNode = res.data.powerOrgCount
        }
      })
    },
    async initData () {
      this.loading = true
      let res
      const params = {
        keyword: this.searchInputed,
        pageNo: this.curPage,
        pageSize: this.pageSize
      }
      try {
        if (this.typeSelected === 'name') {
          res = await orgApi.listOrgInfoByName(params)
        } else if (this.typeSelected === 'data') {
          res = await orgApi.listOrgInfoByTotalData(params)
        } else if (this.typeSelected === 'algo') {
          res = await orgApi.listOrgInfoByTotalAlgo(params)
        } else if (this.typeSelected === 'activtity') {
          res = await orgApi.listOrgInfoByActivity(params)
        } else if (this.typeSelected === 'power') {
          res = await orgApi.listOrgInfoByMemory(params)
        }
      } catch (error) {
        this.loading = false
      }
      this.loading = false
      const { code, data } = res
      if (code === 10000) {
        this.tableData = data.items
        this.totalNum = data.total
      }
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    linkToDetail (obj) {
      this.$router.push({
        name: 'nodeDetail',
        query: {
          identityId: obj.identityId,
          orgName: obj.orgName
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 1200px;
  margin: 30px auto;
  min-height: calc(100vh - 364px);
  // overflow-y: auto;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  .search-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .search {
      width: 270px;
    }
    .select {
      width: 457px;
    }
    // .search-btn {
    //   color: #ffffff;
    //   background-color: #3c3588;
    //   border: #3c3588;
    // }
    //::v-deep .el-input-group__append,
    // .el-input-group__prepend {
    //   background-color: #3c3588;
    //   border: #3c3588;
    // }
  }
  .detail-cell {
    display: flex;
    gap: 40px;
    white-space: nowrap;
    align-items: center;
  }
  .detail-active-cell {
    display: flex;
    white-space: nowrap;
    align-items: center;
  }
  & ::v-deep .el-table tr {
    height: 82px;
  }
}
</style>
