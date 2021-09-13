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
      <div
        class="block-row"
        v-for="(row, rowIndex) in selectLayout"
        :key="rowIndex"
      >
        <!-- <el-select class="row-item" v-model="row[0]['value']">
          <el-option
            v-for="(item, key, index) in organizeOptions"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select>
        <el-select class="row-item" v-model="row[1]['value']">
          <el-option
            v-for="(item, key, index) in surfaceOptions"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select>
        <el-select class="row-item" v-model="row[2]['value']">
          <el-option
            v-for="(item, key, index) in fieldOptions"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select> -->
        <!-- <el-cascader
          :span="12"
          :props="inputProps"
          v-model="inputValue"
        ></el-cascader> -->
      </div>
    </div>
    <div class="block">
      <span class="add-button" @click="addSelect"
        >添加 <i class="el-icon-plus"></i
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import {
  addNodeInput,
  getOrganization,
  getTables,
  getColumns,
} from '@/api/workflow'
import { selectLayout, selectItem } from '@/status'
let id = 0
@Component({
  name: 'InputView',
  components: {
    JzButton,
  },
})
export default class InputViewIndex extends Vue {
  @Prop({ required: true }) private nodeId!: number

  private selectLayout = JSON.parse(JSON.stringify(selectLayout))
  private organizeOptions = {}
  private surfaceOptions = {}
  private fieldOptions = {}
  private inputValue = ''
  private inputProps: object = {
    // label: 'area_name',
    // value: 'code',
    lazy: true,
    lazyLoad: this.inputLazyLoad,
  }
  private async inputLazyLoad(node: any, resolve: any) {
    let { level } = node
    try {
      if (level === 0) {
        const { data } = await getOrganization()
        // this.areaData.province = data
        let nodes = data.map((item: any) => ({
          code: item.code,
          area_name: item.area_name,
          leaf: level >= 2,
          center: item.center,
          zoom: item.zoom,
        }))
        // this.areaList.push(...nodes)
        resolve(nodes)
      } else if (level === 1) {
        const { data } = await getTables({ code: node.data.code })
        // this.areaData.city = data
        let nodes = data.map((item: any) => ({
          code: item.code,
          area_name: item.area_name,
          leaf: level >= 2,
          center: item.center,
          zoom: item.zoom,
        }))
        // this.areaList.push(...nodes)
        resolve(nodes)
      } else if (level === 2) {
        const { data } = await getArea({ code: node.data.code })
        // this.areaData.district = data
        let nodes = data.map((item: any) => ({
          code: item.code,
          area_name: item.area_name,
          leaf: level >= 2,
          center: item.center,
          zoom: item.zoom,
        }))
        // this.areaList.push(...nodes)
        resolve(nodes)
      }
    } catch (e) {
      console.log(e)
    }
  }
  private async handleSave() {
    const list = this.selectLayout
    const { nodeId } = this
    console.log('nodeId', nodeId)
    const that = this
    const selectValue = (line: number) => {
      const optionsMap: any = {
        0: 'organizeOptions',
        1: 'surfaceOptions',
        2: 'fieldOptions',
      }
      return list[line].map((item: any, index: number) => {
        const key: string = item['value']
        if (key) {
          return {
            id: key,
            name: (that as any)[optionsMap[index]][key],
          }
        } else {
          return {
            id: '',
            name: '',
          }
        }
      })
    }
    const saveNodeInputReqList = list.map((item: any, i: number) => {
      return {
        dataColumnIds: selectValue(i)[2].id,
        dataColumnNames: selectValue(i)[2].name,
        dataTableId: selectValue(i)[1].id,
        dataTableName: selectValue(i)[1].name,
        dataType: 1,
        identityId: selectValue(i)[0].id,
        identityName: selectValue(i)[0].name,
        workflowNodeId: nodeId,
      }
    })
    console.log(saveNodeInputReqList)
    const params = {
      saveNodeInputReqList,
      workflowNodeId: nodeId,
    }
    const { msg } = await addNodeInput(params)
    this.$message.success(msg)
  }
  private handleCancel() {
    this.selectLayout = JSON.parse(JSON.stringify(selectLayout))
  }
  private addSelect() {
    if (this.selectLayout.length >= 5) return
    this.selectLayout.push(selectItem)
  }
  private async getOptions() {
    await getOrganization()
    // await getTables()
  }
  created() {
    // console.log(this.selectLayoutValue)
    this.getOptions()
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
