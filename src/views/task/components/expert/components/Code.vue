<template>
    <div class="code-box">
        <div class="code-variable-box py-20px">
            <el-space class="mb-10px px-20px"
                v-for="(item, index) in props.codeObj.algorithmVariableList" :key="item.varKey">
                <p class="w-140px">{{ item.varKey }}</p>
                <el-input class="round-input" @change="handleVariable($event, index)"
                    v-model="item.varValue" />
            </el-space>
        </div>
        <div class="w-340px bg-primary m-20px code-context-box">
            <div v-html="props.codeObj.code"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useExpertMode } from '@/stores'
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

</script>

<style scoped lang='scss'>
.code-box {
    height: 100%;

    .code-variable-box {
        border-bottom: 1px solid #eeeeee;
    }

    .code-context-box {
        background-color: #f5f8fa;
        white-space: pre-line;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        overflow-y: scroll;
        height: calc(100% - 231px);
    }
}
</style>