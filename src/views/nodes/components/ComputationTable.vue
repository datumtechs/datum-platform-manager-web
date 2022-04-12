<template>
    <div class="mt-40px">
        <el-table
            :header-cell-style="{ height: '50px' }"
            :row-style="{ height: '70px' }"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
        >
            <el-table-column
                type="index"
                :label="$t('common.num')"
                :index="indexMethod"
                width="80"
            />
            <el-table-column show-overflow-tooltip prop="id" :label="$t('myData.taskID')" />
            <el-table-column :label="$t('node.capabilityInTask')">
                <template #default="{ row }">
                    <p v-for=" role in useRole(row)" :key="role">{{ $t(`role.${role}`) }}</p>
                </template>
            </el-table-column>
            <el-table-column :label="$t('node.startTime')">
                <template #default="{ row }">
                    <div v-if="row.startAt === 0">-</div>
                    <div v-else>{{ useFormatTime(row.startAt) }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('myData.totalTime')">
                <template #default="{ row }">{{ useDuring(row.endAt - row.startAt) }}</template>
            </el-table-column>
            <el-table-column :label="$t('common.actions')">
                <template #default="{ row }">
                    <span
                        class="text-14px text-color-[#0052D9] cursor-pointer"
                        @click="linkToViewComputations(row)"
                    >{{ $t('node.view') }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="flex my-50px justify-center">
        <el-pagination
            background
            layout="prev, pager, next"
            v-model:current-page="pageObj.current"
            v-model:page-size="pageObj.size"
            :total="pageObj.total"
        />
    </div>
</template>

<script setup lang='ts'>
import type { Ref } from 'vue'
import { useTableIndex, useFormatTime, useDuring, useRole } from '@/hooks'
import { getTaskListByOrg } from '@/api/task'
const router = useRouter()
const tableData = ref([])

const props = defineProps({
    identityId: {
        type: String,
        default: ''
    }
})

const format = (time: number) => {
    return new Date(time).toLocaleString()
}

const linkToViewComputations = (row: any) => {
    router.push({
        name: 'computationOverview'
    })
}

const pageObj = reactive({
    current: 1,
    size: 10,
    total: 0
})
const indexMethod = (index: number) => useTableIndex(index, pageObj.current, pageObj.size)
const getTableData = async () => {
    const { code, data } = await getTaskListByOrg({
        current: pageObj.current,
        identityId: props.identityId,
        size: pageObj.size
    })
    if (code === 10000) {
        tableData.value = data.items
        pageObj.total = data.total
    }
}

onMounted(() => {
    getTableData()
})
</script>

<style scoped lang='scss'>
</style>