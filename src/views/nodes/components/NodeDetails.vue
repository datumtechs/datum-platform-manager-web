<script lang="ts" setup>
const activekey = ref(0)
const list = reactive([
  {
    name: 'head.Nickname'
  },
  {
    name: 'head.nodeManagement'
  }
])
const tabsChange = () => {

}
</script>
<template>
  <div class="flex-1 task-wrap">
    <DetailBanner :backShow="true">
      <template #briefInfo>participant nodes in the privacy computing network</template>
    </DetailBanner>
    <div class="mt-30px max-w-1200px px-25px mx-auto">
      <div class="w-427px h-50px">
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </div>
    </div>
  </div>
</template>