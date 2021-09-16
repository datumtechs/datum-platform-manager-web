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
            :key="cascaderKey[index]"
            @change="
              (e) => {
                changeInputValue(e, index)
              }
            "
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
  private cascaderKey: number[] = []
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
        setTimeout(() => {
          const data = this.organizations
          let nodes = data.map((item: any) => ({
            code: item.identityId,
            name: item.identityName,
            leaf: level >= 2,
            disabled: item.disabled,
          }))
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
    WorkflowModule.SET_ORG_INIT()
    this.handleCascaderKey()
  }
  private addSelect() {
    const max = Number(WorkflowModule.algorithms.maxNumbers)
    if (this.selectLayout.length > max) return
    this.selectLayout.push({})
    let len = this.cascaderKey.length
    this.cascaderKey.push((len + 1) * 1000)
    console.log('cascaderKey', this.cascaderKey)
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
  // 初始化cascaderKey
  private handleCascaderKey() {
    this.cascaderKey = []
    this.selectLayout.map((item: any, index: number) => {
      this.cascaderKey[index] = (index + 1) * 1000
    })
    console.log('初始化cascaderKey', this.cascaderKey)
  }
  async created() {
    await WorkflowModule.getOrganizations()
    this.handleInputValue()
    this.handleCascaderKey()
  }
  private changeInputValue(e: any, index: number) {
    if (e) {
      const val: string[] = this.getListFirst(this.inputValue)
      WorkflowModule.SET_ORG_DISABLED(val || [])
      // 更新key，渲染el-cascader组件，使用options最新的值
      const cascaderKey = JSON.parse(JSON.stringify(this.cascaderKey))
      cascaderKey.map((i: number) => {
        if (i !== index) {
          this.cascaderKey[i]++
        }
      })
    }
  }
  // @Watch('inputValue', { deep: true, immediate: true })
  // changeCreated(value: any, oldValue: any) {
  //   const val = this.getListFirst(value)
  //   const old = this.getListFirst(oldValue)
  //   WorkflowModule.SET_ORG_DISABLED(val)
  //   const index = this.checkListIndex(val, old)
  //   console.log('value:', value, val)
  //   console.log('oldValue:', oldValue, old)
  //   console.log('reurn index:', index)
  //     // 更新下拉框重新加载选项
  //     // this.initKey[index] ++
  // }
  /**
   * 检测变化的下拉框
   *
   *  @params  newlist oldlist
   *  @return  返回更新项的index
   */
  // private checkListIndex(newlist: any, oldlist: any) {
  //   console.log(newlist, oldlist)
  //   const val: string[] = this.getListFirst(newlist) || []
  //   const old: string[] = this.getListFirst(oldlist) || []
  //   const len = Math.min(val.length, old.length)
  //   let index = len
  //   for (let i = 0; i < len; i++) {
  //     if (val[i] !== old[i]) {
  //       index = i
  //     }
  //   }
  // }
  private getListFirst(list: any) {
    if (!list) return []
    return list.map((item: string[]) => {
      if (item && item.length && item[0]) {
        return item[0]
      }
    })
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
