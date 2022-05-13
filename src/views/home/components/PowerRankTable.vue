<template>
    <div class="flex-1 ml-60px">
        <el-table size="large" :data="props.tableData" style="width: 100%">
            <el-table-column type="index" :label="t('home.ranking')" :index="indexMethod" width="80" />
            <el-table-column show-overflow-tooltip prop="nodeName" :label="t('home.nodeName')" />
            <el-table-column prop="computingPowerRatio" :label="t('home.powerRatio')" width="100">
                <template #default="{ row }">
                    <div>
                        {{ (parseFloat(row.computingPowerRatio) / 100) + '%' }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div type="primary" class="mt-14px bg-main w-388px h-50px rounded-25px">
            <p class="leading-50px text-[14px] text-[#fff] text-center cursor-pointer">{{
                    t("home.viewAllNode")
            }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>

const { t } = useI18n()
const props = defineProps({
    tableData: {
        type: Array,
        default: () => []
    }
})

const indexMethod = (index: number) => {
    return index + 3
}


</script>

<style scoped lang='scss'>
</style>