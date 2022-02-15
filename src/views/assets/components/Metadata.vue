
<template>
  <div class="tabs-table">
    <el-table v-loading="algoLoading" :row-key="row => row.id" border style="width: 100%" :data="tableData">
      <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"> </el-table-column>
      <el-table-column prop="columnName" :label="`${$t('assets.field')}`"> </el-table-column>
      <el-table-column prop="columnType" :label="`${$t('node.dataType')}`"> </el-table-column>
      <el-table-column prop="columnDesc" :label="`${$t('node.remarks')}`">
        <template slot-scope="{ row }">
          <div>{{ row.remarks || '-' }}</div>
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
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    totalNum: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    curPage: {
      type: Number,
      default: 1
    },
    algoLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    dayjs,
    handlePageChange(page) {
      console.log(page)
      this.$emit('handlePageChange', page)
    },
    handleSizeChange(size) {
      console.log(size)
      this.$emit('handleSizeChange', size)
    },
    indexMethod(index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
</style>