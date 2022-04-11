<template>
    <div class="my-57px com-main-data-wrap">
        <el-table :data="tableData">
            <el-table-column type="index" width="100">
                <template #header>{{ $t('common.num') }}</template>
            </el-table-column>
            <el-table-column prop="nodeName" :label="$t('node.nodeName')" />
            <el-table-column prop="identityIp" :label="$t('node.nodeIP')" />
            <el-table-column prop="identityPort" :label="$t('node.nodePort')" />
            <el-table-column :label="$t('common.actions')">
                <template #default="scope">
                    <el-button
                        type="text"
                        :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
                        circle
                    >{{ $t('common.delete') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import { getUserOrgList, postJoinOrg, delNodeOrg } from '@/api/login'
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

onMounted(() => {
    query()
})


</script>
<style lang="scss">
</style>