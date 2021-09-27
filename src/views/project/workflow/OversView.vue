<template>
  <div class="OverView">
    <!-- 概述 -->
    <div class="view-block">
      <div class="title">
        {{ dataInfo.algorithmName }}
      </div>
      <div class="describe info">
        {{ dataInfo.algorithmDesc }}
      </div>
    </div>
    <div class="view-block">
      <div class="text">
        作者
      </div>
      <div class="info">
        {{ dataInfo.author }}
      </div>
    </div>
    <div class="view-block">
      <div class="text">
        支持数据协同方数量
      </div>
      <div class="info">>= {{ dataInfo.minNumbers }}</div>
    </div>
    <div class="view-block">
      <div class="text">
        支持语言
      </div>
      <div class="info" v-for="(item, index) in supportLanguage" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { WorkflowModule } from '@/store/modules/workflow'

@Component({
  name: 'OverView',
})
export default class OverViewIndex extends Vue {
  get dataInfo() {
    return WorkflowModule.algorithms
  }
  get supportLanguage() {
    const res = (WorkflowModule.algorithms as any).supportLanguage.replace(
      /"/g,
      '',
    )
    return res.split(',')
  }
}
</script>

<style scoped lang="stylus">
.OverView
  width 100%
  .view-block
    margin-bottom 30px
    line-height 22px
    .title
      font-weight: 500;
      font-size: 20px;
      line-height 30px
      margin 10px 0
    .text
      font-size 14px
    .info
      font-size: 12px;
      color: #8C8C8C;
</style>
