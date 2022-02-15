<template>
  <div class="common-wrapper">
    <div class="data-wrapper">
      <Breadcrumb :cur-name="curName" />
      <div class="editor-box">
        <div class="editor-left-box">
          <div class="left-title-box">
            {{ $t('projects.myAlgo') }}
          </div>
          <AlgoTree :view-model="viewModel" :algorithm-tree-list="algorithmTreeList" :workflow-id="workflowId" />
        </div>
        <div class="editor-mid-box">
          <Handlebar
            :view-model="viewModel"
            :workflow-id="workflowId"
            :project-id="projectId"
            :work-flow-status="workFlowStatus"
            @TaskLog="getTaskLog"
            @cleanNode="cleanNode"
            @showLog="showLog"
          />
          <NodeStage
            :view-model="viewModel"
            :drawer.sync="showDrawer"
            :log-list="logList"
            :status-list="statusList"
            :work-flow-status="workFlowStatus"
          />
        </div>
        <!-- <transition name="drawer"> -->
        <WorkflowPanel :view-model="viewModel" />
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from 'components/breadcrumb/Breadcrumb.vue'
import Handlebar from './Handlebar.vue'
import WorkflowPanel from './WorkflowPanel.vue'
import AlgoTree from './AlgoTree.vue'
import NodeStage from './NodeStage.vue'
import { projectApi } from 'apis'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { Breadcrumb, AlgoTree, Handlebar, WorkflowPanel, NodeStage },
  props: {},
  data () {
    return {
      showDrawer: true,
      statusList: [],
      logList: [],
      algorithmTreeList: [],
      workFlowStatus: 0
    }
  },
  computed: {
    ...mapGetters('workflow', [ 'showNodePanel', 'curFlowTab' ]),
    curName: function () {
      return this.$route.query.name
    },
    workflowId: function () {
      return this.$route.query.id + ''
    },
    projectId: function () {
      return this.$route.query.projectId + ''
    },
    viewModel: function () {
      return this.curFlowTab === 'records' || this.$route.query.view === 'records' ? 'view' : 'edit'
    },
    runningRecordId: function () {
      return this.$route.query.runningRecordId || ''
    }
  },
  watch: {
    lang (val) {
      this.initAlgoData()
    }
  },
  mounted () {
    this.initAlgoData()
    this.queryWorkflowDetails()
    this.queryNodeDetailsList()
    this.getWorkState()
    this.getTaskLog(true)
  },
  beforeDestroy () {
    this.RESET_NODE_LIST()
    this.SET_NODE_PANEL(false)
  },
  methods: {
    ...mapMutations('workflow', [ 'SET_NODELIST', 'RESET_NODE_LIST', 'SET_NODE_PANEL' ]),
    resetStatus (index) {
      if (this.statusList.length <= index) return
      this.statusList.splice(index, 1)
    },
    handleClose () {},
    cleanNode () {
      this.statusList = []
      this.logList = []
    },
    queryWorkflowDetails () {},
    initAlgoData () {
      projectApi.queryAlgorithmTreeList().then(res => {
        const { code, data } = res
        if (code === 10000) {
          this.algorithmTreeList = data.algTreeVoList.map(algo => {
            algo.child.length > 0 ? (algo.isOpen = true) : (algo.isOpen = false)
            return { ...algo }
          })
        }
      })
    },
    queryNodeDetailsList () {
      projectApi
        .queryNodeDetailsList({ workflowId: this.workflowId, runningRecordId: this.runningRecordId })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            // 0-未完成,1-已完成
            this.SET_NODELIST(data.workflowNodeVoList)
          }
        })
    },
    showLog () {
      this.showDrawer = true
    },
    async getTaskLog (type) {
      const res = await projectApi.getWorkflowLog({
        workflowId: this.workflowId,
        runningRecordId: this.runningRecordId
      })
      const { code, data } = res
      if (code === 10000) {
        this.logList = this.sortById(data)
        if (type) this.drawer = true
      }
    },
    copyFn (data) {
      return JSON.parse(JSON.stringify(data))
    },
    sortById (data) {
      let currentId = ''
      let preIndex = -1
      const orgList = this.copyFn(data)
      data.forEach((item, index) => {
        if (item.taskId !== currentId && index !== preIndex) {
          currentId = item.taskId
          preIndex = index
          orgList.splice(index, 0, { type: 'id', taskId: item.taskId })
        }
      })
      return orgList
    },
    async getStatus () {
      const res = await projectApi.getWorkflowStatus({
        workflowId: this.workflowId,
        runningRecordId: this.runningRecordId
      })
      const { code, data } = res
      if (code === 10000) {
        this.statusList = data.getNodeStatusVoList
        this.workFlowStatus = data.runStatus
      }
    },
    async getWorkState () {
      await this.getTaskLog(false)
      await this.getStatus()
    }
  }
}
</script>
<style lang="scss" scoped>
.editor-box {
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 143px);
  display: flex;
  overflow: hidden;
  // position: relative;
  clear: both;
  .editor-left-box {
    // width: 200px;
    flex: 0 0 200px;
    border-top: 1px solid #ebeef9;
    border-left: 1px solid #ebeef9;
    border-bottom: 1px solid #ebeef9;
    .left-title-box {
      height: 47px;
      line-height: 47px;
      text-align: left;
      padding-left: 20px;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 18px;
      color: #1d2832;
      border-bottom: 1px solid #ebeef9;
    }
  }
  .editor-mid-box {
    flex: 1;
    border: 1px solid #ebeef9;
  }
  .drawer-enter-active,
  .drawer-leave-active {
    transition: all 0.3s ease;
  }
  // .drawer-leave-active {
  //   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  // }
  .drawer-enter,
  .drawer-leave-to {
    transform: translateX(340px);
  }
}
</style>