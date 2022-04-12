<template>
    <div class="my-57px com-main-data-wrap">
        <el-table :data="tableData">
            <el-table-column type="index" width="100">
                <template #header>{{ $t('common.num') }}</template>
            </el-table-column>
            <el-table-column prop="nodeName" :label="$t('auth.networkIP')" />
            <el-table-column prop="identityIp" :label="$t('auth.networkName')" />
            <el-table-column :label="$t('common.actions')">
                <template #default="scope">
                    <el-button type="text" circle @click="submit">{{ $t('auth.auth') }}</el-button>
                    <el-button type="text" circle @click="auth">{{ $t('auth.cancelAuth') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import { getUserOrgList } from '@/api/login'
import { ElMessageBox, ElMessage } from 'element-plus'
const { t } = useI18n()
const tableData = ref([])

const query = () => {
    getUserOrgList().then(res => {
        const { data, code } = res
        if (code === 10000) {
            console.log(data)
            tableData.value = data
        }
    })
}
const submit = () => {
    ElMessageBox.confirm(
        `${t('auth.nodeAuthEnterBefore')}${'xxx'}${t('auth.nodeAuthEnterAfter')}`,
        t('auth.cancelAuth'), {
        confirmButtonText: t('common.submit'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
    }).then(({ value }) => {
        ElMessage({
            type: 'success',
            message: `Your email is:${value}`,
        })
    }).catch(_ => _)
}

const auth = () => {
    ElMessageBox.confirm(
        `${t('auth.nodeAuthEnterBefore')}${'xxx'}${t('auth.nodeCancelAuthEnterAfter')}`,
        t('auth.cancelAuth'), {
        confirmButtonText: t('common.submit'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
    }).then(({ value }) => {
        ElMessage({
            type: 'success',
            message: `Your email is:${value}`,
        })
    }).catch(_ => _)
}
onMounted(() => {
    query()
})


</script>
<style lang="scss">
</style>