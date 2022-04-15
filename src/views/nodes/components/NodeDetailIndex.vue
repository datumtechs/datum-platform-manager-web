<template>
    <div class="main-content mt-30px max-w-1200px mx-auto overflow-hidden">
        <div class="inline-block h-50px">
            <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
        </div>
        <DataTable v-if="activekey === 0" :identityId="identityId" />
        <ComputationTable v-else :identityId="identityId" />
    </div>
</template>

<script setup lang='ts'>
import DataTable from './DataTable.vue'
import ComputationTable from './ComputationTable.vue'
const route = useRoute()
const identityId = computed((): any =>
  route.params.identityId
)
const activekey = ref(0)
const tabsChange = (index: string) => {
  activekey.value = +index
}
const list = reactive([
  {
    name: 'common.data'
  },
  {
    name: 'common.computations'
  }
])
</script>

<style scoped lang='scss'>
</style>