<template>
    <div class="flex-1 py-20px px-30px">
        <div class="btn-group">
            <el-button v-for="item in btnList" round>{{ item.label }}</el-button>
        </div>
        <div id="mainStage" class="mainStage" :class="{ showDot: showDot }">
            <div
                v-for="(node, index) in nodeList"
                :key="node.id"
                class="node-box mb-100px"
                :class="{ 'node-arrow': index < nodeList.length - 1, 'active-node': curNodeId === node.algorithmId }"
            >
                <div class="node cursor-pointer">
                    <div class="status">
                        <img src="@/assets/images/task/finish@2x.png" />
                        <img src="@/assets/images/task/failed@2x.png" />
                        <img src="@/assets/images/task/loading@2x.gif" />
                    </div>
                    <div class="node-label">
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="node.nodeLabel"
                            placement="top-start"
                        >{{ node.nodeLabel }}</el-tooltip>
                    </div>
                    <div class="btn">
                        <img
                            v-if="true"
                            src="@/assets/images/task/delete@2x.png"
                            class="cursor-pointer"
                        />
                        <p
                            v-else
                            class="w-100px flex text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                        >{{ t('expert.viewResult') }}</p>
                    </div>
                </div>
                <div>
                    <el-checkbox v-model="hasPSI" label="PSI" />
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="t('expert.psiHint')"
                        placement="top-start"
                    >
                        <img src="@/assets/images/task/quest@2x.png" class="w-14px h-14px ml-6px" />
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
const dragStatus = ref<boolean>(true)
const { t } = useI18n()
let showDot = ref<boolean>(true)
let hasPSI = ref<boolean>(true)
const curNodeId = ref('1')
const nodeList = reactive([
    {
        id: '1',
        nodeLabel: '逻辑回归训练啊啊啊啊啊啊啊啊啊',
        algorithmId: '1'
    },
    {
        id: '2',
        nodeLabel: '逻辑回归预测',
        algorithmId: '2'
    },
])
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
watch([dragStatus], ([val]) => showDot.value = val, { immediate: true })

</script>

<style scoped lang='scss'>
.mainStage {
    width: 400px;
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
            background: #0052d9;
            color: #fff;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            .node-label {
                text-align: center;
                width: 141px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 14px;
                color: #ffffff;
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