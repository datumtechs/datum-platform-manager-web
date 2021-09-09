<template>
  <div class="workflow">
    <TreeDrawer
      :menus="menus"
      @clickItem="handleItem"
      class="tree-menus"
    ></TreeDrawer>
    <div class="canvas">
      <div class="flow-node" v-if="isNode">
        <div class="block" @click="handleNode" v-contextmenu:contextmenu>
          <span v-if="!isResetName">{{ nodeName }}</span>
          <input
            v-else
            type="text"
            @blur="isResetName = false"
            ref="ResetInput"
            v-model="nodeName"
            class="reset-name"
          />
        </div>
        <ul class="state">
          <li>未开始</li>
          <li>成功</li>
          <li>运行中</li>
          <li>失败</li>
        </ul>
      </div>
    </div>
    <div class="instruct">
      <span @click="handleSave"> 保存 </span>
      <span> 启动/终止 </span>
      <span @click="handleDelete"> 清空 </span>
      <span> 创建作业 </span>
    </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleResetName">重命名</v-contextmenu-item>
      <v-contextmenu-item>复制</v-contextmenu-item>
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
import { addWorkflowNode } from '@/api/wrorkflow'
import { AlgorithmType } from '@/api/types'
import { saveNode, clearNode } from '@/api/wrorkflow'

@Component({
  name: 'workflow',
  components: {
    NodeDrawer,
    TreeDrawer,
  },
})
export default class workflowIndex extends Vue {
  private isNode = false
  private isDrawer = false
  private isResetName = false
  private nodeName = ''
  private algorithmId = ''
  private workflowId = ''
  private workflowNodeId = ''
  private menus = []
  private async getAlaor() {
    const { data } = await geAlgorithmTree()
    this.menus = data
  }

  // 创建节点
  private handleItem(data: AlgorithmType) {
    console.log('handleItem', data)
    if (this.isNode) {
      this.$message.warning('最多创建一个工作流，请删除当前工作流！')
      return
    }
    this.isNode = true
    this.nodeName = data.algorithmName
    this.handWorkNodeAdd()
  }
  // 发送新增工作流api
  private async handWorkNodeAdd() {
    const { algorithmId, workflowId, nodeName } = this
    const params = {
      algorithmId,
      nodeName,
      workflowId,
    }
    const { data } = await addWorkflowNode(params)
    this.workflowNodeId = data.workflowNodeId
  }
  private handleResetName() {
    this.isResetName = true
    setTimeout(() => {
      ;(this.$refs as any).ResetInput.focus()
    }, 200)
  }
  private async handleSave() {
    const { workflowId, nodeName, workflowNodeId } = this

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
    await saveNode(params)
  }
  // 删除该节点
  private async handleDelete() {
    const { workflowId } = this
    const { msg } = await clearNode({ workflowId })
    this.$message.success(msg)
    this.isNode = false
  }
  // 点击节点，展开信息
  private handleNode() {
    this.isDrawer = true
  }
  created() {
    this.getAlaor()
    const { params } = this.$route
    this.algorithmId = params.id
    this.workflowId = params.workflow
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
</style>
