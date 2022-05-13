<template>
    <div class="mt-20px flex-1 border-1 border-solid border-[#EEEEEE] px-40px pt-27px pb-43px">
        <el-table :row-style="{ height: '50px' }" class="home-data-table" :data="tableData"
            style="width: 100%">
            <el-table-column type="index" :label="t('home.ranking')" width="80" />
            <el-table-column show-overflow-tooltip prop="tokenName"
                :label="t('myData.credentialName')" />
            <el-table-column prop="tokenUsed" :label="t('home.usage')" width="100" />
        </el-table>
        <div type="primary" class="mt-30px bg-main h-50px rounded-25px">
            <p class="leading-50px text-[14px] text-[#fff] text-center cursor-pointer">{{
                    t("home.viewAllToken")
            }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { getDataTokenUsedTop } from '@/api/home'
const { t } = useI18n()
const tableData = ref([])
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