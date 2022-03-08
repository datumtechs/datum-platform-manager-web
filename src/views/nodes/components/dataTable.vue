<template>
  <div class="data-table-wrapper">
    <el-table v-loading="dataLoading" style="width: 100%" :data="tableData">
      <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"></el-table-column>
      <el-table-column prop="metaDataName" :label="`${$t('node.dataName')}`"></el-table-column>
      <!-- <el-table-column prop="fileName" :label="`${$t('node.back-btn pointer')}`"> </el-table-column> -->
      <el-table-column prop="fileType" :label="`${$t('node.dataType')}`">
        <template slot-scope="{ row }">
          <div>{{ row.fileType === 1 ? 'CSV' : '' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="size" :label="`${$t('node.dataSize')}`">
        <template slot-scope="{ row }">
          <div>{{ changeSizeFn(row.size) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="publishedAt" :label="`${$t('node.publicTime')}`">
        <template
          slot-scope="scope"
        >{{ dayjs(scope.row.publishedAt).format('YYYY-MM-DD HH:mm:ss') }}</template>
      </el-table-column>
      <el-table-column prop="taskCount" :label="`${$t('node.involvedNum')}`"></el-table-column>
      <el-table-column prop="operation" width="100" :label="`${$t('common.actions')}`">
        <template slot-scope="{ row }">
          <span class="pointer link-btn" @click="viewDetail(row)">{{ $t('node.viewMetaData') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div></div>
      <el-pagination
        background
        :total="totalRows"
        :page-size="dataPagesize"
        :current-page="dataCurpage"
        :page-sizes="[ 10, 20, 50, 100 ]"
        layout="total,sizes, prev, pager, next"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleDataPageChange"
      />
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { changeSizeFn } from '../../../utils/utils'
export default {
  components: {},
  props: {
    dataLoading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    },
    nodeName: {
      type: String,
      default: ''
    },
    totalRows: {
      type: Number,
      default: 0
    },
    identityId: {
      type: String,
      default: ''
    },
    dataCurpage: {
      type: Number,
      default: 1
    },
    dataPagesize: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {}
  },
  methods: {
    dayjs,
    changeSizeFn,
    handleSizeChange (val) {
      this.$emit('update:dataPagesize', val)
    },
    handleDataPageChange (page) {
      this.$emit('handleDataPageChange', page)
    },
    viewDetail (item) {
      this.$router.push({
        name: 'metaDetail',
        query: {
          orgName: this.nodeName,
          identityId: this.identityId,
          metaDataId: item.metaDataId
        }
      })
    },
    indexMethod (index) {
      return (this.dataCurpage - 1) * this.dataPagesize + index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrapper > .data-table-wrapper {
  margin-top: 20px;
  &::v-deep .el-table tr {
    height: 32px;
  }
}
</style>
