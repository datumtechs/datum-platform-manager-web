<template>
  <div class="mt-60px flex h-724px">
    <div class="flex-1 w-570px mr-20px">
      <Title :text="t('home.dataUseTop10')">
        <template #pic>
          <img src="@assets/images/home/dataRankLogo1.png" />
        </template>
      </Title>
      <DataRankTable />
    </div>
    <!-- <div class="flex-1 w-570px">
      <Title :text="t('home.modelUseTop10')">
        <template #pic>
          <img src="@assets/images/home/dataRankLogo2.png" />
        </template>
      </Title>
      <DataRankTable />
    </div> -->
  </div>
</template>

<script setup lang='ts'>
import Title from './Title.vue'
import DataRankTable from './DataRankTable.vue'
const { t } = useI18n()
</script>

<style scoped lang='scss'>
</style>