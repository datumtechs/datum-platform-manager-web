<template>
  <!-- <client-only> -->
  <div class="swiper-container" :style="{ 'background-color': curIndex === 0 ? '#120d33' : '#090916' }">
    <div id="fullpage" ref="fullpage">
      <div id="dataExchange" class="section">
        <DataExchange />
      </div>
      <div id="rosettaNetMap" class="section">
        <RosettaNetMap :page-obj="pageObj" />
      </div>
      <div id="dataAmount" class="section">
        <DataAmount :page-obj="pageObj" />
      </div>
      <div id="multiService" class="section">
        <MultiService />
      </div>
      <div id="recommendedServices" class="section">
        <RecommendedServices />
      </div>
    </div>
    <Wave />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { homeApi } from 'apis'
import DataExchange from './components/DataExchange'
import RosettaNetMap from './components/RosettaNetMap'
import DataAmount from './components/DataAmount'
import MultiService from './components/MultiService'
import RecommendedServices from './components/RecommendedServices'
import Wave from 'components/Wave'
import WheelIndicator from '/public/js/wheel-indicator'
// import AllServices from './components/AllServices'
export default {
  name: 'Home',
  components: { DataExchange, RosettaNetMap, DataAmount, MultiService, RecommendedServices, Wave }, // AllServices
  provide () {
    return {
      slideFn: this.slideFn
    }
  },
  layout: 'home',
  data () {
    return {
      pageObj: {
        powerOrgCount: '',
        totalMemory: '',
        totalBandwidth: '',
        totalCore: '',
        dataFileSize: ''
      },
      curIndex: 0,
      previous: 0,
      indicator: '',
      fullpage: '',
      options: {
        onLeave: this.onLeave,
        afterLoad: this.afterLoad,
        onSlideLeave: this.onSlideLeave,
        licenseKey: 'YOUR_KEY_HEERE',
        scrollBar: false,
        menu: 'menu',
        // fixedElements: '.waves',
        // anchors: ['page1', 'page2', 'page3'],
        sectionsColor: [ 'transparent' ]
      },
      pageMap: new Map([
        [ 0, 'dataExchange' ],
        [ 1, 'rosettaNetMap' ],
        [ 2, 'dataAmount' ],
        [ 3, 'multiService' ],
        [ 4, 'recommendedServices' ]
        // [ 5, 'allServices' ]
      ])
    }
  },

  // head() {
  //   return {
  //     script: [
  //       { src: '/js/wheel-indicator.js', defer: true },
  //       { src: '/js/jquery.min.js', defer: true },
  //     ]
  //   }
  // },
  computed: {
    ...mapGetters('app', [ 'curPageIndex', 'curFullpage' ])
  },
  watch: {
    curFullpage (newV, oldV) {
      // if (newV === 'allServices') {
      if (newV === 'recommendedServices') {
        const returnEle = document.querySelector('#recommendedServices')
        if (returnEle) {
          returnEle.scrollIntoView(true)
        }
      }
    }
  },
  mounted () {
    const that = this
    // eslint-disable-next-line no-undef
    this.indicator = new WheelIndicator({
      elem: document.querySelector('#fullpage'),
      callback (e) {
        that.handleScroll(e)
      },
      preventMouse: true
    })
    that.initData()
    this.SET_CURPAGEINDEX(0)
  },
  methods: {
    ...mapMutations('app', [ 'SET_CURPAGEINDEX', 'SET_CURFULLPAGE' ]),
    initData () {
      homeApi.queryGlobalData().then(res => {
        const { data, code } = res
        if (code === 10000) {
          this.pageObj.powerOrgCount = data.powerOrgCount
          this.pageObj.totalMemory = data.totalMemory
          this.pageObj.totalBandwidth = data.totalBandwidth
          this.pageObj.totalCore = data.totalCore
          this.pageObj.dataFileSize = data.dataFileSize
        }
      })
    },
    getPageMap (num) {
      return this.pageMap.get(num)
    },
    slideToAllService () {
      const screenHeight = document.body.clientHeight
      this.slideFn(screenHeight, 5)
      this.SET_CURPAGEINDEX(5)
    },
    slideFn (unit, index) {
      // eslint-disable-next-line no-undef
      $('#fullpage')
        .stop(true, true)
        .animate({ scrollTop: unit * index }, 400, 'linear')
      this.SET_CURFULLPAGE(this.getPageMap(index))
    },
    handleScroll (e) {
      this.curIndex = this.curPageIndex
      const screenHeight = document.body.clientHeight
      const now = Date.now()
      const ms = now - this.previous
      if (ms > 400) {
        if (e.direction === 'up') {
          // const sTop = $('#allServices').offset().top
          // if (sTop < 0) return
          this.curIndex--
          this.SET_CURPAGEINDEX(this.curIndex)
          if (this.curIndex < 0) {
            this.curIndex = 0
            this.SET_CURPAGEINDEX(0)
            return
          }
          if (this.curIndex < 5) {
            this.indicator.setOptions({ preventMouse: true })
          }
        } else if (e.direction === 'down') {
          this.curIndex++
          this.SET_CURPAGEINDEX(this.curIndex)
          if (this.curIndex > 4) {
            this.indicator.setOptions({ preventMouse: false })
            this.curIndex = 4
            this.SET_CURPAGEINDEX(4)
            return
          }
        }
        this.previous = now
        this.slideFn(screenHeight, this.curIndex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  //#120d33
  background: #120d33;
  transition: all 1s;
  overflow-x: hidden;
}
#fullpage {
  width: calc(100vw + 18px);
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
