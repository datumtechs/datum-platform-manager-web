<template>
  <div class="output-wrap">
    <div class="title">
      {{ $t('workflow.output') }}
    </div>
    <div class="button-bolck">
      <jz-button
        @click="handleSave(false)"
        type="jz-button--primary"
        class="save"
        v-if="isSelect"
      >
        {{ $t('workflow.save') }}
      </jz-button>
    </div>
    <div class="text">
      {{ $t('output.saveTo') }}
    </div>
    <div class="info">
      {{ $t('output.notes') }}
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
        <span class="switch-text">
          {{ isSelect ? $t('output.yes') : $t('output.no') }}
        </span>
      </div>
      <div class="select-value" v-if="isSelect">
        <el-checkbox-group v-model="checkList" :disabled="isAuth">
          <div v-for="(item, index) in checkOptions" :key="index">
            <el-checkbox :label="item.identityId" :disabled="!index"
              >{{ item.identityName }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="text">
      {{ $t('output.storageForm') }}
    </div>
    <div class="info">
      {{ storePattern == 1 ? $t('output.plaintext') : $t('output.ciphertext') }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { WorkflowModule } from '@/store/modules/workflow'
import JzButton from '@/components/JzButton.vue'

@Component({
  name: 'OutputView',
  components: {
    JzButton,
  },
})
export default class extends Vue {
  private isSelect = false
  private checkList: string[] = []
  get checkOptions() {
    return WorkflowModule.orgOptions
  }
  get storePattern() {
    return (WorkflowModule.algorithms as any).storePattern
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
  private async handleSave(state: boolean) {
    if (!this.checkList.length) return
    const handleItem = (id: string, index: number) => {
      return {
        identityId: id,
        senderFlag: !index ? 1 : 0,
        storePattern: this.storePattern,
      }
    }
    let res: any = []
    this.checkList.forEach((item, index) => {
      res.push(handleItem(item, index))
    })
    WorkflowModule.SET_NODES_OUTPUT(res)
    if (!state) {
      const tips: any = this.$t('tips.save')
      this.$message.success(tips)
    }
  }
  created() {
    // 数据回显
    const { workflowNodeOutputVoList, workflowNodeInputVoList } = WorkflowModule
    if (
      (workflowNodeOutputVoList && workflowNodeOutputVoList.length) ||
      (workflowNodeInputVoList && workflowNodeInputVoList.length)
    ) {
      const list = workflowNodeOutputVoList.map((item: any) => item.identityId)
      const checkList = Array.from(new Set(list))
      // 检测选中key对应的value是否存在
      this.checkValue(checkList)
    }
  }
  private checkValue(checkList: string[]) {
    // checkList
    const orgList = WorkflowModule.orgOptions
    orgList.map((item: any) => {
      if (checkList.includes(item.identityId)) {
        this.checkList.push(item.identityId)
        this.isSelect = true
      }
    })
  }
  // 数组对象去重
  repeatArr(list: any) {
    let map = new Map()
    for (let item of list) {
      if (!map.has(item.identityId)) {
        map.set(item.identityId, item)
      }
    }
    return [...map.values()]
  }

  // 默认勾选第一个数据方
  @Watch('checkOptions', { deep: true })
  handleCheckOptions(val: any): void {
    if (val && val.length > 0) {
      val.map((item: any) => {
        if (item.senderFlag && item.senderFlag === 1) {
          // this.checkList.push(item.identityId)
          // this.checkList = Array.from(new Set(this.checkList))
          this.checkList[0] = item.identityId
        }
      })
      this.handleSave(true)
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
