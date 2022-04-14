<template>
    <div class="mb-50px">
        <div class="text-20px font-bold text-color-[#333]">{{ props.title }}</div>
        <el-table class="mt-20px" :data="props.tableData">
            <el-table-column type="index" width="100">
                <template #header>{{ $t('common.num') }}</template>
            </el-table-column>
            <el-table-column prop="nodeName" :label="$t('myData.credentialName')" />
            <el-table-column prop="identityIp" :label="$t('myData.credentialSymbol')" />
            <el-table-column prop="identityPort" :label="$t('myData.dataName')" />
            <el-table-column prop="identityPort" :label="$t('auth.holdeQuantity')" />
            <el-table-column prop="identityPort" :label="$t('auth.authQuantity')" />
            <el-table-column :label="$t('common.actions')">
                <template #default="scope">
                    <el-button class="text-14px text-color-[#0052D9] cursor-pointer" type="text"
                        circle @click="showAuthDialog = true">{{
                            $t('auth.auth')
                        }}</el-button>
                    <el-button class="text-14px text-color-[#0052D9] cursor-pointer" type="text"
                        circle @click="showCancelDialog = true">{{
                            $t('auth.cancelAuth')
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
        <el-dialog v-model="showAuthDialog" :title="$t('auth.plzInputAuthTokenNumber')" :width="480"
            :destroy-on-close="true">
            <el-form :model="form" :label-width="80" label-position="left" :rules="rules"
                :ref="(e: any) => formRef = e">
                <el-form-item :label="'TOKEN'" prop="quantity">
                    <el-input v-model="form.quantity" maxlength="20" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button class="w-100px" style="height: 32px;" round
                        @click="showAuthDialog = false">{{
                            $t('common.cancel')
                        }}</el-button>
                    <el-button class="w-100px" style="height: 32px;" round type="primary"
                        @click="submit">{{ $t('common.confirm') }}</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="showCancelDialog" :title="$t('auth.cancelTokenAuth')" :width="480"
            :destroy-on-close="true">
            <template #title>
                <div class="flex items-center mb-24px">
                    <img class="w-24px h-24px" src="@/assets/images/auth/sigh.png" alt="">
                    <p class="pl-8px"> {{ $t('auth.cancelTokenAuth') }}</p>
                </div>
            </template>
            <div class="flex items-center mb-24px">
                <p class="pl-32px"> 确认后,将取消XXXTOKEN的授权,授权数量将会变更为0.</p>
            </div>
            <template #footer>
                <div>
                    <el-button class="w-100px" style="height: 32px;" round
                        @click="showCancelDialog = false">{{
                            $t('common.cancel')
                        }}</el-button>
                    <el-button class="w-100px" style="height: 32px;" round type="primary"
                        @click="submit">{{ $t('common.confirm') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
const { t } = useI18n()
const props = defineProps({
    title: {
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

const formRef = ref()
const cancel = () => { }
const submit = () => {
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
                        callback()
                    }
                },
                trigger: 'blur'
            }
        ]
    }
)
const emits = defineEmits({

})
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