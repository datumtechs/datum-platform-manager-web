<template>
  <div class="data-detail">
    <div class="detail-item">
      <div class="title">简介</div>
      <div class="item-info">××××××××××××</div>
    </div>
    <div class="detail-item">
      <div class="title">基本信息</div>
      <div class="item-info">
        <div>
          <div class="lable">数据名称：</div>
          <div class="info">贷款逾期数据</div>
        </div>
        <div>
          <div class="lable">机构：</div>
          <div class="info">银行A</div>
        </div>
        <div>
          <div class="lable">数据节点：</div>
          <div class="info">××××××××××××</div>
        </div>
      </div>
      <div class="item-info">
        <div>
          <div class="lable">数据类别：</div>
          <div class="info">表格数据</div>
        </div>
        <div>
          <div class="lable">所属行业：</div>
          <div class="info">金融</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="title">规格</div>
      <div class="item-info">
        <div>
          <div class="lable">存储格式：</div>
          <div class="info">CSV</div>
        </div>
        <div>
          <div class="lable">大小：</div>
          <div class="info">1.05MB</div>
        </div>
        <div>
          <div class="lable">数据条数：</div>
          <div class="info">3,000</div>
        </div>
      </div>
      <div class="item-info">
        <div>
          <div class="lable">发布时间：</div>
          <div class="info">2021-06-24 17:06:00</div>
        </div>
        <div>
          <div class="lable">更新时间：</div>
          <div class="info">2021-06-24 17:06:00</div>
        </div>
      </div>
      <div class="item-info">
        <div>
          <div class="lable">更新频率：</div>
          <div class="info">1月</div>
        </div>
        <div>
          <div class="lable">更新方式：</div>
          <div class="info">增量更新</div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="title">交易</div>
      <div class="item-info">
        <div>
          <div class="lable">支持授权方式：</div>
          <div class="info">按次数/按时间</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component({
  name: 'DataDetail',
})
export default class LoginIndex extends Vue {}
</script>

<style scoped lang="stylus">
.data-detail
  padding 30px 20px
  line-height 28px
  .detail-item
    margin-top 20px
    .title
      font-weight: 650;
      font-size 14px
      margin-bottom 10px
    .item-info
      display flex
      margin-bottom 10px
      div
        display flex
        font-size 14px
        .lable
          width 130px
        .info
          width 200px
  .detail-item:first-child
    margin-top 0
</style>
