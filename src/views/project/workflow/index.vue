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
      <span> 启动/终止 </span>
      <span @click="handleDelete"> 清空 </span>
      <span> 创建作业 </span>
    </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleResetName">重命名</v-contextmenu-item>
      <v-contextmenu-item @click="handleCopy">复制</v-contextmenu-item>
      <v-contextmenu-item @click="handleDelete">删除</v-contextmenu-item>
      <v-contextmenu-item>查看运行结果</v-contextmenu-item>
    </v-contextmenu>
    <NodeDrawer :nodeId="workflowNodeId" :isDrawer.sync="isDrawer" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import NodeDrawer from './NodeDrawer.vue'
import TreeDrawer from './TreeDrawer.vue'
import { geAlgorithmTree } from '@/api/algorithm'
import { addWorkflowNode } from '@/api/workflow'
import { AlgorithmType } from '@/api/types'
import { saveNode, clearNode, getNodes } from '@/api/workflow'
import { WorkflowModule } from '@/store/modules/workflow'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'

@Component({
  name: 'workflow',
  components: {
    NodeDrawer,
    TreeDrawer,
  },
})
export default class workflowIndex extends Vue {
  private isDrawer = false
  private isResetName = false
  private workflowId = ''
  private workflowNodeId = ''
  private nodeList: any = []
  private menus = []
  private stateList = ['未开始', '成功', '运行中', '失败']
  private currentIndex: number = 0
  get isNode() {
    return !!this.nodeList.length
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
    this.nodeList.push(data)
    WorkflowModule.SET_ALGOR(data)
  }
  private handleResetName() {
    this.isResetName = true
    setTimeout(() => {
      if ((this.$refs as any).ResetInput) {
        ;(this.$refs as any).ResetInput[0].focus()
      }
    }, 500)
  }
  private async handleCopy() {
    // handleCopy()
    const node = this.nodeList[this.currentIndex]
    const { algorithmId, nodeName } = node
    const { workflowId } = this
    await addWorkflowNode({ algorithmId, nodeName, workflowId })
  }
  private async handleSave() {
    const { workflowId, workflowNodeId } = this
    const nodeName: string = this.nodeList[0].nodeName
    const params = {
      workflowId,
      workflowNodeReqList: [
        {
          id: workflowNodeId,
          nodeName,
          nodeStep: 1, // TODO 暂无数据来源
        },
      ],
    }
    const { msg, code } = await saveNode(params)
    if (code === 10000) {
      this.$message.success(msg)
    }
    this.getNodeList()
  }
  // 删除该节点
  private async handleDelete() {
    const { workflowId } = this
    const { msg } = await clearNode({ workflowId })
    this.$message.success(msg)
    this.nodeList = []
  }
  // 点击节点，展开信息
  private handleNode(item: any, index: number) {
    this.isDrawer = true
    this.currentIndex = index
    if (item && item.id) {
      this.workflowNodeId = item.id
    }
    const parmas = {
      data: this.nodeList,
      index,
    }
    WorkflowModule.SET_DATA(parmas)
  }
  private async getNodeList() {
    const id = this.workflowId
    const { data } = await getNodes(id)
    if (data.workflowNodeVoList && data.workflowNodeVoList.length) {
      this.nodeList = data.workflowNodeVoList
    }
  }
  created() {
    this.getAlaor()
    const { params } = this.$route
    this.workflowId = params.workflow
    this.getNodeList()
    const name = this.$route.query.workflow
    BreadcrumbModule.SET_WORKFLOW(name)
  }
}
</script>

<style scoped lang="stylus">
.workflow
  width 100%
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
    height 800px
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
</style>
