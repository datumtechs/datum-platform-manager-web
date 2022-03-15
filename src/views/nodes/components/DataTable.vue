<template>
    <div class="mt-40px">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column :label="$t('common.num')" width="80" />
            <el-table-column prop="dateName" :label="$t('myData.dataName')" />
            <el-table-column prop="credentialName" :label="$t('myData.credentialName')" />
            <el-table-column prop="credentialSymbol" :label="$t('myData.credentialSymbol')" />
            <el-table-column prop="launchTime" :label="$t('myData.launchTime')" />
            <el-table-column :label="$t('common.actions')" />
        </el-table>
    </div>
</template>

<script setup lang='ts'>
const tableData = reactive([])
</script>

<style scoped lang='scss'>
</style>