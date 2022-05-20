<template>
    <div class="p-30px input-box">
        <p class="text-color-[#333] font-bold">{{ t('expert.configureInput') }}</p>
        <div class="mt-40px">
            <p class="text-color-[#333] font-medium">{{ t('role.taskSponsor') }}</p>
            <el-select v-model="taskSender" class="mt-10px w-full" size="small"
                :disabled="props.isSettingCompleted || props.isReadonly" filterable
                :placeholder="t('task.selectSponsor')" @change="handleSenderChange">
                <el-option v-for="item in orgList" :key="item.identityId" :label="item.nodeName"
                    :value="item.identityId"></el-option>
            </el-select>
        </div>
        <div v-if="showModel">
            <p class="mt-40px text-color-[#333] font-medium">{{ t('expert.model') }}</p>
            <p class="mt-10px">
                <el-select v-if="curNodeIndex !== 0" class="w-full" v-model="modelValue"
                    size="small" :disabled="props.isSettingCompleted || props.isReadonly" filterable
                    :placeholder="t('expert.selectModel')" @change="handleModelChange">
                    <el-option v-for="(item, index) in modelOptions" :key="index"
                        :label="item.fileName" :value="item.modelId"></el-option>
                </el-select>
                <el-cascader clearable v-else class="w-full" :key="modelKey" v-model="modelValue"
                    :disabled="props.isSettingCompleted || props.isReadonly" size="small" :span="12"
                    :props="{
                        lazy: true,
                        lazyLoad: (node, resolve) => {
                            modelLazyLoad(node, resolve)
                        }
                    }" @change="e => { changeModelValue(e) }"></el-cascader>
            </p>
        </div>
        <div v-for="(item, index) in selectLayout" :key="index" class="mt-40px">
            <p class="text-color-[#333] font-medium">
                {{ `${t('role.dataProvider')}-${index + 1}` }}
                <!-- TODO 改名称为数据提供方 -->
            </p>
            <el-cascader clearable class="w-full mt-10px" :key="cascaderKey[index]"
                v-model="inputValue[index]" :disabled="props.isSettingCompleted || props.isReadonly"
                size="small" :span="12" :props="{
                    lazy: true,
                    lazyLoad: (node, resolve) => {
                        inputLazyLoad(node, resolve, index)
                    }
                }" @change="e => { changeInputValue(e, index) }"></el-cascader>
            <Transfer :inputValue="inputValue[index]" :isReadonly="props.isReadonly"
                :ref="setItemRef" :key="index" :column-data="columnsList[index]"
                :transferIndex="index" :algorithm="algorithm" @saveToStore="saveToStore">
            </Transfer>
        </div>
    </div>
</template>

<script setup lang='ts'>
import type { Ref } from 'vue';
import { useExpertMode } from '@/stores'
import Transfer from './Transfer.vue'
import { queryUserDataList, queryDataDetails, getUserModelList } from '@/api/data'

const { t } = useI18n()
const modelKey = ref('')
const taskSender = ref('')
const algorithm: any = computed(() => useExpertMode().getAlgorithm)
const orgList: any = computed(() => useExpertMode().getUserOrgList)
const showModel: any = computed(() => algorithm.value.inputModel)
const inputVoList: any = computed(() => useExpertMode().getInputVoList)
const outputVoList: any = computed(() => useExpertMode().getOutputVoList)
const nodeList: any = computed(() => useExpertMode().getNodeList)
const workflowNodeSenderIdentityId: any = computed(() => useExpertMode().getWorkflowNodeSender)

let selectLayout: any = ref([{ item: '111', value: '111', }])
const minLen = 2

const cascaderKey: any = ref([])
const inputValue: Ref<any[]> = ref([] as any[])

const columnsList: any = ref([])

let columnsRef: any = []

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

onBeforeUpdate(() => {
    columnsRef = []
})

const setItemRef = (el: any) => {
    el && columnsRef.push(el)
}

const saveToStore = (transferIndex: any) => {
    const columnObj = columnsRef[transferIndex].getList()
    const columnLists = Array(2).fill({})
    columnLists[transferIndex] = columnObj

    const params = {
        keyColumn: Number(columnLists[transferIndex].keyColumn),
        dataColumnIds: columnLists[transferIndex].dataColumnIds,
        metaDataId: inputValue.value[transferIndex][1],
        identityId: inputValue.value[transferIndex][0],
        dependentVariable: 0
    }
    if (transferIndex === 0) {
        params.dependentVariable = Number(columnLists[transferIndex].dependentVariable)
    }
    useExpertMode().setInputVoList({ params, transferIndex })
}

const initInputPanel = () => {
    selectLayout.value = Array(minLen).fill({})
}

const changeInputValue = (item: any, index: number) => {
    if (item && item.length === 0) {
        return columnsList.value[index] = []
    }
    if (item) {
        const ids = getIdentity(inputValue.value)
        useExpertMode().setDisableOrg(ids)

        const upList: any = []
        cascaderKey.value.map((item: any, i: number) => {
            if (index !== i) {
                upList.push(i)
            }
        })
        upList.map((i: any) => {
            cascaderKey[i] = cascaderKey.value[i] + 1
        })
        if (item && item.length === 2) {
            getColumnList(item[item.length - 1], index)
        }
    }

}
const getColumnList = async (metaDataId: string, index: number, params?: any) => {
    const { code, data } = await queryDataDetails({ metaDataId })
    if (code === 10000) {
        columnsList.value[index] = data.columnsList
        if (params) {
            nextTick(() => {
                columnsRef[index].handleEcho(params)
            })
        }
    }
}

const getIdentity = (list: any) => {
    if (!list) return []
    return list.map((item: any) => item[0])
}

const isDisabled = (item: any, index: number) => {
    if (inputValueOrg.value[index] === item.identityId) {
        return false
    } else {
        return item.disabled
    }
}

const inputValueOrg = computed(() => inputValue.value.map((item: any) => item[0]))
const inputLazyLoad = async (node: any, resolve: any, index: number) => {
    const { level, data } = node
    try {
        let nodes
        if (level === 0) {
            setTimeout(() => {
                if (inputValue.value.length) {
                    console.log(inputValueOrg.value);
                    // 已做了选择

                    nodes = orgList.value.map((org: any) => ({
                        value: org.identityId,
                        label: org.nodeName,
                        leaf: level >= 2,
                        disabled: isDisabled(org, index)
                    }))
                } else {
                    nodes = orgList.value.map((org: any) => ({
                        value: org.identityId,
                        label: org.nodeName,
                        leaf: level >= 2,
                        disabled: org.disabled
                    }))
                }
                resolve(nodes)
            }, 300);
        } else if (level === 1) {
            const params = { current: 1, size: 1000, identityId: node.data.value }
            const { code, data } = await queryUserDataList(params)
            const nextNodes = data.items.map((item: any) => ({
                value: item.metaDataId,
                label: item.metaDataName,
                leaf: level >= 1 // >=2： 展示3级 >= 1： 展示2级
            }))
            resolve(nextNodes)
        }

    } catch (error) {
        console.log(error);
    }
}

const handleSenderChange = (value: any) => {
    useExpertMode().setSender(value)
}

const modelLazyLoad = async (node: any, resolve: any) => {
    const { level } = node
    let nodes
    try {
        if (level === 0) {
            setTimeout(() => {
                nodes = orgList.value.map((org: any) => ({
                    value: org.identityId,
                    label: org.nodeName,
                    leaf: level >= 2
                }))
                resolve(nodes)
            }, 200)
        } else if (level === 1) {
            const params = { algorithmId: algorithm.value.algorithmId, identityId: node.data.value }
            const { data } = await getUserModelList(params)
            const nextNodes = data.map((item: any) => ({
                value: item.metaDataId,
                label: item.fileName,
                leaf: level >= 1 //  >=2： 展示3级 >= 1： 展示2级
            }))
            resolve(nextNodes)
        }
        resolve(nodes)
    } catch (error) {
        console.log(error)
    }
}

const changeModelValue = (item: any) => {
    if (Array.isArray(item)) {
        useExpertMode().setCurModel({
            metaDataId: item[1]
        })
    }
}

const handleModelChange = (val: any) => {
    useExpertMode().setCurModel({
        metaDataId: val
    })
}

const curNodeIndex = computed(() => useExpertMode().getCurNodeIndex)
const modelValue = ref('')
const modelOptions = reactive([{
    fileName: t('expert.frontModel'),
    modelId: 'frontNodeOutput'
}])

onMounted(async () => {
    await useExpertMode().queryUserOrgList()
    initInputPanel()
    // 回显
    handleInputValue()
    handleCascaderKey()
})

const handleInputValue = async () => {
    const res: any = []
    taskSender.value = workflowNodeSenderIdentityId.value
    if (inputVoList.value && inputVoList.value.length) {
        selectLayout = inputVoList
        const orgs = orgList.value.map((item: any) => item.identityId)
        inputVoList.value.map((item: any, index: number) => {
            if (orgs.includes(item.identityId)) {
                res[index] = [
                    item.identityId,
                    item.metaDataId
                ]
                getColumnList(item.metaDataId, index, {
                    keyColumn: item.keyColumn,
                    dependentVariable: item.dependentVariable,
                    dataColumnIds: item.dataColumnIds
                })
            }
        })
        console.log('showModel', showModel);

        if (showModel.value) {
            modelValue.value = nodeList.value[curNodeIndex.value].model
        }
        inputValue.value = res
        upInputKeys()
    }
}
const handleCascaderKey = () => {
    cascaderKey.value = []
    selectLayout.value.map((item: any, index: any) => {
        cascaderKey.value[index] = String(index)
    })
}

const upInputKeys = () => {
    changeInputValue(true, -1)
    changeModelValue(true)
}
</script>

<style scoped lang='scss'>
.input-box {
    height: calc(100% - 0px);
    overflow-y: auto;

    :deep(.el-input__inner) {
        height: 40px;
        background: #fff;
        border-radius: 20px;
        padding-left: 14px;
    }
}
</style>