<template>
  <div class="common-wrapper">
    <div class="data-wrapper">
      <Breadcrumb :cur-name="curName" />
      <div class="pd20">
        <div class="table-search-bar">
          <SearchBar :placeholder="$t('projects.searchProject')" @searchCb="searchCb" />
          <span></span>
        </div>
        <div class="table-box">
          <el-table v-loading="loading" style="width: 100%" :data="tableData">
            <el-table-column prop="id" label="ID" width="80"> </el-table-column>
            <el-table-column :label="$t('assets.status')">
              <template slot-scope="{ row }">
                <div>
                  {{ getType(row.subJobStatus) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="beginTime" :label="$t('projects.startTime')"> </el-table-column>
            <el-table-column prop="endTime" :label="$t('projects.endTime')"> </el-table-column>
            <el-table-column prop="runTime" :label="$t('projects.duration')">
              <template slot-scope="{ row }">
                <div>
                  <!-- 0未开始 1运行中 2运行成功 3 运行失败 -->
                  <span v-if="row.subJobStatus === 0">N/A</span>
                  <span v-else>{{ getDuration(row) }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="`${$t('common.actions')}`">
              <template slot-scope="{ row }">
                <div class="table-btn-group">
                  <el-button
                    class="pointer link-btn"
                    :disabled="row.subJobStatus !== 1"
                    type="text"
                    @click="actionFn(row, 1)"
                    >{{ $t('common.pause') }}</el-button
                  >
                  <el-button
                    class="pointer link-btn"
                    :disabled="row.subJobStatus !== 0"
                    type="text"
                    @click="actionFn(row, 2)"
                    >{{ $t('common.restart') }}</el-button
                  >
                  <el-button class="pointer warn-btn" type="text" @click="deleteFn(row)">{{
                    $t('common.delete')
                  }}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <div></div>
            <el-pagination
              background
              :total="totalNum"
              :page-size.sync="pageSize"
              :current-page.sync="curPage"
              :page-sizes="[10, 20, 50, 100]"
              layout="total,sizes, prev, pager, next"
              class="pagination"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from 'components/breadcrumb/Breadcrumb.vue'
import SearchBar from 'components/SearchBar.vue'
import { projectApi } from 'apis'
import { formatDuring } from 'utils'
export default {
  components: { Breadcrumb, SearchBar },
  props: {},
  data () {
    return {
      tableData: [],
      searchSubId: '',
      pageSize: 10,
      curPage: 1,
      totalNum: 0,
      loading: false
    }
  },
  computed: {
    jobId () {
      return this.$route.query.id
    },
    curName: function () {
      return this.$route.query.name
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    deleteFn (item) {
      projectApi.deleteBatchSubJob({ subJobIds: [ item.id ] }).then(res => {
        const { code, msg } = res
        if (code === 10000) {
          this.$message.success(msg)
          this.initData()
        }
      })
    },
    actionFn (item, type) {
      projectApi
        .actionSubJob({
          actionType: type,
          id: item.id
        })
        .then(res => {
          const { code, msg } = res
          if (code === 10000) {
            this.$message.success(msg)
            this.initData()
          }
        })
    },
    getType (type) {
      // <!-- 0-未开始,1-运行中,2-运行成功,3-运行失败 -->
      switch (type) {
        case 0:
          return this.$t('status.noBegun')
        case 1:
          return this.$t('status.running')
        case 2:
          return this.$t('status.runSuccessfully')
        case 3:
          return this.$t('status.runFailed')
        default:
          break
      }
    },
    getDuration (item) {
      if (item.beginTime && item.endTime && item.endTime > item.beginTime) {
        const begin = new Date(item.beginTime).getTime()
        const end = new Date(item.endTime).getTime()
        const cost = end - begin
        return formatDuring(cost)
      } else {
        return 'N/A'
      }
    },
    initData () {
      this.loading = true
      projectApi
        .querySubJobList({
          current: this.curPage,
          jobId: this.jobId,
          size: this.pageSize,
          subJobId: this.searchSubId
        })
        .then(res => {
          this.loading = false
          const { code, data } = res
          if (code === 10000) {
            console.log(data)
            this.tableData = data.items
            this.totalNum = data.total
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    searchCb (text) {
      this.searchSubId = text
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.initData()
    },
    handlePageChange (page) {
      this.curPage = page
      this.initData()
    }
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
</style>