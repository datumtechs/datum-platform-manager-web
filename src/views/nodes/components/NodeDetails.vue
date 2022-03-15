<script lang="ts" setup>
import DataTable from './DataTable.vue'
import ComputationTable from './ComputationTable.vue'
const activekey = ref(0)
const list = reactive([
  {
    name: 'common.data'
  },
  {
    name: 'common.computations'
  }
])
const tabsChange = () => {

}
</script>
<template>
  <div class="flex-1 task-wrap">
    <DetailBanner :backShow="true">
      <template #briefInfo>Identifier：XXXXXXXXXXXXXXXXXXXXX</template>
    </DetailBanner>
    <div class="mt-30px max-w-1200px px-25px mx-auto">
      <div class="w-427px h-50px">
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </div>
      <DataTable v-if="activekey === 0" />
      <ComputationTable v-else />
    </div>
  </div>
</template>