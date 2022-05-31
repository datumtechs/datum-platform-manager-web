<template>
    <div class="p-30px">
        <p class="text-color-[#333] font-bold">{{ t('expert.configureOutput') }}</p>
        <p class="mt-30px">{{ t('expert.saveNotes') }}</p>
        <div v-if="workflowNodeSenderIdentityId">
            <p class="mt-30px text-color-[#333] font-bold">{{ t('role.resultConsumer') }}</p>
            <el-checkbox-group v-model="checkList"
                :disabled="props.isSettingCompleted || props.isReadonly"
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
const checkList: any = ref([])

const workflowNodeSenderIdentityId = computed(() => useExpertMode().getWorkflowNodeSender)
const workflowNodeOutputVoList = computed(() => useExpertMode().workflowNodeOutputVoList)

const orgList: any = computed(() => useExpertMode().getUserOrgList)
const curNodeId: any = computed(() => useExpertMode().getCurNodeId)
const nodeList: any = computed(() => useExpertMode().getNodeList)


const isDisabled = (item: any): boolean => {
    if (curNodeId.value === 1001) {
        if (nodeList.value[0].nodeInput.dataInputList.length > 0) {
            const ids = nodeList.value[0].nodeInput.dataInputList.filter((d: any) => {
                console.log(d);
                return d.identityId
            })
            return ids.includes(item.identity)
        }
        return false
    } else {
        return item.identityId === workflowNodeSenderIdentityId.value
    }
}

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

watch(() => workflowNodeSenderIdentityId.value, (newV, oldV) => {
    if (curNodeId.value !== 1001) {
        // 硬编码判断当前节点是否psi 从而判断当前模式是否PSI
        initData(oldV);
    } else {
        initPsiData()
    }
})

const initPsiData = () => {

}

watch(orgList, () => {
    initData()
})

const initData = (id?: string) => {
    checkList.value = []
    const list: any = workflowNodeOutputVoList.value //Array.from(new Set(workflowNodeOutputVoList.value.map((item: any) => item.identityId)))
    if (!list.includes(workflowNodeSenderIdentityId.value)) {
        list.push(workflowNodeSenderIdentityId.value)
    }
    if (id) {
        list.splice(list.findIndex((item: any) => item === id), 1)
    }
    return checkValue(list)
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