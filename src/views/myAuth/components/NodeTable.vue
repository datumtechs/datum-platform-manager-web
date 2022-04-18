<template>
    <div class="my-60px com-main-data-wrap">
        <div class="text-20px font-bold text-color-[#333] flex">
            <p>{{ t('auth.nodeAuth') }}</p>
            <el-tooltip content="" placement="right" effect="light">
                <img class="w-20px h-20px ml-10px cursor-pointer"
                    src="@/assets/images/task/quest@2x.png" alt="">
            </el-tooltip>

        </div>
        <el-table class="mt-20px" :data="tableData">
            <el-table-column type="index" width="80">
                <template #header>{{ t('common.num') }}</template>
            </el-table-column>
            <el-table-column prop="nodeName" :label="t('auth.networkName')" />
            <el-table-column prop="identityIp" :label="t('auth.networkIP')" />
            <el-table-column prop="identityPort" :label="t('node.nodePort')" />
            <el-table-column :label="t('auth.authStatus')">
                <template #default="{ row }">
                    <p v-if="row.isInWhitelist">{{ t('auth.authorized') }}</p>
                    <p v-else>{{ t('auth.unauthorized') }}</p>
                </template>
            </el-table-column>
            <el-table-column :label="t('common.actions')">
                <template #default="scope">
                    <el-button type="text" circle @click="authConFirm">{{ t('auth.auth') }}
                    </el-button>
                    <el-button type="text" circle @click="cancelSubmit">{{ t('auth.cancelAuth') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="showAuthDialog" :title="t('auth.plzInputAuthTokenNumber')" :width="480"
            :destroy-on-close="true">
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
                <p class="pl-32px break-word" v-if="locale === 'zh'"> 将取消&nbsp;{{
                    currentToken
                }}&nbsp;的授权,授权数量将会变更为0.
                </p>
                <p class="pl-32px break-word" v-else> The authorization of {{
                    currentToken
                }}
                    will be
                    cancelled, and the number of authorizations will be changed to 0.</p>
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
<script setup lang="ts">
import { getUserOrgList } from '@/api/login'
const { t, locale } = useI18n()
const tableData = ref([])
const currentToken = ref('')
const showAuthDialog = ref(false)
const showCancelDialog = ref(false)

const cancelConfirm = () => {

}

const authSubmit = () => {

}

const queryOrgList = () => {
    getUserOrgList().then(res => {
        const { data, code } = res
        if (code === 10000) {
            console.log(data)
            tableData.value = data
        }
    })
}
const cancelSubmit = () => {
}

const authConFirm = () => {
}
onMounted(() => {
    queryOrgList()
})


</script>
<style lang="scss">
</style>