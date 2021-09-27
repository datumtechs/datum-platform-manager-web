<template>
  <div class="output-wrap">
    <div class="title">
      {{ $t('workflow.output') }}
    </div>
    <div class="button-bolck">
      <jz-button @click="handleSave" type="jz-button--primary" class="save">
        {{ $t('workflow.save') }}
      </jz-button>
    </div>
    <div class="text">
      保存至数据响应方
    </div>
    <div class="info">
      说明：已默认保存至数据发起方
    </div>
    <div class="select">
      <div class="select-switch">
        <el-switch
          v-model="isSelect"
          active-color="#13ce66"
          inactive-color="#8d8d8d"
          :disabled="isAuth"
        >
        </el-switch>
        <span class="switch-text"> {{ isSelect ? '是' : '否' }} </span>
      </div>
      <div class="select-value" v-if="isSelect">
        <el-checkbox-group v-model="checkList" :disabled="isAuth">
          <div v-for="(item, key, index) in checkOptions" :key="index">
            <el-checkbox :label="key" :disabled="!index"
              >{{ item }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="text">
      存储形式
    </div>
    <div class="info">
      明文
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { addNodeOutput } from '@/api/workflow'
import { WorkflowModule } from '@/store/modules/workflow'
import JzButton from '@/components/JzButton.vue'

@Component({
  name: 'OutputView',
  components: {
    JzButton,
  },
})
export default class extends Vue {
  @Prop({ required: true }) private nodeId!: number
  private isSelect = false
  private checkList: string[] = []
  get checkOptions() {
    return WorkflowModule.orgOptions
  }
  // 查看者权限
  get isAuth() {
    const role = Number(this.$route.params.role)
    return role === 3
  }
  private handleisAuth() {
    if (this.isAuth) {
      this.$message.warning('您是项目查看者，暂无编辑权限')
      return true
    } else {
      return false
    }
  }
  private async handleSave() {
    if (!this.checkList.length) return
    const { nodeId } = this
    const handleItem = (id: string, index: number) => {
      const name = (this.checkOptions as any)[id]
      return {
        identityId: id,
        identityName: name,
        senderFlag: !index ? 1 : 0,
        storePattern: 1,
        workflowNodeId: nodeId,
      }
    }
    let res: any = []
    this.checkList.forEach((item, index) => {
      res.push(handleItem(item, index))
    })
    let saveNodeOutputReqList = []
    // 未保存响应方，默认保存发起方
    if (!this.isSelect) {
      saveNodeOutputReqList = res[0]
    } else {
      saveNodeOutputReqList = res
    }
    const parasm = {
      saveNodeOutputReqList: saveNodeOutputReqList,
      workflowNodeId: nodeId,
    }
    const { msg } = await addNodeOutput(parasm)
    this.$message.success(msg)
  }
  created() {
    // 数据回显
    const { outputVoList, inputVoList } = WorkflowModule
    if (
      (outputVoList && outputVoList.length) ||
      (inputVoList && inputVoList.length)
    ) {
      this.isSelect = true
      WorkflowModule.SET_ORG_OPTIONS()
      outputVoList.map((item: any) => {
        this.checkList.push(item.identityId)
      })
    }
  }
  // 默认勾选第一个数据方
  @Watch('checkOptions', { deep: true })
  handleCheckOptions(val: any): void {
    const checkOptions = Object.keys(val)
    if (checkOptions && checkOptions.length > 0) {
      this.checkList[0] = checkOptions[0]
      this.isSelect = true
    }
  }
}
</script>

<style scoped lang="stylus">
.output-wrap
  height 100%
  font-size 14px
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
  .text
    margin-bottom 20px
  .select
    margin-top 20px
    margin-bottom 20px
    .select-value
      margin  20px 0
      div
        padding 5px 0
      >>> .el-checkbox__input.is-disabled+span.el-checkbox__label
        color #409EFF
    .switch-text
      padding-left 20px
      vertical-align -1px
  .info
    font-size: 12px;
    color: #8C8C8C;
</style>
