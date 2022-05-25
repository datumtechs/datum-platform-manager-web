<template>
    <div class="my-60px com-main-data-wrap main-content">
        <DataToken type="fee" :tableData="feeTokenData" :titleContent="$t('auth.authWLatHint')"
            :title="t('auth.feeToken')" @updateData="queryWLat()" />
        <DataToken type="data" :tableData="dataTokenData" :titleContent="$t('auth.authErc20Hint')"
            :title="t('auth.dataToken')" @updateData="queryDataList" />
        <div class="flex my-50px justify-center">
            <el-pagination v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                background layout="prev, pager, next" :total="pageObj.total" />
        </div>
    </div>
</template>
<script setup lang="ts">
import DataToken from './DataToken.vue'
import { queryUserDataList, getUserMetisLatInfo } from '@/api/data'
import { useInterval } from '@/hooks'
const { t } = useI18n()

const feeTokenData: any = ref([])
const dataTokenData = ref([])

const pageObj = reactive({
    total: 0,
    current: 1,
    size: 10,
    keyword: ''
})

watch(() => pageObj.current, (newValue, oldValue) => {
    queryDataList()
});

const queryDataList = (str?: string) => {
    pageObj.keyword = str || ''
    queryUserDataList({
        current: pageObj.current,
        size: pageObj.size,
        keyword: pageObj.keyword
    }).then(res => {
        const { data, code } = res
        if (code === 10000) {
            dataTokenData.value = data.items
        }
    })
}

const queryWLat = async () => {
    const { code, data } = await getUserMetisLatInfo({})
    if (code === 10000) {
        feeTokenData.value = [data]
    }
}

useInterval(queryWLat, 5000)
useInterval(queryDataList, 5000)

onMounted(() => {
    queryWLat()
    queryDataList()
})

</script>
<style lang="scss">
</style>