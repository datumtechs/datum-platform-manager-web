<template>
    <div class="code-box flex flex-col">
        <div v-if="props.codeObj?.algorithmVariableList.length > 0" ref="variable"
            class="code-variable-box py-20px">
            <p class="text-color-[#333] font-bold px-20px pb-10px">{{ t('expert.algoVariable') }}
            </p>
            <el-space class="mb-10px px-20px"
                v-for="(item, index) in props.codeObj.algorithmVariableList" :key="item.varKey">
                <p class="w-140px">{{ item.varKey }}</p>
                <el-input class="round-input" @change="handleVariable($event, index)"
                    v-model="item.varValue" />
            </el-space>
        </div>
        <div v-if="props.codeObj?.algorithmVariableList.length > 0" class="h-20px mobile-bar"
            @mousedown.prevent="mousedown">
            <i></i>
            <i></i>
        </div>
        <div class="w-340px bg-primary m-20px code-context-box">
            <p class="text-color-[#333] font-bold pb-20px">{{ t('expert.algoCode') }}</p>
            <div v-html="props.codeObj.code"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useExpertMode } from '@/stores'
const { t } = useI18n()
const variable: any = ref(null)

const isDragIng = ref(false)
const props = defineProps({
    codeObj: {
        type: Object,
        default: () => { }
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

    .code-context-box {
        background-color: #f5f8fa;
        white-space: pre-line;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        overflow: auto;
        height: calc(100% - 34px);
        flex: 1;

        &::-webkit-scrollbar {
            width: 0px;
            height: 10px;
            background-color: #f5f5f5;
        }
    }


    .mobile-bar {
        width: 100%;
        height: 10px;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, .4);
        cursor: row-resize;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        i {
            width: 20px;
            height: 1px;
            background-color: #eee;
            margin: 1px 0;
        }
    }
}
</style>