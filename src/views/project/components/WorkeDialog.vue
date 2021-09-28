<template>
  <div class="dialog">
    <el-dialog
      :title="$t(title)"
      :visible.sync="workVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="wrap">
        <div class="updata bottom" v-if="!type">
          <i class="el-icon-document"></i>
          导入工作流（可选，仅支持本平台生成的.***文件)
        </div>
        <div class="bottom">
          <el-input
            v-model="name"
            placeholder="请输入工作流名称，最长30字"
          ></el-input>
        </div>
        <div>
          <el-input
            v-model="describe"
            placeholder="请输入工作流描述，最长50字"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">
          {{ $t('project.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          {{ $t('project.submit') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
@Component({
  name: 'WorkDialog',
  components: {
    JzButton,
  },
})
export default class WorkDialog extends Vue {
  // 0. 创建 1.编辑 2复制
  private id = ''
  private type = 0
  private name = ''
  private describe = ''
  private workVisible = false
  get title() {
    const titles = [
      'project.createWork',
      'worke.editWork',
      'worke.duplicateWork',
    ]
    return titles[this.type]
  }
  private handleOpen(type: number, row?: any) {
    this.type = type
    if (type > 0) {
      this.name = row.workflowName
      this.describe = row.workflowDesc
      this.id = row.id || ''
    }
    this.workVisible = true
  }
  private handleClose() {
    this.workVisible = false
    this.name = ''
    this.describe = ''
  }
  // 提交
  @Emit('submit')
  private async handleSubmit() {
    const { name, describe, type } = this
    const projectId = this.$route.params.id
    const data: any = {
      projectId,
      workflowDesc: describe,
      workflowName: name,
    }
    // 编辑
    if (type === 1) {
      data.id = this.id
    }
    // 复制
    if (type === 2) {
      data.originId = this.id
    }
    this.handleClose()
    return {
      data,
      type,
    }
  }
}
</script>

<style scoped lang="stylus">
.wrap
  box-sizing border-box
  padding 10px 20px
  width 400px
  .updata
    padding 4px
    color #0F62FE
    cursor pointer
  .updata:hover
    text-decoration: underline
  .bottom
    margin-bottom 10px
  >>> .el-input__inner
        border 0!important;
        border-bottom: 1px solid #8a7e7e!important;
        border-radius: 0!important;
        padding: 3px;
        height 48px!important;
        line-height 48px!important;
        font-size: 14px;
        letter-spacing: 0.16px;
        margin-bottom 4px
      >>> .el-input__inner:focus
        border: 2px solid rgba(15, 98, 254, 1)!important;
</style>
