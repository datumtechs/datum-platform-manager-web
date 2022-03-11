<template>
  <el-table :data="props.data" class="mt-63px" border>
    <el-table-column type="index" width="80">
      <template #header>{{ $t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="taskID" :label="$t('myDatas.taskID')" />
    <el-table-column prop="TtaskCategory" :label="$t('myDatas.TtaskCategory')" />
    <el-table-column prop="capability" :label="$t('myDatas.capability')" />
    <el-table-column prop="createTime" :label="$t('myDatas.createTime')" />
    <el-table-column prop="totalTime" :label="$t('myDatas.totalTime')" />
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