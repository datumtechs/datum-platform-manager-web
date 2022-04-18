<template>
    <div class="my-60px com-main-data-wrap main-content">
        <DataToken type="fee" :tableData="feeTokenData" :title="t('auth.feeToken')" />
        <DataToken type="data" :tableData="dataTokenData" :title="t('auth.dataToken')" />
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



const queryDataList = () => {
    queryUserDataList({
        current: current.value,
        size: size.value,
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
        feeTokenData.value = [Object.assign(data.token, data.tokenHolder)]
    }
}

onMounted(() => {
    queryDataList()
    queryWLat()
})


</script>
<style lang="scss">
</style>