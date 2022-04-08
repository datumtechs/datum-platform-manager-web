<script lang="ts" setup>
import { queryDataList } from '@/api/data'
import { useTableIndex } from '@/hooks'
const { locale } = useI18n()
const total = ref(0)
const router = useRouter()
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

const indexMethod = (index: number) => useTableIndex(index, pageParams.current, pageParams.size)

const tableData = ref([])
const purchase = (row: any) => {

}
const linkToViewData = (row: any) => {
    router.push({
        name: 'marketDataOverview'
    })
}
const linkToViewToken = (row: any) => {
    //TODO dex

}

const queryTableData = async () => {
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
    if (code === 10000) {
        console.log(data);
        tableData.value = data.items
        total.value = data.total
    }
}

onMounted(() => {
    queryTableData()
})

</script>
<template>
    <div class="flex-1 task-wrap">
        <Banner :bg-index="'arrow'">
            <template #briefInfo>
                <p v-if="locale === 'zh'">全网共 {{ total }} 可参与隐私计算的有效数据</p>
                <p v-else>{{ total }} participant data in the privacy computing network</p>
            </template>
            <!-- <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
            </template>-->
        </Banner>
        <div class="mt-30px max-w-1200px px-25px mx-auto">
            <el-table
                :header-cell-style="{ height: '50px' }"
                :row-style="{ height: '70px' }"
                :data="tableData"
                highlight-current-row
                style="width: 100%"
            >
                <el-table-column
                    type="index"
                    :label="$t('common.num')"
                    :index="indexMethod"
                    width="80"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="metaDataName"
                    :label="$t('myData.dataName')"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="identityId"
                    :label="$t('myData.dataProvider')"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="tokenName"
                    :label="$t('myData.credentialName')"
                />
                <el-table-column prop="tokenPrice" :label="$t('common.credentialPrice')" />
                <el-table-column :label="$t('common.actions')" width="280">
                    <template #default="{ row }">
                        <el-space :size="20">
                            <span
                                class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="purchase(row)"
                            >{{ $t('common.purchase') }}</span>
                            <span
                                class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="linkToViewData(row)"
                            >{{ $t('myData.viewData') }}</span>
                            <span
                                class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="linkToViewToken(row)"
                            >{{ $t('myData.viewCredential') }}</span>
                        </el-space>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex my-50px justify-center">
            <el-pagination background layout="prev, pager, next" :total="total" />
        </div>
    </div>
</template>
