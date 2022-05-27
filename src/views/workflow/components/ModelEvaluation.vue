<template>
    <el-input v-model="props.modelEvaluate" :rows="10" type="textarea" placeholder="" />
</template>

<script setup lang='ts'>
const props = defineProps({
    modelEvaluate: {
        type: String,
        default: ""
    }
})
</script>
