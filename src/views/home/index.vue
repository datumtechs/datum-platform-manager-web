<template>
  <div class="home-index">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component({
  name: 'Home',
})
export default class Home extends Vue {}
</script>

<style scoped lang="stylus"></style>
