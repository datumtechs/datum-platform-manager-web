<template>
    <div class="nameDialog">
        <el-dialog v-model="props.show" destroy-on-close width="320px"
            @close="emit('update:show', false)">
            <div class="font-bold text-14px leading-18px text-color-[#333]">{{
                    t('expert.inputNameTips')
            }}</div>
            <div class="mt-10px mb-20px h-50px">
                <!-- <el-input v-model="workflowName" /> -->
                <el-form ref="nameFormRef" @submit.prevent :rules="rules" :model="nameForm"
                    style="max-width: 460px">
                    <el-form-item prop="name">
                        <el-input v-model="nameForm.name" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="mt20px mb-18px">
                <p>1. {{ t('expert.cannotModify') }}</p>
                <p>2. {{ t('expert.noLimitType') }}</p>
                <p>3. {{ t('expert.leastCharacter') }}</p>
                <p>4. {{ t('expert.mostCharacter') }}</p>
            </div>
            <span class="dialog-footer">
                <el-button class="w-full h-40px" type="primary" round
                    @click="submitForm(nameFormRef)">
                    {{ t('common.submit') }}</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script setup lang='ts'>
const { t } = useI18n()
const emit = defineEmits(['submit', 'update:show'])
const nameFormRef = ref<any>()
const rules = reactive({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 8, max: 64, message: 'Length should be 8 to 64', trigger: 'blur' },
    ]
})


const submitForm = async (form: any) => {
    if (!form) return
    await form.validate((valid: any, fields: any) => {
        if (valid) {
            emit('submit', nameForm.name)
        }
    })
}

const nameForm = reactive({
    name: ''
})
const props = defineProps({
    show: {
        type: Boolean, default: true
    }
})

</script>

<style scoped lang='scss'>
.nameDialog {
    :deep(.el-dialog__header) {
        display: none;
    }

    :deep(.el-dialog__body) {
        padding: 36px 30px 25px;
    }

    :deep(.el-input__inner) {
        height: 50px;
    }
}
</style>