<template>
  <div class="data-detail">
    <div class="detail-item" v-for="(item, index) in dataDesc" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="item-info" v-if="item.describes && item.describes.length > 0">
        <div v-for="(desc, i) in item.describes" :key="i">
          <div class="lable">{{ desc.lable }}</div>
          <div class="info">{{ desc.value }}</div>
        </div>
      </div>
      <div class="item-info" v-else>{{ item.describe }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component({
  name: 'DataDetail',
})
export default class LoginIndex extends Vue {
  private dataDesc = [
    {
      title: '简介',
      describe: '××××××',
    },
    {
      title: '基本信息',
      describes: [
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
      ],
    },
    {
      title: '规格',
      describes: [
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
        {
          lable: '数据名称：',
          value: '贷款逾期数据',
        },
      ],
    },
    {
      title: '交易',
      describes: [
        {
          lable: '支持授权方式：',
          value: '按次数/按时间',
        },
      ],
    },
  ]
}
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
      max-width: 1000px;
      flex-flow: row wrap;
      div
        display flex
        font-size 14px
        margin-bottom: 4px;
        .lable
          width 130px
        .info
          width 200px
  .detail-item:first-child
    margin-top 0
</style>
