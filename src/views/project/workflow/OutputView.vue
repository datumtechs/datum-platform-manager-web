<template>
  <div class="output-wrap">
    <div class="title">
      {{ $t('workflow.output') }}
    </div>
    <div class="text">
      保存至数据协同方
    </div>
    <div class="select">
      <div class="select-switch">
        <el-switch
          v-model="isSelect"
          active-color="#13ce66"
          inactive-color="#8d8d8d"
          @change="handleChange"
        >
        </el-switch>
        <span class="switch-text"> {{ isSelect ? '是' : '否' }} </span>
      </div>
      <div class="select-value" v-if="isSelect">
        <el-checkbox-group v-model="checkList">
          <div v-for="(item, key, index) in checkOptions" :key="index">
            <el-checkbox :label="key">{{ item }} </el-checkbox>
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import { addNodeOutput } from '@/api/wrorkflow'

@Component({
  name: 'OutputView',
})
export default class extends Vue {
  @Prop({ required: true }) private nodeId!: number
  private isSelect = false
  private checkList = []
  private checkOptions: any = {
    1: '银行A',
    2: '证券A',
    3: '证券B',
  }
  private async handleChange(state: boolean) {
    if (!state) return
    if (!this.checkList.length) return
    const { nodeId } = this
    const handleItem = (id: string | number) => {
      const name = this.checkOptions[id]
      return {
        identityId: id,
        identityName: name,
        savePartnerFlag: 0,
        storePattern: 1,
        workflowNodeId: nodeId,
      }
    }
    let res: any = []
    this.checkList.forEach((item) => {
      res.push(handleItem(item))
    })
    const parasm = {
      saveNodeOutputReqList: res,
      workflowNodeId: nodeId,
    }
    const { msg } = await addNodeOutput(parasm)
    this.$message.success(msg)
  }
}
</script>

<style scoped lang="stylus">
.output-wrap
  height 100%
  font-size 14px
  .title
    color #333
    font-size 16px
    font-weight: 650;
    line-height 30px
    margin-bottom 30px
  .text
    margin-bottom 20px
  .select
    margin-bottom 20px
    .select-value
      margin  20px 0
      div
        padding 5px 0
    .switch-text
      padding-left 20px
      vertical-align -1px
  .info
    font-size: 12px;
    color: #8C8C8C;
</style>
