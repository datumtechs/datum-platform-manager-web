<template>
    <el-dialog custom-class="tokenDialog" append-to-body v-model="showDialog" :title="props.title"
        :width="'1001px'" @close="emits('update:showDialog', false)">
        <div class="token-table-box mb-40px">
            <p class="token-table-box-title font-bold">{{ $t('common.noAttributeCredential') }}</p>
            <el-table v-loading="ftLoading" :data="nfTokenData">
                <el-table-column type="index" width="80" :label="$t('common.num')">
                </el-table-column>
                <el-table-column prop="tokenName" :label="$t('myData.credentialName')">
                </el-table-column>
                <el-table-column prop="tokenSymbol" :label="$t('myData.credentialSymbol')">
                </el-table-column>
                <el-table-column v-if="type !== 'common'" :label="$t('myData.tokenBalance')">
                    <template #default="{ row }">
                        <p>{{ useExchangeFrom(row.tokenBalance,
                                row.tokenDecimal) + ' ' + row.tokenSymbol
                        }}</p>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('myData.taskConsumption')">
                    <template #header>
                        <div class="flex">
                            <p>{{ $t('myData.taskConsumption') }}</p>
                            <QuestionMark :content="$t('workflow.costPerTask')" />
                        </div>
                    </template>
                    <template #default="{ row }">
                        <div>
                            <p v-if="row.erc20PtAlgConsume">
                                <span class="pr-8px">{{ $t('common.nonPrivacy') }}:</span>
                                <span class="noWrap">{{ useExchangeFrom(row.erc20PtAlgConsume,
                                        row.tokenDecimal) + ' ' + `${row.tokenSymbol}`
                                }}</span>
                            </p>
                            <p v-if="row.erc20CtAlgConsume">
                                <span class="pr-8px">{{ $t('common.privacy') }}:</span>
                                <span class="noWrap">{{ useExchangeFrom(row.erc20CtAlgConsume,
                                        row.tokenDecimal) + ' ' + `${row.tokenSymbol}`
                                }}</span>
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('common.actions')">
                    <template #default="{ row }">
                        <span class="font-medium  leading-20px link-btn" @click="purchaseFT(row)">{{
                                $t('common.purchase')
                        }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="token-table-box mb-20px">
            <p class="token-table-box-title font-bold">{{ $t('common.attributeCredential') }}</p>
            <el-table v-loading="nftLoading" :data="nftTokenData">
                <el-table-column type="index" width="80" :label="$t('common.num')">
                </el-table-column>
                <el-table-column prop="tokenName" :label="$t('myData.credentialName')">
                </el-table-column>
                <el-table-column :label="$t('common.credentialId')">
                    <template #default="{ row }">
                        <div>
                            {{ `# ${row.tokenId}` }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('common.period')">
                    <template #default="{ row }">
                        <div>
                            {{ useFormatTime(+row.characteristic) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('myData.useScene')">
                    <template #default="{ row }">
                        <span v-if="row.isSupportPtAlg">{{ $t('common.nonPrivacy') }}</span>
                        <span v-else>{{ $t('common.privacy') }}</span>
                    </template>
                </el-table-column>
                <el-table-column v-if="type === 'common'" :label="$t('common.actions')">
                    <template #default="{ row }">
                        <el-popover placement="top" :title="$t('myData.selectExchange')"
                            :width="100" trigger="hover">
                            <img class="w-39px h-39px cursor-pointer" :src="tofun" alt=""
                                @click="linkToExchange(row)">
                            <template #reference>
                                <span class="font-medium  leading-20px link-btn">{{
                                        $t('common.purchase')
                                }}</span>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex mt-30px justify-center">
                <el-pagination v-model:current-page="pageObj.current"
                    @current-change="handlePageChange" v-model:page-size="pageObj.size" background
                    layout="prev, pager, next" :total="pageObj.total" />
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang='ts'>
import { getUserNoAttributeCredential, getUserAttributeCredentialList, getNoAttributeCredential, getAttributeCredential } from '@/api/data'
import { useFormatTime, useExchangeFrom } from '@/hooks'
import tofun from '@/assets/images/market/tofun.png'
const chainCfg: any = inject('chainCfg')
const { t } = useI18n()
const props = defineProps({
    showDialog: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'common'
    }
})

const emits = defineEmits(['update:showDialog'])

const nfTokenData: any = ref([])
const nftTokenData: any = ref([])

const ftLoading = ref(false)
const nftLoading = ref(false)

const pageObj = reactive({
    current: 1,
    size: 5,
    total: 0
})

const handlePageChange = (page: number) => {
    pageObj.current = page
    queryNFT()
}

const purchaseFT = (row: any) => {
    //TODO 校验合约地址
    const dexUrl = `${chainCfg.value.dexUrl}swap?outputCurrency=${row.tokenAddress}&exactField=OUTPUT&exactAmount=1`
    window.open(dexUrl, "_blank");
}

const linkToExchange = (row: any) => {
    //TODO 校验合约地址
    const dexUrl = `${chainCfg.value.tofunftUrl}/nft/platon/${row.tokenAddress}` //swap?outputCurrency=${row.tokenAddress}&exactField=OUTPUT&exactAmount=1`
    window.open(dexUrl, "_blank");
}

const queryFT = async () => {
    ftLoading.value = true
    let fn = props.type === 'common' ? getNoAttributeCredential : getUserNoAttributeCredential
    try {
        const { code, data } = await fn({ metaDataId: props.id })
        ftLoading.value = false
        if (code === 10000) {
            nfTokenData.value = [data]
        }
    } catch (error) {
        ftLoading.value = false
    }
}

const queryNFT = async () => {
    nftLoading.value = true
    let fn = props.type === 'common' ? getAttributeCredential : getUserAttributeCredentialList
    try {
        const { code, data } = await fn({ metaDataId: props.id, size: pageObj.size, current: pageObj.current })
        nftLoading.value = false
        if (code === 10000) {
            nftTokenData.value = data.items
            pageObj.total = data.total
        }
    } catch (error) {
        nftLoading.value = false
    }
}


onMounted(() => {
    queryFT()
    queryNFT()
})


</script>

<style scoped lang='scss'>
.token-table-box {
    .token-table-box-title {
        font-size: 16px;
        margin-bottom: 18px;
        color: #000;
    }
}
</style>