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
                    :disabled="isDisabled(item)">
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
const workflowNodeInputVoList = computed(() => useExpertMode().getInputVoList)
const workflowNodeOutputVoList = computed(() => useExpertMode().workflowNodeOutputVoList)

const orgList: any = computed(() => useExpertMode().getUserOrgList)
const curNodeId: any = computed(() => useExpertMode().getCurNodeId)
const nodeList: any = computed(() => useExpertMode().getNodeList)


const isDisabled = (item: any): boolean => {
    if (curNodeId.value === 1001) {
        if (nodeList.value[0].nodeInput.dataInputList.length > 0) {
            const ids = nodeList.value[0].nodeInput.dataInputList.map((d: any) => d.identityId)
            return ids.includes(item.identityId)
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
        initData(oldV)
    }
})

watch(() => workflowNodeInputVoList.value, () => {
    if (curNodeId.value === 1001) {
        initData()
    }
}, { deep: true })

watch(() => orgList.value, () => {
    // 回显时候的监听
    initData()
})


const initData = (id?: string) => {
    const list: any = workflowNodeOutputVoList.value
    checkList.value = []
    if (curNodeId.value === 1001) {
        workflowNodeInputVoList.value.map((vo: any) => {
            if (!list.includes(vo.identityId)) {
                list.push(vo.identityId)
            }
        })
    } else {
        if (!list.includes(workflowNodeSenderIdentityId.value)) {
            list.push(workflowNodeSenderIdentityId.value)
        }
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