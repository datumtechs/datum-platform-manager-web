<template>
  <div class="main-wrapper">
    <Head />
    <router-view />
  </div>
</template>

<script>
import Head from 'components/head/Head.vue'
export default {
  components: { Head }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: calc(100vw + 18px);
  min-height: 100vh;
}
</style>
