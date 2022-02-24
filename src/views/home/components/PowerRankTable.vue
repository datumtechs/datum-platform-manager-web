<template>
    <div class="flex-1 ml-60px">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="ranking" :label="$t('home.ranking')" width="80" />
            <el-table-column prop="nodeName" :label="$t('home.nodeName')" />
            <el-table-column prop="powerRatio" :label="$t('home.powerRatio')" />
        </el-table>
        <div type="primary" class="bg-primary w-388px h-50px rounded-25px">
            <p class="leading-50px text-[14px] text-white text-center">{{ $t("home.viewAllNode") }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
const tableData: Array<{}> = [
    {
        id: 1,
        ranking: 4,
        nodeName: '张胜男',
        powerRatio: 'x.xx%'
    },
    {
        id: 2,
        ranking: 5,
        nodeName: '介绍所',
        powerRatio: 'x.xx%'
    }
]
</script>

<style scoped lang='scss'>
</style>