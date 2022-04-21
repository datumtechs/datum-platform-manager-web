<template>
    <div class="mb-50px">
        <div class="text-20px font-bold text-color-[#333] flex">
            <p>{{ props.title }}</p>
            <QuestionMark :content="props.titleContent">
            </QuestionMark>
        </div>
        <el-table v-loading="props.loading" class="mt-20px" :data="props.tableData">
            <el-table-column type="index" width="100">
                <template #header>{{ t('common.num') }}</template>
            </el-table-column>
            <el-table-column prop="tokenName" :label="t('myData.credentialName')" />
            <el-table-column prop="tokenSymbol" :label="t('myData.credentialSymbol')" />
            <el-table-column :label="t('myData.dataName')">
                <template #default="{ row }">
                    <p v-if="row.metaDataName">{{ row.metaDataName }}</p>
                    <p v-else>-</p>
                </template>
            </el-table-column>
            <el-table-column :label="t('auth.holdQuantity')">
                <template #default="{ row }">
                    <p v-if="row.tokenBalance">{{
                        useExchangeFrom(row.tokenBalance, row.tokenDecimal)
                    }}</p>
                    <p v-else>0</p>
                </template>
            </el-table-column>
            <el-table-column prop="authorizeBalance" :label="t('auth.authQuantity')">
                <template #default="{ row }">
                    <p v-if="row.authorizeBalance">{{
                        useExchangeFrom(row.authorizeBalance,
                            row.tokenDecimal)
                    }}</p>
                    <p v-else>0</p>
                </template>
            </el-table-column>
            <el-table-column :label="t('common.actions')">
                <template #default="{ row }">
                    <el-button class="text-14px text-color-[#0052D9] cursor-pointer" type="text"
                        circle
                        @click="showAuthDialog = true; currentToken = row; form.quantity = useExchangeFrom(row.tokenBalance, row.tokenDecimal)">
                        {{
                            t('auth.auth')
                        }}</el-button>
                    <!-- <el-button class="text-14px text-color-[#0052D9] cursor-pointer" type="text"
                        circle @click="showCancelDialog = true; currentToken = row">{{
                            t('auth.cancelAuth')
                        }}
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div v-if="props.type === 'data'">
            <!-- <el-pagination background layout="prev, pager, next"
                v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                :total="pageObj.total" /> -->
        </div>
        <el-dialog v-model="showAuthDialog" :width="480" :destroy-on-close="true">
            <template #title>
                <div class="flex items-center mb-24px">
                    <img class="w-24px h-24px" src="@/assets/images/auth/sigh.png" alt="">
                    <p class="pl-8px"> {{ t('auth.plzInputAuthTokenNumber') }}</p>
                </div>
            </template>
            <el-form :model="form" :label-width="80" label-position="top" :rules="rules"
                :ref="(e: any) => formRef = e">
                <el-form-item :label="currentToken.tokenName" prop="quantity">
                    <el-input v-model="form.quantity" maxlength="20" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button class="w-100px" style="height: 32px;" round
                        @click="showAuthDialog = false">{{
                            t('common.cancel')
                        }}</el-button>
                    <el-button class="w-100px" style="height: 32px;" round type="primary"
                        @click="authSubmit">{{ t('common.confirm') }}</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="showCancelDialog" :title="t('auth.cancelTokenAuth')" :width="480"
            :destroy-on-close="true">
            <template #title>
                <div class="flex items-center mb-24px">
                    <img class="w-24px h-24px" src="@/assets/images/auth/sigh.png" alt="">
                    <p class="pl-8px"> {{ t('auth.cancelTokenAuth') }}</p>
                </div>
            </template>
            <div class="flex items-center mb-24px">
                <p class="pl-32px break-word" v-if="locale === 'zh'"> 将&nbsp;
                    <span class="text-color-[#2B60E9]">{{
                        currentToken.tokenName
                    }}</span>
                    &nbsp;的授权数量重置为0.
                </p>
                <p class="pl-32px break-word" v-else> Reset the authorized quantity of <span
                        class="text-color-[#2B60E9]">{{
                            currentToken.tokenName
                        }}</span>
                    to 0.</p>
            </div>
            <template #footer>
                <div>
                    <el-button class="w-100px" style="height: 32px;" round
                        @click="showCancelDialog = false">{{
                            t('common.cancel')
                        }}</el-button>
                    <el-button class="w-100px" style="height: 32px;" round type="primary"
                        @click="cancelConfirm">{{ t('common.confirm') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { useExchangeFrom, useExchangeTo, useNotice } from '@/hooks'
const { t, locale } = useI18n()
const chainConfig: any = inject('chainConfig')
const web3: any = inject('web3')

interface token {
    authorizeBalance: string
    tokenAddress: string
    tokenBalance: string
    tokenDecimal: number
    tokenName: string
    tokenSymbol: string
}

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    titleContent: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'data'
    },
    tableData: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})


const authLoading = ref(true)
const cancelLoading = ref(false)

const form = reactive({
    quantity: 0
})

const currentToken = ref<token>()
const formRef = ref()
const _closeAuthDialog = (tx: string) => {
    console.log('txHash', tx);
    showAuthDialog.value = false
    authLoading.value = false
}

const cancelConfirm = () => {
    web3.authERC20TOKEN(currentToken.value?.tokenAddress, 0)
        .then((res: any) => {
            if (res && res.transactionHash) {
                const content = `${t('auth.cancelAuth')}: ${currentToken.value?.tokenName}`
                useNotice('success', content, chainConfig.value?.blockExplorerUrl, res.transactionHash)
            }
        }).catch((error: any) => {
            useNotice('error', error)
        })
}
const authSubmit = () => {
    formRef.value?.validate((bol: boolean) => {
        authLoading.value = true
        if (bol) {
            const unit = useExchangeTo(form.quantity, currentToken.value?.tokenDecimal)
            web3.authERC20TOKEN(
                currentToken.value?.tokenAddress,
                unit,
                _closeAuthDialog)
                .then((res: any) => {
                    const content = `${t('auth.auth')} ${form.quantity} ${currentToken.value?.tokenName}`
                    useNotice('success', content, chainConfig.value?.blockExplorerUrl, res.transactionHash)
                }).catch((error: any) => {
                    useNotice('error', error)
                })
        }
    })
}
const showAuthDialog = ref(false)
const showCancelDialog = ref(false)
const rules = ref(
    {
        quantity: [
            {
                required: true,
                validator: ({ }, value: any, callback: any) => {
                    if (!value) {
                        callback(new Error(t('auth.quantityError')))
                    } else {
                        /** TODO input overflow */
                        callback()
                    }
                },
                trigger: 'blur'
            }
        ]
    }
)
</script>

<style scoped lang='scss'>
:deep(.el-dialog__body) {
    padding: 0 32px !important;
}

:deep(.el-dialog__header) {
    .el-dialog__title {
        color: #000000;
        font-size: 16px;
        font-family: DINPro-Medium, Ali-Medium;
        line-height: 24px;
    }

    height:72px;
    padding: 28px 32px 20px;
}
</style>