<template>
  <el-table :data="props.data" class="mt-63px table-header-bg-Grayscale" border>
    <el-table-column type="index" width="200" align="center">
      <template #header>{{ $t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="capacity" align="center" :label="$t('computeTask.capacity')" />
    <el-table-column prop="name" align="center" :label="$t('computeTask.name')" />
    <el-table-column prop="identifier" align="center" :label="$t('computeTask.identifier')" />
    <el-table-column prop="information" align="center" :label="$t('computeTask.information')" />
  </el-table>
</template>
<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})

</script>
<style lang="scss" scoped>
</style>