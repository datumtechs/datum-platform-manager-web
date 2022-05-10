<template>
    <div class="w-242px algo-box">
        <p class="text-18px font-bold mt-16px pl-24px">{{ t('common.algorithm') }}</p>
        <div class="algo-wrapper">
            <div v-for="algo in algoList" class="flex flex-col items-center mt-24px">
                <p
                    class="h-36px w-230px text-14px leading-20px text-[#000] font-bold pl-18px flex items-center">
                    {{ algo.name }}</p>
                <ul class="mt-4px">
                    <li class="h-36px w-230px drag-box cursor-pointer flex items-center pl-18px"
                        @dragstart.stop="dragstart($event, item)"
                        @dragend.stop="dragend($event, item)" :draggable="true"
                        v-for="item in algo.childrenList" :key="item.id">{{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { queryAlgoDetail } from '@/api/algorithm'
import { useExpertMode } from '@/stores'
import { MAX_NODES } from '@/config/constants'
import { ElMessage } from 'element-plus'
const route = useRoute()
const { t } = useI18n()
const props = defineProps({
    isSettingCompleted: {
        type: Boolean,
        default: false
    }
})

const dragstart = (e: any, item: any) => {
    if (props.isSettingCompleted) return
    // if (this.viewModel === 'view') return
    useExpertMode().setDotted(true)
}

const nodeList = computed(() => useExpertMode().getNodeList)
const isPSIModel = computed(() => useExpertMode().getIsPSIModel)

const workflowId = computed(() => route.params.workflowId)
const workflowVersion = computed(() => route.params.workflowVersion)
const isInEdit = computed(() => !!workflowId.value && !!workflowVersion.value)

watch(isInEdit, () => {
    if (isInEdit.value) {
        queryAlgoList()
    }
})

const dragend = async (e: any, item: any) => {
    if (props.isSettingCompleted) return
    useExpertMode().setDotted(false)
    const inBoxFlag = isBoxInStage(e)
    if (!inBoxFlag) return
    const ids = nodeList.value.map((item: any) => item.algorithmId)
    if (ids.includes(item.id)) {
        // 是否重复的算法
        ElMessage.error(t('task.repeatAlgo'))
    } else {

        // 是否是PSI 暂定1001是PSI PSI的长度只有一个 且PSI没有自变量和因变量

        if ((item.id === 1001 && nodeList.value.length > 0) || nodeList.value.length >= MAX_NODES) {
            return ElMessage.error(t('task.exceedMaxNode'))
        } else if (!!isPSIModel.value) {
            return ElMessage.error(t('expert.exceedPsiLimit'))
        } else {
            const params = {
                // TODO input output env varParams 都需要单独存放 不采用Vo内部元素
                algorithmId: item.id,
                nodeName: item.name,
                nodeInput: {
                    dataInputList: [],
                    inputModel: item.alg.inputModel,
                    model: {},
                    isPsi: true
                },
                nodeOutput: {
                    identityId: [],
                    storePattern: 1
                },
                resource: {
                    costCpu: item.alg.costCpu,
                    costGpu: item.alg.costGpu,
                    costMem: item.alg.costMem,
                    costBandwidth: item.alg.costBandwidth,
                    runTime: item.alg.runTime,
                },
                nodeCode: {
                    code: item.alg.algorithmCode,
                    variableList: item.alg.algorithmVariableList
                },
                alg: item.alg,
                workflowId: workflowId || '',
                workflowVersion: workflowVersion || ''
            }
            if (item.id === 1001) {
                useExpertMode().setIsPSIModel(true)
            }
            useExpertMode().addNodeList(params)
        }
    }
}
const isBoxInStage = (event: any) => {
    const box: any = document.getElementById('mainStage')
    const x = event.clientX
    const y = event.clientY
    const x1 = box.getBoundingClientRect().left
    const y1 = box.getBoundingClientRect().top
    const x2 = box.getBoundingClientRect().right
    const y2 = box.getBoundingClientRect().bottom
    if (x < x1 || x > x2 || y < y1 || y > y2) {
        return false
    } else {
        return true
    }
}

const algoList: any = ref([])

let target: any = []
const filterTree = (arr: any, newArray: any = []) => {
    target.concat(newArray)
    arr.forEach((son: any) => {
        if (Array.isArray(son.childrenList)) {
            filterTree(son.childrenList, target)
        } else {
            if (son.isAlgorithm && son.isExistAlgorithm) {
                target.push(son);
            }
        }
    })
    return target
}

const queryAlgoList = () => {
    queryAlgoDetail().then(result => {
        const { data, code } = result
        if (code === 10000) {
            const arr = filterTree(data.childrenList)
            data.childrenList.forEach((item: any) => {
                if (item.id === 2) {
                    item.childrenList = arr
                }
            })
            algoList.value = data.childrenList
        }
    }).catch(err => {
        console.log(err);
    })
}

onMounted(() => {
    if (isInEdit.value) {
        queryAlgoList()
    }
})
</script>

<style scoped lang='scss'>
.algo-box {
    border-right: 1px solid #eeeeee;

    .algo-wrapper {
        height: calc(100% - 58px);
        overflow-y: auto;

        .drag-box {
            &:hover {
                background: #e6ecf8;
            }
        }
    }
}
</style>
