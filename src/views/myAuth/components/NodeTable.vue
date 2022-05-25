<template>
    <div class="my-60px com-main-data-wrap">
        <div class="text-20px font-bold text-color-[#333] flex">
            <p>{{ t('auth.nodeAuth') }}</p>
            <QuestionMark :content="$t('auth.authOrgHint')">
            </QuestionMark>
        </div>
        <el-table v-tableTooltip class="mt-20px" :data="tableData">
            <el-table-column type="index" width="80">
                <template #header>{{ t('common.num') }}</template>
            </el-table-column>
            <el-table-column :class-name="'show-ellipsis-tooltip'" prop="nodeName"
                :label="t('auth.networkName')" />
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
                    <el-space :size="20">
                        <span v-if="!row.isInWhitelist" class="font-medium  leading-20px link-btn"
                            @click="showAuth(row)">{{
                                    t('auth.auth')
                            }}</span>
                        <span v-else class="font-medium  leading-20px link-btn"
                            @click="showCancel(row)">{{
                                    t('auth.cancelAuth')
                            }}</span>
                    </el-space>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex my-50px justify-center">
            <el-pagination background v-model:current-page="pageObj.current"
                v-model:page-size="pageObj.size" layout="prev, pager, next"
                :total="pageObj.total" />
        </div>
        <el-dialog v-model="showDialog" :width="480" :destroy-on-close="true">
            <template #title>
                <div class="flex items-center mb-24px">
                    <img class="w-24px h-24px" src="@/assets/images/auth/sigh.png" alt="">
                    <p class="pl-8px"> {{ curTitle }}</p>
                </div>
            </template>
            <div v-if="dialogType === 'add'" class="ml-20px">
                <p v-if="locale === 'zh'">
                    确认授权节点 <span class="text-color-[#2B60E9]">{{ currentNode.nodeName }}</span>
                    加入白名单
                </p>
                <p v-else>
                    Please confirm that the authorized node <span class="text-color-[#2B60E9]">{{
                            currentNode.nodeName
                    }}</span> is a whitelist
                </p>
            </div>
            <div v-else class="ml-20px">
                <p v-if="locale === 'zh'">
                    确认取消节点 <span class="text-color-[#2B60E9]">{{ currentNode.nodeName }}</span>
                    的授权
                </p>
                <p v-else>
                    Please confirm and cancel the authorization of node <span
                        class="text-color-[#2B60E9]">{{
                                currentNode.nodeName
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
                        @click="authSubmit">{{ t('common.confirm') }}</el-button>
                </div>
            </template>
        </el-dialog>
        <GlobalPending :show="pending.show" :content="pending.content" :title="pending.title"
            @close-pending="pending.show = false" />
    </div>
</template>
<script setup lang="ts">
import { getUserOrgList } from '@/api/login'
import { useNotice, useInterval } from '@/hooks'

interface OrgNode {
    identityId: string
    identityIp: string
    identityPort: number
    isInWhitelist: boolean
    nodeName: string
    observerProxyWalletAddress: string
    publicFlag: number
    status: number
    updateAt: number
}


const chainCfg: any = inject('chainCfg')
const web3: any = inject('web3')
const { t, locale } = useI18n()

const tableData = ref([])
const currentNode = ref<OrgNode>({
    identityId: '',
    identityIp: '',
    identityPort: 0,
    isInWhitelist: false,
    nodeName: '',
    observerProxyWalletAddress: '',
    publicFlag: 0,
    status: 0,
    updateAt: 0
})
const dialogType = ref('add')
const showDialog = ref(false)
const curTitle = ref('')

const _close = (tx?: string) => {
    pending.show = false
}
const pageObj = reactive({
    total: 0,
    current: 1,
    size: 10
})

const pending = reactive({
    show: false,
    content: "",
    title: ""
})

watch(() => pageObj.current, () => {
    queryOrgList()
});

const authSubmit = () => {
    pending.show = true
    showDialog.value = false
    if (dialogType.value === 'add') {
        const content = `${t('auth.authorizeNode')}: ${currentNode.value?.nodeName}`
        pending.title = t('auth.confirmAuth')
        pending.content = content
        web3.authNode(currentNode.value?.observerProxyWalletAddress, chainCfg.value.metisPayAddress, _close)
            .then((res: any) => {
                if (res && res.transactionHash) {
                    useNotice('success', content, chainCfg.value?.blockExplorerUrl, res.transactionHash)
                }
            }).catch((error: any) => {
                useNotice('error', error)
                _close()
            })
    } else {
        const content = `${t('auth.cancelNodeAuth')}: ${currentNode.value?.nodeName}`
        pending.title = t('auth.confirmCancelAuth')
        pending.content = content
        web3.revokeNode(currentNode.value?.observerProxyWalletAddress, chainCfg.value.metisPayAddress, _close)
            .then((res: any) => {
                if (res && res.transactionHash) {
                    useNotice('success', '', chainCfg.value?.blockExplorerUrl, res.transactionHash)
                }
            }).catch((error: any) => {
                useNotice('error', error)
                _close()
            })
    }
}

const queryOrgList = (): void => {
    getUserOrgList().then(res => {
        const { data, code } = res
        if (code === 10000) {
            tableData.value = data
        }
    })
}

const showAuth = (row: OrgNode) => {
    dialogType.value = 'add'
    showDialog.value = true
    curTitle.value = t('auth.nodeAuth')
    currentNode.value = row
}

const showCancel = (row: OrgNode) => {
    dialogType.value = 'cancel'
    showDialog.value = true
    curTitle.value = t('auth.cancelNodeAuth')
    currentNode.value = row
}


useInterval(queryOrgList, 3000)

onMounted(() => {
    queryOrgList()
})

</script>
<style lang="scss">
:deep(.el-dialog__body) {
    padding: 0 32px;
}
</style>