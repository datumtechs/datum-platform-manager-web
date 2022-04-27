<template>
    <div class="code-box">
        <div v-if="props.codeObj?.algorithmVariableList.length > 0"
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
        <div class="w-340px bg-primary m-20px code-context-box">
            <p class="text-color-[#333] font-bold pb-20px">{{ t('expert.algoCode') }}</p>
            <div v-html="props.codeObj.code"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useExpertMode } from '@/stores'
const { t } = useI18n()
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
        overflow-y: auto;
        height: calc(100% - 34px);
    }

    ::-webkit-scrollbar {
        width: 0px;
        height: 10px;
        background-color: #f5f5f5;
    }
}
</style>