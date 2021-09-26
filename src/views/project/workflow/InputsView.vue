<template>
  <div class="input-view">
    <div class="title">
      {{ $t('workflow.input') }}
    </div>
    <div class="button-bolck">
      <jz-button @click="handleSave" type="jz-button--primary" class="save">
        {{ $t('workflow.save') }}
      </jz-button>
      <!-- <jz-button @click="handleCancel">
        {{ $t('workflow.cancel') }}
      </jz-button> -->
    </div>
    <div class="block">
      <template>
        <div
          class="block-row"
          v-for="(row, index) in selectLayout"
          :key="index"
        >
          <div class="text" v-if="index < 2">
            {{ index ? '数据响应方' : '数据发起方' }}
          </div>
          <el-cascader
            :span="12"
            :props="{
              // checkStrictly: true,
              label: 'name',
              value: 'code',
              lazy: true,
              lazyLoad: (node, resolve) => {
                inputLazyLoad(node, resolve, index)
              },
            }"
            v-model="inputValue[index]"
            :key="cascaderKey[index]"
            :disabled="isAuth"
            @visible-change="visibleChange"
            @change="
              (e) => {
                changeInputValue(e, index)
              }
            "
          ></el-cascader>
          <div
            class="input-delete"
            v-if="index > minLen"
            @click="inputDelete(index)"
          >
            <i class="el-icon-delete icon"></i>
          </div>
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
  private cascaderKey: string[] = []
  private selectLayout = Array(this.minLen).fill({})
  private inputValue: any = []
  // private inputProps (i: number) {
  //   return {
  //     // checkStrictly: true,
  //     label: 'name',
  //     value: 'code',
  //     lazy: true,
  //     lazyLoad: (node: any, resolve: any) => {
  //       this.inputLazyLoad(node, resolve, i)
  //     },
  //   }
  // }
  // 选中的组织
  get inputValueOrg() {
    return this.inputValue.map((item: any) => {
      return item[0]
    })
  }
  get minLen() {
    return Number(WorkflowModule.algorithms.minNumbers)
  }
  get organizations() {
    return WorkflowModule.organizationList
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
  // 动态加载选项
  private async inputLazyLoad(node: any, resolve: any, inputIndex: number) {
    let { level } = node
    try {
      if (level === 0) {
        setTimeout(() => {
          const { inputValue, inputValueOrg } = this
          let nodes = null
          const data = this.organizations
          // 判断列表中，如果选中值被禁用，仍可以选择
          if (inputValue.length) {
            const isDisabled = (item: any) => {
              if (inputValueOrg[inputIndex] === item.identityId) {
                return false
              } else {
                return item.disabled
              }
            }
            nodes = data.map((item: any) => ({
              code: item.identityId,
              name: item.identityName,
              leaf: level >= 2,
              disabled: isDisabled(item),
            }))
          } else {
            nodes = data.map((item: any) => ({
              code: item.identityId,
              name: item.identityName,
              leaf: level >= 2,
              disabled: item.disabled,
            }))
          }
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
    console.log('this.loady', this.inputValue)
    if (this.handleisAuth()) return
    if (this.inputValue.length < this.minLen) {
      return this.$message.warning(`至少输入${this.minLen}个数据协同方`)
    }
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
    const { code, msg } = await addNodeInput(params)
    if (code === 10000) {
      this.$message.success(msg)
    }
    // 缓存选中的选项
    const organizationId: string[] = []
    // 过滤空值
    this.inputValue = this.inputValue.filter(Boolean)
    this.inputValue.map((item: string[]) => {
      organizationId.push(item[0])
    })
    await WorkflowModule.setOrganizationId(organizationId)
    WorkflowModule.SAVE_ORG_OPTIONS()
    WorkflowModule.SET_INPUT_LEN(this.inputValue.length)
  }
  private inputDelete(index: number) {
    this.cascaderKey.splice(index, 1)
    this.selectLayout.splice(index, 1)
    this.inputValue.splice(index, 1)
  }
  // private async handleCancel() {
  //   if (this.handleisAuth()) return
  //   const { minLen } = this
  //   this.selectLayout = Array(minLen).fill({})
  //   this.inputValue = []
  //   await WorkflowModule.getOrganizations()
  //   WorkflowModule.SET_ORG_INIT()
  //   this.handleCascaderKey()
  // }
  private addSelect() {
    if (this.handleisAuth()) return
    this.selectLayout.push({})
    let item = String(this.selectLayout.length)
    console.log('item push', item)
    this.cascaderKey.push(item)
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
    WorkflowModule.SET_INPUT_LEN(this.inputValue.length)
  }
  // 初始化cascaderKey
  private handleCascaderKey() {
    this.cascaderKey = []
    this.selectLayout.map((item: any, index: number) => {
      this.cascaderKey[index] = String(index)
    })
    console.log('初始化cascaderKey', this.cascaderKey)
  }
  async created() {
    await WorkflowModule.getOrganizations()
    this.handleInputValue()
    this.handleCascaderKey()
  }
  private visibleChange() {
    console.log('vissssssssss')
  }
  private changeInputValue(e: any, index: number) {
    if (e) {
      const val: string[] = this.getListFirst(this.inputValue)
      WorkflowModule.SET_ORG_DISABLED(val || [])
      // 更新key，渲染el-cascader组件，使用options最新的值
      let upList: any = []
      this.cascaderKey.map((item: string, i: number) => {
        if (index !== i) {
          upList.push(i)
        }
      })
      upList.map((i: any) => {
        this.cascaderKey[i] = this.cascaderKey[i] + 1
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
    top: -40px;
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
    .input-delete
      margin-left 10px
      display inline-block
      cursor pointer
      color #777
      .icon
        vertical-align -2px
        font-size 18px
    .input-delete:hover
      color #5f4ffb
    .row-item
      width 90px
      margin-right 15px
    .row-item:last-child
      margin-right 0
    >>> .el-cascader
          width 80%
          .el-cascader-menu
            min-width: 150px!important;
</style>
