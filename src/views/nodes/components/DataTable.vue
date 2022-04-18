<template>
    <div class="mt-30px">
        <el-table :header-cell-style="{ height: '50px' }" :row-style="{ height: '70px' }"
            :data="tableData" highlight-current-row style="width: 100%">
            <el-table-column type="index" :label="t('common.num')" :index="indexMethod"
                width="80" />
            <el-table-column show-overflow-tooltip prop="metaDataName"
                :label="t('myData.dataName')" />
            <el-table-column show-overflow-tooltip prop="tokenName"
                :label="t('myData.credentialName')" />
            <el-table-column prop="tokenSymbol" :label="t('myData.credentialSymbol')" />
            <el-table-column prop="launchTime" :label="t('myData.launchTime')">
                <template #default="{ row }">
                    <div>{{ useFormatTime(row.publishedAt) }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="t('common.actions')">
                <template #default="{ row }">
                    <el-space :size="20">
                        <span class="text-14px text-color-[#0052D9] leading-23px cursor-pointer"
                            @click="linkToViewData(row)">{{ t('myData.viewData') }}</span>
                        <span class="text-14px text-color-[#0052D9] leading-23px cursor-pointer"
                            @click="linkToViewToken(row)">{{ t('myData.viewCredential') }}</span>
                    </el-space>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="flex my-50px justify-center">
        <el-pagination background layout="prev, pager, next" v-model:current-page="pageObj.current"
            v-model:page-size="pageObj.size" :total="pageObj.total" />
    </div>
</template>

<script setup lang='ts'>
import type { Ref } from 'vue'
import { getDataListByOrg } from '@/api/data'
import { useTableIndex, useFormatTime } from '@/hooks'
const { t } = useI18n()
const tableData: Ref<{}[]> = ref([])
const router = useRouter()

const current: Ref<number> = ref(1)
const size: Ref<number> = ref(10)
const props = defineProps({
    identityId: {
        type: String,
        default: ''
    }
})
const indexMethod = (index: number) => useTableIndex(index, pageObj.current, pageObj.size)

const pageObj = reactive({
    current: 1,
    size: 10,
    total: 0
})


const getTableData = async () => {
    const { code, data } = await getDataListByOrg({
        identityId: props.identityId,
        current: current.value,
        size: size.value
    })
    if (code === 10000) {
        tableData.value = data.items
        pageObj.total = data.total
    }
}

const linkToViewToken = (row: any) => {
    // TODO go dex
}
const linkToViewData = (row: any) => {
    router.push({
        name: 'dataOverview',
        query: {
            metaDataId: row.metaDataId,
        }
    })
}

onMounted(() => {
    getTableData()
})

</script>

<style scoped lang='scss'>
</style>