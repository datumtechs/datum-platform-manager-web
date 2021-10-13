<template>
  <div class="input-view">
    <div class="title">
      {{ $t('workflow.input') }}
    </div>
    <div class="button-bolck">
      <jz-button @click="handleSave" type="jz-button--primary" class="save">
        {{ $t('workflow.save') }}
      </jz-button>
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
            @change="
              (e) => {
                changeInputValue(e, index)
              }
            "
          ></el-cascader>
          <div
            class="input-delete"
            v-if="index > minLen - 1"
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
  private cascaderKey: string[] = []
  private selectLayout = Array(this.minLen).fill({})
  private inputValue: any = []
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
    const inputVoList: any = []
    this.inputValue.map((item: any, index: number) => {
      if (item && item.length) {
        inputVoList.push({
          dataColumnIds: item[2],
          dataTableId: item[1],
          identityId: item[0],
          // 是否发起方: 0-否, 1-是
          senderFlag: !index ? 1 : 0,
        })
      }
    })
    // 提交输入数据
    WorkflowModule.SET_INPUT_LIST(inputVoList)
    this.$message.success('保存成功')
    // 缓存选中的选项
    const organizationId: string[] = []
    // 过滤空值
    this.inputValue = this.inputValue.filter(Boolean)
    this.inputValue.map((item: string[]) => {
      organizationId.push(item[0])
    })
    // 输出提供List
    await WorkflowModule.setOrganizationId(organizationId)
    WorkflowModule.SAVE_ORG_OPTIONS()
    WorkflowModule.SET_INPUT_LEN(this.inputValue.length)
  }
  private inputDelete(index: number) {
    this.cascaderKey.splice(index, 1)
    this.selectLayout.splice(index, 1)
    this.inputValue.splice(index, 1)
    this.upCascaderKey()
  }
  private addSelect() {
    if (this.handleisAuth()) return
    this.selectLayout.push({})
    let item = String(this.selectLayout.length)
    this.cascaderKey.push(item)
    // this.upCascaderKey()
  }
  // 回显选择状态
  private async handleInputValue() {
    const { workflowNodeInputVoList } = WorkflowModule
    const res: any = []
    if (workflowNodeInputVoList && workflowNodeInputVoList.length) {
      this.selectLayout = workflowNodeInputVoList
      workflowNodeInputVoList.map((item: any, index: number) => {
        res[index] = [
          item.identityId,
          item.dataTableId,
          Number(item.dataColumnIds),
        ]
      })
    }
    this.inputValue = res
    WorkflowModule.SET_INPUT_LEN(this.inputValue.length)
    this.upCascaderKey()
    const val: string[] = this.getListFirst(this.inputValue)
    await WorkflowModule.setOrganizationId(val)
    WorkflowModule.SAVE_ORG_OPTIONS()
  }
  // 初始化cascaderKey
  private handleCascaderKey() {
    this.cascaderKey = []
    this.selectLayout.map((item: any, index: number) => {
      this.cascaderKey[index] = String(index)
    })
  }
  // Cascader回显更新key
  private upCascaderKey() {
    this.changeInputValue(true, -1)
  }
  async created() {
    await WorkflowModule.getOrganizations()
    // 回显
    this.handleInputValue()
    // 初始key，更新视图
    this.handleCascaderKey()
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
    font-weight: 500;
    font-size: 20px;
    line-height 30px
    margin-top 10px
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
<style lang="stylus">
.el-cascader__dropdown
  .el-cascader-menu
    min-width: 150px!important;
</style>
