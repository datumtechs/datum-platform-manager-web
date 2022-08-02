<template>
    <div class="my-60px com-main-data-wrap main-content">
        <DescBox type="trusted" :content="$t('center.trustedDesc')" />
        <el-table :data="tableData">
            <el-table-column type="index" width="80">
                <template #header>{{ t('common.num') }}</template>
            </el-table-column>
            <el-table-column prop="" :label="t('workflow.orgName')">
            </el-table-column>
            <el-table-column prop="" :label="t('center.approvalOrganization')"></el-table-column>
            <el-table-column prop="" :label="t('center.certificateTime')"></el-table-column>
            <el-table-column prop="" :label="t('center.certificateValidity')"></el-table-column>
            <el-table-column prop="" :label="t('common.actions')">
            </el-table-column>
        </el-table>
        <div class="flex my-50px justify-center">
            <el-pagination v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                background layout="prev, pager, next" :total="pageObj.total" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import DescBox from './DescBox.vue'
import { getOrgVcList } from '@/api/publicity'
const { t } = useI18n()
const tableData = ref([])

const queryOrgList = () => {
    getOrgVcList({
        current: pageObj.current,
        size: pageObj.size
    }).then(res => {
        const { code, data } = res
        if (code === 10000) {
            tableData.value = data.items
            pageObj.total = data.total
        }
    })
}
const pageObj = reactive({
    total: 0,
    current: 1,
    size: 10,
})
onMounted(() => {
    queryOrgList()
})
</script>

<style scoped lang='scss'>
</style>