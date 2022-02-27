<template>
  <div class="detail-wrapper">
    <el-table style="width: 100%" :data="tableData">
      <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="70"></el-table-column>
      <el-table-column prop="eventType" :label="`${$t('node.eventType')}`" width="200"></el-table-column>
      <!-- 此处字段不对 缺少name -->
      <el-table-column prop="identityId" :label="`${$t('node.eventMaker')}`" width="200"></el-table-column>
      <el-table-column prop="eventAt" :label="`${$t('node.generationTime')}`" width="300">
        <template slot-scope="{ row }">
          <div>{{ dayjs(row.eventAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="eventContent" :label="`${$t('node.eventContent')}`"></el-table-column>
    </el-table>
    <div class="btn-group">
      <div class="back-btn pointer" @click="back()">
        <span class="text">{{ $t('common.back') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { taskApi } from 'apis'
export default {
  props: {
    showTask: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      curPage: 1,
      pageSize: 4,
      nodeInputed: '',
      nodeSelected: 'name',
      totalNum: 1000,
      curTab: 'data',
      tableData: []
    }
  },
  computed: {
    taskId () {
      return this.$route.query.taskId
    }
  },
  watch: {},
  mounted () {
    this.initData()
  },
  methods: {
    dayjs,
    initData () {
      taskApi.listTaskEvent({ taskId: this.taskId }).then(res => {
        const { code, data } = res
        if (code === 10000) {
          this.tableData = data
        }
      })
    },
    back () {
      this.$emit('update:showTask', true)
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    linkToEvent () {
      this.$router.push({
        name: 'taskEvent',
        query: {
          id: this.metaId
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

  .info-table-box {
    padding: 20px 0;
    p.info-table-title {
      padding-left: 78px;
      margin-bottom: 10px;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 14px;
      color: #3c3588;
      letter-spacing: 0;
    }
  }

  &::v-deep .el-table tr {
    height: 46px;
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 0;
  }
}
</style>
