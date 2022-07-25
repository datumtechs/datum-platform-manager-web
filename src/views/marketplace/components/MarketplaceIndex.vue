<script lang="ts" setup>
import { queryDataList } from '@/api/data'
import { useTableIndex, useSize } from '@/hooks'
import { useKeepAliveInfo } from '@/stores'
import { enums } from '@/utils/enum'

const keepAlive = useKeepAliveInfo()

const { t, locale } = useI18n()
// const total = ref(0)
const router = useRouter()
const route = useRoute()
const currentDataName = ref('')
const currentMetadataId = ref('')


const chainCfg: any = inject('chainCfg')


interface PageParams {
    current: number,
    size: number,
    total: number,
    fileType?: string,
    industry?: string,
    keyword?: string,
    maxSize?: string,
    minSize?: string,
    orderBy?: string,
}
const pageParams: PageParams = reactive({
    current: 1,
    total: 0,
    size: 10,
    fileType: 'CSV',
    industry: '',
    keyword: '',
    maxSize: '',
    minSize: '',
    orderBy: 'PUBLISHED',
})

// const pageObj = reactive({
//     total: 0,
//     current: 1,
//     size: 10
// })

const marketLoading = ref(false)
const showDialog = ref(false)

const sortList = ref([
    {
        id: 0,
        orderBy: 'PUBLISHED',
        label: 'myData.launchTime'
    },
    {
        id: 1,
        orderBy: 'TOKEN_NAME',
        label: 'myData.credentialName'
    },
    {
        id: 2,
        orderBy: 'TOKEN_PRICE_ASC',
        label: 'myData.priceAsc'
    },
    {
        id: 3,
        orderBy: 'TOKEN_PRICE_DESC',
        label: 'myData.priceDesc'
    }
])

const search = (str: string) => {
    pageParams.keyword = str
    queryTableData()
}

const indexMethod = (index: number) => useTableIndex(index, pageParams.current, pageParams.size)

const tableData = ref([])
const purchase = (row: any) => {
    // const dexUrl = `${chainCfg.value.dexUrl}swap?outputCurrency=${row.tokenAddress}&exactField=OUTPUT&exactAmount=1`
    //TODO dex
    // window.open(dexUrl, "_blank");
    currentDataName.value = row.metaDataName
    currentMetadataId.value = row.metaDataId
    showDialog.value = !showDialog.value
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

const setKeepAliveInfo = () => {
    const currentKeep = keepAlive.getCurrent[route.path] || ''
    const searchParams = keepAlive.getSearchParams[route.path] || ''
    if (currentKeep) pageParams.current = currentKeep
    pageParams.keyword = searchParams['keyword'] // 反选效果
    pageParams.orderBy = searchParams['orderBy'] || 'PUBLISHED'
}

const reset = () => {
    pageParams.current = 1
    pageParams.orderBy = 'PUBLISHED'
}


const queryTableData = async () => {
    marketLoading.value = true
    keepAlive.setCurrent(pageParams.current, route.path)
    keepAlive.setSearchParams(pageParams, route.path)
    try {
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
            pageParams.total = data.total
        }
    } catch (error) {
        marketLoading.value = false
    }
}

// watch(() => pageObj.current, () => {
//     queryTableData()
// });

const linkToNode = (row: any) => {
    router.push({
        path: `/nodes/details/${row.identityId}`,
    })
}

onMounted(() => {
    setKeepAliveInfo()
    queryTableData()
})

</script>
<template>
    <div class="flex-1 task-wrap">
        <Banner :bg-name="'market'">
            <template #briefInfo>
                <p v-if="locale === 'zh'">全网共 {{ pageParams.total }} 个可参与隐私计算的有效数据</p>
                <p v-else>{{ pageParams.total }} data available in the privacy computing network
                </p>
            </template>
        </Banner>
        <div class="main-content mt-30px max-w-1200px mx-auto overflow-hidden">
            <el-table v-tableTooltip v-loading="marketLoading"
                :header-cell-style="{ height: '50px' }" :row-style="{ height: '70px' }"
                :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" :label="t('common.num')" :index="indexMethod"
                    width="80" />
                <el-table-column :class-name="'show-ellipsis-tooltip'" prop="metaDataName"
                    :label="t('myData.dataName')" />
                <el-table-column :class-name="'show-ellipsis-tooltip'" prop="nodeName"
                    :label="t('myData.dataProvider')">
                    <template #default="{ row }">
                        <div class="flex">
                            <CertificationLabel :obj="row" />
                            <p class="w-120px ellipse cursor-pointer pl-10px"
                                @click="linkToNode(row)">{{
                                        row.nodeName
                                }}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column :class-name="'show-ellipsis-tooltip'"
                    :label="t('myData.dataSize')">
                    <template #default="{ row }">
                        <div>
                            {{ useSize(row.size) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :class-name="'show-ellipsis-tooltip'"
                    :label="t('myData.industryData')">
                    <template #default="{ row }">
                        <div>{{ $t(`${enums.industry[row.industry]}`) }}</div>
                    </template>
                </el-table-column>
                <el-table-column :class-name="'show-ellipsis-tooltip'"
                    :label="t('myData.useScene')">
                    <template #default="{ row }">
                        <div>
                            <el-space wrap :size="10"
                                :spacer="(row.isSupportPtAlg && row.isSupportCtAlg) ? '|' : ''">

                                <span>{{ row.isSupportPtAlg ? $t('common.nonPrivacy') :
                                        ''
                                }}</span>
                                <span>{{ row.isSupportCtAlg ? $t('common.privacy') : ''
                                }}</span>
                            </el-space>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="tokenPrice" :label="t('common.credentialPrice')">
                    <template #default="{ row }">
                        <div>{{ row.tokenPrice }} LAT</div>
                    </template>
                    <template #header>
                        <div class="flex items-center">
                            {{ t('common.credentialPrice') }}
                            <el-tooltip effect="light" placement="top">
                                <img class="w-16px h-16px ml-10px cursor-pointer"
                                    src="@/assets/images/task/quest@2x.png" alt="">
                                <template #content>
                                    {{ t('myData.credentialPriceTips') }}
                                </template>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column> -->
                <el-table-column :label="t('common.actions')" width="200">
                    <template #default="{ row }">
                        <el-space :size="20">
                            <span class="font-medium  leading-20px link-btn"
                                @click="purchase(row)">{{ t('common.purchase') }}</span>
                            <span class="font-medium  leading-20px link-btn"
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
            <el-pagination background v-model:current-page="pageParams.current"
                @current-change="queryTableData" v-model:page-size="pageParams.size"
                layout="prev, pager, next" :total="pageParams.total" />
        </div>
        <Search :keyword="pageParams.keyword" :placeholder="t('myData.marketPlaceholder')"
            @search="search" @reset="reset">
            <template #content>
                <p class="search-label mb-10px">
                    {{ t('node.sortBy') }}
                </p>
                <el-select class="w-full" size="large" v-model="pageParams.orderBy"
                    :teleported="false">
                    <el-option v-for="item in sortList" :key="item.id" :label="t(item.label)"
                        :value="item.orderBy" />
                </el-select>
                <!-- <p class="search-label mb-10px mt-20px">
                    {{ t('myData.industryData') }}
                </p>
                <el-select class="w-full" size="large" v-model="pageParams.orderBy">
                    <el-option v-for="item in sortList" :key="item.id" :label="t(item.label)"
                        :value="item.orderBy" />
                </el-select>
                <p class="search-label mb-10px mt-20px">
                    {{ t('myData.dataFormat') }}
                </p>
                <el-select class="w-full" size="large" v-model="pageParams.orderBy">
                    <el-option v-for="item in sortList" :key="item.id" :label="t(item.label)"
                        :value="item.orderBy" />
                </el-select> -->
            </template>
        </Search>
        <TokenList v-if="showDialog" :title="`${$t('common.buyCredential')} - ${currentDataName}`"
            :id="currentMetadataId" v-model:showDialog="showDialog" />
    </div>
</template>

<style scoped lang='scss'>
</style>
