<template>
  <el-table :data="props.data" class="my-30px table-header-bg-Grayscale" border>
    <el-table-column type="index" width="80" align="center">
      <template #header>{{ t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="eventType" align="center" :label="t('computeTask.eventType')"
      width="180px" />
    <el-table-column prop="nodeName" align="center" :label="t('computeTask.eventMaker')"
      width="200px" />
    <el-table-column prop="eventAt" align="center" :label="t('computeTask.generationTime')"
      width="180px">
      <template #default="{ row }">{{ useFormatTime(row.eventAt) }}</template>
    </el-table-column>
    <el-table-column prop="eventContent" align="center" :label="t('computeTask.eventContent')" />
  </el-table>
</template>
<script lang="ts" setup>
import { useFormatTime } from '@/hooks'
const { t } = useI18n()
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})

</script>
<style lang="scss" scoped>
</style>