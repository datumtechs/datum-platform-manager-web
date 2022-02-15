<template>
  <div class="homepage-box">
    <div class="homepage-wrapper">
      <div class="left-earth">
        <!-- <Earth /> -->
        <Cube />
        <img src="@/assets/images/home/earthBg.png" alt="" class="earthImg" />
      </div>
      <div class="right-data-board">
        <div class="title-box">
          <p class="title">{{ $t('homepage.aiComputing') }}</p>
        </div>
        <div class="data-box">
          <div class="data-mini-box">
            <p class="title">{{ $t('homepage.computationNodes') }}</p>
            <!-- Number(pageObj.powerOrgCount) -->
            <p class="value-box">
              <count-to
                v-if="rollCount === 1"
                :start-val="0"
                :end-val="Number(pageObj.powerOrgCount)"
                :duration="1500"
                class="value"
              ></count-to>
              <!-- <span v-else class="value">{{ formatNumber(pageObj.powerOrgCount) || 0 }}</span> -->
              <span v-else class="value">{{ formatNumber(pageObj.powerOrgCount) || 0 }}</span>
              <span class="unit"></span>
            </p>
          </div>
          <div class="data-mini-box">
            <p class="title">{{ $t('homepage.totalMemory') }}</p>
            <p class="value-box">
              <count-to
                v-if="rollCount === 1"
                :decimals="pageObj.totalMemory === 0 ? 0 : 2"
                :start-val="0"
                :end-val="Number(changeSizeObj(pageObj.totalMemory).value)"
                :duration="1500"
                class="value"
              ></count-to>
              <span v-else class="value">{{ changeSizeObj(pageObj.totalMemory).value || '0' }}</span>
              <span class="unit">{{ changeSizeObj(pageObj.totalMemory).unit }}</span>
            </p>
          </div>
          <div class="data-mini-box">
            <p class="title">{{ $t('homepage.CPUCores') }}</p>
            <p class="value-box">
              <!-- <span v-roll-num="pageObj.totalCore" class="value">{{ pageObj.totalCore }}</span> -->
              <count-to
                v-if="rollCount === 1"
                :start-val="0"
                :end-val="Number(pageObj.totalCore)"
                :duration="1500"
                class="value"
              ></count-to>
              <span v-else class="value">{{ formatNumber(pageObj.totalCore) || 0 }}</span>
              <span class="unit"></span>
            </p>
          </div>
          <div class="data-mini-box">
            <p class="title">{{ $t('homepage.totalBandwidth') }}</p>
            <p class="value-box">
              <count-to
                v-if="rollCount === 1"
                :decimals="pageObj.totalBandwidth === 0 ? 0 : 2"
                :start-val="0"
                :end-val="Number(changeSizeObj(pageObj.totalBandwidth).value)"
                :duration="1500"
                class="value"
              ></count-to>
              <span v-else class="value">{{ changeSizeObj(pageObj.totalBandwidth).value || '0' }}</span>
              <span class="unit">{{ changeSizeObj(pageObj.totalBandwidth).unit }}P/S</span>
            </p>
          </div>
        </div>
        <div class="btn-box pointer" @click="linkToAllNode">
          {{ $t('homepage.viewAllNodes') }}
        </div>
      </div>
    </div>
    <MoveDown />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import countTo from 'vue-count-to'
import MoveDown from 'components/MoveDown'
import Cube from './Cube'
import { changeSizeObj, formatNumber } from 'utils'
export default {
  components: { Cube, countTo, MoveDown },
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
      if (val === 1) {
        this.rollCount++
      }
    }
  },
  methods: {
    ...mapMutations('app', [ 'SET_CURPAGEINDEX' ]),
    changeSizeObj,
    formatNumber,
    linkToAllNode () {
      this.$router.push({
        name: 'nodes'
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
  display: flex;
  justify-content: space-between;
  position: relative;

  .left-earth {
    margin-top: 0.9rem;
    width: 600px;
    height: 600px;
    position: relative;
    // background: url('../../../assets/images/home/earthBg.png') no-repeat;
    z-index: 10000;
    .earthImg {
      position: relative;
      left: 20px;
      top: 20px;
    }
  }
  .right-data-board {
    margin-top: 0.9rem;
    width: 484px;
    padding-right: 45px;
    height: 563px;
    background: url('../../../assets/images/home/1.bj2.png') no-repeat;
    background-size: 100%;
    text-align: center;
    .title-box {
      margin-top: 98px;
      .title {
        font-family: DINPro-Medium, Ali-Medium;
        font-size: 26px;
        color: #ffffff;
        letter-spacing: 0;
      }
      .sub-title {
        margin-top: 0.1rem;
        font-size: 15px;
        color: #c8c8c8;
        letter-spacing: 0;
      }
    }
    .data-box {
      display: grid;
      margin-top: 0.6rem;
      grid-template-columns: 40% 60%;
      grid-template-rows: repeat(2, 1fr);
      grid-row-gap: 50px;
      .data-mini-box {
        width: 140px;
        height: 70px;
        margin: auto;
        text-align: left;

        .title {
          font-size: 13px;
          color: #ffffff;
          letter-spacing: 0;
          margin-bottom: 11px;
          white-space: nowrap;
        }
        .value-box {
          color: #3aff82;
          white-space: nowrap;
          .value {
            font-family: DINPro-Medium, Ali-Medium;
            font-size: 36px;
            letter-spacing: 0.72px;
            line-height: 34px;
          }
          .unit {
            font-size: 14px;
            letter-spacing: 1.04px;
            line-height: 67px;
          }
        }
      }
      .data-mini-box:nth-child(1),
      .data-mini-box:nth-child(3) {
        padding-left: 40px;
      }
    }
    .btn-box {
      margin-top: 60px;
      background: url('../../../assets/images/home/1.butt.svg') no-repeat;
      background-size: 100%;
      display: inline-block;
      padding: 10px 67px;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 18px;
      color: #090916;
      letter-spacing: 0;
    }
  }
}
</style>
