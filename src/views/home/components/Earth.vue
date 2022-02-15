<template>
  <div id="globalArea" ref="globalArea" class="earth-box"></div>
</template>

<script>
import * as echarts from 'echarts'
import earthImg from '@/assets/images/home/earth.png'
// import 'echarts-gl'

export default {
  components: {},
  props: {},
  data () {
    return {
      option: '',
      myChart: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    if (process.browser) {
      require('echarts-gl')
      // // get the container to hold the IO globe
      // const container = document.getElementById('globalArea')
      // // create controller for the IO globe, input the container as the parameter
      // const controller = new GIO.Controller(container)

      // /**
      //  * use addData() API to add the the data to the controller
      //  * know more about data format, check out documentation about data: http://giojs.org/html/docs/dataIntro.html
      //  * we provide sample data for test, get sample data from: https://github.com/syt123450/giojs/blob/master/examples/data/sampleData.json
      //  */
      // controller.addData()
      // controller.setAutoRotation(true, 1)
      // controller.setTransparentBackground(true)
      // controller.configure({
      //   control: {
      //     halo: false
      //   },
      //   color: {
      //     background: '#090916',
      //     // surface: '#3AFF82',
      //     halo: '#090916'
      //   },
      //   brightness: {
      //     ocean: 0.8
      //   }
      // })
      // controller.lightenMentioned(true)
      // // call the init() API to show the IO globe in the browser
      // controller.init()
      this.initEarth()
      window.addEventListener('resize', this.resizeFn)
    }
  },
  methods: {
    initEarth () {
      this.myChart = echarts.init(document.getElementById('globalArea'))
      this.option = {
        backgroundColor: 'transparent',
        globe: {
          baseTexture: earthImg,
          shading: 'color',
          environment: 'auto',
          atmosphere: {
            show: true
          },
          light: {
            ambient: {
              color: '#3aff82',
              intensity: 0.1
            },
            main: {
              intensity: 1.5
            }
          }
        },
        series: []
      }
      this.myChart.setOption(this.option)
    },
    resizeFn () {
      this.myChart.resize()
    }
  }
}
</script>
<style lang="scss" scoped>
.earth-box {
  position: absolute;
  width: 400px;
  height: 400px;
  left: 50%;
  top: 50%;
  z-index: 10001;
  transform: translate(-50%, -50%);
  // @media screen and (min-width: 1920px) {
  //   left: 6.1%;
  //   // width: 800px;
  //   // height: 800px;
  //   top: 10%;
  // }
}
</style>
