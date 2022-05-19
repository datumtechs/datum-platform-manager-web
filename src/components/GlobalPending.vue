<template>
    <el-dialog v-model="props.show" :title="title" width="20%" :before-close="handleClose">
        <div class="pending-wrapper">
            <img class="w-100px " src="@/assets/images/global/pending.svg" alt="">
            <div>
                <p class="text-16px my-10px text-color-[#333] font-medium">{{
                        t('auth.waitForConfirm')
                }}</p>
                <p class="text-14px text-color-[#666] leading-22px">{{ content }}</p>
                <p class="text-14px mb-50px leading-22px">{{ t('auth.waitWalletConfirm') }}</p>
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
        default: false
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
    text-align: center;
}
</style>