<template>
    <el-dialog v-model="props.show" :title="title" width="20%" :before-close="handleClose">
        <div class="pending-wrapper">
            <img class="w-140px h-140px" src="@/assets/images/global/pending-98.gif" alt="">
            <div>
                <p class="text-24px mt-20px">{{ t('auth.waitForConfirm') }}</p>
                <p class="text-16px my-30px">{{ content }}</p>
                <p class="text-14px mb-20px">{{ t('auth.waitWalletConfirm') }}</p>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang='ts'>
const { t } = useI18n()
const emits = defineEmits(['update:show'])
const props = defineProps({
    show: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: '确认提交'
    },
    content: {
        type: String,
        default: ''
    }
})

const handleClose = () => {
    emits('update:show', false)
}
</script>

<style scoped lang='scss'>
.pending-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 40px;
    text-align: center;
}
</style>