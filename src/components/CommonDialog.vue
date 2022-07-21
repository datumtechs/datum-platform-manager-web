<template>
    <el-dialog custom-class="common-dialog" v-model="props.show" modal append-to-body :width="480"
        :title="props.title" :destroy-on-close="true">
        <slot name="content"></slot>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="w-100px" style="height: 32px;" round @click="cancel">
                    {{
                            t('common.cancel')
                    }}</el-button>
                <el-button class="w-100px" style="height: 32px;" round type="primary"
                    @click="submit">{{
                            t('common.confirm')
                    }}
                </el-button>
            </span>

        </template>
    </el-dialog>
</template>

<script setup lang='ts'>

const emits = defineEmits(['update:show', 'submit'])

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
    emits('submit');
}
const cancel = () => {
    emits('update:show', false)
}
</script>

<style scoped lang='scss'>
</style>
