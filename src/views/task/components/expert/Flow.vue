<template>
    <div class="flex-1 py-20px px-30px">
        <div class="btn-group">
            <el-button :disabled="!props.isSettingCompleted || !props.isReadonly"
                v-for="btn in btnList" round @click="handleClick(btn.value)">{{ btn.label }}
            </el-button>
        </div>
        <div id="mainStage" @dragover.stop="dragover($event)" class="mainStage"
            :class="{ showDot }">
            <div v-for="(node, index) in nodeListWithStatus" :key="node.id"
                class="node-box mb-100px" :class="{ 'node-arrow': index < nodeList.length - 1 }">
                <div class="node cursor-pointer" @click="selectNode(node, index)"
                    :class="{ 'active-node': curNodeId === node.algorithmId }">
                    <div class="status">
                        <!-- <img src="@/assets/images/task/finish@2x.png" />
                        <img src="@/assets/images/task/failed@2x.png" />
                        <img src="@/assets/images/task/loading@2x.gif" /> -->
                    </div>
                    <div class="node-label">
                        <el-tooltip class="box-item" effect="dark" :content="node.nodeName"
                            placement="top-start">{{ node?.nodeName }}</el-tooltip>
                    </div>
                    <div v-if="!props.isSettingCompleted" class="btn">
                        <el-tooltip v-if="true" class="box-item" effect="dark"
                            :content="t('expert.deleteNode')" placement="top-start"><img
                                @click.stop="deleteNode(node, index)"
                                src="@/assets/images/task/delete@2x.png" class="cursor-pointer" />
                        </el-tooltip>

                        <p v-else
                            class="w-100px flex text-14px text-color-[#0052D9] leading-20px cursor-pointer">
                            {{ t('expert.viewResult') }}</p>
                    </div>
                </div>
                <div v-if="node.alg.supportDefaultPsi">
                    <el-checkbox :disabled="props.isSettingCompleted"
                        @change="handleVoPsi($event, index)" v-model="node.nodeInput.isPsi"
                        label="PSI" />
                    <el-tooltip class="box-item" effect="dark" :content="t('expert.psiHint')"
                        placement="top-start">
                        <img src="@/assets/images/task/quest@2x.png" class="w-14px h-14px ml-6px" />
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { useExpertMode } from '@/stores'
import { saveWorkflowInExpert } from '@/api/expert'
import { useRoute } from 'vue-router';

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const props = defineProps({
    statusList: {
        type: Object,
        default: () => []
    },
    workflowStatus: {
        type: Number,
        default: 0
    },
    isSettingCompleted: {
        type: Boolean,
        default: false
    },
    isReadonly: {
        type: Boolean,
        default: false
    }
})

const dragover = (e: any) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
}

const curNodeId = computed(() => useExpertMode().getCurNodeId)
const curNodeIndex = computed(() => useExpertMode().getCurNodeIndex)
const workflowId = computed(() => route.params.workflowId)
const workflowVersion = computed(() => route.params.workflowVersion)

const showDot = computed(() => useExpertMode().getDotted)

const nodeList: any = computed(() => useExpertMode().getNodeList)
const btnList = computed(() => [
    {
        id: 1,
        value: 'save',
        label: t('common.save')
    }
])

const judgeMentParams = () => {
    console.log(nodeList.value.length);
    console.log(nodeList.value);
    console.log(nodeList);

    let flag = true
    if (!nodeList.value.length) {
        ElMessage.error('请拖动左侧算法组合工作流并完善输入/输出等信息')
        flag = false
    } else {
        for (let i = 1; i < nodeList.value.length; i++) {
            console.log(i);

            if (!nodeList.value[i].workflowNodeInputVoList) { //不存在input 数据方未进行选择
                ElMessage.error('请完善算法任务的数据提供方信息')
                flag = false
                return
            }
            if (!nodeList.value[i].workflowNodeSenderIdentityId) {
                ElMessage.error('请选择算法的任务发起方')
                flag = false
                return
            }

            if (nodeList.value[i].workflowNodeInputVoList && nodeList.value[i].workflowNodeInputVoList.length === 0) {
                ElMessage.error('请完善算法任务的数据提供方信息')
                flag = false
                return
            } else {
                const input = nodeList.value[i].workflowNodeInputVoList
                for (let j = 1; j < input.length; j++) {
                    if (input[j].dataColumnIds && input[j].dataColumnIds.length === 0) {
                        ElMessage.error('请选择数据提供方的自变量')
                        flag = false
                        return
                    }
                    if (nodeList.value[i].alg.inputModel && j === 0 && !input[j].dependentVariable) {
                        ElMessage.error('请选择数据提供方的因变量')
                        flag = false
                        return
                    }
                    if (!input[j].keyColumn) {
                        ElMessage.error('请选择数据提供方的ID列')
                        flag = false
                        return
                    }
                }
            }
        }
    }
    return flag
    // else {
    //     for (let i = 1; i < nodeList.value.length; i++) {
    //         if (!nodeList.value[i].workflowNodeInputVoList) { //不存在input 数据方未进行选择
    //             ElMessage.error('请完善算法任务的数据提供方信息')
    //             flag = false
    //             break
    //         }
    //         if (!nodeList.value[i].workflowNodeSenderIdentityId) {
    //             ElMessage.error('请选择算法的任务发起方')
    //             flag = false
    //             break
    //         }

    //         if (nodeList.value[i].workflowNodeInputVoList && nodeList.value[i].workflowNodeInputVoList.length === 0) {
    //             ElMessage.error('请完善算法任务的数据提供方信息')
    //             flag = false
    //             break
    //         } else {
    //             const input = nodeList.value[i].workflowNodeInputVoList
    //             for (let j = 1; j < input.length; j++) {
    //                 if (input[j].dataColumnIds && input[j].dataColumnIds.length === 0) {
    //                     ElMessage.error('请选择数据提供方的自变量')
    //                     flag = false
    //                     break
    //                 }
    //                 if (nodeList.value[i].nodeAlgorithmVo.inputModel && j === 0 && !input[j].dependentVariable) {
    //                     ElMessage.error('请选择数据提供方的因变量')
    //                     flag = false
    //                     break
    //                 }
    //                 if (!input[j].keyColumn) {
    //                     ElMessage.error('请选择数据提供方的ID列')
    //                     flag = false
    //                     break
    //                 }
    //             }
    //         }
    //     }
    // }
}

const handleClick = (value: string) => {
    if (value === 'save') {
        saveWorkflow()
    } else {
        router.push({
            name: ''
        })
    }
}

const saveWorkflow = async () => {
    const params = getSaveParams()
    const { code } = await saveWorkflowInExpert(params)
    if (code === 10000) {
        ElMessage.success('保存工作流成功,跳转工作流记录页面')
        router.push({
            name: 'workflow'
        })
    }
}

const getSaveParams = () => {
    if (!workflowId || !workflowVersion) return ElMessage.error('当前状态不正确, 无法保存,请重试')
    const params: any = {
        workflowId: workflowId.value,
        workflowVersion: workflowVersion.value,
        workflowNodeList: []
    }
    nodeList.value.map((node: any, index: number) => {
        const obj: any = {}
        obj.algorithmId = node.alg.algorithmId
        obj.nodeName = node.nodeName
        obj.nodeStep = ++index
        obj.nodeInput = node.nodeInput
        //  {
        //     dataInputList: node.nodeInput.dataInputList,
        //     isPsi: node.nodeInput.isPsi,
        //     inputModel: node.nodeInput.inputModel,
        //     identityId: node.nodeInput.identityId,
        //     model: node.nodeInput.model
        // }
        obj.nodeOutput = {
            identityId: node.nodeOutput.identityId,
            "storePattern": 1
        }
        obj.nodeCode = {
            variableList: node.nodeCode.variableList
        }
        obj.resource = {
            costBandwidth: node.resource.costBandwidth,
            costCpu: node.resource.costCpu,
            costMem: node.resource.costMem,
            runTime: node.resource.runTime,
        }
        params.workflowNodeList.push(obj)
    })
    return params
}


const handleVoPsi = (flag: boolean, index: number) => {
    console.log(index, flag);
    useExpertMode().setCurNodePsiStatus({
        index, flag
    })
}

const deleteNode = (node: any, index: number) => {

    useExpertMode().deleteNode(index)
    if (node.algorithmId) {
        useExpertMode().setIsPSIModel(false)
    }
    // 更新序号 1. 获取id 2 reset
    const id = useExpertMode().getCurNodeId
    const newIndex = nodeList.value.findIndex((node: any) => node.algorithmId === id)
    const realIndex = newIndex && newIndex > 0 ? newIndex : 0
    if (nodeList.value.length > 0) {
        selectNode(nodeList.value[realIndex], realIndex)
    } else {
        useExpertMode().setShowPanel(false)
    }
}

const selectNode = (node: any, index: number) => {
    useExpertMode().setCurrentIndex(index)
    useExpertMode().setCurNodeId(node.algorithmId)
    useExpertMode().setCurData(node)
    useExpertMode().setShowPanel(true)
    if (node.algorithmId === 1001) {
        useExpertMode().setIsPSIModel(true)
    } else {
        useExpertMode().setIsPSIModel(false)
    }
}

const nodeListWithStatus: any = computed(() => {
    if (props.statusList.length === 0) return nodeList.value
    // if(props.runStatus.)
    return nodeList.value.map((node: any, index: any) => {
        node.status = props.statusList[index] ? props.statusList[index].runStatus : 0
        node.statusMsg = props.statusList[index] ? props.statusList[index].runMsg : ''
        node.taskId = props.statusList[index] ? props.statusList[index].taskId : '0'
        node.isEdit = false
        return { ...node }
    })
})

watch(nodeListWithStatus, () => {
    if (nodeListWithStatus.value.length &&
        nodeListWithStatus.value[curNodeIndex.value]) {
        selectNode(nodeListWithStatus.value[curNodeIndex.value], curNodeIndex.value)
    }
}, { deep: true })



</script>

<style scoped lang='scss'>
.mainStage {
    width: 400px;
    overflow: hidden;
    height: calc(100% - 90px);
    margin: 30px auto;

    &.showDot {
        border: 1px dashed #d3d2d2;
        box-shadow: 0 0 1px;
    }

    .node-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        flex-direction: column;
        position: relative;

        &.node-arrow::after {
            content: "";
            width: 20px;
            height: 62px;
            position: absolute;
            bottom: -80px;
            background: url("@/assets/images/task/arrow.png") no-repeat;
        }

        .node {
            position: relative;
            width: 183px;
            height: 50px;
            background: #E1E9F7;
            color: #0052D9;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;

            &.active-node {
                background-color: #0052D9;
                color: #fff;
            }

            .node-label {
                text-align: center;
                width: 141px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 14px;
                line-height: 20px;
            }

            .status {
                display: inline-block;
                white-space: nowrap;
                position: absolute;
                right: calc(100% + 20px);
            }

            .btn {
                display: inline-block;
                white-space: nowrap;
                position: absolute;
                left: calc(100% + 20px);
            }
        }

        // display: flex;
        // align-items: center;
        // justify-content: center;
        // width: 183px;
        // height: 50px;
        // background: #0052d9;
        // color: #fff;
        // border-radius: 25px;
        // margin-bottom: 100px;
        // position: relative;
        // &.node-arrow:after {
        //     content: "";
        //     width: 6px;
        //     height: 18px;
        //     position: absolute;
        //     bottom: -24px;
        //     background: url("../../../assets/images/projects/arrow.svg")
        //         no-repeat;
        // }
    }
}
</style>