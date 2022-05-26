<template>
  <div class="mt-60px">
    <Title :text="t('home.globalPowerAndRank')">
      <template #pic>
        <img src="@assets/images/home/powerRank.png" />
      </template>
    </Title>
    <div class="mt-16px h-679px border-1 border-solid border-[#EEEEEE] flex px-48px py-40px">
      <div class="w-616px">
        <div class="flex justify-between px-20px">
          <div v-for="box in envList" :key="box.id">
            <img class="mt-17px" :src="box.imgUrl" />
            <div class="mt-16px text-[24px] text-deep font-bold">
              <!-- <p class="w-140px ellipse" v-if="box.title === 'totalCore'">{{ box.value }}</p> -->
              <CountUp v-if="box.title !== 'totalCore'" class="w-150px ellipse" :options="{
                decimalPlaces: 2, useGrouping: true
              }" :end-val="useSizeWithUnit(box.value).value || 0">
                <template #suffix>
                  <span>{{
                      useSizeWithUnit(box.value).unit
                  }}</span>
                </template>
              </CountUp>
              <CountUp v-else class="w-150px ellipse" :options="{ useGrouping: true }"
                :end-val="box.value || 0" />
            </div>
            <p class="mt-7px text-[14px] text-shallow">{{ box.label }}</p>
          </div>
        </div>
        <div class="flex mt-30px h-437px bg-color-[#F7F8F9] rounded-8px px-27px">
          <div v-for="(box, index) in rankList" :key="box.id"
            class="w-174px h-200px rounded-8px p-20px gap-20px text-[#fff] cursor-pointer"
            :class="`rank-box-${index + 1}`">
            <p class="text-[20px] leading-24px font-bold">{{ box.title }}</p>
            <p class="mt-8px text-[16px] leading-19px opacity-80">
              <span>{{ t('home.powerRatio') }}: &nbsp;&nbsp;</span>
              <span>{{ box.ratio }}</span>
            </p>
            <p class="mt-52px text-[12px] opacity-80">{{ t('home.nodeName') }}</p>
            <p class="mt-4px text-[14px] font-bold leading-17px">{{ box.nodeName }}</p>
          </div>
        </div>
      </div>
      <PowerRankTable :tableData="tableData" />
    </div>
  </div>
</template>
<script setup lang='ts'>
import Title from './Title.vue'
import cpuImg from '@assets/images/home/powerRankCpu.png'
import memoryImg from '@assets/images/home/powerRankMemory.png'
import bandwidthImg from '@assets/images/home/powerRankBandwidth.png'
import PowerRankTable from './PowerRankTable.vue'
import { useSizeWithUnit } from '@/hooks'
import { getOrgPowerTop } from '@/api/home'
import CountUp from 'vue-countup-v3'

const { t } = useI18n()
const props = defineProps({
  globalStats: {
    type: Object,
    default: () => { }
  }
})

const tableData = ref([])

const envList = computed(() => [
  {
    id: 1,
    label: t('home.totalCpu'),
    title: 'totalCore',
    imgUrl: cpuImg,
    value: 0
  },
  {
    id: 2,
    label: t('home.totalMemory'),
    title: 'totalMemory',
    imgUrl: memoryImg,
    value: 0
  },
  {
    id: 3,
    label: t('home.totalBandwidth'),
    title: 'totalBandwidth',
    imgUrl: bandwidthImg,
    value: 0
  }
])

const rankList = ref([
  {
    id: 1,
    title: 'No.2',
    imgUrl: cpuImg,
    ratio: '0.00%',
    nodeName: '',
    value: 0
  },
  {
    id: 2,
    title: 'No.1',
    imgUrl: cpuImg,
    ratio: '0.00%',
    nodeName: '',
    value: 0
  },
  {
    id: 3,
    title: 'No.3',
    imgUrl: cpuImg,
    ratio: '0.00%',
    nodeName: '',
    value: 0
  }
])

const initialData = () => {
  envList.value.map((item: any) => {
    item.value = props.globalStats[item.title]
  })
}

const _swapArrIndex = (arr: Array<any>, index1: number, index2: number) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}


const queryPowerRank = () => {
  getOrgPowerTop({
    size: 10
  }).then((res: any) => {
    const { data, code } = res
    if (code === 10000) {
      const newData = JSON.parse(JSON.stringify(data))
      const env = _swapArrIndex(newData.slice(0, 3), 0, 1)
      tableData.value = newData
      rankList.value.forEach((rank, index) => {
        rank.ratio = (env[index].computingPowerRatio / 100) + '%'
        rank.nodeName = env[index].nodeName
      })
    }
  })
}

watchEffect(() => {
  initialData()
  queryPowerRank()
})

</script>

<style scoped lang='scss'>
.rank-box-1 {
  position: relative;
  top: 141px;
  margin-right: 20px;
  background: linear-gradient(#4dda89, #62ffa5);
}

.rank-box-2 {
  position: relative;
  top: 71px;
  margin-right: 20px;
  background: url("@assets/images/home/top1bg.png") no-repeat;
  background-size: 100%, 100%;
}

.rank-box-3 {
  position: relative;
  top: 181px;
  background: linear-gradient(#6eabff, #7ce0ff);
}
</style>