<template>
    <div class="code-box flex flex-col">
        <div v-if="props.codeObj?.variableList.length > 0" ref="variable"
            class="code-variable-box py-20px">
            <p class="text-color-[#333] font-bold px-20px pb-10px flex">
                <span class="mr-10px">{{ t('expert.algoVariable') }}</span>
                <QuestionMark class="w-2px" :content="t('expert.paramsHint')" />
            </p>
            <el-space class="mb-10px px-20px" v-for="(item, index) in props.codeObj.variableList"
                :key="item.varKey">
                <p class="w-140px">{{ item.varKey }}</p>
                <el-input :disabled="isReadonly" class="round-input"
                    @change="handleVariable($event, index)" v-model="item.varValue" />
            </el-space>
        </div>
        <div v-if="props.codeObj?.variableList.length > 0" class="h-1px mobile-bar"
            @mousedown.prevent="mousedown">
            <img src="@/assets/images/task/drag@2x.png" alt="">
        </div>
        <p class="text-color-[#333] font-bold pb-20px code-context-box-title">
            <span class="mr-10px">{{ t('expert.algoCode') }}</span>
            <el-icon @click="zoomToDialog" class="w-20px h-20px cursor-pointer">
                <full-screen />
            </el-icon>
        </p>
        <div class="w-350px bg-primary m-auto my-10px p-10px code-context-box">
            <div v-html="props.codeObj.code?.calculateContractCode"></div>
        </div>
        <el-dialog v-model="zoomShow" top="5vh" :title="t('expert.algoCode')" width="40%">
            <div class="code-dialog-content" v-html="props.codeObj.code?.calculateContractCode">
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { useExpertMode } from '@/stores'
import { FullScreen } from '@element-plus/icons-vue'
const { t } = useI18n()
const variable: any = ref(null)
const zoomShow = ref(false)

const isDragIng = ref(false)
const props = defineProps({
    codeObj: {
        type: Object,
        default: () => { }
    },
    isReadonly: {
        type: Boolean,
        default: false
    }
})

const handleVariable = (text: any, index: number) => {
    useExpertMode().setVariableByIndex({
        value: text, index
    })
}
let startHeight: number = 0, startY: number = 0

const mousedown = (event: any) => {
    isDragIng.value = true
    startY = event.clientY
    startHeight = variable.value.offsetHeight
    startMove()
}


const startMove = () => {
    document.documentElement.addEventListener('mousemove', mousemove)
    document.documentElement.addEventListener('mouseup', mouseup)
}

const mouseup = (event: any) => {
    isDragIng.value = false
    document.documentElement.removeEventListener('mousemove', mousemove)
    document.documentElement.removeEventListener('mouseup', mouseup)
}

const mousemove = (event: any) => {
    if (isDragIng.value) {
        const newHeight = startHeight + event.clientY - startY
        // 重新计算高度 
        variable.value.style.height = newHeight + 'px'

    }
}

const zoomToDialog = () => {
    zoomShow.value = true
}


</script>

<style scoped lang='scss'>
.code-box {
    height: 100%;

    .code-variable-box {
        // border-bottom: 1px solid #eeeeee;
        height: 300px;
        display: block;
        overflow: auto;
    }

    .code-context-box-title {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        padding: 20px 20px 0;

        .el-icon svg {
            width: 20px;
            height: 20px;
        }
    }

    .code-dialog-content {
        height: calc(100vh - 25vh);
        white-space: pre-line;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        overflow: auto;
        padding: 0 10px;
    }

    .code-context-box {
        background-color: #f5f8fa;
        white-space: pre-line;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        overflow: auto;
        height: calc(100% - 34px);
        flex: 1;
        position: relative;

        &::-webkit-scrollbar {
            width: 0px;
            height: 7px;
        }
    }

    .mobile-bar {
        width: 100%;
        height: 1px;
        border-top: 1px solid #EEEEEE;
        position: relative;

        img {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            cursor: ns-resize;
        }
    }
}
</style>