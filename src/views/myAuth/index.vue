<template>
  <div class="task-wrap com-main">
    <Banner :bg-name="'myAuth'">
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <NodeTable v-if="activekey == 1"></NodeTable>
    <TokenTable v-else></TokenTable>
  </div>
</template>

<script setup lang='ts'>
import NodeTable from "./components/NodeTable.vue";
import TokenTable from "./components/TokenTable.vue";
const activekey = ref(0)
const list = ref([
  {
    name: 'auth.tokenAuth'
  },
  {
    name: 'auth.nodeAuth'
  }
])
const tabsChange = (index: string) => {
  activekey.value = +index
}

</script>

<style scoped lang='scss'>
</style>