<template>
  <div class="dialog">
    <el-dialog
      :visible.sync="subjobVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="wrap">
        子作业
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'

@Component({
  name: 'SubjobDialog',
  components: {
    JzButton,
  },
})
export default class WorkDialog extends Vue {
  // 0. 创建 1.编辑
  private type = 0
  private subjobVisible = false
  private handleOpen(type: number, row?: any) {
    this.subjobVisible = true
  }
  // 提交
  private handleSubmit() {}
  private handleClose() {
    this.subjobVisible = false
  }
}
</script>

<style scoped lang="stylus">
.wrap
  box-sizing border-box
  padding 10px 20px
  width 400px
</style>
