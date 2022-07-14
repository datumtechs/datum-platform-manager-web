<template>
    <div v-if="type" class="stamp-wrapper"
        :style="{ 'background-color': (type === 'node' ? '#2B60E9' : '#774AFF') }">
        <slot name="content"></slot>
        {{ content }}
    </div>
</template>

<script setup lang='ts'>
const { t } = useI18n()
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: '可信组织'
    }
})
</script>

<style scoped lang='scss'>
.stamp-wrapper {
    // #2B60E9 
    // #774AFF 
    color: #fff;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-family: DINPro-Regular, Ali-Regular;
    display: inline-block;
    height: 20px;
    line-height: 14px;
}
</style>