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
            @contextmenu.prevent.stop="handleContextmenu(index)"
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
          <div class="arrow" v-if="index > 0">
            <div class="line"></div>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </template>
    </div>
    <ToolBar
      :toolStateList="toolStateList"
      :startShow="startShow"
      :isSuccess="isSuccess"
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
      <v-contextmenu-item :disabled="handleRunState()" @click="viewResults">
        查看运行结果
      </v-contextmenu-item>
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
          {{ item.taskId }}<br />
          {{ item.name }}&nbsp;&nbsp;{{ item.createAt }}&nbsp;&nbsp;{{
            item.identityId
          }}&nbsp;&nbsp;{{ item.partyId }}&nbsp;&nbsp;{{ item.content }}
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
import { AppModule } from '@/store/modules/app'

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
  // 记录节点数据
  private copySaveParams = ''
  // ToolBar state
  private saveState = false
  private startState = false
  private endState = false
  private deleteState = false
  private createState = false
  // 轮询工作流
  private workStateTimer: any = null
  get lan() {
    return AppModule.language
  }
  // 是否包含 逻辑回归训练
  get isModel() {
    let state = false
    this.nodeList.map((item: any) => {
      if (item.nodeAlgorithmVo.inputModel) {
        state = true
      }
    })
    return state
  }
  // 输入模型id
  get modelId() {
    return WorkflowModule.modelValue
  }
  get toolStateList() {
    const { saveState, startState, endState, deleteState } = this
    return [saveState, startState, endState, deleteState]
  }
  get isNode() {
    return !!this.nodeList.length
  }
  get isSuccess() {
    let state = false
    this.nodeList.forEach((item: any) => {
      if (item.runStatus === 2) {
        state = true
      }
    })
    return state
  }
  // 查看者权限
  get isAuth() {
    const role = Number(this.$route.params.role)
    return role === 3
  }
  private handleisAuth() {
    // if (this.isAuth) {
    //   const tips: any = this.$t('tips.noAuth')
    //   this.$message.warning(tips)
    //   return true
    // } else {
    //   return false
    // }
    // 无权限不提示，按钮置灰
    return this.isAuth
  }
  // 算法列表
  private async getAlaor() {
    const { data } = await geAlgorithmTree()
    this.menus = data.algTreeVoList
  }

  // 创建节点
  private async handleItem(data: AlgorithmType) {
    if (this.handleisAuth()) return
    if (this.nodeList.length >= 3) {
      const tips: any = this.$t('tips.maxNode')
      return this.$message.warning(tips)
    }
    const algorithmId = data.algorithmId
    const algorithmIds = this.nodeList.map((item: any) => item.algorithmId)
    if (algorithmIds.includes(algorithmId)) {
      const tips: any = this.$t('tips.noRepeat')
      return this.$message.warning(tips)
    }
    const item = JSON.parse(JSON.stringify(data))
    const { workflowId } = this
    const params = {
      algorithmId: item.algorithmId,
      nodeName: item.nodeName,
      nodeAlgorithmVo: item.algDetailsVo,
      workflowId,
    }
    this.nodeList.push(params)
    WorkflowModule.SET_DATA(this.nodeList)
    WorkflowModule.SET_NODES(this.nodeList)
  }
  // 启动工作流
  private async handleStartWorkflow() {
    if (this.startState) return
    if (this.handleisAuth()) return
    if (!this.nodeList.length) {
      const tips: any = this.$t('tips.noNode')
      this.$message.error(tips)
      return
    }
    if (this.isModel && this.modelId === '') {
      const tips: any = this.$t('tips.inputModel')
      return this.$message.warning(tips)
    }
    const min = Number(WorkflowModule.algorithms.minNumbers)
    const inputValue = WorkflowModule.valueListNumber
    if (inputValue < min) {
      if (this.lan === 'zh') {
        return this.$message.warning(`至少输入${min}个数据协同方`)
      } else {
        return this.$message.warning(`Enter at least ${min} data collaborators`)
      }
    }
    if (!inputValue && !min) {
      let isInput = false
      this.nodeList.forEach((item: any) => {
        if (item.workflowNodeInputVoList.length === 0) {
          isInput = true
        }
      })
      if (isInput) {
        const tips: any = this.$t('tips.inputDataCoordination')
        return this.$message.warning(tips)
      }
    }
    const sign = await this.getSign()
    this.nodeList = WorkflowModule.nodeList
    const { workflowId, nodeList } = this
    const workflowNodeReqList = this.getSaveParams().workflowNodeReqList
    const saveFlag =
      this.copySaveParams === JSON.stringify(workflowNodeReqList) ? 0 : 1
    const params = {
      address: UserModule.user_info.address,
      endNode: nodeList.length,
      saveFlag, // 0：不需要，1：需要
      sign,
      startNode: 1,
      workflowId,
      workflowNodeReqList,
    }
    this.startState = true
    try {
      const { code, msg } = await startWorkflow(params)
      if (code === 10000) {
        this.$message.success(msg)
        await this.getWorkState()
        this.checkWorkState()
      }
      this.startState = false
      this.copySaveParams = JSON.stringify(workflowNodeReqList)
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
        await this.getWorkState()
        this.checkWorkState()
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
  // 保存
  private async handleSave() {
    if (this.saveState) return
    if (this.handleisAuth()) return
    if (!this.nodeList.length) {
      const tips: any = this.$t('tips.noNode')
      this.$message.error(tips)
      return
    }
    const params = this.getSaveParams()
    this.saveState = true
    try {
      const { msg, code } = await saveNode(params)
      // eslint-disable-next-line no-debugger
      // debugger
      if (code === 10000) {
        this.$message.success(msg)
        this.getNodeList()
        // 保存后，更新保存的节点数据
        this.copySaveParams = JSON.stringify(params.workflowNodeReqList)
      }
      this.saveState = false
    } catch (error) {
      this.saveState = false
    }
  }
  private getSaveParams() {
    this.nodeList = WorkflowModule.nodeList
    const { workflowId, nodeList } = this
    const workflowNodeReqList = nodeList.map((item: any, index: number) => {
      return {
        algorithmId: item.algorithmId,
        modelId: item.nodeAlgorithmVo.inputModel ? this.modelId : null,
        nodeName: item.nodeName,
        nodeStep: index + 1,
        workflowId,
        workflowNodeCodeReq: {
          calculateContractCode: item.nodeAlgorithmVo.calculateContractCode,
          dataSplitContractCode: '',
          editType: 1, //1-sql, 2-noteBook
        },
        workflowNodeInputReqList: item.workflowNodeInputVoList,
        workflowNodeOutputReqList: item.workflowNodeOutputVoList,
        workflowNodeResourceReq: {
          costBandwidth: Number(item.nodeAlgorithmVo.costBandwidth),
          costCpu: Number(item.nodeAlgorithmVo.costCpu),
          costGpu: item.nodeAlgorithmVo.costGpu,
          runTime: item.nodeAlgorithmVo.runTime,
          costMem: Number(item.nodeAlgorithmVo.costMem),
        },
      }
    })
    return {
      workflowId,
      workflowNodeReqList,
    }
  }
  private handleContextmenu(index: number) {
    this.currentIndex = index
    WorkflowModule.SET_NODES_INDEX(index)
  }
  // 删除该节点
  private async handleDelete() {
    if (this.handleisAuth()) return
    const index = this.currentIndex
    this.nodeList.splice(index, 1)
    this.isNodeDrawer = false
  }
  // 清空节点
  private async handleEmpty() {
    if (this.deleteState) return
    if (this.handleisAuth()) return
    if (!this.nodeList.length) {
      const tips: any = this.$t('tips.noNode')
      this.$message.error(tips)
      return
    }
    if (this.startShow == 1) {
      const tips: any = this.$t('tips.noDetele')
      return this.$message.warning(tips)
    }
    this.nodeList = []
    WorkflowModule.INIT_DATA()
    const { workflowId } = this
    this.deleteState = true
    try {
      const { code, msg } = await clearNode({ workflowId })
      if (code === 10000) {
        this.$message.success(msg)
        this.getLogList()
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
    if (this.currentIndex !== index) {
      this.isNodeDrawer = false
    }
    if (!this.isNodeDrawer) {
      this.isNodeDrawer = true
    }
    this.currentIndex = index
    WorkflowModule.SET_NODES_INDEX(index)
    if (item && item.id) {
      this.workflowNodeId = item.id
    }
    WorkflowModule.SET_DATA(this.nodeList)
    setTimeout(() => {
      this.isDrawer = true
    }, 13)
  }
  private async getNodeList() {
    const id = this.workflowId
    await WorkflowModule.getNodeList(id)
    this.nodeList = WorkflowModule.nodeList
    this.getLogList()
    this.copySaveParams = JSON.stringify(
      this.getSaveParams().workflowNodeReqList,
    )
    this.checkWorkState()
  }
  private async getLogList() {
    const { nodeList, workflowId } = this
    const { data } = await getWorkflwLog(workflowId)
    this.logList = data
  }
  // 检查工作流状态
  private checkWorkState() {
    // 判断节点是否运作中
    const isRun = this.startShow == 1
    if (isRun) {
      if (this.workStateTimer) {
        clearTimeout(this.workStateTimer)
        this.workStateTimer = null
      }
      this.workStateTimer = setInterval(() => {
        this.getWorkState()
      }, 10000)
    } else {
      if (this.workStateTimer) {
        clearTimeout(this.workStateTimer)
        this.workStateTimer = null
      }
    }
  }
  private async getWorkState() {
    const id = this.workflowId
    const { data } = await getWorkflowStatus({ id })
    this.startShow = data.runStatus
    this.nodeList.map((item: any, index: number) => {
      item.runStatus = data.getNodeStatusVoList[index]['runStatus']
    })
    // 节点不是运行中，清除定时器
    if (this.startShow !== 1) {
      this.checkWorkState()
    }
    this.getLogList()
  }
  private async getModels() {
    const id = this.$route.params.id
    await WorkflowModule.getModels(id)
  }
  created() {
    const { params, query } = this.$route
    this.workflowId = params.workflow
    this.getAlaor()
    this.getNodeList()
    const name = this.$route.query.workflow
    BreadcrumbModule.SET_WORKFLOW(name)
    this.getWorkState()
    this.getModels()
  }
  private async getSign() {
    const checkAddress = alayaService.checkAddress()
    if (checkAddress) {
      const sign = await alayaService.signAlaya()
      return sign
    } else {
      const tips: any = this.$t('tips.noToken')
      this.$message.error(tips)
      UserModule.ResetToken()
      throw new Error(tips)
    }
  }
  private handleRunState() {
    const node = this.nodeList[this.currentIndex]
    if (node && node.runStatus === 2) {
      return false
    } else {
      return true
    }
  }
  private viewResults() {
    this.nodeName = this.nodeList[this.currentIndex].nodeName
    const taskId = this.nodeList[this.currentIndex].taskId
    this.resultsVisible = true
    ;(this.$refs['ViewRun'] as any).getResultsList(taskId)
  }
  beforeDestroy() {
    if (this.workStateTimer) {
      clearTimeout(this.workStateTimer)
      this.workStateTimer = null
    }
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
    z-index 1
    background: #fff
  .x6-graph-box
    position absolute
    z-index 1
    width calc(100vw - 300px)
    height calc(100vh - 360px)
    left 300px
    bottom 200px
    padding: 30px
    box-sizing border-box
    overflow auto
    .flow-node
      width 500px
      margin 0px auto
      margin-top 80px
      transform: translateX(-150px)
      position relative
      .arrow
        position: absolute;
        left: 54%;
        top: -100px;
        .line
          width: 1px;
          height: 74px;
          background: rgb(55 53 53 / 83%);
          transform: translate(9px, 10px);
        i
          font-size: 19px
          color: #292020
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
        text-align: center
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
    width: calc(100vw - 300px)
    height 200px
    bottom 0
    left 300px
    background: #fff;
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
</style>
