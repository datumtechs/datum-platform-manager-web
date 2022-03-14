<template>
  <el-table :data="props.data" class="mt-63px" border>
    <el-table-column type="index" width="200">
      <template #header>{{ $t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="field" :label="$t('myDatas.field')" />
    <el-table-column prop="dataType" :label="$t('myDatas.dataType')" />
    <el-table-column prop="remarks" :label="$t('myDatas.remarks')" />
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