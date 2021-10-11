<template>
  <div class="workflow">
    <TreeDrawer
      :menus="menus"
      @clickItem="handleItem"
      class="tree-menus"
    ></TreeDrawer>
    <!-- 节点画布 -->
    <div class="x6-graph-box">
      <template v-if="isNode">
        <div class="flow-node" v-for="(item, index) in nodeList" :key="index">
          <div
            class="block"
            @click="handleNode(item, index)"
            v-contextmenu:contextmenu
          >
            <span v-if="!isResetName">{{ item.nodeName }}</span>
            <input
              v-else
              type="text"
              @blur="isResetName = false"
              ref="ResetInput"
              v-model="item.nodeName"
              class="reset-name"
            />
          </div>
          <ul class="state">
            <li
              v-for="(info, index) in stateList"
              :key="index"
              :class="item.runStatus === index ? 'active' : ''"
            >
              {{ info }}
            </li>
          </ul>
        </div>
      </template>
    </div>
    <ToolBar
      :toolStateList="toolStateList"
      @handleSave="handleSave"
      @handleEndWorkflow="handleEndWorkflow"
      @handleStartWorkflow="handleStartWorkflow"
      @handleEmpty="handleEmpty"
    ></ToolBar>
    <!-- 记得右键菜单 -->
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleResetName">重命名</v-contextmenu-item>
      <!-- <v-contextmenu-item @click="handleCopy">复制</v-contextmenu-item> -->
      <v-contextmenu-item @click="handleDelete">删除</v-contextmenu-item>
      <v-contextmenu-item @click="viewResults">查看运行结果</v-contextmenu-item>
    </v-contextmenu>
    <!-- 右侧节点弹窗 -->
    <template v-if="isNodeDrawer">
      <NodeDrawer :nodeId="workflowNodeId" :isDrawer.sync="isDrawer" />
    </template>
    <!-- 运行结果弹窗 -->
    <ViewRun
      ref="ViewRun"
      :nodeName="nodeName"
      :taskId="taskId"
      :resultsVisible.sync="resultsVisible"
    ></ViewRun>
    <!-- 运行日志 -->
    <div class="log-wrap">
      <div class="log-title">运行日志</div>
      <div class="list">
        <div class="item" v-for="(item, index) in logList" :key="index">
          {{ item.name }} {{ item.createAt }} {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import NodeDrawer from './NodeDrawer/index.vue'
import TreeDrawer from './TreeDrawer.vue'
import ViewRun from './ViewRun.vue'
import ToolBar from './ToolBar.vue'
import { geAlgorithmTree } from '@/api/algorithm'
import { getWorkflowStatus } from '@/api/workflow'
import { AlgorithmType } from '@/api/types'
import {
  saveNode,
  addWorkflowNode,
  clearNode,
  getNodes,
  startWorkflow,
  endWorkflow,
  getWorkflwLog,
} from '@/api/workflow'
import { WorkflowModule } from '@/store/modules/workflow'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'
import { UserModule } from '@/store/modules/user'
import alayaService from '@/services/alayaService'

@Component({
  name: 'workflow',
  components: {
    NodeDrawer,
    TreeDrawer,
    ViewRun,
    ToolBar,
  },
})
export default class workflowIndex extends Vue {
  private isNodeDrawer = true
  private isDrawer = false
  private isResetName = false
  private workflowId = ''
  private workflowNodeId = ''
  private nodeList: any = []
  private menus = []
  private stateList = ['未开始', '运行中', '成功', '失败']
  private currentIndex: number = 0
  private logList = []
  private resultsVisible = false
  private nodeName = ''
  private taskId = ''
  private startShow = 0
  // ToolBar state
  private saveState = false
  private startState = false
  private endState = false
  private deleteState = false
  private createState = false
  get toolStateList() {
    const {
      saveState,
      startState,
      endState,
      deleteState,
    } = this
    return [
      saveState,
      startState,
      endState,
      deleteState,
    ]
  }
  get isNode() {
    return !!this.nodeList.length
  }
  // 查看者权限
  get isAuth() {
    const role = Number(this.$route.params.role)
    return role === 3
  }
  private handleisAuth() {
    if (this.isAuth) {
      this.$message.warning('您是项目查看者，暂无编辑权限')
      return true
    } else {
      return false
    }
  }
  // 算法列表
  private async getAlaor() {
    const { data } = await geAlgorithmTree()
    this.menus = data
  }

  // 创建节点
  private async handleItem(item: AlgorithmType) {
    if (this.handleisAuth()) return
    if (this.isNode) {
      this.$message.warning('最多创建一个工作流，请删除当前工作流！')
      return
    }
    const { workflowId } = this
    const params = {
      algorithmId: item.algorithmId,
      nodeName: item.nodeName,
      workflowId,
    }
    const { data } = await addWorkflowNode(params)
    this.workflowNodeId = data.workflowNodeId
    data.nodeName = data.algorithmName
    data.id = data.workflowNodeId
    this.nodeList.push(data)
    WorkflowModule.SET_ALGOR(data)
  }
  // 启动工作流
  private async handleStartWorkflow() {
    if (this.startState) return
    if (this.handleisAuth()) return
    if (!this.nodeList.length) {
      this.$message.error('暂无节点')
      return
    }
    const min = Number(WorkflowModule.algorithms.minNumbers)
    const inputValue = WorkflowModule.valueListNumber
    if (inputValue < min) {
      return this.$message.warning(`至少输入${min}个数据协同方`)
    }
    if (!inputValue && !min) {
      return this.$message.warning('未输入数据协同方')
    }
    const sign = await this.getSign()
    const { workflowId, nodeList, workflowNodeId } = this
    const workflowNodeReqList = nodeList.map((item: any, index: number) => {
      return {
        id: item.id,
        nameNode: item.nodeName,
        nodeStep: index + 1,
      }
    })
    const params = {
      address: UserModule.user_info.address,
      sign,
      startNode: 1,
      endNode: nodeList.length,
      workflowId,
      workflowNodeReqList,
    }
    this.startState = true
    try {
      const { code, msg } = await startWorkflow(params)
      if (code === 10000) {
        this.$message.success(msg)
        this.getWorkState()
        this.getLogList()
      }
      this.startState = false
    } catch (error) {
      this.startState = false
    }
  }
  // 终止工作流
  private async handleEndWorkflow() {
    if (this.endState) return
    if (this.handleisAuth()) return
    const { workflowId } = this
    this.endState = true
    try {
      const { code, msg } = await endWorkflow({ workflowId })
      if (code === 10000) {
        this.$message.success(msg)
        this.getWorkState()
      }
      this.endState = false
    } catch (error) {
      this.endState = false
    }
  }
  private handleResetName() {
    if (this.handleisAuth()) return
    this.isResetName = true
    setTimeout(() => {
      if ((this.$refs as any).ResetInput) {
        ;(this.$refs as any).ResetInput[0].focus()
      }
    }, 500)
  }
  private async handleCopy() {
    if (this.handleisAuth()) return
    // handleCopy()
    const node = this.nodeList[this.currentIndex]
    const { algorithmId, nodeName } = node
    const { workflowId } = this
    await addWorkflowNode({ algorithmId, nodeName, workflowId })
  }
  private async handleSave() {
    if (this.saveState) return
    if (this.handleisAuth()) return
    if (!this.nodeList.length) {
      this.$message.error('暂无节点')
      return
    }
    const { workflowId, nodeList } = this
    const workflowNodeReqList = nodeList.map((item: any, index: number) => {
      return {
        id: item.id,
        nameNode: item.nodeName,
        nodeStep: index + 1,
      }
    })
    const params = {
      workflowId,
      workflowNodeReqList,
    }
    this.saveState = true
    try {
      const { msg, code } = await saveNode(params)
      if (code === 10000) {
        this.$message.success(msg)
        this.getNodeList()
        this.saveState = false
      }
    } catch (error) {
      this.saveState = false
    }
  }
  // 删除该节点
  private async handleDelete() {
    if (this.handleisAuth()) return
    this.isNodeDrawer = false
    this.nodeList = []
  }
  // 清空节点
  private async handleEmpty() {
    if (this.deleteState) return
    if (this.handleisAuth()) return
    const { workflowId } = this
    this.deleteState = true
    try {
      const { code, msg } = await clearNode({ workflowId })
      if (code === 10000) {
        this.$message.success(msg)
        this.nodeList = []
        WorkflowModule.INIT_DATA()
      }
      // 移除弹窗，下次打开重新加载created
      this.isNodeDrawer = false
      this.deleteState = false
      // this.getLogList()
    } catch (error) {
      this.deleteState = false
    }
  }
  // 点击节点，展开信息
  private handleNode(item: any, index: number) {
    if (this.isResetName) return
    if (!this.isNodeDrawer) {
      this.isNodeDrawer = true
    }
    this.currentIndex = index
    if (item && item.id) {
      this.workflowNodeId = item.id
    }
    const parmas = {
      data: this.nodeList,
      index,
    }
    WorkflowModule.SET_DATA(parmas)
    setTimeout(() => {
      this.isDrawer = true
    }, 13)
  }
  private async getNodeList() {
    const id = this.workflowId
    const { data } = await getNodes(id)
    if (data.workflowNodeVoList && data.workflowNodeVoList.length) {
      this.nodeList = data.workflowNodeVoList
      this.getLogList()
    }
  }
  private async getLogList() {
    const { nodeList, currentIndex } = this
    const { taskId } = nodeList[currentIndex]
    if (taskId) {
      const { data } = await getWorkflwLog(taskId)
      this.logList = data
    }
  }
  private async getWorkState() {
    const id = this.workflowId
    const { data } = await getWorkflowStatus({ id })
    this.startShow = data.runStatus
    this.nodeList.map((item: any, index: number) => {
      item.runStatus = data.getNodeStatusVoList[index]['runStatus']
    })
  }
  created() {
    const { params, query } = this.$route
    this.workflowId = params.workflow
    this.getAlaor()
    this.getNodeList()
    const name = this.$route.query.workflow
    BreadcrumbModule.SET_WORKFLOW(name)
    this.getWorkState()
  }
  private async getSign() {
    const checkAddress = alayaService.checkAddress()
    if (checkAddress) {
      const sign = await alayaService.signAlaya()
      return sign
    } else {
      this.$message.error('钱包地址异常，请重新连接钱包')
      UserModule.ResetToken()
      throw new Error('钱包地址异常，请重新连接钱包')
    }
  }
  private viewResults() {
    this.nodeName = this.nodeList[this.currentIndex].nodeName
    const taskId = this.nodeList[this.currentIndex].taskId
    this.resultsVisible = true
    ;(this.$refs['ViewRun'] as any).getResultsList(taskId)
  }
}
</script>

<style scoped lang="stylus">
.workflow
  width 100%
  height: calc(100vh - 120px)
  position relative
  .tree-menus
    position absolute
    z-index 99
  .x6-graph-box
    position absolute
    z-index 1
    width 100%
    height: 100%
    .flow-node
      width 500px
      margin 0px auto
      margin-top 200px
      .block
        margin-left 230px
        width 105px
        height 45px
        line-height 45px
        text-align center
        background #80d9ff
        border-radius 6px
        color: #FFFFFF;
        font-size 14px
        cursor pointer
      .reset-name
        border 0
        outline 0
        width 80px
        background #80d9ff
        color #fff
      .state
        display flex
        li
          font-size 14px
          width 130px
          box-sizing border-box
          padding-top 5px
          border-top 2px solid #ccc
        .active
          border-top 2px solid #0f62fe
          color #0f62fe
  .log-wrap
    position absolute
    z-index 99
    width: calc(100vw - 340px)
    height 200px
    bottom 0
    left 300px
    // background #ccc
    // box-shadow  0 -2px 4px #d3d5d4
    border-top 1px solid #e8ebea
    box-sizing border-box
    color #333
    padding 20px
    .log-title
      margin-bottom 20px
      .list
        .item
          padding 10px 0
   @keyframes turn{
      0%{-webkit-transform:rotate(0deg);}
      25%{-webkit-transform:rotate(90deg);}
      50%{-webkit-transform:rotate(180deg);}
      75%{-webkit-transform:rotate(270deg);}
      100%{-webkit-transform:rotate(360deg);}
    }
</style>
