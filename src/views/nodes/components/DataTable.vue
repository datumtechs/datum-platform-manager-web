<template>
    <div class="mt-40px">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column :label="$t('common.num')" width="80" />
            <el-table-column prop="dateName" :label="$t('node.dataName')"  />
            <el-table-column prop="credentialName" :label="$t('node.credentialName')" />
            <el-table-column prop="credentialSymbol" :label="$t('node.credentialSymbol')" />
            <el-table-column prop="createTime" :label="$t('node.createTime')" />
        </el-table>
    </div>
</template>

<script setup lang='ts'>
const tableData = reactive([])
</script>

<style scoped lang='scss'>
</style>