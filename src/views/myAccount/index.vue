<template>
  <div class="flex-1">
    <Banner>
      <template #select>
        <ComTabs :list="list" @change="tabsChange" />
      </template>
    </Banner>
  </div>
</template>
<script lang="ts" setup>
const list = ref([
  {
    name: '1',
    type: "qweqwe"
  },
  {
    name: '1',
    type: "qweqwe"
  },
  {
    name: '1',
    type: "qweqwe"
  }
])

const tabsChange = (index: string) => {
  console.log(index)
}

</script>
<style lang="scss" scoped></style>