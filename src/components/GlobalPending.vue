<template>
    <el-dialog v-model="props.show" :title="props.title" :width="'400px'"
        :before-close="handleClose" @close="emits('update:show', false)">
        <div class="pending-wrapper">
            <img class="w-100px " src="@/assets/images/global/pending.svg" alt="">
            <div>
                <p class="text-16px my-10px text-color-[#333] font-medium">{{
                        t('auth.waitWalletConfirm')
                }}</p>
                <p class="text-14px text-color-[#666] leading-22px" v-html="props.content">
                </p>
                <slot name="consume"></slot>
                <!-- <p class="text-14px font-medium mt-20px mb-50px leading-22px">{{
                        t('auth.waitWalletConfirm')
                }}</p> -->
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
    width: 300px;
    margin: 0 auto;
}
</style>