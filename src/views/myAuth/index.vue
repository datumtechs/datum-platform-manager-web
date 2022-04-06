<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :bg-name="'rocket'">
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
  </div>
</template>

<script setup lang='ts'>
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