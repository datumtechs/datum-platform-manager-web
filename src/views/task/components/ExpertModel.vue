<template>
  <div class="mt-46px">
    <div>
      <slot name="mode"></slot>
    </div>
    <div class="my-30px h-668px flex border-1 border-solid border-color-[#EEE] operation-box">
      <Algorithm />
      <Flow />
      <Panel />
    </div>
    <SetNameDialog v-model:show="showDialog" />
  </div>
</template>
<script lang="ts" setup>
import Algorithm from './expert/Algorithm.vue'
import Panel from './expert/Panel.vue'
import Flow from './expert/Flow.vue'
import SetNameDialog from './expert/SetNameDialog.vue'

const showDialog = ref(true)

</script>
<style lang="scss" scoped>
.operation-box {
  // height: calc(100vh - 406px);
}
</style>