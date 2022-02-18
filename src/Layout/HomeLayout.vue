<template>
  <div>
    <HeadBar />
    <div class="flex items-center justify-center font-bold text-red-600 text-[72px]">This is the banner</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
</script>

<style scoped lang="scss">
.home-wrapper {
  .home-banner {
    height: 300px;
    background: #f8f8f8;
    text-align: center;
    font-size: 72px;
  }
}
</style>
