
<template>
  <div class="tabs-table">
    <el-table style="width: 100%" :data="tableData">
      <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"> </el-table-column>
      <el-table-column prop="algorithmName" :label="`${$t('common.name')}`"> </el-table-column>
      <el-table-column prop="algorithmType" :label="`${$t('assets.category')}`">
        <template slot-scope="{ row }">
          <div>{{ getType(row.algorithmType) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="author" :label="`${$t('assets.author')}`"> </el-table-column>
      <el-table-column prop="minNumbers" :label="`${$t('assets.supportNum')}`"> </el-table-column>
      <el-table-column prop="supportLanguage" :label="`${$t('assets.supportLan')}`"> </el-table-column>
      <el-table-column :label="`${$t('common.actions')}`" width="200">
        <template slot-scope="{ row }">
          <span class="pointer link-btn" @click="showCode(row.calculateContractCode)">{{ $t('assets.viewCode') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div></div>
      <el-pagination
        background
        :total="totalAlgoNum"
        :page-size="pageSize"
        :current-page="curPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total,sizes, prev, pager, next"
        class="pagination"
        @size-change="row => $emit('update:pageSize', row)"
        @current-change="row => $emit('update:curPage', row)"
      />
    </div>
    <el-dialog :title="$t('assets.codeDisplay')" :visible.sync="dialogVisible" width="40%" class="codeDialog">
      <code style="white-space: pre-line" class="code-box">{{ code }}</code>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    totalAlgoNum: {
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
    }
  },
  data() {
    return {
      dialogVisible: false,
      code: ''
    }
  },
  methods: {
    showCode(code) {
      this.code = code
      this.dialogVisible = true
    },
    getType(type) {
      switch (type) {
        case 1:
          return this.$t('assets.statistics')
        case 2:
          return this.$t('assets.featureEngineering')
        case 3:
          return this.$t('assets.machineLearning')
        default:
          break
      }
    },
    indexMethod(index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
.codeDialog {
  ::v-deep .el-dialog {
    height: 70%;
    overflow: hidden;
    background: #fbfcfd;
    border-radius: 2px !important;
  }
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #ebeef9;
    height: 50px !important;
    padding: 0 20px !important;
    line-height: 50px;

    .el-dialog__title {
      height: 14px;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 14px;
      color: #333333;
    }
  }
  ::v-deep .el-dialog__body {
    height: calc(100% - 90px);
    padding: 0;
    margin: 20px 40px;
    overflow-y: scroll;
    font-size: 12px;
    color: #4e4879;
    line-height: 18px;
  }
}
</style>