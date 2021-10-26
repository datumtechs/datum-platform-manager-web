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
        <div class="view" :key="viewKey">
          <OverView v-show="navIndex === 0"></OverView>
          <InputView v-show="navIndex === 1"></InputView>
          <OutputView v-show="navIndex === 2"></OutputView>
          <CodeView v-show="navIndex === 3"></CodeView>
          <EnviromentView v-show="navIndex === 4"></EnviromentView>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
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
  private navIndex = 0
  private viewKey = 0
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
  get currentIndex() {
    return WorkflowModule.currentIndex
  }
  private handleTableIndex(index: number) {
    this.navIndex = index
  }
  @Emit('update:isDrawer')
  private handleClose() {
    return false
  }
  // 切换节点，弹窗视图更新
  @Watch('currentIndex')
  private changeCurrentIndex() {
    this.viewKey++
    this.navIndex = 0
  }
}
</script>

<style scoped lang="stylus">
.drawer-warp
  display flex
  height: 100%;
  .nav
    width 140px
    height 100%
    text-align center
    .nav-item
      font-size 14px
      line-height 35px
      height 35px
      border-left 1px solid #d3d5d4
      cursor pointer
      color #606266
    .active
      background rgba(95,79,251,0.1)
      border-left 2px solid #0f62fe
      color #000
  .view
    width 100%
    box-sizing border-box
    background #fff
    padding 20px 30px
    box-shadow 0px 1px 4px 0px #d3d5d4
>>> .el-drawer
      top: 165px!important
      width: 500px!important
      padding: 0!important
</style>
