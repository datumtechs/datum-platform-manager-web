<template>
    <div class="mt-20px flex-1 border-1 border-solid border-[#EEEEEE] px-40px pt-27px pb-43px">
        <el-table :row-style="{ height: '50px' }" class="home-data-table" :data="tableData"
            style="width: 100%">
            <el-table-column prop="ranking" :label="t('home.ranking')" width="80" />
            <el-table-column prop="tokenName" :label="t('home.nodeName')" />
            <el-table-column prop="powerRatio" :label="t('home.powerRatio')" width="100" />
        </el-table>
        <div type="primary" class="mt-30px bg-main h-50px rounded-25px">
            <p class="leading-50px text-[14px] text-[#fff] text-center cursor-pointer">{{
                    t("home.viewAllNode")
            }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { getDataTokenUsedTop } from '@/api/home'
const { t } = useI18n()
const tableData = ref([])

// [
//     {
//         id: 1,
//         ranking: 4,
//         nodeName: '张胜男',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 2,
//         ranking: 5,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 3,
//         ranking: 6,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 4,
//         ranking: 7,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 5,
//         ranking: 8,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 6,
//         ranking: 9,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 7,
//         ranking: 10,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 8,
//         ranking: 11,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 9,
//         ranking: 12,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
//     {
//         id: 10,
//         ranking: 13,
//         nodeName: '介绍所',
//         powerRatio: 'x.xx%'
//     },
// ]
const queryDataRank = () => {
    getDataTokenUsedTop({
        size: 10
    }).then(res => {
        const { data, code } = res
        if (code === 10000) {
            tableData.value = data
        }
    })
}

watchEffect(() => {
    queryDataRank()
})



</script>

<style scoped lang='scss'>
</style>