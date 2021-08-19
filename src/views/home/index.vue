<template>
  <div class="content-container">
    <div class="nav-muen">
      <div
        :class="[tabIndex === index ? 'active' : '', 'nav-muen-item']"
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleTable(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="search-wrap">
      <i class="search-icon el-icon-search"></i>
      <el-input v-model="input" placeholder="搜索服务"></el-input>
    </div>
    <div class="block-wrap">
      <div
        class="block-wrap-item"
        v-for="(item, index) in marketList"
        :key="index"
      >
        <div class="item-title">{{ item.title }}</div>
        <div class="item-describe">{{ item.describe }}</div>
        <div class="item-button">
          <div class="jz-el-button" @click="handleDetail(item.id)">
            查看
          </div>
          <div class="jz-el-button--primary">
            申请授权
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'Home',
})
export default class HomeIndex extends Vue {
  private input = ''
  private tabs: string[] = ['数据', '算法', '服务']
  private tabIndex = 0
  private handleTable(index: number) {
    this.tabIndex = index
  }
  private marketList = [
    {
      id: 1,
      title: '贷款逾期数据',
      describe: '银行A的贷款逾期数据',
    },
    {
      id: 1,
      title: '贷款逾期数据',
      describe: '银行A的贷款逾期数据',
    },
    {
      id: 1,
      title: '贷款逾期数据',
      describe: '银行A的贷款逾期数据',
    },
    // {
    //   id: 1,
    //   title: '贷款逾期数据',
    //   describe: '银行A的贷款逾期数据',
    // },
    // {
    //   id: 1,
    //   title: '贷款逾期数据',
    //   describe: '银行A的贷款逾期数据',
    // },
    // {
    //   id: 1,
    //   title: '贷款逾期数据',
    //   describe: '银行A的贷款逾期数据',
    // },
    // {
    //   id: 1,
    //   title: '贷款逾期数据',
    //   describe: '银行A的贷款逾期数据',
    // },
  ]
  private handleDetail(id: string | number) {
    this.$router.push(`/home/detail/${id}`)
  }
}
</script>
<style lang="stylus" scoped>
.content-container
  width 100%
  .search-wrap
    width: 816px;
    height: 60px;
    padding: 2px 2px 2px 40px;
    margin 60px auto
    position relative
    .search-icon
      position absolute
      top 5px
      left 50px
      z-index 10
      font-size 18px
      font-weight: 700;
    >>> .el-input__inner
      border: 0!important;
      border-radius: 0!important;
      padding: 5px 5px 20px 40px;
      border-bottom: 1px solid #DCDFE6!important;
      height 45px!important;
      line-height 45px!important;
      font-size 18px
    >>> .el-input__inner:focus
      border-bottom: 1px solid #000!important;
  .block-wrap
    transform: translatex(115px);
    max-width 1260px
    margin 0 auto
    display flex
    flex-flow: row wrap;
    .block-wrap-item
      width: 289px;
      height: 173px;
      margin 0 95px 60px 0
      background: inherit;
      background-color: rgba(255, 255, 255, 0);
      box-sizing: border-box;
      border:1px solid rgba(15, 98, 254, 1);
      border-radius: 5px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      padding 10px 25px
      .item-title
        font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
        font-weight: 650;
        font-style: normal;
        font-size: 20px;
        color: #8C8C8C;
        padding-bottom 20px
      .item-describe
        padding-bottom 45px
        font-weight: 400;
        font-style: normal;
        font-size: 12px;
        color: #8C8C8C;
        line-height: 18px;
      .item-button
        display flex
        justify-content space-between
</style>
