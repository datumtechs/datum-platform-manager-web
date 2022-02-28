<template>
  <div class="common-wrapper">
    <div class="common-banner">
      <DataBanner
        :end-at="dayjs(details.endAt).format('YYYY-MM-DD HH:mm:ss')"
        :start-at="details.startAt ? dayjs(details.startAt).format('YYYY-MM-DD HH:mm:ss') : ''"
        :create-at="dayjs(details.createAt).format('YYYY-MM-DD HH:mm:ss')"
        :task-name="details.taskName"
        :task-id="details.id"
        :status="details.status"
        inherit-attrs="false"
        type="task"
      />
    </div>
    <div v-if="showTask" class="detail-wrapper">
      <div class="detail-title">{{ $t('node.baseInfo') }}</div>
      <div class="detail-content">
        <el-row type="flex" class="data-line">
          <el-col :span="4" class="data-title">{{ $t('node.taskStartTime') }}</el-col>
          <el-col :span="6" class="data-content"> {{ dayjs(details.createAt).format('YYYY-MM-DD HH:mm:ss') }} </el-col>
          <el-col :span="4" class="data-title">{{ $t('node.taskSpent') }}</el-col>
          <el-col :span="6" class="data-content">
            {{ formatDuring(new Date(details.endAt) - new Date(details.createAt)) }}
          </el-col>
        </el-row>
        <el-row type="flex" class="data-line">
          <el-col :span="4" class="data-title">{{ $t('node.dataType') }}</el-col>
          <!-- TODO 目前暂时只有一个类型 -->
          <el-col :span="6" class="data-content">CSV</el-col>
          <el-col :span="4" class="data-title">{{ $t('node.taskResult') }}</el-col>
          <el-col :span="6" class="data-content">
            <span v-if="details.status == 4" class="success-label label">{{ $t('common.success') }}</span>
            <span v-else-if="details.status == 3" class="failed-label label">{{ $t('common.failed') }}</span>
            <span v-else></span>
          </el-col>
        </el-row>
      </div>
      <div class="detail-title">{{ $t('node.participantsInfo') }}</div>
      <div class="info-table-box">
        <p class="info-table-title">{{ $t('common.sponsor') }}</p>
        <el-table style="width: 100%" :data="[...details.taskSponsor]">
          <el-table-column type="index" :index="indexMethod" width="70"> </el-table-column>
          <el-table-column prop="nodeName" :label="`${$t('common.name')}`" width="300"> </el-table-column>
          <el-table-column prop="identityId" :label="`${$t('node.identifier')}`"> </el-table-column>
        </el-table>
      </div>
      <div class="info-table-box">
        <p class="info-table-title">{{ $t('common.resultReceiver') }}</p>
        <el-table style="width: 100%" :data="[...details.resultReceiverList]">
          <el-table-column type="index" :index="indexMethod" width="70"> </el-table-column>
          <el-table-column prop="nodeName" :label="`${$t('common.name')}`" width="300"> </el-table-column>
          <el-table-column prop="identityId" :label="`${$t('node.identifier')}`"> </el-table-column>
        </el-table>
      </div>
      <div class="info-table-box">
        <p class="info-table-title">{{ $t('common.executor') }}</p>
        <el-table style="width: 100%" :data="[...details.powerProviderList]">
          <el-table-column type="index" :index="indexMethod" width="70"> </el-table-column>
          <el-table-column prop="nodeName" :label="`${$t('common.name')}`" width="300"> </el-table-column>
          <el-table-column prop="identityId" :label="`${$t('node.identifier')}`"> </el-table-column>
          <el-table-column :label="`${$t('node.computingResource')}`">
            <template slot-scope="{ row }">
              <div>
                <div>
                  <span>CPU: </span><span>{{ row.usedCore || 0 }}</span>
                </div>
                <div>
                  <span>{{ $t('node.memory') }}: </span><span>{{ changeSizeFn(row.usedMemory) }}</span>
                </div>
                <div>
                  <span>{{ $t('node.bandwidth') }}: </span><span>{{ changeSizeFn(row.usedBandwidth) + 'P/S' }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info-table-box">
        <p class="info-table-title">{{ $t('common.dataProvider') }}</p>
        <el-table style="width: 100%" :data="[...details.dataProviderList]">
          <el-table-column type="index" :index="indexMethod" width="70"> </el-table-column>
          <el-table-column prop="nodeName" :label="`${$t('common.name')}`" width="300"> </el-table-column>
          <el-table-column prop="identityId" :label="`${$t('node.identifier')}`" width="400"> </el-table-column>
          <el-table-column :label="`${$t('node.metaNameAndId')}`">
            <template slot-scope="{ row }">
              <div>
                <span>{{ row.metaDataName }} ( ID:{{ row.metaDataId }} )</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info-table-box">
        <p class="info-table-title">{{ $t('common.algorithmProvider') }}</p>
        <el-table style="width: 100%" :data="[...details.algoProvider]">
          <el-table-column type="index" :index="indexMethod" width="70"> </el-table-column>
          <el-table-column prop=".nodeName" :label="`${$t('common.name')}`" width="300"> </el-table-column>
          <el-table-column prop="identityId" :label="`${$t('node.identifier')}`"> </el-table-column>
        </el-table>
      </div>
      <div class="btn-group">
        <div class="back-btn pointer" @click="back()">
          <span class="text">
            {{ $t('common.back') }}
          </span>
        </div>
        <div class="back-btn main-back-btn pointer" @click="linkToEvent()">
          <span class="view">
            {{ $t('node.viewEvent') }}
          </span>
        </div>
      </div>
    </div>
    <TaskEvent v-else :show-task.sync="showTask" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { formatDuring, changeSizeFn } from '../../utils/utils'
import { taskApi } from 'apis'
import TaskEvent from './taskEvent.vue'
import DataBanner from './components/DataBanner'
export default {
  components: { DataBanner, TaskEvent },
  data () {
    return {
      showTask: true,
      details: {
        createAt: '',
        endAt: '',
        startAt: '',
        taskSponsor: {},
        resultReceiverList: [],
        powerProviderList: [],
        taskDataProviderList: [],
        algoProvider: [],
        status: -1
      },
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
    formatDuring,
    changeSizeFn,
    back () {
      this.$router.go(-1)
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    linkToEvent () {
      this.showTask = false
    },
    initData () {
      taskApi.queryTaskDetailById({ taskId: this.taskId }).then(res => {
        if (res.code === 10000) {
          this.details = res.data
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
}
</style>
