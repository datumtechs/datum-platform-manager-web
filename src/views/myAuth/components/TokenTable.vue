<template>
    <div class="my-60px com-main-data-wrap main-content">
        <DataToken type="fee" :tableData="feeTokenData" :title="t('auth.feeToken')"
            @updateData="queryWLat()" :loading="feeLoading" />
        <DataToken type="data" :tableData="dataTokenData" :title="t('auth.dataToken')"
            @updateData="queryDataList" :loading="dataLoading" />
        <div class="flex my-50px justify-center">
            <el-pagination v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                background layout="prev, pager, next" :total="pageObj.total" />
        </div>
    </div>
</template>
<script setup lang="ts">
import DataToken from './DataToken.vue'
import { queryUserDataList, getUserMetisLatInfo } from '@/api/data'
const { t } = useI18n()

const feeTokenData: any = ref([])
const dataTokenData = ref([])

const current = ref(1)
const size = ref(10)
const feeLoading = ref(false)
const dataLoading = ref(false)

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
    dataLoading.value = true
    queryUserDataList({
        current: pageObj.current,
        size: pageObj.size,
        keyword: pageObj.keyword
    }).then(res => {
        dataLoading.value = false
        const { data, code } = res
        if (code === 10000) {
            dataTokenData.value = data.items
        }
    }).catch((error: any) => {
        dataLoading.value = false
    })
}
const queryWLat = async () => {
    feeLoading.value = true
    const { code, data } = await getUserMetisLatInfo({})
    feeLoading.value = false
    if (code === 10000) {
        feeTokenData.value = [data]
    }
}

onMounted(() => {
    queryDataList()
    queryWLat()
})


</script>
<style lang="scss">
</style>