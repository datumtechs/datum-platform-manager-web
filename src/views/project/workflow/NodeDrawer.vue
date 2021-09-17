<template>
  <div class="node-drawer">
    <el-drawer
      :append-to-body="true"
      :modal="false"
      :visible.sync="isDrawer"
      :before-close="handleClose"
      :with-header="false"
    >
      <div class="drawer-warp">
        <div class="nav">
          <div
            class="nav-item"
            v-for="(item, index) in navs"
            :key="index"
            :class="index === navIndex ? 'active' : ''"
            @click="handleTableIndex(index)"
          >
            {{ $t(item.lable) }}
          </div>
        </div>
        <div class="view">
          <OverView v-show="navIndex === 0"></OverView>
          <InputView :nodeId="nodeId" v-show="navIndex === 1"></InputView>
          <OutputView :nodeId="nodeId" v-show="navIndex === 2"></OutputView>
          <CodeView :nodeId="nodeId" v-show="navIndex === 3"></CodeView>
          <EnviromentView
            :nodeId="nodeId"
            v-show="navIndex === 4"
          ></EnviromentView>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import OverView from './OversView.vue'
import OutputView from './OutputView.vue'
import InputView from './InputsView.vue'
import CodeView from './CodeView.vue'
import EnviromentView from './EnviromentView.vue'
import { WorkflowModule } from '@/store/modules/workflow'
@Component({
  name: 'NodeDrawer',
  components: {
    OverView,
    OutputView,
    InputView,
    CodeView,
    EnviromentView,
  },
})
export default class NodeDrawerIndex extends Vue {
  @Prop({ required: true, default: false }) private isDrawer!: boolean
  @Prop({ required: true }) private nodeId!: number

  private navIndex = 0
  private navs = [
    {
      lable: 'workflow.overview',
    },
    {
      lable: 'workflow.input',
    },
    {
      lable: 'workflow.output',
    },
    {
      lable: 'workflow.code',
    },
    {
      lable: 'workflow.enviroment',
    },
  ]
  private handleTableIndex(index: number) {
    this.navIndex = index
  }
  @Emit('update:isDrawer')
  private handleClose() {
    return false
  }
}
</script>

<style scoped lang="stylus">
.drawer-warp
  display flex
  height: 100%;
  .nav
    width 100px
    height 100%
    text-align center
    .nav-item
      font-size 14px
      line-height 35px
      height 35px
      border-left 2px solid #ccc
      cursor pointer
    .active
      background #ccc
      font-weight 550
      border-left 3px solid #0f62fe
  .view
    width 100%
    box-sizing border-box
    background #ccc
    padding 10px 30px
>>> .el-drawer
      top: 165px!important
      width: 450px!important
      padding: 0!important
</style>
