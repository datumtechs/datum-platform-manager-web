<template>
    <div class="my-60px com-main-data-wrap">
        <el-table :data="tableData">
            <el-table-column type="index" width="80">
                <template #header>{{ t('common.num') }}</template>
            </el-table-column>
            <el-table-column props="" :label="$t('center.proposalContent')"></el-table-column>
            <el-table-column props="" :label="$t('center.proposer')"></el-table-column>
            <el-table-column props="" :label="$t('center.proposalType')"></el-table-column>
            <el-table-column props="" :label="$t('center.votingTime')"></el-table-column>
            <el-table-column props="" :label="$t('center.proposalProgression')"></el-table-column>
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