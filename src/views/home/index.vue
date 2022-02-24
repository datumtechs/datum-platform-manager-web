<script setup lang="ts">
import Banner from './components/Banner.vue'
import Slide from './components/Slide.vue'
import Overview from './components/Overview.vue'
import PowerRank from './components/PowerRank.vue'
import DataRank from './components/DataRank.vue'
</script>
<template>
  <section class="min-height">
    <Banner />
    <section class="max-w-1160px mx-auto mb-205px">
      <Slide />
      <Overview />
      <PowerRank />
      <DataRank />
    </section>
  </section>
</template>
<style lang="scss">
</style>
