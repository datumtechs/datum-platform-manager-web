<template>
    <div class="my-60px com-main-data-wrap">
        <div class="text-20px font-bold text-color-[#333] flex">
            <p>{{ t('auth.nodeAuth') }}</p>
            <!-- <el-tooltip content="" placement="right" effect="light">
                <img class="w-20px h-20px ml-10px cursor-pointer"
                    src="@/assets/images/task/quest@2x.png" alt="">
            </el-tooltip> -->
            <QuestionMark :content="''">
            </QuestionMark>
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
                <template #default="{ row }">
                    <el-button type="text" circle @click="showAuth(row)">{{ t('auth.auth') }}
                    </el-button>
                    <el-button type="text" circle @click="showCancel(row)">{{
                        t('auth.cancelAuth')
                    }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="showDialog" :width="480" :destroy-on-close="true">
            <template #title>
                <div class="flex items-center mb-24px">
                    <img class="w-24px h-24px" src="@/assets/images/auth/sigh.png" alt="">
                    <p class="pl-8px"> {{ curTitle }}</p>
                </div>
            </template>
            <div v-if="dialogType === 'add'" class="ml-20px">
                <p v-if="locale === 'zh'">
                    请确认, 授权节点 <span class="text-color-[#2B60E9]">{{ currentNode }}</span> 为白名单
                </p>
                <p v-else>
                    Please confirm that the authorized node <span class="text-color-[#2B60E9]">{{
                        currentNode
                    }}</span> is a whitelist
                </p>
            </div>
            <div v-else class="ml-20px">
                <p v-if="locale === 'zh'">
                    请确认, 取消节点 <span class="text-color-[#2B60E9]">{{ currentNode }}</span> 的授权
                </p>
                <p v-else>
                    Please confirm and cancel the authorization of node <span
                        class="text-color-[#2B60E9]">{{
                            currentNode
                        }}</span>
                </p>
            </div>
            <template #footer>
                <div>
                    <el-button class="w-100px" style="height: 32px;" round
                        @click="showDialog = false">{{
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
const currentNode = ref('')
const dialogType = ref('add')
const showDialog = ref(false)
const curTitle = ref('')

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

const showAuth = (row: any) => {
    dialogType.value = 'add'
    showDialog.value = true
    curTitle.value = t('auth.nodeAuth')
    currentNode.value = row.nodeName

}

const showCancel = (row: any) => {
    dialogType.value = 'cancel'
    showDialog.value = true
    curTitle.value = t('auth.cancelNodeAuth')
    currentNode.value = row.nodeName

}

onMounted(() => {
    queryOrgList()
})


</script>
<style lang="scss">
:deep(.el-dialog__body) {
    padding: 0 32px;
}
</style>