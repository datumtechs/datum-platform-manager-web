<template>
  <div class="case-warp">
    <div class="case-title">
      <span> {{ $t('case.title') }} </span>
    </div>
    <div class="block-wrap">
      <div
        class="block-wrap-item"
        v-for="(item, index) in marketList"
        :key="index"
      >
        <div class="item-img"></div>
        <div class="item-info">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-describe">{{ item.describe }}</div>
          <div class="item-button">
            <jz-button @click="handleDetail(item.id)">
              {{ $t('case.project') }}
            </jz-button>
            <jz-button
              type="jz-button--primary"
              @click="handleDescription(item.id)"
            >
              {{ $t('case.guidance') }}
            </jz-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'

@Component({
  name: 'case',
  components: {
    JzButton,
  },
})
export default class LoginIndex extends Vue {
  private marketList = [
    {
      id: 1,
      title: '黑名单查询',
      describe:
        '基于隐私求交(PSI)技术，在不泄露各方隐私数据情况下查询黑名单交集',
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
  ]
  private handleDescription(id: string | number) {
    console.log('/case/description/' + id)
    // this.$router.push('/case/description/' + id)
    window.open('/case/description/' + id, '_blank')
  }
}
</script>

<style scoped lang="stylus">
.case-warp
  width 100%
  .case-title
    display block
    max-width 1000px
    margin 70px auto
    span
      font-weight: 400;
      font-style: normal;
      font-size: 24px;
  .block-wrap
    transform: translatex(115px);
    max-width 1260px
    margin 0 auto
    display flex
    flex-flow: row wrap;
    .block-wrap-item
      width: 289px;
      margin 0 95px 60px 0
      background: inherit;
      background-color: rgba(255, 255, 255, 0);
      box-sizing: border-box;
      border:1px solid rgba(215, 215, 215, 1);
      border-radius: 5px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      .item-img
        width: 100%;
        height: 170px;
        background #eee
      .item-info
        padding 10px 25px
        .item-title
          font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
          font-weight: 650;
          font-style: normal;
          font-size: 20px;
          color: #8C8C8C;
          padding-bottom 10px
        .item-describe
          height 53px
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          color: #8C8C8C;
          line-height: 18px;
        .item-button
          display flex
          justify-content space-between
          padding-bottom 10px
</style>
