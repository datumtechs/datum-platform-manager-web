<script lang="ts" setup>
import { queryDataList } from '@/api/data'
import { useTableIndex } from '@/hooks'
const { t, locale } = useI18n()
const total = ref(0)
const router = useRouter()

const chainCfg: any = inject('chainCfg')


interface PageParams {
    current: number,
    size: number,
    fileType?: string,
    industry?: string,
    keyword?: string,
    maxSize?: string,
    minSize?: string,
    orderBy?: string,
}
const pageParams: PageParams = reactive({
    current: 1,
    size: 10,
    fileType: 'CSV',
    industry: '',
    keyword: '',
    maxSize: '',
    minSize: '',
    orderBy: 'PUBLISHED',
})

const pageObj = reactive({
    total: 0,
    current: 1,
    size: 10
})

const marketLoading = ref(false)

const indexMethod = (index: number) => useTableIndex(index, pageParams.current, pageParams.size)

const tableData = ref([])
const purchase = (row: any) => {
    let dexUrl = `${chainCfg.value.dexUrl}swap?outputCurrency=${row.tokenAddress}&exactField=OUTPUT&exactAmount=1`
    //TODO dex
    window.open(dexUrl, "_blank");
}
const linkToViewData = (row: any) => {
    router.push({
        path: '/marketplace/dataOverview',
        query: {
            metaDataId: row.metaDataId,
            dataName: row.metaDataName
        }
    })
}

const queryTableData = async () => {
    marketLoading.value = true
    const { code, data } = await queryDataList({
        current: pageParams.current,
        size: pageParams.size,
        fileType: pageParams.fileType,
        industry: pageParams.industry,
        keyword: pageParams.keyword,
        maxSize: pageParams.maxSize,
        minSize: pageParams.minSize,
        orderBy: pageParams.orderBy,
    })
    marketLoading.value = false
    if (code === 10000) {
        tableData.value = data.items
        total.value = data.total
    }
}
watch(() => pageObj.current, () => {
    queryTableData()
});
onMounted(() => {
    queryTableData()
})

</script>
<template>
    <div class="flex-1 task-wrap">
        <Banner :bg-name="'market'">
            <template #briefInfo>
                <p v-if="locale === 'zh'">全网共 {{ total }} 可参与隐私计算的有效数据</p>
                <p v-else>{{ total }} participant data in the privacy computing network</p>
            </template>
            <!-- <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
            </template>-->
        </Banner>
        <div class="main-content mt-30px max-w-1200px mx-auto overflow-hidden">
            <el-table v-loading="marketLoading" :header-cell-style="{ height: '50px' }"
                :row-style="{ height: '70px' }" :data="tableData" highlight-current-row
                style="width: 100%">
                <el-table-column type="index" :label="t('common.num')" :index="indexMethod"
                    width="80" />
                <el-table-column show-overflow-tooltip prop="metaDataName"
                    :label="t('myData.dataName')" />
                <el-table-column show-overflow-tooltip prop="identityId"
                    :label="t('myData.dataProvider')" />
                <el-table-column show-overflow-tooltip prop="tokenName"
                    :label="t('myData.credentialName')" />
                <el-table-column prop="tokenPrice" :label="t('common.credentialPrice')">
                    <template #default="{ row }">
                        <div>{{ row.tokenPrice }} LAT</div>
                    </template>
                </el-table-column>
                <el-table-column :label="t('common.actions')" width="200">
                    <template #default="{ row }">
                        <el-space :size="20">
                            <span class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="purchase(row)">{{ t('common.purchase') }}</span>
                            <span class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="linkToViewData(row)">{{ t('myData.viewData') }}</span>
                            <!-- <span class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="linkToViewToken(row)">{{
                                        t('myData.viewCredential')
                                }}</span> -->
                        </el-space>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex my-50px justify-center">
            <el-pagination background v-model:current-page="pageObj.current"
                v-model:page-size="pageObj.size" layout="prev, pager, next"
                :total="pageObj.total" />
        </div>
    </div>
</template>

<style scoped lang='scss'>
</style>
