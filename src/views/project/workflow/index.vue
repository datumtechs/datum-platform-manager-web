<template>
  <div class="workflow">
    <TreeDrawer :menus="menus" @clickItem="handleItem" class="tree-menus"></TreeDrawer>
    <div class="canvas">
      <div class="flow-node">
        <div class="block">隐私求交(PSI)</div>
        <ul class="state">
          <li>未开始</li>
          <li>成功</li>
          <li>运行中</li>
          <li>失败</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import TreeDrawer from './TreeDrawer.vue'
import { geAlgorithmTree } from '@/api/algorithm'
@Component({
  name: 'workflow',
  components: {
    TreeDrawer,
  },
})
export default class workflowIndex extends Vue {
  private menus = []
  private async getAlaor() {
    const { data } = await geAlgorithmTree()
    this.menus = data
  }
  private handleItem(id: number) {
    console.log('handleItem', id)
  }
  created() {
    // console.log(this.$route)
    this.getAlaor()
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
        width 105px
        height 45px
        line-height 45px
        text-align center
        background #80d9ff
        border-radius 6px
        color: #FFFFFF;
        font-size 14px
        cursor pointer
      .state
        display flex
        li
          font-size 14px
          width 130px
          padding-top 5px
          border-top 2px solid #ccc
</style>
