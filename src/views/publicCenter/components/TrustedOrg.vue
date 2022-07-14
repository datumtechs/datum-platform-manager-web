<template>
    <div class="my-60px com-main-data-wrap">
        <el-table :data="tableData">
            <el-table-column type="index" width="80">
                <template #header>{{ t('common.num') }}</template>
            </el-table-column>
            <el-table-column prop="" :label="t('workflow.orgName')">
            </el-table-column>
            <el-table-column prop="" :label="t('center.approvalOrganization')"></el-table-column>
            <el-table-column prop="" :label="t('')"></el-table-column>
            <el-table-column prop="" :label="t('')"></el-table-column>
            <el-table-column prop="" :label="t('')"></el-table-column>
            <el-table-column prop="" :label="t('common.actions')">
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang='ts'>
const { t } = useI18n()
const tableData = ref([])
</script>

<style scoped lang='scss'>
</style>