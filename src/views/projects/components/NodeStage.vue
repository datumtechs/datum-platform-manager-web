<template>
  <div id="nodeStage" class="node-stage-box">
    <div id="mainStage" class="main-stage" :class="{ showDot: showDot, lowBox: drawer }">
      <div
        v-for="(node, index) in nodeListWithStatus"
        :key="node.algorithmId"
        class="node pointer"
        :class="{ 'node-arrow': index < nodeList.length - 1, 'active-node': curNodeId === node.algorithmId }"
        @click="showNodeDetail(node, index)"
        @contextmenu.prevent="showMenuFn($event, node, index)"
      >
        <el-tooltip
          :disabled="!node.status || node.status === 0 || node.status === 1"
          class="item"
          effect="dark"
          placement="top"
        >
          <p slot="content" class="tooltip-box">
            {{ node.statusMsg }}
          </p>
          <p
            v-if="node.status !== 0"
            class="node-status-box"
            :class="{ runningBg: node.status === 1, successBg: node.status === 2, failedBg: node.status === 3 }"
          >
            <!-- 0-未运行,1-运行中,2-运行成功，3-运行失败 -->

            <img v-if="node.status === 1" src="@/assets/images/projects/rolling.svg" alt="" />
            <img v-if="node.status === 2" src="@/assets/images/projects/1.icon3.svg" alt="" />
            <img v-if="node.status === 3" src="@/assets/images/projects/1.icon1.svg" alt="" />
          </p>
        </el-tooltip>
        <p class="node-text">
          <el-tooltip class="item" effect="dark" :content="node.nodeName" placement="top-end">
            <span v-if="!node.isEdit" class="node-text-span">{{ node.nodeName }}</span>
            <input
              v-else
              :ref="`rename-input-${index}`"
              v-model="currentName"
              class="rename-input"
              @blur="lossFocus(node, index)"
            />
          </el-tooltip>
        </p>
      </div>
    </div>
    <ContextMenu
      v-bind="$attrs"
      :visible.sync="showMenu"
      :position="position"
      :status="workFlowStatus"
      :task-id="taskId"
      @deleteNode="deleteNode"
      @renameNode="renameNode"
      @viewResult="viewResult"
    />
    <el-drawer
      :title="$t('projects.runningLog')"
      class="_drawer"
      :visible="drawer"
      :append-to-body="false"
      :modal-append-to-body="false"
      :direction="'btt'"
      :close-on-press-escape="false"
      :modal="false"
      :size="'100%'"
      @close="$emit('update:drawer', false)"
    >
      <!-- <p class="log-item log-title">{{ logList && logList[0] && logList[0].taskId }}</p> -->
      <div v-for="(item, i) in logList" :key="i" class="log-item">
        <p v-if="item.type === 'id'" class="log-item-taskId">{{ item.taskId }}</p>
        <span>{{ dayjs(item.createAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        <span>{{ item.identityId }}</span>
        <span>{{ item.partyId }}</span>
        <span>{{ item.content }}</span>
      </div>
    </el-drawer>
    <TaskResult :result-visible.sync="resultVisible" :task-result-list="taskResultList" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ContextMenu from 'components/ContextMenu.vue'
import TaskResult from './TaskResult.vue'
import { projectApi } from 'apis'
import dayjs from 'dayjs'
export default {
  components: { ContextMenu, TaskResult },
  props: {
    statusList: {
      type: Array,
      default: () => []
    },
    workFlowStatus: {
      type: Number,
      default: 0
    },
    logList: {
      type: Array,
      default: () => []
    },
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      taskId: '',
      currentName: '',
      currentIndex: 0,
      showDot: false,
      showMenu: false,
      resultVisible: false,
      taskResultList: [],
      taskItemDetails: {},
      position: {
        x: -1,
        y: -1
      }
    }
  },
  computed: {
    ...mapGetters('workflow', ['nodeList', 'curNodeId', 'dragStatus', 'curNodeIndex']),
    projectId: function () {
      return this.$route.params.id
    },
    nodeListWithStatus() {
      const that = this
      if (that.statusList.length === 0) return that.nodeList
      // :0-未运行,1-运行中,2-运行成功，3-运行失败
      return that.nodeList.map((node, index) => {
        node.status = that.statusList[index] ? that.statusList[index].runStatus : 0
        node.statusMsg = that.statusList[index] ? that.statusList[index].runMsg : ''
        node.taskId = that.statusList[index] ? that.statusList[index].taskId : '0'
        node.isEdit = false
        return { ...node }
      })
    }
  },
  watch: {
    dragStatus(val) {
      this.showDot = val
    },
    nodeListWithStatus() {
      this.nodeListWithStatus.length &&
        this.nodeListWithStatus[this.currentIndex] &&
        this.showNodeDetail(this.nodeListWithStatus[this.currentIndex], this.currentIndex)
    }
  },
  mounted() {},
  beforeDestroy() {
    this.clearCache()
  },
  methods: {
    dayjs,
    ...mapMutations('workflow', [
      'SET_CUR_NODE_ID',
      'DELETE_NODE',
      'SET_CUR_DATA',
      'SET_NODE_PANEL',
      'SET_NODE_INDEX',
      'RESET_NODE_LIST',
      'SET_NODE_NAME'
    ]),
    filterFtatusList() {
      const that = this
      if (that.statusList.length === 0) return that.nodeList // showNodeDetail
      // :0-未运行,1-运行中,2-运行成功，3-运行失败
      const list = that.nodeList.map((node, index) => {
        node.status = that.statusList[index] ? that.statusList[index].runStatus : 0
        return { ...node }
      })
      return list
    },
    lossFocus(node, index) {
      this.SET_NODE_NAME(this.currentName)
      this.nodeListWithStatus[index].isEdit = false
    },

    clearCache() {
      this.SET_NODE_INDEX(0)
      this.SET_CUR_NODE_ID(this.currentName)
    },
    deleteNode() {
      this.showMenu = false
      // if (this.statusList[this.curNodeIndex].runStatus === 1) {
      //   this.$message.error(this.$t('tip.nodeRunningNoDelete'))
      //   // 运行中 无法删除
      //   return
      // }
      this.DELETE_NODE(this.currentIndex)
      this.$parent.resetStatus(this.currentIndex)
      this.SET_NODE_PANEL(false)
      // TODO: change statusList
    },
    callPanel(id) {
      this.$bus.$emit('showPanel', id)
      this.SET_NODE_PANEL(true)
    },
    renameNode(node) {
      this.showMenu = false
      this.currentName = this.nodeListWithStatus[this.currentIndex].nodeName
      this.nodeListWithStatus[this.currentIndex].isEdit = true
      this.$nextTick(() => {
        this.$refs[`rename-input-${this.currentIndex}`][0].focus()
      })
    },
    async viewResult() {
      await this.queryResult()
      this.resultVisible = true
    },
    queryResult() {
      // 此处是应该根据点击获取的实时taskId进行查询
      projectApi
        .getTaskResult({
          taskId: this.taskId || ''
        })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            this.taskResultList = data
          }
        })
    },
    showNodeDetail(node, index) {
      this.currentIndex = index
      this.SET_CUR_NODE_ID(node.algorithmId)
      this.SET_NODE_INDEX(index)
      this.SET_CUR_DATA(this.nodeList)
      this.callPanel(node.algorithmId)
    },
    closeMenu() {
      this.showMenu = false
    },
    showMenuFn(e, item, index) {
      this.showMenu = true
      this.taskId = item.taskId
      this.taskItemDetails = item
      // this.SET_CUR_NODE_ID(item.algorithmId)
      // this.SET_NODE_INDEX(index)
      // this.SET_CUR_DATA(item)
      // this.callPanel(item.algorithmId)
      this.currentIndex = index
      this.SET_CUR_NODE_ID(item.algorithmId)
      this.SET_NODE_INDEX(index)
      this.SET_CUR_DATA(this.nodeList)
      // this.workFlowStatus = ''
      this.position.x = e.clientX
      this.position.y = e.clientY
    }
  }
}
</script>
<style lang="scss" scoped>
.log-item {
  // padding: 3px 0;
  line-height: 22px;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 12px;
  color: #333333;
  span {
    line-height: 16px;
    padding-right: 5px;
    display: inline-block;
  }
  .log-item-taskId {
    font-size: 14px;
    padding: 10px 0;
    font-family: DINPro-Medium, Ali-Medium;
    display: inline-block;
  }
}
::v-deep .el-dialog__body {
  padding: 0 20px;
}
.node-stage-box {
  height: calc(100% - 36px);
  display: flex;
  justify-content: center;
  position: relative;
  ._drawer {
    position: absolute;
    bottom: 0;
    top: auto;
    height: 200px;
    margin-top: 0;
    padding: 15px;
    border-top: 1px solid #e8ebea;
    ::v-deep.el-drawer {
      box-shadow: 0 0 0 0 #fff;
    }
    ::v-deep .el-drawer__header {
      padding: 0;
      margin-bottom: 10px;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 12px;
      color: #666;
    }

    ::v-deep .el-drawer__body {
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1;
        background: #f7f7f7;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #cccccc;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 10px;
        background: #f7f7f7;
      }
    }
  }
  .main-stage {
    width: 200px;
    height: calc(100% - 60px);
    margin: 30px 0;
    // margin-right: 340px;
    text-align: center;
    &.showDot {
      border: 1px dashed #d3d2d2;
      box-shadow: 0 0 1px;
    }
    &.lowBox {
      height: calc(100% - 260px);
    }
    .node {
      width: 150px;
      height: 44px;
      background: #ffffff;
      border: 1px solid #672cdf;
      border-radius: 8px;
      margin: 30px auto;
      position: relative;
      .node-status-box {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        width: 24px;
        height: 42px;
        border-radius: 7px 0px 0px 7px;
        img {
          width: 12px;
          height: 12px;
        }
        &.runningBg {
          background-color: rgba(103, 44, 223, 0.1);
        }
        &.successBg {
          background-color: #06b40a;
        }
        &.failedBg {
          background-color: #cc3d23;
        }
      }
      .node-text {
        font-size: 12px;
        color: #333333;
        text-align: center;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 24px;
        .node-text-span {
          width: 102px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 12px;
        }
      }
      .rename-input {
        font-size: 12px;
        color: #333333;
        width: 100px;
        margin-left: 12px;
        border: 1px solid #e3e3e3;
        background-color: rgba(103, 44, 223, 0.1);
      }
      &.active-node {
        background-color: rgba(103, 44, 223, 0.1);
        box-shadow: 4px 4px 10px 3px #e8e8e8;
      }
    }
    .node-arrow {
      &:after {
        content: '';
        width: 6px;
        height: 18px;
        position: absolute;
        bottom: -24px;
        background: url('../../../assets/images/projects/arrow.svg') no-repeat;
      }
    }

    .menu {
      width: 120px;
      min-height: 100px;
      background-color: #fff;
      border: 1px solid #e8e8e8;
      box-shadow: 2px 2px 8px 0 hsl(0deg 0% 59% / 20%);
      position: fixed;
      cursor: pointer;
      padding: 10px;
      border-radius: 4px;
      white-space: nowrap;
      z-index: 1200;
      -webkit-tap-highlight-color: transparent;
      .menu-box {
        list-style: none;
        text-align: left;
        .menu-box-option {
          width: 100%;
          &:hover {
            box-shadow: 0 0 3px;
          }
        }
      }
    }
  }
}
</style>