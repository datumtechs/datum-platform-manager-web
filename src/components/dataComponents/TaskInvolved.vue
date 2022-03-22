<template>
  <el-table :data="props.data" class="mt-63px table-header-bg-Grayscale" border>
    <el-table-column type="index" width="80" align="center"  >
      <template #header>{{ $t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="taskID"  align="center"  :label="$t('myData.taskID')" />
    <el-table-column prop="TaskCategory"  align="center"  :label="$t('myData.TaskCategory')" />
    <el-table-column prop="capability"  align="center"  :label="$t('myData.capability')" />
    <el-table-column prop="createTime" align="center"   :label="$t('myData.createTime')" />
    <el-table-column prop="totalTime"  align="center"  :label="$t('myData.totalTime')" />
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