<script setup lang="ts">
import Banner from './components/Banner.vue'
import Slide from './components/Slide.vue'
import Overview from './components/Overview.vue'
import PowerRank from './components/PowerRank.vue'
import DataRank from './components/DataRank.vue'
import { getGlobalStats } from '@/api/home'

const globalStats = ref({})

const getOverviewData = () => {
  getGlobalStats().then((res: any) => {
    const { code, data } = res
    if (code === 10000) {
      globalStats.value = data
    }
  })
}


onMounted(() => {
  getOverviewData()
})

</script>
<template>
  <section class="min-height">
    <Banner />
    <section class="max-w-1160px mx-auto mb-205px">
      <Slide />
      <Overview :globalStats="globalStats" />
      <PowerRank :globalStats="globalStats" />
      <DataRank />
    </section>
  </section>
</template>
<style lang="scss">
</style>
