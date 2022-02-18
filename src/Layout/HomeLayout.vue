<template>
  <div class="home-wrapper">
    <HeadBar />
    <div class="home-banner">This is the banner</div>
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
