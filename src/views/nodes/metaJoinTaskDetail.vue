<template>
  <div class="detail-wrapper">
    <el-table style="width: 100%" :data="tableData">
      <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"></el-table-column>
      <el-table-column prop="taskName" :label="`${$t('node.taskName')}`"></el-table-column>
      <el-table-column :label="`${$t('menu.task')}${$t('assets.status')}`">
        <template slot-scope="{ row }">
          <div>{{ getStatus(row.status) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="taskStartTime" :label="`${$t('node.taskStartTime')}`">
        <template slot-scope="{ row }">
          <div>{{ dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="taskSpent" :label="`${$t('node.taskSpent')}`">
        <template slot-scope="{ row }">
          <div>{{ formatDuring(new Date(row.endAt) - new Date(row.createAt)) }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="`${$t('common.actions')}`">
        <template slot-scope="{ row }">
          <span class="pointer table-btn" @click="linkToDetail(row)">{{ $t('common.viewDetail') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div></div>
      <el-pagination
        background
        :total="totalNum"
        :page-size="pageSize"
        :current-page="curPage"
        :page-sizes="[ 10, 20, 50, 100 ]"
        layout="total,sizes, prev, pager, next"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
    <div class="back-btn pointer" @click="back()">
      <span class="text">{{ $t('common.back') }}</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { taskApi } from 'apis'
import { formatDuring } from '../../utils/utils'
export default {
  data () {
    return {
      curPage: 1,
      pageSize: 10,
      totalNum: 0,
      curTab: 'data',
      tableData: []
    }
  },
  computed: {
    metaDataId () {
      return this.$route.query.metaDataId
    }
  },
  watch: {},
  mounted () {
    this.initData()
  },
  methods: {
    dayjs,
    formatDuring,
    getStatus (val) {
      // 任务状态(0:unknown未知、1:pending等在中、2:running计算中、3:failed失败、4:success成功)
      switch (val) {
        case 0:
          return this.$t('status.noBegun')
        case 1:
          return this.$t('status.pending')
        case 2:
          return this.$t('status.running')
        case 3:
          return this.$t('status.runFailed')
        case 4:
          return this.$t('status.runSuccessfully')
        default:
          return 'N/A'
      }
    },
    back () {
      this.$emit('update:showData', true)
    },
    linkToDetail (row) {
      this.$router.push({
        name: 'taskDetail', // 跳转任务详情
        query: {
          taskId: row.id
        }
      })
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    handlePageChange (page) {
      this.curPage = page
      this.initData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.initData()
    },
    initData () {
      taskApi
        .getTaskByMetaDataId({ metaDataId: this.metaDataId, pageNo: this.curPage, pageSize: this.pageSize })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            this.tableData = data.items
            this.totalNum = data.total
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-wrapper {
  width: 1200px;
  margin: 30px auto;
  min-height: calc(100vh - 364px);
  overflow-y: auto;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  &::v-deep .el-table tr {
    height: 46px;
  }
}
</style>
