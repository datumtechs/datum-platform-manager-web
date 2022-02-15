<template>
  <div class="common-wrapper">
    <div class="data-wrapper pd20">
      <div class="data-wrapper-title">{{ $t('menu.cases') }}</div>
      <div class="case-wrapper">
        <div v-for="item in caseList" :key="item.id" class="case-box">
          <img :src="item.url" alt="" class="case-img" />
          <div class="case-content-box">
            <p class="case-title">{{ item.title }}</p>
            <p class="case-desc">{{ item.desc }}</p>
            <div class="case-btn-group">
              <div class="btn create-btn pointer">{{ $t('cases.newProject') }}</div>
              <div class="btn guidance-btn pointer">{{ $t('cases.guidance') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blacklistImg from 'assets/images/cases/1.image1.svg'
import investorImg from 'assets/images/cases/1.image3.svg'
import marketingImg from 'assets/images/cases/1.image2.svg'
import scorecardImg from 'assets/images/cases/1.image4.svg'
export default {
  components: {},
  data () {
    return {}
  },
  computed: {
    caseList: function () {
      return [
        { id: 1, url: blacklistImg, title: this.$t('cases.blackListQuery'), desc: this.$t('cases.blackListQueryDesc') },
        {
          id: 2,
          url: investorImg,
          title: this.$t('cases.qualifiedInvestorCertification'),
          desc: this.$t('cases.qualifiedInvestorCertificationDesc')
        },
        {
          id: 3,
          url: marketingImg,
          title: this.$t('cases.collaborativeMarketing'),
          desc: this.$t('cases.collaborativeMarketingDesc')
        },
        {
          id: 4,
          url: scorecardImg,
          title: this.$t('cases.collaborativeScorecard'),
          desc: this.$t('cases.collaborativeScorecardDesc')
        }
      ]
    }
  },
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.case-out-wrapper {
  display: flex;
  align-items: center;
  min-height: calc(100% - 51px);
}
.case-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-wrap: wrap;
  // @media screen and (max-width: 1366px) {
  //   margin-top: -30px;
  // }
  .case-box {
    width: calc(calc(100% / 2) - 50px);
    height: 300px;
    margin: 0 25px;
    display: flex;
    align-items: center;

    &:nth-child(3) {
      & .case-img {
        width: 102px;
        margin-right: 40px;
      }
    }
    .case-img {
      margin-right: 70px;
      width: 72px;
    }
    .case-content-box {
      display: flex;
      flex-direction: column;
      padding-right: 50px;
      .case-title {
        font-family: DINPro-Medium, Ali-Medium;
        font-size: 18px;
        color: #1d2832;
      }
      .case-desc {
        padding-right: 30px;
        margin-top: 20px;
        font-size: 14px;
        color: #5d5c65;
        line-height: 24px;
      }
    }
    .case-btn-group {
      margin-top: 40px;
      display: flex;
      .btn {
        width: 105px;
        height: 29px;
        line-height: 29px;
        font-size: 12px;
        text-align: center;
        border-radius: 14.5px;
        padding: 0 18px;
        &.create-btn {
          color: #3c3588;
          border: 1px solid #3c3588;
          margin-right: 23px;
        }
        &.guidance-btn {
          color: #ffffff;
          background: #3c3588;
        }
      }
    }
  }
}
</style>
