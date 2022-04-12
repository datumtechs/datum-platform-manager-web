<template>
    <div class="my-57px com-main-data-wrap">
        <el-table :data="tableData">
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
                    <el-button
                        type="text"
                        circle
                        @click="dialogFormVisible = true"
                    >{{ $t('auth.auth') }}</el-button>
                    <el-button type="text" circle @click="auth">{{ $t('auth.cancelAuth') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            v-model="dialogFormVisible"
            :width="480"
            :title="`${$t('task.pleaseEnter')}${$t('auth.authQuantity')}`"
            :destroy-on-close="true"
        >
            <el-form
                :model="form"
                :label-width="80"
                label-position="top"
                :rules="rules"
                :ref="(e: any) => formRef = e"
            >
                <el-form-item :label="'TOKEN'" prop="quantity">
                    <el-input v-model="form.quantity" maxlength="20" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button
                        class="w-100px"
                        style="height: 40px;"
                        round
                        @click="dialogFormVisible = false"
                    >{{ $t('common.cancel') }}</el-button>
                    <el-button
                        class="w-100px"
                        style="height: 40px;"
                        round
                        type="primary"
                        @click="submit"
                    >{{ $t('common.submit') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { getUserOrgList } from '@/api/login'
import { ElMessageBox, ElMessage } from 'element-plus'
const { t } = useI18n()
const dialogFormVisible = ref(false)
const tableData = ref([])
const form = ref({
    quantity: undefined
})
const formRef = ref()
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
const query = () => {
    getUserOrgList().then(res => {
        const { data, code } = res
        if (code === 10000) {
            console.log(data)
            tableData.value = data
        }
    })
}
const submit = () => {
    formRef.value?.validate((bol: boolean) => {
        if (bol) {
            console.log(form.value)
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