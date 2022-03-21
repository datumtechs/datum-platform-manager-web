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
            <el-table-column show-overflow-tooltip prop="taskID" :label="$t('myData.taskID')" />
            <el-table-column prop="capabilityInTask" :label="$t('node.capabilityInTask')" />
            <el-table-column prop="startTime" :label="$t('node.startTime')" />
            <el-table-column prop="totalTime" :label="$t('myData.totalTime')" />
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
    <div class="flex mt-50px justify-center">
        <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
</template>

<script setup lang='ts'>
const router = useRouter()
const tableData = reactive([
    {
        id: 1,
        taskID: '车田豆腐',
        capabilityInTask: 'SK-2',
        startTime: '2022-3-15',
        totalTime: '03:00'
    },
    {
        id: 2,
        taskID: '车田豆腐',
        capabilityInTask: 'SK-2',
        startTime: '2022-3-15',
        totalTime: '03:00'
    }
])
const linkToViewComputations = (row: any) => {
    router.push({
        name: 'computationOverview'
    })
}
</script>

<style scoped lang='scss'>
</style>