<template>
  <div class="homepage-box">
    <div class="homepage-wrapper">
      <HomeTitle :title="`${$t('homepage.rosettaTitle')}`">
        <span slot="subtitle">{{ $t('homepage.amountTips') }}</span>
      </HomeTitle>
      <div class="homepage-content-box">
        <div class="homepage-content-left">
          <div class="homepage-content-left-title">{{ $t('homepage.dataAmountTrent') }}</div>
          <DataChart />
        </div>
        <div class="homepage-content-right">
          <img src="~assets/images/home/1.icon3.svg" alt="" class="amount-logo" />
          <p class="title">
            {{ $t('homepage.totalAmount') }}
          </p>
          <p class="size-box">
            <count-to
              v-if="rollCount === 1"
              :decimals="pageObj.dataFileSize === 0 ? 0 : 2"
              :start-val="0"
              :end-val="Number(changeSizeObj(pageObj.dataFileSize).value)"
              :duration="1500"
              class="value"
            ></count-to>
            <span v-else class="value">{{ changeSizeObj(pageObj.dataFileSize).value || '0' }}</span>
            <span class="unit">{{ changeSizeObj(pageObj.dataFileSize).unit }}</span>
          </p>
          <p class="view-btn pointer" @click="linkToData">
            {{ $t('homepage.viewAllData') }}
          </p>
        </div>
      </div>
    </div>
    <MoveDown />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import HomeTitle from 'components/HomeTitle'
import MoveDown from 'components/MoveDown'
import countTo from 'vue-count-to'
import DataChart from './DataChart.vue'
import { changeSizeObj } from 'utils'
export default {
  components: { DataChart, countTo, MoveDown, HomeTitle },
  props: {
    pageObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      rollCount: 0
    }
  },
  computed: {
    ...mapGetters('app', [ 'curPageIndex' ])
  },
  watch: {
    curPageIndex (val) {
      if (val === 2) {
        this.rollCount++
      }
    }
  },
  methods: {
    ...mapMutations('app', [ 'SET_CURPAGEINDEX' ]),
    changeSizeObj,
    linkToData () {
      this.$router.push({
        name: 'marketplace'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.homepage-wrapper {
  width: 100%;
  height: 100vh;
  color: #ffffff;
  text-align: center;
  .homepage-content-box {
    margin-top: 0.66rem;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1366px) {
      margin-top: 0.2rem;
    }
    .homepage-content-left {
      position: relative;
      width: 750px;
      height: 450px;
      background: url('../../../assets/images/home/1.bj4.png') no-repeat;
      background-size: 100%;
      .homepage-content-left-title {
        position: absolute;
        font-family: DINPro-Medium, Ali-Medium;
        font-size: 26px;
        color: #ffffff;
        letter-spacing: 0;
        left: 80px;
        top: -10px;
      }
    }
    .homepage-content-right {
      text-align: left;
      width: 260px;
      .amount-logo {
        width: 80px;
        height: 85px;
      }

      .title {
        font-size: 20px;
        color: #ffffff;
        letter-spacing: 0;
        margin-top: 20px;
        line-height: 26px;
      }
      .size-box {
        color: #3aff82;
        margin-top: 50px;
        .value {
          font-family: DINPro-Medium, Ali-Medium;
          font-size: 52px;

          letter-spacing: 1.04px;
        }
        .unit {
          font-size: 14px;
          letter-spacing: 1.04px;
          line-height: 67px;
        }
      }
    }
  }
}
</style>
