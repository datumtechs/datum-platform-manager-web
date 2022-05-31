<template>
    <el-dialog v-model="props.show" @opened="openFn" append-to-body destroy-on-close width="320px"
        custom-class="nameDialog" @close="emit('update:show', false)">
        <el-icon @click="emit('update:show', false)" class="dialog-close">
            <Close />
        </el-icon>
        <div class="font-bold text-14px leading-18px text-color-[#333]">{{
                t('expert.inputNameTips')
        }}</div>
        <div class="mt-10px mb-20px h-50px">
            <!-- <el-input v-model="workflowName" /> -->
            <el-form ref="nameFormRef" @submit.prevent :rules="rules" :model="nameForm"
                style="max-width: 460px">
                <el-form-item prop="name">
                    <el-input ref="inputRef" v-model.trim="nameForm.name" />
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
            <el-button class="w-full h-40px" type="primary" round @click="submitForm(nameFormRef)">
                {{ t('common.submit') }}</el-button>
        </span>
    </el-dialog>
</template>

<script setup lang='ts'>
import { Close } from '@element-plus/icons-vue'
import { useDebounceFn } from '@vueuse/core'
const { t } = useI18n()
const emit = defineEmits(['submit', 'update:show'])
const nameFormRef = ref<any>(null)
const inputRef = ref<any>(null)

const openFn = () => {
    nextTick(() => {
        inputRef.value.focus()
    })
}
const checkName = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        callback()
    }, 500)
}
const rules = reactive({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 8, max: 64, message: 'Length should be 8 to 64', trigger: 'blur' },
        { validator: checkName, trigger: 'blur' }
    ]
})

const submitForm = useDebounceFn(async (form: any) => {
    if (!form) return
    await form.validate((valid: any, fields: any) => {
        if (valid) {
            emit('submit', nameForm.name)
        } else {
            console.log('error submit!', fields)
        }
    })
}, 1000)


const props = defineProps({
    show: {
        type: Boolean, default: true
    },
    beforeName: {
        type: String, default: ''
    }
})

const nameForm = reactive({
    name: props.beforeName
})

</script>

<style scoped lang='scss'>
</style>