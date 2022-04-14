<template>
    <el-dialog v-model="props.show" :width="480" :title="props.title" :destroy-on-close="true">
        <slot name="content"></slot>
    </el-dialog>
</template>

<script setup lang='ts'>

const emits = defineEmits(['callback'])

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    } // `${t('task.pleaseEnter')}${t('auth.authQuantity')}`
})
const { t } = useI18n();
const submit = () => {
    emits('callback', 'submit');
}
const cancel = () => {
    emits('callback', 'cancel');
}
</script>

<style scoped lang='scss'>
</style>