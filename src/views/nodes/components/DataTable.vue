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
            <el-table-column show-overflow-tooltip prop="dataName" :label="$t('myData.dataName')" />
            <el-table-column
                show-overflow-tooltip
                prop="credentialName"
                :label="$t('myData.credentialName')"
            />
            <el-table-column prop="credentialSymbol" :label="$t('myData.credentialSymbol')" />
            <el-table-column prop="launchTime" :label="$t('myData.launchTime')" />
            <el-table-column :label="$t('common.actions')">
                <template #default="{ row }">
                    <el-space :size="20">
                        <span
                            class="text-14px text-color-[#0052D9] leading-23px cursor-pointer"
                            @click="linkToViewData(row)"
                        >{{ $t('myData.viewData') }}</span>
                        <span
                            class="text-14px text-color-[#0052D9] leading-23px cursor-pointer"
                            @click="linkToViewToken(row)"
                        >{{ $t('myData.viewCredential') }}</span>
                    </el-space>
                </template>
            </el-table-column>
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
const router = useRouter()
const linkToViewToken = (row: any) => {
    //    TODO go dex
}
const linkToViewData = (row: any) => {
    router.push({
        name: 'dataOverview'
    })
}

</script>

<style scoped lang='scss'>
</style>