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
        <el-select class="row-item" v-model="row[0]['value']">
          <el-option
            v-for="item in organizeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select class="row-item" v-model="row[1]['value']">
          <el-option
            v-for="item in surfaceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select class="row-item" v-model="row[2]['value']">
          <el-option
            v-for="item in fieldOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import {
  selectLayout,
  selectItem,
  organizeOptions,
  surfaceOptions,
  fieldOptions,
} from '@/status'
@Component({
  name: 'InputView',
  components: {
    JzButton,
  },
})
export default class InputViewIndex extends Vue {
  private selectLayout = JSON.parse(JSON.stringify(selectLayout))
  get organizeOptions() {
    return organizeOptions
  }
  get surfaceOptions() {
    return surfaceOptions
  }
  get fieldOptions() {
    return fieldOptions
  }
  private handleSave() {
    console.log(JSON.stringify(this.selectLayout))
  }
  private handleCancel() {
    this.selectLayout = JSON.parse(JSON.stringify(selectLayout))
  }
  private addSelect() {
    if (this.selectLayout.length >= 5) return
    this.selectLayout.push(selectItem)
  }
  created() {
    // console.log(this.selectLayoutValue)
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
    justify-content end
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
</style>
