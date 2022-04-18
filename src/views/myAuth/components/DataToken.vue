<template>
    <div class="mb-50px">
        <div class="text-20px font-bold text-color-[#333] flex">
            <p>{{ props.title }}</p>
            <!-- <el-tooltip :content="props.titleContent" placement="right" effect="light">
                <img class="w-20px h-20px ml-10px cursor-pointer"
                    src="@/assets/images/task/quest@2x.png" alt="">
            </el-tooltip> -->
            <QuestionMark :content="props.titleContent">
            </QuestionMark>
        </div>
        <el-table class="mt-20px" :data="props.tableData">
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
                    <p v-if="row.tokenBalance">{{ row.tokenBalance }}</p>
                    <p v-else>0</p>
                </template>
            </el-table-column>
            <el-table-column prop="authorizeBalance" :label="t('auth.authQuantity')">
                <template #default="{ row }">
                    <p v-if="row.authorizeBalance">{{ row.authorizeBalance }}</p>
                    <p v-else>0</p>
                </template>
            </el-table-column>
            <el-table-column :label="t('common.actions')">
                <template #default="{ row }">
                    <el-button class="text-14px text-color-[#0052D9] cursor-pointer" type="text"
                        circle @click="showAuthDialog = true; currentToken = row.tokenName">{{
                            t('auth.auth')
                        }}</el-button>
                    <el-button class="text-14px text-color-[#0052D9] cursor-pointer" type="text"
                        circle @click="showCancelDialog = true; currentToken = row.tokenName">{{
                            t('auth.cancelAuth')
                        }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="props.type === 'data'">
            <!-- <el-pagination background layout="prev, pager, next"
                v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                :total="pageObj.total" /> -->
        </div>
        <el-dialog v-model="showAuthDialog" :title="t('auth.plzInputAuthTokenNumber')" :width="480"
            :destroy-on-close="true">
            <el-form :model="form" :label-width="80" label-position="top" :rules="rules"
                :ref="(e: any) => formRef = e">
                <el-form-item :label="currentToken" prop="quantity">
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
                        @click="authSumbit">{{ t('common.confirm') }}</el-button>
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
                        currentToken
                    }}</span>
                    &nbsp;的授权数量重置为0.
                </p>
                <p class="pl-32px break-word" v-else> Reset the authorized quantity of <span
                        class="text-color-[#2B60E9]">{{
                            currentToken
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
const { t, locale } = useI18n()
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
    }
})
const form = ref({
    quantity: undefined
})

const currentToken = ref('')

const formRef = ref()
const cancelConfirm = () => { }
const authSumbit = () => {
    formRef.value?.validate((bol: boolean) => {
        if (bol) {
            console.log(form.value)
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
    padding: 0 32px;
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