<template>
  <div class="input-view">
    <div class="title">
      {{ $t('workflow.input') }}
    </div>
    <div class="button-bolck">
      <jz-button @click="handleSave" type="jz-button--primary" class="save">
        {{ $t('workflow.save') }}
      </jz-button>
      <jz-button @click="handleCancel">
        {{ $t('workflow.cancel') }}
      </jz-button>
    </div>
    <div class="block">
      <div class="text">数据协同方</div>
      <template v-if="isCreated">
        <div
          class="block-row"
          v-for="(row, index) in selectLayout"
          :key="index"
        >
          <el-cascader
            :span="12"
            :props="inputProps"
            v-model="inputValue[index]"
            :key="initKey"
          ></el-cascader>
        </div>
      </template>
    </div>
    <div class="block">
      <span class="add-button" @click="addSelect"
        >添加 <i class="el-icon-plus"></i
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { addNodeInput, getTables, getColumns } from '@/api/workflow'
import { WorkflowModule } from '@/store/modules/workflow'
@Component({
  name: 'InputView',
  components: {
    JzButton,
  },
})
export default class InputViewIndex extends Vue {
  @Prop({ required: true }) private nodeId!: number
  private initKey = 0
  private selectLayout = [{}, {}]
  private inputValue: any = []
  private inputProps: object = {
    // checkStrictly: true,
    label: 'name',
    value: 'code',
    lazy: true,
    lazyLoad: this.inputLazyLoad,
  }
  get organizations() {
    return WorkflowModule.organizationList
  }
  get isCreated() {
    return WorkflowModule.organizationList.length
  }
  // 动态加载选项
  private async inputLazyLoad(node: any, resolve: any) {
    let { level } = node
    try {
      if (level === 0) {
        console.log('level', level, node)
        setTimeout(() => {
          const data = this.organizations
          let nodes = data.map((item: any) => ({
            code: item.identityId,
            name: item.identityName,
            leaf: level >= 2,
            disabled: item.disabled,
          }))
          console.log('node', node)
          resolve(nodes)
        }, 13)
      } else if (level === 1) {
        const params: any = { identityId: node.data.code }
        const { data } = await getTables(params)
        let nodes = data.map((item: any) => ({
          code: item.metaDataId,
          name: item.dataName,
          leaf: level >= 2,
        }))
        console.log('level', level, nodes)

        resolve(nodes)
      } else if (level === 2) {
        const { data } = await getColumns(node.data.code)
        let nodes = data.map((item: any) => ({
          code: item.columnIndex,
          name: item.columnName,
          leaf: level >= 2,
        }))
        resolve(nodes)
      }
    } catch (e) {
      console.log(e)
    }
  }
  private async handleSave() {
    const { nodeId } = this
    const saveNodeInputReqList: any = []
    this.inputValue.map((item: any) => {
      if (item && item.length) {
        saveNodeInputReqList.push({
          dataColumnIds: item[2],
          dataTableId: item[1],
          dataType: 0,
          identityId: item[0],
          workflowNodeId: nodeId,
        })
      }
    })
    const params = {
      saveNodeInputReqList,
      workflowNodeId: nodeId,
    }
    // 提交输入数据
    await addNodeInput(params)
    // 缓存选中的选项
    const organizationId: string[] = []
    // 过滤空值
    this.inputValue = this.inputValue.filter(Boolean)
    this.inputValue.map((item: string[]) => {
      organizationId.push(item[0])
    })
    await WorkflowModule.setOrganizationId(organizationId)
    WorkflowModule.SAVE_ORG_OPTIONS()
  }
  private async handleCancel() {
    this.selectLayout = [{}, {}]
    this.inputValue = []
    await WorkflowModule.getOrganizations()
  }
  private addSelect() {
    if (this.selectLayout.length >= 5) return
    this.selectLayout.push({})
  }
  // 回显选择状态
  handleInputValue() {
    const { inputVoList } = WorkflowModule
    const res: any = []
    if (inputVoList && inputVoList.length) {
      if (inputVoList.length > 2) {
        this.selectLayout = inputVoList
      }
      inputVoList.map((item: any, index: number) => {
        res[index] = [
          item.identityId,
          item.dataTableId,
          Number(item.dataColumnIds),
        ]
      })
    }
    this.inputValue = res
  }
  async created() {
    await WorkflowModule.getOrganizations()
    this.handleInputValue()
  }
  @Watch('inputValue', { deep: true })
  changeCreated(value: any) {
    console.log('input', value)
    if (value.length) {
      const res = value.map((item: string[]) => {
        if (item && item[0]) {
          return item[0]
        }
      })
      WorkflowModule.SET_ORG_DISABLED(res)
      // 更新下拉框重新加载选项
      this.initKey++
    }
  }
}
</script>

<style scoped lang="stylus">
.input-view
  height 100%
  font-size 14px
  .title
    color #333
    font-size 16px
    font-weight: 650;
    line-height 30px
    margin-bottom 20px
  .button-bolck
    position relative
    top: -50px;
    display flex
    justify-content flex-end
    .save
      margin-right 15px
  .block
    .text
      padding-bottom 10px
      font-size 14px
    .add-button
      cursor pointer
      color #999999
  .block-row
    margin-bottom 20px
    .row-item
      width 90px
      margin-right 15px
    .row-item:last-child
      margin-right 0
    >>> .el-cascader
          .el-cascader-menu
            min-width: 150px!important;
</style>
