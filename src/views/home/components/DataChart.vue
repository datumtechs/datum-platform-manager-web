<template>
  <div class="wrapper">
    <div id="dataChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import dayjs from 'dayjs'
import { homeApi } from 'apis'
import { changeSizeFn } from 'utils'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/grid'

echarts.use([ LegendComponent, TooltipComponent, GridComponent, BarChart, LineChart, CanvasRenderer ])
export default {
  components: {},
  props: {},
  data () {
    return {}
  },
  mounted () {
    this.initChart()
  },
  methods: {
    getMonthsByNumber (month) {
      const newDays = []
      for (let i = 0; i < month; i++) {
        const mmm = dayjs().subtract(i + 1, 'month')
        newDays.unshift(this.lang === 'en' ? mmm.format('MMM') : `${mmm.format('MM')}${this.$t('common.month')}`)
      }
      return newDays
    },
    async initChart () {
      const option = {
        grid: { left: 120, top: 100, right: 120, bottom: 60 },
        legend: {
          top: 50,
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter (value) {
            return changeSizeFn(value.value)
          }
        },
        xAxis: {
          type: 'category',
          data: this.getMonthsByNumber(12)
        },
        yAxis: [
          {
            name: this.$t('homepage.growth'),
            axisLabel: {
              fontSize: 12,
              color: '#DEE9FF',
              formatter: params => {
                return changeSizeFn(params)
              }
            },
            splitLine: {
              lineStyle: {
                color: '#555987',
                width: 1
              }
            },

            type: 'value',
            scale: true
          },
          {
            name: this.$t('homepage.total'),
            axisLabel: {
              fontSize: 12,
              color: '#DEE9FF',
              formatter: params => {
                return changeSizeFn(params)
              }
            },
            splitLine: {
              lineStyle: {
                color: '#555987',
                width: 1
              }
            },
            type: 'value',
            scale: true
          }
        ],
        series: [
          {
            name: this.$t('common.dataGrowth'),
            type: 'bar',
            yAxisIndex: 0,
            barWidth: 24,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#38FF82' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#1CC1EB' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              borderRadius: 10
            },
            data: [],
            label: {
              formatter: params => {
                return this.$t(params.name)
              }
            }
          },
          {
            name: this.$t('common.totalData'),
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 7,
            itemStyle: {
              color: '#FFA505'
            },
            lineStyle: {
              width: 4,
              color: '#FFA505'
            },
            smooth: true,
            data: [],
            label: {
              formatter: params => {
                return this.$t(params.name)
              }
            }
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('dataChart'))
      const res = await homeApi.queryDataTrend()
      const { data } = res
      const totalAry = []
      const growAry = []
      data.forEach(item => {
        totalAry.push(item.totalValue)
        growAry.push(item.incrementValue)
      })
      option.series[0].data = [ ...growAry ]
      option.series[1].data = [ ...totalAry ]
      myChart.setOption(option)
      myChart.resize()
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  #dataChart {
    width: 750px;
    height: 450px;
  }
}
</style>
