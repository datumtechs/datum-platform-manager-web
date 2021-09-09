<template>
  <el-row class="tac">
    <div class="tac-title">
      我的算法
    </div>
    <el-col>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#ccc"
        active-text-color="#000"
      >
        <el-submenu
          :index="(index + 1).toString()"
          v-for="(item, index) in menus"
          :key="index"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ item.algorithmName }}</span>
          </template>
          <template v-if="item.child && item.child.length">
            <el-menu-item
              :index="`${index + 1}-${i + 1} `"
              v-for="(node, i) in item.child"
              :key="`${index}-${i}`"
              @click="startDrag(node)"
            >
              <!-- @mousedown.native="startDrag('Rect', $event, node.label)" -->
              <i class="el-icon-menu"></i>
              <span>
                {{ node.algorithmName }}
              </span>
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { AlgorithmType } from '@/api/types'
@Component({
  name: 'TreeDrawer',
})
export default class extends Vue {
  @Prop({ required: true, default: [] }) private menus!: any
  @Emit('clickItem')
  private startDrag(item: AlgorithmType) {
    console.log(item)
    return item
  }

  // startDrag(type,e,title){
  //   console.log('tree mousedown',{type,e,title})
  //   this.$emit('startDrag',{type,e,title})
  // },
}
</script>
<style lang="stylus" scoped>
.tac
  width: 300px;
  height 800px
  background #ccc
  .tac-title
    text-indent 25px
    height: 50px;
    line-height: 50px;
    font-weight 600
  .el-menu
    border-right: 0;
</style>
