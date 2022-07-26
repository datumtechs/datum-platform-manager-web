<template>
    <div class="p-30px">
        <p class="text-color-[#333] font-bold">{{ t('expert.configureOutput') }}</p>
        <!-- <p class="mt-30px">{{ t('expert.saveNotes') }}</p> -->
        <p class="mt-30px text-color-[#333] font-bold">{{ t('role.resultConsumer') }}</p>
        <el-checkbox-group v-model="checkList"
            :max="!isPrivacy ? 1 : curNodeId === 1001 ? selectList.length : orgList.length"
            :disabled="props.isSettingCompleted || props.isReadonly" class="mt-10px flex flex-col"
            @change="handleCheckboxChange">
            <el-checkbox v-for="(item, index) in curNodeId === 1001 ? selectList : orgList"
                :key="index" :label="item.identityId">
                <span class="checkbox-label text-main">{{ item.nodeName }}</span>
            </el-checkbox>
        </el-checkbox-group>
        <p class="mt-30px text-color-[#333] font-bold">{{ t('expert.storageForm') }}</p>
        <p class="mt-10px">{{ t('expert.plaintext') }}</p>
    </div>
</template>

<script setup lang='ts'>

import { useExpertMode } from '@/stores'
const { t } = useI18n()
const checkList: any = ref([])

// const workflowNodeSenderIdentityId: string = computed(() => useExpertMode().getWorkflowNodeSender)
const workflowNodeInputVoList: any = computed(() => useExpertMode().workflowNodeInputVoList)
const workflowNodeOutputVoList: any = computed(() => useExpertMode().workflowNodeOutputVoList)
const isPrivacy = computed(() => useExpertMode().isPrivacy)

const selectList = computed(() => {
    const arr: any = []
    workflowNodeInputVoList.value.map((input: any) => {
        baseOrgList.value.map((baseOrg: any) => {
            if (input.identityId === baseOrg.identityId) {
                arr.push(baseOrg)
            }
        })
    })
    return arr
})

const orgList: any = computed(() => useExpertMode().getUserOrgList)
const baseOrgList: any = computed(() => useExpertMode().baseOrgList)
const curNodeId: any = computed(() => useExpertMode().getCurNodeId)

const props = defineProps({
    isSettingCompleted: {
        type: Boolean,
        default: false
    },
    isReadonly: {
        type: Boolean,
        default: false
    }
})

watch(() => orgList.value, () => {
    // 回显时候的监听
    initData()
})

const initData = () => {
    const list: any = workflowNodeOutputVoList.value
    if (list.length > 0) checkValue(list)
}

const checkValue = (list: any) => {
    orgList.value.map((item: any) => {
        if (list.includes(item.identityId)) {
            checkList.value.push(item.identityId)
        }
    })
    useExpertMode().setOutputVoList(checkList.value)
}
const handleCheckboxChange = () => {
    useExpertMode().setOutputVoList(checkList.value)
}

</script>
<style scoped lang='scss'>
</style>