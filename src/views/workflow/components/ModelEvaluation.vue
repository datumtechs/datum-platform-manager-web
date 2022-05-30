<template>
    <!-- <el-input v-model="props.modelEvaluate" :rows="10" type="textarea" placeholder="" /> -->
    <el-descriptions :title="`${t('workflow.modelEvaluationResult')} :`" direction="horizontal"
        :column="1" class="w-600px" border>
        <el-descriptions-item label-class-name="result-label" class-name="result-content"
            v-for="item in modelList" :key="item.value" :label="`${item.label}`">{{
                    item.value
            }}</el-descriptions-item>
    </el-descriptions>

</template>

<script setup lang='ts'>
const { t } = useI18n()
const props = defineProps({
    modelEvaluate: {
        type: String,
        default: ""
    }
})

const modelList: any = ref([])

const init = () => {
    if (props.modelEvaluate) {
        const obj = JSON.parse(props.modelEvaluate)
        Object.keys(obj).forEach(key => {
            let newObj = {
                label: key,
                value: obj[key]
            }
            modelList.value.push(newObj);
        })
    }

}

onMounted(() => {
    init()
})
</script>
<style lang="scss" scoped>
:deep(.el-descriptions__cell) {
    &.result-label {
        white-space: nowrap;
        width: 150px !important
    }

    &.result-content {
        color: #393939;
        font-family: DINPro-Bold, Ali-Bold;
    }
}
</style>