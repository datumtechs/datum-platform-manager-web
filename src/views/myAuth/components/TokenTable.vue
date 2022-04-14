<template>
    <div class="my-60px com-main-data-wrap">
        <DataToken type="fee" :tableData="feeTokenData" />
        <DataToken type="data" :tableData="dataTokenData" />
    </div>
</template>
<script setup lang="ts">
import DataToken from './DataToken.vue'
import { queryUserDataList } from '@/api/data'
import { ElMessageBox, ElMessage } from 'element-plus'
const { t } = useI18n()
const tableData = ref([])

const feeTokenData = ref([{}])
const dataTokenData = ref([{}])

const current = ref(1)
const size = ref(10)



const query = () => {
    queryUserDataList({
        current: current.value,
        size: size.value,
    }).then(res => {
        const { data, code } = res
        if (code === 10000) {
            console.log(data)
            tableData.value = data
        }
    })
}


const auth = () => {
    ElMessageBox.confirm(
        `${t('auth.cancelAuthTipBefore')}${'xxx'}${t('auth.auth')},${t('取消后授权数量将会变更为0')}`,
        t('auth.cancelAuth'), {
        confirmButtonText: t('common.submit'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
    }).then(({ value }) => {
        ElMessage({
            type: 'success',
            message: `Your email is:${value}`,
        })
    }).catch(_ => _)
}
onMounted(() => {
    query()
})


</script>
<style lang="scss">
</style>