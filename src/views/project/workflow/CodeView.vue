<template>
  <div class="code-wrap">
    <div class="title">
      {{ $t('workflow.code') }}
    </div>
    <div class="button-bolck">
      <jz-button @click="handleSave" type="jz-button--primary" class="save">
        {{ $t('workflow.save') }}
      </jz-button>
      <jz-button @click="handleEmpty">
        {{ $t('workflow.empty') }}
      </jz-button>
    </div>
    <div class="code-input">
      <el-input type="textarea" v-model="textarea"> </el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { saveNodeCode } from '@/api/wrorkflow'
@Component({
  name: 'market',
  components: {
    JzButton,
  },
})
export default class CodeIndex extends Vue {
  @Prop({ required: true }) private nodeId!: number

  private textarea = ''
  private handleEmpty() {
    this.textarea = ''
  }
  private async handleSave() {
    const params = {
      calculateContractCode: this.textarea,
      workflowNodeId: this.nodeId,
      editType: 1, // TODO 编辑器类型
    }
    const { msg } = await saveNodeCode(params)
    this.$message.success(msg)
  }
}
</script>

<style scoped lang="stylus">
.code-wrap
  height 100%
  font-size 14px
  .title
    color #333
    font-size 16px
    font-weight: 650;
    line-height 30px
    margin-bottom 30px
  .button-bolck
    display flex
    justify-content end
    .save
      margin-right 15px
  .code-input
    margin-top 15px
    >>> .el-textarea__inner
          resize: none;
          height 600px
          border-radius 0!important
</style>
