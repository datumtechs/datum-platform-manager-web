<template>
    <div class="flex-1 py-20px px-30px">
        <div class="btn-group">
            <el-button v-for="item in btnList" round>{{ item.label }}</el-button>
        </div>
        <div id="mainStage" class="mainStage" :class="{ showDot: showDot }">
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
                    <div class="btn">
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
                <div v-if="node.nodeAlgorithmVo.supportDefaultPsi">
                    <el-checkbox @change="handleVoPsi($event, index)"
                        v-model="node.nodeAlgorithmVo.isPsi" label="PSI" />
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
import { useExpertMode } from '@/stores'
const dragStatus = ref<boolean>(true)
const { t } = useI18n()

const props = defineProps({
    statusList: {
        type: Object,
        default: () => []
    },
    workflowStatus: {
        type: Number,
        default: 0
    }

})

const curNodeId = computed(() => useExpertMode().getCurNodeId)
const curNodeIndex = computed(() => useExpertMode().getCurNodeIndex)
console.log(curNodeIndex.value);

const showDot = computed(() => useExpertMode().getDotted)

const nodeList: any = useExpertMode().getNodeList
const btnList = computed(() => [
    {
        id: 1,
        value: 'save',
        label: t('common.save')
    },
    {
        id: 2,
        value: 'delete',
        label: t('common.viewEvent')
    }
])

const handleVoPsi = (flag: boolean, index: number) => {
    console.log(index, flag);
    useExpertMode().setCurNodePsiStatus({
        index, flag
    })
}

const deleteNode = (node: any, index: number) => {
    useExpertMode().deleteNode(index)
}

const selectNode = (node: any, index: number) => {
    useExpertMode().setCurrentIndex(index)
    useExpertMode().setCurNodeId(node.algorithmId)
    useExpertMode().setCurData(node)
}

const nodeListWithStatus: any = computed(() => {
    if (props.statusList.length === 0) return nodeList
    // if(props.runStatus.)
    return nodeList.map((node: any, index: any) => {
        node.status = props.statusList[index] ? props.statusList[index].runStatus : 0
        node.statusMsg = props.statusList[index] ? props.statusList[index].runMsg : ''
        node.taskId = props.statusList[index] ? props.statusList[index].taskId : '0'
        node.isEdit = false
        return { ...node }
    })
})

watch(nodeListWithStatus.value, () => {
    if (nodeListWithStatus.value.length &&
        nodeListWithStatus.value[curNodeIndex.value]) {
        selectNode(nodeListWithStatus.value[curNodeIndex.value], curNodeIndex.value)
    }
})



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