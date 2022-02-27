<template>
  <div class="common-wrapper">
    <div class="common-banner">
      <div class="banner-content">
        <div class="left-area">
          <div class="logo-box">
            <img src="@/assets/images/default/data.svg" alt class="logo-avatar" />
            <span class="logo-name">{{ nodeName }}</span>
          </div>
          <div class="identifier-box">
            <span class="name">{{ $t('node.identifier') }}:</span>&nbsp;
            <span class="value">{{ identityId }}</span>
          </div>
        </div>
        <div class="right-area">
          <div v-for=" item in dataList" :key="item.id" class="value-box">
            <div class="center-data">
              <p class="value">
                <span class="front">{{ getInt(changeSizeObj(item.value).value) }}</span>
                <span class="end">.&nbsp;{{ getFloat(changeSizeObj(item.value).value) }}</span>
              </p>
              <p v-if="item.key === 'core'" class="unit">{{ item.unit }}</p>
              <p v-else class="unit">{{ changeSizeObj(item.value).unit }}</p>
            </div>
            <div class="value-box-tail">
              <p class="title">{{ item.name }}</p>
              <img src="@/assets/images/home/1.bj7.svg" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <div class="search-box">
        <ul class="tab-box">
          <li
            v-for=" item in menuList"
            :key="item.id"
            class="tab-mini-box pointer"
            :class="{ active: item.value === curTab }"
            @click="handleTabClick(item.value)"
          >
            <span class="ring"></span>
            <span>{{ item.label }}</span>
            <span class="font-b">{{ item.total || 0 }}</span>
          </li>
        </ul>
      </div>
      <DataTable
        v-if="curTab === 'data'"
        :data-curpage="nodeDetailDataPage"
        :table-data="dataTableData"
        :identity-id="identityId"
        :node-name="nodeName"
        :data-loading="dataLoading"
        :total-rows="dataTotalnum"
        :data-pagesize.sync="dataPagesize"
        @handleDataPageChange="handleDataPageChange"
      />
      <TaskTable
        v-if="curTab === 'task'"
        :task-curpage="nodeDetailTaskPage"
        :table-data="taskTableData"
        :identity-id="identityId"
        :node-name="nodeName"
        :total-rows="taskTotalnum"
        :task-pagesize.sync="taskPagesize"
        @handleTaskPageChange="handleTaskPageChange"
      />
      <div class="back-btn pointer" @click="back">
        <span class="text">{{ $t('common.back') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { orgApi, dataApi, taskApi } from 'apis'
import { changeSizeObj } from '../../utils/utils'
import DataTable from './components/dataTable.vue'
import TaskTable from './components/taskTable.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { DataTable, TaskTable },
  data () {
    return {
      isTask: 4,
      // dataCurpage: 1,缓存
      // taskCurpage: 1,
      dataPagesize: 8,
      taskPagesize: 8,
      dataTableData: [],
      taskTableData: [],
      dataTotalnum: 0,
      taskTotalnum: 0,
      tableData: [],
      dataLoading: false,
      taskLoading: false,
      globalData: {
        totalBandwidth: '',
        totalCore: '',
        totalData: '',
        totalFile: '',
        totalMemory: '',
        totalTask: ''
      }
    }
  },

  computed: {
    ...mapGetters('nodes', [ 'nodeDetailDataPage', 'nodeDetailTaskPage', 'nodeDetailTab' ]),
    curTab () {
      return this.nodeDetailTab
    },
    identityId () {
      return this.$route.query.identityId
    },
    nodeName () {
      return this.$route.query.orgName
    },
    menuList () {
      return [
        { id: '1', value: 'data', label: this.$t('menu.data'), total: this.globalData.totalFile },
        // { id: '2', value: 'algorithm', label: this.$t('menu.Algorithm') },
        { id: '3', value: 'task', label: this.$t('menu.task'), total: this.globalData.totalTask }
      ]
    },
    dataList () {
      return [
        {
          id: 0,
          key: 'memory',
          name: this.$t('node.memory'),
          unit: '',
          value: this.globalData.totalMemory
        },
        {
          id: 1,
          key: 'core',
          name: this.$t('node.cpu'),
          unit: this.$t('common.cores'),
          value: this.globalData.totalCore
        },
        {
          id: 2,
          key: 'bandwidth',
          name: this.$t('node.bandwidth'),
          unit: '',
          value: this.globalData.totalBandwidth
        }
      ]
    }
  },
  watch: {
    taskPagesize (newV) {
      this.taskCurpage = 1
      this.initTaskTableData()
    },
    dataPagesize (newV) {
      this.dataCurpage = 1
      this.initMetaTableData()
    }
  },
  mounted () {
    this.initailFn()
    this.findOrgInfo()
  },
  methods: {
    ...mapMutations('nodes', [ 'SET_NODE_DETAIL_TAB', 'SET_NODE_DETAIL_DATA_PAGE', 'SET_NODE_DETAIL_TASK_PAGE' ]),
    changeSizeObj,
    getUnit () { },
    findOrgInfo () {
      orgApi.findOrgInfo({ identityId: this.identityId }).then(res => {
        if (res.code === 0) {
          this.globalData = res.data
        }
      })
    },
    handleDataPageChange (page) {
      this.SET_NODE_DETAIL_DATA_PAGE(page)
      this.initMetaTableData()
    },
    handleTaskPageChange (page) {
      this.SET_NODE_DETAIL_TASK_PAGE(page)
      this.initTaskTableData()
    },
    back () {
      this.$router.push({ name: 'nodes' })
    },
    getInt (value) {
      if (!value) return '0'
      return value.toString().split('.')[ 0 ]
    },
    getFloat (value) {
      if (!value) return '00'
      return value.toString().split('.')[ 1 ]
    },
    handleTabClick (tab) {
      this.SET_NODE_DETAIL_TAB(tab)
    },
    indexMethod (index) {
      return index
    },
    initailFn () {
      this.initMetaTableData()
      this.initTaskTableData()
    },
    initMetaTableData () {
      this.dataLoading = true
      dataApi
        .queryMetaListByNodeId({
          identityId: this.identityId,
          pageNo: this.nodeDetailDataPage,
          pageSize: this.dataPagesize
        })
        .then(res => {
          this.dataLoading = false
          this.dataTableData = res.data
          this.dataTotalnum = res.totalRows
        })
        .catch(err => {
          console.log(err)
          this.dataLoading = false
        })
    },
    initTaskTableData () {
      this.taskLoading = true
      taskApi
        .queryTaskListByNodeId({
          identityId: this.identityId,
          pageNo: this.nodeDetailTaskPage,
          pageSize: this.taskPagesize
        })
        .then(res => {
          this.taskLoading = false
          const { code, data } = res
          if (code === 10000) {
            this.taskTableData = data.items
            this.taskTotalnum = data.total
          }
        })
        .catch(err => {
          console.log(err)
          this.taskLoading = false
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
    .tab-box {
      display: flex;
      gap: 30px;
      .tab-mini-box {
        width: 130px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 2px;
        span.ring {
          width: 16px;
          height: 16px;
          background-color: #657acd;
          border-radius: 50%;
          position: relative;
          &::before {
            content: "";
            width: 8px;
            height: 8px;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .active {
        background-color: #1cc2eb;
        color: #ffffff;
        & > span.ring {
          background-color: #fff;
        }
      }
      .active {
        & ::before {
          background-color: #1cc2eb !important;
        }
      }
    }
    .search {
      width: 270px;
    }
    .select {
      width: 457px;
    }
  }
  &::v-deep .el-table tr {
    height: 82px;
  }
}
</style>
