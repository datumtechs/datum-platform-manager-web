<template>
  <div class="homepage-box">
    <div class="homepage-wrapper">
      <HomeTitle :title="$t('homepage.recommendedServices')"></HomeTitle>
      <div class="homepage-recommend-box">
        <div v-for=" card in serviceList" :key="card.id" class="recommend-mini-box pointer">
          <p class="recommend-mini-box-title">{{ card.title }}</p>
          <p class="recommend-mini-box-label">{{ card.label }}</p>
        </div>
      </div>
      <div
        class="view-all-cases view-btn pointer"
        @click="linkToCase"
      >{{ $t('homepage.viewAllCases') }}</div>
    </div>
    <!-- <MoveDown /> -->
  </div>
</template>

<script>
import HomeTitle from 'components/HomeTitle'
export default {
  components: { HomeTitle },
  props: {},
  data () {
    return {}
  },
  computed: {
    serviceList () {
      return [
        {
          id: 0,
          title: this.$t('cases.blackListQuery'),
          label: this.$t('cases.blackListQueryDesc')
        },
        {
          id: 1,
          title: this.$t('cases.qualifiedInvestorCertification'),
          label: this.$t('cases.qualifiedInvestorCertificationDesc')
        },
        {
          id: 2,
          title: this.$t('cases.collaborativeMarketing'),
          label: this.$t('cases.collaborativeMarketingDesc')
        },
        {
          id: 3,
          title: this.$t('cases.collaborativeScorecard'),
          label: this.$t('cases.collaborativeScorecardDesc')
        }
      ]
    }
  },
  methods: {
    linkToCase () {
      this.$router.push({
        name: 'cases'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.homepage-wrapper {
  text-align: center;
  .homepage-recommend-box {
    display: flex;
    justify-content: space-between;

    .recommend-mini-box {
      margin-top: 1.1rem;
      width: 275px;
      height: 361px;
      background: url("../../../assets/images/home/1.bj9.svg") no-repeat;
      background-size: 100%;
      padding: 30px;
      position: relative;
      transition: all 0.3s;
      text-align: left;
      @media screen and (max-width: 1366px) {
          margin-top: 0.3rem;
      }
      .recommend-mini-box-title {
        font-family: DINPro-Medium, Ali-Medium;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        position: absolute;
        top: 55px;
        left: 75px;
      }
      .recommend-mini-box-label {
        margin-top: 102px;
        font-size: 16px;
        padding: 10px 10px 10px 15px;
        color: #c8c8c8;
        letter-spacing: 0;
        line-height: 22px;
      }
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .view-all-cases {
    margin-top: 1rem;
    font-size: 18px;
    @media screen and (max-width: 1366px) {
      margin-top: 0.4rem;
    }
  }
}
</style>
