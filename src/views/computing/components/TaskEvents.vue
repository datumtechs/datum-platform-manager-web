<template>
  <el-table :data="props.data" class="mt-63px table-header-bg-Grayscale" border>
    <el-table-column type="index" width="80" align="center">
      <template #header>{{ $t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="eventType" align="center" :label="$t('computeTask.eventType')" />
    <el-table-column prop="eventMaker" align="center" :label="$t('computeTask.eventMaker')" />
    <el-table-column
      prop="generationTime"
      align="center"
      :label="$t('computeTask.generationTime')"
    />
    <el-table-column prop="eventContent" align="center" :label="$t('computeTask.eventContent')" />
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