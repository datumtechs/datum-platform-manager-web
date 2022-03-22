<template>
  <el-table :data="props.data" class="mt-63px table-header-bg-Grayscale" border>
    <el-table-column type="index" width="200" align="center" >
      <template #header>{{ $t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="field"  align="center" :label="$t('myData.field')" />
    <el-table-column prop="dataType"  align="center" :label="$t('myData.dataType')" />
    <el-table-column prop="remarks"  align="center" :label="$t('myData.remarks')" />
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