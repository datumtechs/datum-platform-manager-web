<template>
    <div class="p-30px">
        <p class="text-color-[#333] font-bold">{{ t('expert.configureOutput') }}</p>
        <p class="mt-30px">{{ t('expert.saveNotes') }}</p>
        <div v-if="workflowNodeSenderIdentityId">
            <p class="mt-30px text-color-[#333] font-bold">{{ t('role.resultConsumer') }}</p>
            <el-checkbox-group v-model="checkList" :disabled="viewModel === 'view'"
                class="mt-10px flex flex-col" @change="handleCheckboxChange">
                <el-checkbox v-for="(item, index) in orgList" :key="index" :label="item.identityId"
                    :disabled="item.identityId === workflowNodeSenderIdentityId">
                    <span class="checkbox-label text-main">{{ item.nodeName }}</span>
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <p class="mt-30px text-color-[#333] font-bold">{{ t('expert.storageForm') }}</p>
        <p class="mt-10px">{{ t('expert.plaintext') }}</p>
    </div>
</template>

<script setup lang='ts'>

import { useExpertMode } from '@/stores'
const { t } = useI18n()
const viewModel = ''
const checkList: any = ref([])

const workflowNodeSenderIdentityId = computed(() => useExpertMode().getWorkflowNodeSender)
const workflowNodeOutputVoList = computed(() => useExpertMode().workflowNodeOutputVoList)

const orgList: any = computed(() => useExpertMode().getUserOrgList)

watch(() => workflowNodeSenderIdentityId.value, (newV, oldV) => {
    console.log('触发了watch,oldV:', oldV);
    initData(oldV);
})

const initData = (id?: string) => {
    checkList.value = []
    const list = Array.from(new Set(workflowNodeOutputVoList.value.map((item: any) => item.identityId)))
    if (!list.includes(workflowNodeSenderIdentityId.value)) {
        list.push(workflowNodeSenderIdentityId.value)
    }
    if (id) {
        list.splice(list.findIndex((item: any) => item === id), 1)
    }
    return checkValue(list)
    // orgList.value.map((item: any) => {
    //     if (item.identityId === workflowNodeSenderIdentityId.value) {
    //         checkList.value.push(item.identityId)
    //     }
    // })
}
const checkValue = (list: any) => {
    orgList.value.map((item: any) => {
        if (list.includes(item.identityId)) {
            console.log('存在identityId', item.identityId);
            checkList.value.push(item.identityId)
        }
    })
    useExpertMode().setOutputVoList(checkList.value)
}
const handleCheckboxChange = () => {
    useExpertMode().setOutputVoList(checkList.value)
}

onMounted(() => {
    console.log('重新渲染了output');
    initData();
})
</script>
<style scoped lang='scss'>
</style>