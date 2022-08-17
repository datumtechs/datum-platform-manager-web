<template>
    <div class="p-30px input-box">
        <p class="text-color-[#333] font-bold">{{ t('expert.configureInput') }}</p>
        <div class="mt-40px">
            <p class="text-color-[#333] font-medium">{{ t('role.taskSponsor') }}</p>
            <el-select clearable @clear="clearSender" v-model="taskSender" class="mt-10px w-full"
                size="small" :disabled="props.isSettingCompleted || props.isReadonly" filterable
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
                <el-cascader v-else class="w-full" :key="modelKey" v-model="modelValue"
                    :disabled="props.isSettingCompleted || props.isReadonly" size="small" :span="12"
                    :props="{
                        lazy: true,
                        lazyLoad: (node, resolve) => {
                            modelLazyLoad(node, resolve)
                        }
                    }" @change="e => { changeModelValue(e) }"></el-cascader>
            </p>
        </div>
        <div class="mt-40px" v-if="!isPrivacy">
            <p class="text-color-[#333] font-medium">
                {{ `${t('role.powerProvider')}` }}
            </p>
            <div class="mt-10px">
                <el-radio-group :disabled="props.isSettingCompleted || props.isReadonly"
                    v-model="powerType" @change="handleComputingRadio">
                    <el-radio :label="0" size="large">{{ $t('expert.randomMode') }}</el-radio>
                    <el-radio :label="1" size="large">{{ $t('expert.specifyMode') }}</el-radio>
                </el-radio-group>
                <el-select v-if="powerType === 1" class="w-full" v-model="computingProvider"
                    size="small" :disabled="props.isSettingCompleted || props.isReadonly" filterable
                    :placeholder="t('task.selectComputingProvider')"
                    @change="handleComputingSelectChange">
                    <el-option v-for="node in baseOrgList" :key="node.identityId"
                        :label="node.nodeName" :value="node.identityId"></el-option>
                </el-select>
            </div>
        </div>
        <div v-for="(item, index) in selectLayout" :key="index" class="mt-40px">
            <p class="text-color-[#333] font-medium">
                {{ isPrivacy ? `${t('role.dataProvider')}-${index + 1}`
                        : `${t('role.dataProvider')}`
                }}
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
const modelKey = ref(-1)
const taskSender = ref('')
const powerType = ref(0)

const algorithm: any = computed(() => useExpertMode().getAlgorithm)
const orgList: any = computed(() => useExpertMode().getUserOrgList)
const baseOrgList: any = computed(() => useExpertMode().getBaseOrgList)
const showModel: any = computed(() => algorithm.value.inputModel)
const inputVoList: any = computed(() => useExpertMode().getInputVoList)
const nodeList: any = computed(() => useExpertMode().getNodeList)
const isPrivacy: any = computed(() => useExpertMode().isPrivacy)
const workflowNodeSenderIdentityId: any = computed(() => useExpertMode().getWorkflowNodeSender)


// const baseOrgList: any = store.baseOrgList


let selectLayout: any = ref([{ item: '111', value: '111', }])
let minLen = 2

const cascaderKey: any = ref([])
const inputValue: Ref<any[]> = ref([] as any[])

const columnsList: any = ref([])
const computingProvider: any = ref('')

let columnsRef: any = []


watch(inputValue.value, (newV, oldV) => {
    if (newV.length) {
        const ids = newV.findIndex(item => item === null)
    }

})

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

const clearSender = () => {
    taskSender.value = ""
}

// 当选择数据字段时保存至store
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
    minLen = isPrivacy.value ? 2 : 1
    selectLayout.value = Array(minLen).fill({})
    // if (!isPrivacy.value) {
    //     useExpertMode().setComputingType(0)
    // } 在save的时候再存
}

const changeInputValue = (item: any, index: number) => {
    if (!item) {
        useExpertMode().setInputListByChange(index)
    }
    if (item && item.length === 0) {
        // todo 将禁用设置成可用
        return columnsList.value[index] = []
    }
    if (item) {
        const upList: any = []
        cascaderKey.value.map((item: any, i: number) => {
            if (index !== i) {
                upList.push(i)
            }
        })
        upList.map((i: any) => {
            cascaderKey[i] = cascaderKey.value[i]++
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


const isCurrentSelectDisabled = (org: any, index: number) => {
    if (inputValueOrg.value[index] === org.identityId) {
        return false
    } else {
        return org.disabled
    }
}

const inputValueOrg = computed(() => inputValue.value.map((item: any) => item?.[0]))

const inputLazyLoad = async (node: any, resolve: any, index: number) => {
    const { level } = node
    try {
        let nodes
        if (level === 0) {
            useExpertMode().setDisableOrg(inputValueOrg.value)
            setTimeout(() => {
                if (inputValue.value.length) {
                    // 已做了选择
                    nodes = baseOrgList.value.map((org: any) => ({
                        value: org.identityId,
                        label: org.nodeName,
                        leaf: level >= 2,
                        disabled: isCurrentSelectDisabled(org, index)
                    }))
                } else {
                    nodes = baseOrgList.value.map((org: any) => ({
                        value: org.identityId,
                        label: org.nodeName,
                        leaf: level >= 2,
                        disabled: org.disabled || false
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

const handleComputingRadio = (value: any) => {
    useExpertMode().setComputingType(value)
}

const handleComputingSelectChange = (value: any) => {
    useExpertMode().setComputingProvider(value)
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
    modelKey.value++
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
const modelValue: any = ref('')
const modelOptions = reactive([{
    fileName: t('expert.frontModel'),
    modelId: 'frontNodeOutput'
}])

onMounted(async () => {
    await useExpertMode().queryUserOrgList()
    await useExpertMode().queryBaseOrgList()
    await useExpertMode().queryPowerOrgList()
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
        const orgs = baseOrgList.value.map((item: any) => item.identityId)
        inputVoList.value.map((item: any, index: number) => {
            //TODO 处理回显
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

        //inputVoList 拿不到 computingProvider
        if (!isPrivacy.value) {
            const curInput = nodeList.value[curNodeIndex.value]?.nodeInput
            console.log('curInput', curInput);

            if (curInput) {
                powerType.value = curInput.powerType
                if (powerType.value && curInput.powerIdentityId) {
                    computingProvider.value = curInput.powerIdentityId
                }
            }
        }


        if (showModel.value) {
            const node = nodeList.value[curNodeIndex.value]?.nodeInput?.model
            if (node.metaDataId === 'frontNodeOutput') {
                modelValue.value = 'frontNodeOutput'
            } else {
                modelValue.value = [node?.identityId, node?.metaDataId,]
            }
        }

        inputValue.value = res
        upInputKeys()
    } else {
        if (!isPrivacy.value) {
            useExpertMode().setComputingType(0)
        }
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