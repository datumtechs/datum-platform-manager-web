<template>
  <div class="homepage-box">
    <div class="homepage-wrapper">
      <HomeTitle :title="$t('homepage.multiServices')">
        <span slot="subtitle">
          <span v-if="lang === 'zh'">
            <span>Moirae提供面向</span>
            <span class="strong">银行、保险、政务、医疗、物流</span>
            <span>等多行业的应用服务。</span>
          </span>
          <span v-if="lang === 'en'">
            <span>Moirae provides solutions for</span>&nbsp;
            <span class="strong">banking, insurance, government affairs,medical treatment, logistics</span>&nbsp;
            <span>and other industries.</span>
          </span>
        </span>
      </HomeTitle>
      <div class="homepage-content-box">
        <img src="~assets/images/home/1.bj5.svg" alt="" class="content-line" />
        <div class="content-lineone">
          <div class="content-line-mini-box line-mini-box">
            <img src="~assets/images/home/1.bank2.svg" alt="" class="bg-img" />
            <IndustryLabel :title="$t('homepage.bank')" />
          </div>
          <div class="content-line-mini-box line-mini-box">
            <img src="~assets/images/home/1.government.svg" alt="" class="bg-img" />
            <IndustryLabel :title="$t('homepage.government')" />
          </div>
          <div class="content-line-mini-box line-mini-box">
            <img src="~assets/images/home/1.logistics.svg" alt="" class="bg-img" />
            <IndustryLabel :title="$t('homepage.medical')" />
          </div>
        </div>
        <div class="content-linetwo">
          <div class="line2-sub-box">
            <div class="content-line2-mini-box line-mini-box">
              <img src="~assets/images/home/1.insurance.svg" alt="" class="bg-img" />
              <IndustryLabel :title="$t('homepage.insurance')" />
            </div>
          </div>
          <div class="line2-sub-box">
            <div class="content-line2-mini-box line-mini-box">
              <img src="~assets/images/home/1.medical.svg" alt="" class="bg-img" />
              <IndustryLabel :title="$t('homepage.logistics')" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <MoveDown />
  </div>
</template>

<script>
import MoveDown from 'components/MoveDown'
import HomeTitle from 'components/HomeTitle'
import IndustryLabel from 'components/IndustryLabel'
export default {
  components: { MoveDown, HomeTitle, IndustryLabel },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.homepage-wrapper {
  .homepage-content-box {
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    .content-line {
      margin-top: 0.43rem;
    }
    .content-lineone {
      margin-top: 0.7rem;
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 0.5rem;
    }
    .content-linetwo {
      display: flex;
      width: 100%;
      margin-top: 0.63rem;
      padding: 0 0.5rem;
      .line2-sub-box {
        flex: 1;
        display: flex;
        justify-content: center;
      }
    }
    .line-mini-box {
      background: url('../../../assets/images/home/1.bj6.svg') no-repeat;
      background-size: 100%;
      width: 166px;
      height: 166px;
      position: relative;
      .bg-img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
