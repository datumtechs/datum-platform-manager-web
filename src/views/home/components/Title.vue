<template>
    <el-space :size="10">
        <slot name="pic" class></slot>
        <slot name="text">
            <p class="leading-25px font-bold">{{ props.text }}</p>
        </slot>
    </el-space>
</template>
<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        require: true
    }
});
</script>
