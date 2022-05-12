<template>
  <div class="mt-60px flex">
    <div class="w-570px mr-20px">
      <Title :text="t('home.dataUseTop10')">
        <template #pic>
          <img src="@assets/images/home/dataRankLogo1.png" />
        </template>
      </Title>
      <DataRankTable />
    </div>
    <div class="flex-1 w-570px flex justify-center items-center">
      <!-- <Title :text="t('home.modelUseTop10')">
        <template #pic>
          <img src="@assets/images/home/dataRankLogo2.png" />
        </template>
      </Title>
      <DataRankTable /> -->
      <img class="w-470x h-454px" :src="flowImg" alt="">
    </div>
  </div>
</template>

<script setup lang='ts'>
import Title from './Title.vue'
import DataRankTable from './DataRankTable.vue'
import flowImg from '@/assets/images/home/flow.png'
const { t } = useI18n()
</script>

<style scoped lang='scss'>
</style>