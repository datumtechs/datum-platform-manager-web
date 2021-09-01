<template>
  <div class="index">
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main>
        <Common></Common>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from './Header.vue'
import Common from './Common.vue'

@Component({
  components: {
    Header,
    Common,
  },
})
export default class LayoutIndex extends Vue {
  private mounted() {}
}
</script>
<style scoped lang="stylus">
.index, .el-container
  height 100%
  .el-aside
    height 100%
    overflow hidden
    background rgba(0,33,64,1)
    box-shadow 2px 0px 6px 0px rgba(0,21,41,0.35)
  .el-header
    color #000000
    padding 0
    background rgba(255,255,255,1)
  .el-main
    padding 0
    color #333
    background rgba(209,209,209,0.18)
  .header
    box-shadow 0px 1px 4px 0px rgba(0,21,41,0.12)
</style>
