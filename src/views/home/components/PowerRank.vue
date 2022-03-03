<template>
  <div class="mt-60px">
    <Title :text="$t('home.globalPowerAndRank')">
      <template #pic>
        <img src="@assets/images/home/powerRank.png" />
      </template>
    </Title>
    <div class="mt-16px h-679px border-1 border-solid border-[#EEEEEE] flex px-48px py-40px">
      <div class="w-616px">
        <div class="flex justify-between px-20px">
          <div v-for="box in envList" :key="box.id">
            <img class="mt-17px" :src="box.imgUrl" />
            <p class="mt-16px text-[24px] text-deep font-bold">{{ box.value }}</p>
            <p class="mt-7px text-[14px] text-shallow">{{ box.label }}</p>
          </div>
        </div>
        <div class="flex mt-30px h-437px bg-color-[#F7F8F9] rounded-8px px-27px">
          <div
            v-for="(box, index) in rankList"
            :key="box.id"
            class="w-174px h-200px rounded-8px p-20px gap-20px text-[#fff]"
            :class="`rank-box-${index + 1}`"
          >
            <p class="text-[20px] leading-24px black-font">{{ box.title }}</p>
            <p class="mt-8px text-[16px] leading-19px opacity-80">
              <span>{{ $t('home.powerRatio') }}: &nbsp;&nbsp;</span>
              <span>{{ box.ratio }}</span>
            </p>
            <p class="mt-52px text-[12px] opacity-80">{{ $t('home.nodeName') }}</p>
            <p class="mt-4px text-[14px] font-bold leading-17px">{{ box.nodeName }}</p>
          </div>
        </div>
      </div>
      <PowerRankTable />
    </div>
  </div>
</template>
<script setup lang='ts'>
import Title from './Title.vue'
import cpuImg from '@assets/images/home/powerRankCpu.png'
import memoryImg from '@assets/images/home/powerRankMemory.png'
import bandwidthImg from '@assets/images/home/powerRankBandwidth.png'
import PowerRankTable from './PowerRankTable.vue'
const { t } = useI18n()
const envList = computed(() => {
  return [
    {
      id: 1,
      label: t('home.totalCpu'),
      imgUrl: cpuImg,
      value: 123123
    },
    {
      id: 2,
      label: t('home.totalMemory'),
      imgUrl: memoryImg,
      value: 545454
    },
    {
      id: 3,
      label: t('home.totalBandwidth'),
      imgUrl: bandwidthImg,
      value: 868686
    },
  ]
})
const rankList = computed(() => {
  return [
    {
      id: 1,
      title: 'No.2',
      imgUrl: cpuImg,
      ratio: '11.33%',
      nodeName: 'aaa',
      value: 123123
    },
    {
      id: 2,
      title: 'No.1',
      imgUrl: cpuImg,
      ratio: '3.33%',
      nodeName: 'bbb',
      value: 123123
    },
    {
      id: 3,
      title: 'No.3',
      imgUrl: cpuImg,
      ratio: '4.33%',
      nodeName: 'ccc',
      value: 123123
    },
  ]
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