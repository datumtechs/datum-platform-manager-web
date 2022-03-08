<template>
  <div class="common-wrapper">
    <div class="common-banner">
      <DataBanner
        :meta-data-id="baseInfo.metaDataId"
        :file-name="baseInfo.metaDataName"
        :org-name="orgName"
        :identity-id="identityId"
        type="data"
      />
    </div>
    <div v-if="showData" class="detail-wrapper">
      <div class="detail-title">{{ $t('node.baseInfo') }}</div>
      <div class="detail-content">
        <el-row type="flex" class="data-line">
          <el-col :span="4" class="data-title">{{ $t('node.dataType') }}</el-col>
          <el-col :span="6" class="data-content">{{ getType(baseInfo.fileType) }}</el-col>
          <el-col :span="4" class="data-title">{{ $t('node.dataSize') }}</el-col>
          <el-col :span="6" class="data-content">{{ changeSizeFn(baseInfo.size) }}</el-col>
        </el-row>
        <el-row type="flex" class="data-line">
          <el-col :span="4" class="data-title">{{ $t('node.rowNum') }}</el-col>
          <el-col :span="6" class="data-content">{{ formatNumber(baseInfo.rows) }}</el-col>
          <el-col :span="4" class="data-title">{{ $t('node.colNum') }}</el-col>
          <el-col :span="6" class="data-content">{{ formatNumber(baseInfo.columns) }}</el-col>
        </el-row>
        <el-row type="flex" class="data-line">
          <el-col :span="4" class="data-title">{{ $t('node.publicTime') }}</el-col>
          <el-col
            :span="6"
            class="data-content"
          >{{ dayjs(baseInfo.publishedAt).format('YYYY-MM-DD HH:mm:ss') }}</el-col>
          <el-col :span="4" class="data-title">{{ $t('node.involvedNum') }}</el-col>
          <el-col
            :span="6"
            class="data-content"
          >{{ formatNumber(baseInfo.taskCount) }}</el-col>
          <!-- TODO -->
        </el-row>
        <el-row type="flex" class="data-line">
          <el-col :span="4" class="data-title">{{ $t('node.industry') }}</el-col>
          <el-col :span="6" class="data-content">{{ getIndustry(baseInfo.industry) }}</el-col>
        </el-row>
        <el-row type="flex" class="data-line">
          <el-col :span="4" class="data-title">{{ $t('node.dataDesc') }}</el-col>
          <el-col :span="16" class="data-content">{{ baseInfo.remarks }}</el-col>
        </el-row>
      </div>
      <div class="detail-title">{{ $t('node.fieldsInfo') }}</div>
      <el-table style="width: 100%" :data="columnList">
        <el-table-column
          type="index"
          :label="`${$t('common.num')}`"
          :index="indexMethod"
          width="80"
        ></el-table-column>
        <el-table-column prop="columnName" :label="`${$t('node.dataName')}`" width="300"></el-table-column>
        <el-table-column prop="columnType" :label="`${$t('node.dataType')}`" width="200"></el-table-column>
        <el-table-column prop="remarks" :label="`${$t('node.remarks')}`"></el-table-column>
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
      <div class="btn-group">
        <div class="back-btn pointer" @click="back()">
          <span class="text">{{ $t('common.back') }}</span>
        </div>
        <div class="back-btn main-back-btn pointer" @click="linkToTaskList()">
          <span class="view">{{ $t('node.viewTask') }}</span>
        </div>
      </div>
    </div>
    <DataTask v-else :show-data.sync="showData" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { dataApi } from 'apis'
import DataBanner from './components/DataBanner'
import DataTask from './metaJoinTaskDetail.vue'
import { INDUSTRYMAP, FILEMAP } from 'constants'
import { changeSizeFn, formatNumber } from 'utils'
export default {
  components: { DataBanner, DataTask },
  data () {
    return {
      showData: true,
      identityId: '',
      curPage: 1,
      pageSize: 10,
      totalNum: 0,
      curTab: 'data',
      tableData: [
        { id: '1', dataName: '11111', dataType: '22222', remarks: '333333' },
        { id: '2', dataName: '11111', dataType: '22222', remarks: '333333' },
        { id: '3', dataName: '11111', dataType: '22222', remarks: '333333' },
        { id: '4', dataName: '11111', dataType: '22222', remarks: '333333' },
        { id: '5', dataName: '11111', dataType: '22222', remarks: '333333' }
      ],
      baseInfo: {
        fileType: 1,
        size: 0,
        rows: 0,
        columns: 0,
        publishedAt: '',
          taskCount: 0,
        industry: '',
        remarks: '',
        metaDataId: '',
        metaDataName: ''
      },
      columnList: []
    }
  },
  computed: {
    metaDataId () {
      return this.$route.query.metaDataId || ''
    },
    orgName () {
      return this.$route.query.orgName
    }
  },
  mounted () {
    this.getDataFile()
    this.listMetaDataColumn()
  },
  methods: {
    dayjs,
    changeSizeFn,
    formatNumber,
    getType (val) {
      if (val) return FILEMAP.get(Number(val))
    },
    getIndustry (val) {
      if (val) return this.$t(`industry.${INDUSTRYMAP.get(Number(val))}`)
    },
    handlePageChange (page) {
      this.curPage = page
      this.listMetaDataColumn()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.listMetaDataColumn()
    },
    back () {
      this.$router.go(-1)
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    linkToTaskList () {
      this.showData = false
    },
    getDataFile () {
      dataApi.getDataFile({ metaDataId: this.metaDataId }).then(res => {
        if (res.data) {
          this.baseInfo = res.data
          this.identityId = res.data.identityId
        }
      })
    },
    listMetaDataColumn () {
      dataApi
        .listMetaDataColumn({
          metaDataId: this.metaDataId,
          current: this.curPage,
          size: this.pageSize
        })
        .then(res => {
          const { code, data } = res
          if (code) {
            this.columnList = data.items
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
