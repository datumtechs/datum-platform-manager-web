<template>
  <div class="OverView">
    <!-- 概述 -->
    <div class="view-block">
      <div class="title">
        隐私求交
      </div>
      <div class="describe info">
        用于跨组织的数据交集查询
      </div>
    </div>
    <div class="view-block">
      <div class="text">
        作者
      </div>
      <div class="info">
        Rosetta
      </div>
    </div>
    <div class="view-block">
      <div class="text">
        支持协同方数量
      </div>
      <div class="info">
        >=2
      </div>
      <div class="info">
        &lt;=2
      </div>
    </div>
    <div class="view-block">
      <div class="text">
        支持语言
      </div>
      <div class="info">
        SQL
      </div>
      <div class="info">
        Python
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component({
  name: 'OverView',
})
export default class OverViewIndex extends Vue {}
</script>

<style scoped lang="stylus">
.OverView
  width 100%
  .view-block
    margin-bottom 30px
    line-height 22px
    .title
      font-weight: 650;
      line-height 30px
    .text
      font-size 14px
    .info
      font-size: 12px;
      color: #8C8C8C;
</style>
