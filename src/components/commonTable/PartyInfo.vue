<template>
  <div class="mt-40px">
    <el-table
      :header-cell-style="{ height: '50px' }"
      :row-style="{ height: '70px' }"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="$t('common.num')" width="80" />
      <el-table-column prop="taskRole" :label="$t('common.taskRole')" />
      <el-table-column show-overflow-tooltip prop="name" :label="$t('common.name')" />
      <el-table-column prop="identityId" :label="$t('common.identityId')" />
      <el-table-column prop="info" :label="$t('common.info')" />
    </el-table>
  </div>
  <div class="flex my-50px justify-center">
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script setup lang='ts'>
const tableData = reactive([
  {
    id: 1,
    dataName: '车田豆腐',
    credentialName: 'SK-2',
    credentialSymbol: 'SK-618',
    launchTime: '2022-3-15'
  },
  {
    id: 2,
    dataName: '车田豆腐',
    credentialName: 'SK-2',
    credentialSymbol: 'SK-618',
    launchTime: '2022-3-15'
  }
])
</script>

<style scoped lang='scss'>
</style>