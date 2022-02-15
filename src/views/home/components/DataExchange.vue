<template>
  <div class="homepage-box">
    <Head />
    <div class="homepage-wrapper">
      <div class="homepage-box-left">
        <div class="contet-top">
          <div v-if="lang === 'en'">
            <p>Data Exchange</p>
            <p>& Collaborative Computing</p>
          </div>
          <div v-else>
            <p>数据交换与隐私计算</p>
          </div>
          <div class="contet-bottom">{{ $t('homepage.bottomText') }}</div>
        </div>
      </div>
      <div class="homepage-box-right">
        <img class="right-img" src="~assets/images/home/1.exchange.png" alt="" />
        <p class="randomNum">{{ randomNum }}</p>
      </div>
    </div>
    <MoveDown />
  </div>
</template>
<script>
import Head from 'components/head/Head.vue'
import MoveDown from 'components/MoveDown'
export default {
  components: { Head, MoveDown },
  data () {
    return {
      randomNum: '',
      timer: ''
    }
  },
  computed: {},
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  mounted () {
    this.getNumer()
  },
  methods: {
    getNumer () {
      this.timer = this.randomNum = Math.floor(Math.random() * 100)
      setTimeout(() => {
        this.randomNum = Math.floor(Math.random() * 100)
        this.getNumer()
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.homepage-wrapper {
  height: calc(100% - 94px);
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  .homepage-box-left {
    position: absolute;
    left: 0;
    // @media screen and (min-width: 1920px) {
    //   left: 10%;
    // }
    top: 26%;
    .contet-top {
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 50px;
      color: #ffffff;
      letter-spacing: 1px;
      line-height: 68px;
    }
    .contet-bottom {
      width: 700px;
      margin-top: 50px;
      font-size: 20px;
      color: #c8c8c8;
      letter-spacing: 0;
      line-height: 34px;
    }
  }
  .homepage-box-right {
    position: absolute;
    right: 0;
    top: 20%;
    .right-img {
      width: 400px;
    }
    .randomNum {
      position: absolute;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 50px;
      color: #3aff82;
      letter-spacing: 1px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    // @media screen and (min-width: 1920px) {
    //   right: 10%;
    //   top: 16%;
    //   .right-img {
    //     width: 520px;
    //   }
    // }
  }
}
</style>
