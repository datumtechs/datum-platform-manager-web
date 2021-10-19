<template>
  <div class="transfer">
    <div class="columns">
      <div class="columns-item">AAA</div>
      <div class="columns-item">AAA</div>
      <div class="columns-item">AAA</div>
    </div>
    <div class="arrow">
      <div class="arrow-icon">
        <svg-icon name="right-arrow" color="#84878d" width="58" height="28" />
      </div>
      <div class="arrow-icon">
        <svg-icon name="right-arrow" color="#84878d" width="58" height="28" />
      </div>
      <div class="arrow-icon">
        <svg-icon name="right-arrow" color="#84878d" width="58" height="28" />
      </div>
      <div class="arrow-icon">
        <svg-icon name="left-arrow" color="#84878d" width="58" height="28" />
      </div>
    </div>
    <div class="result">
      <div class="ids">
        <div>ID列</div>
        <div class="item">AAA</div>
      </div>
      <div class="lable">
        <div>因变量（标签)</div>
        <div class="item">AAA</div>
      </div>
      <div class="feature">
        <div>自变量（特征)</div>
        <div class="features">
          <div class="features-item">AAA</div>
          <div class="features-item">AAA</div>
          <div class="features-item">AAA</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component({
  name: 'transfer',
})
export default class TransferIndex extends Vue {
  private data = []
  // id列
  private ids = []
  // 自变量
  private lables = []
  // 因变量
  private features = []
}
</script>

<style scoped lang="stylus">
.transfer
  width: 267px
  height: 200px
  margin 10px 0
  display: flex
  font-size: 12px;
  .columns
    height: 100%
    width: 100px
    border 1px solid #DCDFE6
    border-radius: 4px
    overflow-y: auto;
    .columns-item
      cursor pointer
      padding: 4px
    .columns-item:hover
      background: #DCDFE6
  .arrow
    height: 100%
    width: 60px
    display: flex
    flex-direction: column
    .arrow-icon
      margin-top 20px
      cursor pointer
    .arrow-icon:nth-child(3)
      margin-top 30px
    .arrow-icon:nth-child(4)
      margin-top -2px
    .arrow-icon:hover
      >>> path
            fill: #333;
  .result
    height: 100%
    width: 100px
    .item
      margin 4px 0
      padding: 4px
      border 1px solid #DCDFE6
      border-radius: 4px
    .features
      border 1px solid #DCDFE6
      border-radius: 4px
      overflow-y: auto;
      margin-top 4px
    .features-item
      cursor pointer
      padding: 4px
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    .features-item:hover
      background: #DCDFE6
</style>
