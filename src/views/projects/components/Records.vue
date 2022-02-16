<template>
  <div class="flow-wrapper">
    <div class="search-box">
      <SearchBar @searchCb="searchCb" />
    </div>
    <div class="tabs-table">
      <el-table v-loading="loading" style="width: 100%" :data="tableData">
        <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"> </el-table-column>
        <el-table-column :label="`${$t('projects.associatedWorkflow')}`">
          <template slot-scope="{ row }">
            <div>{{ row.workflowName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('projects.startTime')}`">
          <template slot-scope="{ row }">
            <div>{{ dayjs(row.beginTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('projects.endTime')}`">
          <template slot-scope="{ row }">
            <div>{{ !row.endTime || row.runStatus == 1 ? '-' : dayjs(row.endTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('node.taskSpent')}`">
          <template slot-scope="{ row }">
            <div>{{ !row.endTime || row.runStatus == 1 ? '-' : formatDuring(row.endTime - row.beginTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('common.actions')}`">
          <template slot-scope="{ row }">
            <div class="link-btn pointer" @click="linkToRecordDetail(row)">{{ $t('common.viewDetail') }}</div>
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
</template>

<script>
import { projectApi } from 'apis'
import SearchBar from 'components/SearchBar'
import dayjs from 'dayjs'
import { formatDuring } from 'utils'
import TablePaginationMinx from '@/mixin/TablePaginationMinx'
export default {
  components: { SearchBar },
  mixins: [TablePaginationMinx],
  data() {
    return {
      tableData: [],
      totalNum: 0,
      searchText: '',
      pageSize: 10,
      curPage: 1,
      loading: false
    }
  },
  computed: {
    projectId: function () {
      return this.$route.query.id
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    dayjs,
    formatDuring,
    initData() {
      this.loading = true
      projectApi
        .queryRecordList({
          current: this.curPage,
          size: this.pageSize,
          workflowName: this.searchText,
          projectId: this.projectId
        })
        .then(res => {
          this.loading = false
          if (res.code === 10000) {
            this.tableData = res.data.items
            this.totalNum = res.data.total
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    linkToRecordDetail(obj) {
      this.$router.push({
        name: 'workflowEdit',
        query: {
          view: 'records',
          name: obj.workflowName,
          id: obj.workflowId,
          projectId: obj.projectId,
          runningRecordId: obj.id
        }
      })
    },
    searchCb(text) {
      this.searchText = text
      this.initData()
    },
    indexMethod(index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    }
  }
}
</script>

<style lang='scss' scoped>
</style>