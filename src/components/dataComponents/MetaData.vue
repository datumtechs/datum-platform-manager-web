<template>
  <el-table :data="props.data" :class="isPathIncludeNode ? 'mt-30px' : 'my-60px'"
    class="mb-50px table-header-bg-Grayscale" border>
    <el-table-column type="index" width="200" align="center">
      <template #header>{{ t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="columnName" align="center" :label="t('myData.field')" />
    <el-table-column prop="columnType" align="center" :label="t('myData.dataType')" />
    <el-table-column prop="remarks" align="center" :label="t('myData.remarks')" />
  </el-table>
</template>
<script lang="ts" setup>
import { usePathIncludeNode } from '@/hooks'
const { t } = useI18n()
const isPathIncludeNode = usePathIncludeNode()
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})




</script>
<style lang="scss" scoped>
</style>