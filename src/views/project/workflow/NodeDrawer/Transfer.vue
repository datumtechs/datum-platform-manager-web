<template>
  <div class="transfer" v-if="isShow">
    <div class="columns">
      <div
        class="columns-item"
        :class="columnIndex === index ? 'columns-item-active' : ''"
        v-for="(item, index) in list"
        :key="index"
        @click="handleColumn(index)"
      >
        {{ item.columnName }}
      </div>
    </div>
    <div class="arrow">
      <div class="arrow-icon" @click="handleTransfer(0, ids.length)">
        <svg-icon
          :name="ids.length ? 'left-arrow' : 'right-arrow'"
          color="#84878d"
          width="58"
          height="28"
        />
      </div>
      <div
        class="arrow-icon"
        @click="handleTransfer(1, lables.length)"
        v-if="isLables"
      >
        <svg-icon
          :name="lables.length ? 'left-arrow' : 'right-arrow'"
          color="#84878d"
          width="58"
          height="28"
        />
      </div>
      <div
        class="arrow-icon"
        :class="isLables ? '' : 'arrow-icon-auto1'"
        @click="handleTransfer(2)"
      >
        <svg-icon name="right-arrow" color="#84878d" width="58" height="28" />
      </div>
      <div
        class="arrow-icon"
        :class="isLables ? '' : 'arrow-icon-auto2'"
        @click="handleTransfer(3, 1)"
      >
        <svg-icon name="left-arrow" color="#84878d" width="58" height="28" />
      </div>
    </div>
    <div class="result">
      <div class="ids">
        <div>ID列</div>
        <div class="item">{{ ids.length ? ids[0].columnName : '' }}</div>
      </div>
      <div class="lable" v-if="isLables">
        <div>因变量（标签，可选)</div>
        <div class="item">{{ lables.length ? lables[0].columnName : '' }}</div>
      </div>
      <div class="feature">
        <div>自变量（特征)</div>
        <div class="features" :class="isLables ? '' : 'features-auto'">
          <div
            :class="[
              'features-item',
              featureIndex === index ? 'features-item-active' : '',
            ]"
            v-for="(item, index) in features"
            :key="index"
            @click="handleFeature(index)"
          >
            {{ item.columnName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({
  name: 'transfer',
})
export default class TransferIndex extends Vue {
  @Prop() private data!: any
  @Prop() private index!: number
  private list: any = []
  private columnIndex = 0
  // id列
  private ids = []
  // 因变量
  private lables = []
  // 自变量
  private features: any = []
  private featureIndex = 0
  get isLables() {
    return this.index === 0
  }
  get isShow() {
    return (
      this.ids.length ||
      this.lables.length ||
      this.features.length ||
      this.list.length
    )
  }
  private setList(list: any) {
    list.map((item: any, index: number) => {
      item.index = index
    })
    this.list = list
    this.initDatas()
  }
  public initDatas() {
    this.columnIndex = 0
    this.ids = []
    this.lables = []
    this.features = []
    this.featureIndex = 0
  }
  public getList() {
    const { ids, lables, features } = this
    const handleString = (arr: any) => {
      const columnName = arr.map((item: any) => item.id)
      return columnName.join(',')
    }
    return {
      keyColumn: handleString(ids),
      dependentVariable: handleString(lables),
      dataColumnIds: handleString(features),
    }
  }
  private handleColumn(index: number) {
    this.columnIndex = index
  }
  private handleFeature(index: number) {
    this.featureIndex = index
  }
  private handleTransfer(type: number, methods?: any) {
    /*
      type：number
      0: 增加 删除 id列
      1: 增加 删除 因变量
      2: 增加 自变量
      3: 删除 自变量
      methods: ?: number
      0: push
      1: delete
    */

    const types = ['ids', 'lables', 'features', 'features']
    const lable = types[type]
    if (!this.list[this.columnIndex]) {
      this.columnIndex = 0
    }
    const item = this.list[this.columnIndex]
    let list = (this as any)[lable]
    if (!methods) {
      if (!this.list.length) return
      list.push(item)
      this.list.splice(this.columnIndex, 1)
    }
    if (methods === 1) {
      // 删除id列和因变量
      if (type !== 3) {
        const currentItem = list[0]
        this.list.splice(currentItem.index, 0, currentItem)
        list.splice(0, 1)
      } else {
        // 删除自变量
        if (!list.length) return
        if (!list[this.featureIndex]) {
          this.featureIndex = 0
        }
        const currentItem = list[this.featureIndex]
        this.list.splice(currentItem.index, 0, currentItem)
        list.splice(this.featureIndex, 1)
      }
    }
  }
  // 数据回显
  public handleEcho(params: any) {
    const { keyColumn, dependentVariable, dataColumnIds } = params
    this.$nextTick(() => {
      if (keyColumn) {
        const item: any = this.removeList(keyColumn)
        this.ids = item
      }
      if (this.isLables) {
        if (dependentVariable) {
          const item: any = this.removeList(dependentVariable)
          this.lables = item
        }
      }
      if (dataColumnIds) {
        const columnIds = dataColumnIds.split(',')
        columnIds.map((item: any) => {
          const columnItem = this.removeList(Number(item))
          this.features.push(...columnItem)
        })
      }
    })
  }
  private removeList(id: number) {
    // 查询对应的元素
    const item = this.list.filter((item: any) => item.id === id)
    let ids = this.list.map((item: any) => item.id)
    // 查询对象的下标
    let index = ids.indexOf(id)
    this.list.splice(index, 1)
    return item
  }
  @Watch('data')
  changeData(val: any) {
    this.setList(val)
  }
}
</script>

<style scoped lang="stylus">
.transfer
  height: 230px
  margin 10px 0
  display: flex
  font-size: 12px;
  .columns
    height: 100%
    width: 130px
    border 1px solid #DCDFE6
    border-radius: 4px
    overflow-y: auto;
    .columns-item
      cursor pointer
      padding: 4px
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    .columns-item:hover
      background: #DCDFE6
      overflow: visible;
    .columns-item-active
      background: #DCDFE6
  .arrow
    height: 100%
    width: 60px
    display: flex
    flex-direction: column
    .arrow-icon
      margin-top 20px
      cursor pointer
    .arrow-icon-auto1
      margin-top 40px
    .arrow-icon-auto2
      margin-top 10px!important
    .arrow-icon:nth-child(3)
      margin-top 30px
    .arrow-icon:nth-child(4)
      margin-top -2px
    .arrow-icon:hover
      >>> path
            fill: #333;
  .result
    height: 100%
    width: 150px
    .item
      margin 4px 0
      padding: 4px
      border 1px solid #DCDFE6
      border-radius: 4px
      min-height: 20px
      overflow-x: auto
    .features
      border 1px solid #DCDFE6
      border-radius: 4px
      overflow-y: auto;
      margin-top 4px
      height: 100px
    .features-auto
      height: 150px
    .features-item
      cursor pointer
      padding: 4px
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    .features-item:hover
      background: #DCDFE6
      // overflow: visible;
    .features-item-active
      background: #DCDFE6
::-webkit-scrollbar-track
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  background-color: transparent
  cursor pointer
::-webkit-scrollbar
  width: 6px;
  height: 6px;
  background-color: transparent
::-webkit-scrollbar-thumb
  background-color: transparent;
  border: 4px solid #ccc
</style>
