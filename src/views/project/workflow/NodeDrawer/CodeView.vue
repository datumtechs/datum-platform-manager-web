<template>
  <div class="code-wrap">
    <div class="title">
      {{ $t('workflow.code') }}
    </div>
    <!-- <div class="button-bolck">
      <jz-button @click="handleSave" type="jz-button--primary" class="save">
        {{ $t('workflow.save') }}
      </jz-button>
      <jz-button @click="handleEmpty">
        {{ $t('workflow.empty') }}
      </jz-button>
    </div> -->
    <div class="code-input">
      <el-input type="textarea" v-model="textarea" :disabled="true"></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { WorkflowModule } from '@/store/modules/workflow'

@Component({
  name: 'market',
  components: {
    JzButton,
  },
})
export default class CodeIndex extends Vue {
  private textarea = ''
  private handleEmpty() {
    if (this.handleisAuth()) return
    this.textarea = ''
  }
  // 查看者权限
  get isAuth() {
    const role = Number(this.$route.params.role)
    return role === 3
  }
  private handleisAuth() {
    if (this.isAuth) {
      const tips: any = this.$t('tips.noAuth')
      this.$message.warning(tips)
      return true
    } else {
      return false
    }
  }
  private async handleSave() {
    if (this.handleisAuth()) return
    WorkflowModule.SET_NODES_CODE(this.textarea)
    const tips: any = this.$t('tips.save')
    this.$message.success(tips)
  }
  created() {
    this.textarea = (WorkflowModule.algorithms as any).calculateContractCode
  }
}
</script>

<style scoped lang="stylus">
.code-wrap
  height 100%
  font-size 14px
  box-sizing: border-box;
  padding-bottom: 60px;
  padding-right: 20px
  overflow-y: auto;
  .title
    color #333
    font-weight: 500;
    font-size: 20px;
    line-height 30px
    margin-top 10px
    margin-bottom 30px
  .button-bolck
    position relative
    top: -60px;
    display flex
    justify-content flex-end
    .save
      margin-right 15px
  .code-input
    >>> .el-textarea__inner
          resize: none;
          height 600px
          border-radius 0!important
    >>> .el-textarea.is-disabled .el-textarea__inner {
            background-color #fff
            color: #000;
            cursor: not-allowed;
        }
</style>
