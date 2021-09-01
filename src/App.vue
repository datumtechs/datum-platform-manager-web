<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'App',
})
export default class AppIndex extends Vue {}
</script>

<style lang="stylus">
@import './assets/css/index.styl'
</style>
