<template>
  <div class="mt-46px">
    <slot name="mode"></slot>
  </div>
  <div class="mt-37px flex border-1 border-solid border-color-[#EEE] operation-box">
    <Algorithm />
    <Flow />
    <Panel />
  </div>
</template>
<script lang="ts" setup>
import Algorithm from './expert/Algorithm.vue'
import Panel from './expert/Panel.vue'
import Flow from './expert/Flow.vue'
</script>
<style lang="scss" scoped>
.operation-box {
  height: calc(100vh - 406px);
}
</style>