<template>
  <div class="workflow">
    <TreeDrawer
      :menus="menus"
      @clickItem="handleItem"
      class="tree-menus"
    ></TreeDrawer>
    <div class="canvas">
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
    <div class="instruct">
      <span @click="handleSave"> 保存 </span>
      <span @click="handleStartWorkflow" v-if="!startShow"> 启动 </span>
      <span @click="handleEndWorkflow" v-else> 终止 </span>
      <span @click="handleEmpty"> 清空 </span>
      <span> 创建作业 </span>
    </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleResetName">重命名</v-contextmenu-item>
      <!-- <v-contextmenu-item @click="handleCopy">复制</v-contextmenu-item> -->
      <v-contextmenu-item @click="handleDelete">删除</v-contextmenu-item>
      <v-contextmenu-item @click="viewResults">查看运行结果</v-contextmenu-item>
    </v-contextmenu>
    <template v-if="isNodeDrawer">
      <NodeDrawer :nodeId="workflowNodeId" :isDrawer.sync="isDrawer" />
    </template>
    <ViewRun
      ref="ViewRun"
      :nodeName="nodeName"
      :taskId="taskId"
      :resultsVisible.sync="resultsVisible"
    ></ViewRun>
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
import NodeDrawer from './NodeDrawer.vue'
import TreeDrawer from './TreeDrawer.vue'
import ViewRun from './ViewRun.vue'
import { geAlgorithmTree } from '@/api/algorithm'
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
  get startShow() {
    return this.$route.query.run === '1'
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
    if (this.handleisAuth()) return
    if (!this.nodeList.length) {
      this.$message.error('暂无节点')
      return
    }
    const min = Number(WorkflowModule.algorithms.minNumbers)
    const inputValue = WorkflowModule.valueListNumber
    console.log(inputValue, min)
    if (inputValue < min) {
      return this.$message.warning(`至少输入${min}个数据协同方`)
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
    const { code, msg } = await startWorkflow(params)
    if (code === 10000) {
      this.$message.success(msg)
    }
  }
  // 终止工作流
  private async handleEndWorkflow() {
    if (this.handleisAuth()) return
    const { workflowId } = this
    const { code, msg } = await endWorkflow({ workflowId })
    if (code === 10000) {
      this.$message.success(msg)
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
    const { msg, code } = await saveNode(params)
    if (code === 10000) {
      this.$message.success(msg)
    }
    this.getNodeList()
  }
  // 删除该节点
  private async handleDelete() {
    if (this.handleisAuth()) return
    this.isNodeDrawer = false
    this.nodeList = []
  }
  // 清空节点
  private async handleEmpty() {
    if (this.handleisAuth()) return
    const { workflowId } = this
    const { msg } = await clearNode({ workflowId })
    this.$message.success(msg)
    this.nodeList = []
    WorkflowModule.INIT_DATA()
    // 移除弹窗，下次打开重新加载created
    this.isNodeDrawer = false
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
    const { data } = await getWorkflwLog(taskId)
    this.logList = data
  }
  created() {
    const { params } = this.$route
    this.workflowId = params.workflow
    this.getAlaor()
    this.getNodeList()
    const name = this.$route.query.workflow
    BreadcrumbModule.SET_WORKFLOW(name)
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
  .instruct
    position absolute
    z-index 1
    right 20px
    top 0
    color #000
    span
      padding 5px
      display inline-block
      margin-right 15px
      font-size 14px
      cursor pointer
    span:hover
      background #ccc
  .canvas
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
    background #ccc
    color #333
    padding 20px
    .log-title
      margin-bottom 20px
      .list
        .item
          padding 10px 0
</style>
