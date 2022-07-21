<template>
    <div class="w-242px algo-box">
        <div class="text-18px font-bold mt-17px mb-13px pl-24px flex">
            {{
                    t('common.algorithmLibrary')
            }}
            <QuestionMark :content="$t('expert.compositeWorkflow')" />
        </div>
        <div class="tab-box">
            <div class="tab flex-1 text-left" :class="{ 'active': curTab === item.value }"
                @click="handleChangeAlgoType(item)" v-for="(item, index) in tabList" :key="index">
                <p class="pl-24px">{{ item.label }}</p>
            </div>
        </div>
        <div class="algo-wrapper" v-if="workflowId && workflowVersion">
            <div v-for="algo in algoList" class="flex flex-col items-center mt-24px">
                <p
                    class="h-36px w-230px text-14px leading-20px text-[#333] font-bold pl-18px flex items-center">
                    {{ algo.name }}</p>
                <div class="mt-4px">
                    <div class="flex items-center" :class="{ 'drag-box': !item.childrenList }"
                        v-for="item in algo.childrenList" :key="item.id">
                        <div v-if="item.childrenList">
                            <!-- <div class="h-36px w-230px  cursor-pointer flex items-center pl-18px">
                                <span>{{ item.name }}</span> <span>
                                    <el-icon :size="18" class="cursor-pointer ml-10px">
                                        <CirclePlus />
                                    </el-icon>
                                </span>
                            </div> -->
                            <div @dragstart.stop="dragstart($event, i)"
                                @dragend.stop="dragend($event, i)" :draggable="true"
                                class="h-36px w-230px drag-box cursor-pointer flex items-center pl-18px"
                                v-for="i in item.childrenList">{{ i.name }}</div>
                        </div>
                        <div @dragstart.stop="dragstart($event, item)"
                            @dragend.stop="dragend($event, item)" :draggable="true"
                            class="h-36px w-230px cursor-pointer flex items-center pl-18px" v-else>
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CommonDialog v-model:show="show" @submit="submitToChange" :title="$t('account.tips')">
            <template v-slot:content>
                {{ $t('expert.cleanNodeTips') }}
            </template>
        </CommonDialog>
    </div>
</template>

<script setup lang='ts'>
import { queryAlgoDetail } from '@/api/algorithm'
import { useExpertMode } from '@/stores'
import { MAX_NODES } from '@/config/constants'
import { ElMessage } from 'element-plus'
const route = useRoute()
const store = useExpertMode()
const { t, locale } = useI18n()
const show = ref(false)

const props = defineProps({
    isSettingCompleted: {
        type: Boolean,
        default: false
    },
    isReadonly: {
        type: Boolean,
        default: false
    },
})

const submitToChange = () => {
    show.value = false
    curTab.value = curTab.value === 'privacy' ? 'nonPrivacy' : 'privacy'
    // TODO clean nodelist
    store.resetWorkflow()
    queryAlgoList()
}


const handleChangeAlgoType = (item: any) => {
    //TODO show confirm before change the tabs
    if (nodeList.value.length > 0 && curTab.value !== item.value) {
        show.value = true
    } else {
        curTab.value = item.value;
        queryAlgoList()
    }

}

const dragstart = (e: any, item: any) => {
    if (props.isSettingCompleted || item.childrenList) return
    useExpertMode().setDotted(true)
}

const nodeList = computed(() => useExpertMode().getNodeList)
const isPSIModel = computed(() => useExpertMode().getIsPSIModel)
const isPrivacy = computed(() => useExpertMode().isPrivacy)


const workflowId = computed(() => route.params.workflowId)
const workflowVersion = computed(() => route.params.workflowVersion)
const isInEdit = computed(() => !!workflowId.value && !!workflowVersion.value)
const curTab = ref('privacy')


const tabList = ref([
    {
        key: 1,
        label: t('computing.privacy'),
        value: 'privacy'
    },
    {
        key: 2,
        label: t('computing.nonPrivacy'),
        value: 'nonPrivacy'
    },
])

watch(isInEdit, () => {
    if (isInEdit.value) {
        queryAlgoList()
    }
})

watch(isPrivacy, () => {
    console.log(isPrivacy.value);
    curTab.value = !!isPrivacy.value ? 'privacy' : 'nonPrivacy'
    queryAlgoList()
})

const dragend = async (e: any, item: any) => {
    if (props.isSettingCompleted || props.isReadonly || item.childrenList) return
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
                    isPsi: item.alg.algorithmId === 1001 ? false : true
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
            console.log(item.alg.type, 'item.isPrivacy');

            // 0-密文  1-明文
            useExpertMode().setIsPrivacy(item.alg.type === 0)
            useExpertMode().setIsPSIModel(item.id === 1001)
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


// cipher
const queryAlgoList = () => {
    // curTab === privacy nonPrivacy 算法分类id. 1-所有算法 2-隐私算法 3-非隐私算法
    queryAlgoDetail({
        id: curTab.value === 'privacy' ? '2' : '3'
    }).then(result => {
        const { data, code } = result
        if (code === 10000) {
            target = []
            console.log('处理签', data.childrenList);

            // const arr = filterTree(data.childrenList)
            // console.log(arr);

            // data.childrenList.forEach((item: any) => {
            //     if (item.id === 2000) {
            //         item.childrenList = arr
            //     }
            // })
            algoList.value = data.childrenList
        }
    }).catch(err => {
        console.log(err);
    })
}

onMounted(() => {
    if (isInEdit.value) {
        curTab.value = !!isPrivacy.value ? 'privacy' : 'nonPrivacy'
        queryAlgoList()
    }
})
</script>

<style scoped lang='scss'>
.algo-box {
    border-right: 1px solid #eeeeee;

    .tab-box {
        display: flex;
        height: 40px;
        border-top: 1px solid #eeeeee;

        .tab {
            cursor: pointer;
            line-height: 40px;
            border-bottom: 1px solid #eeeeee;

            p {
                color: #666666;
                font-size: 14px;
            }

            &.active {
                color: #333333;
                border-bottom: none
            }

            &:not(:last-child) {
                border-right: 1px solid #eeeeee;
            }
        }
    }

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

:deep(.el-dialog__body) {
    padding: 10px 32px;
}

:deep(.el-form-item--default) {
    margin-bottom: 10px;
}

:deep(.el-input__inner) {
    border-radius: 24px;
}
</style>
