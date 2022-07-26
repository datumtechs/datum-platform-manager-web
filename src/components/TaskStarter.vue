<template>
    <el-dialog v-model="props.show" :title="props.title" :width="'591px'"
        custom-class="starterDialog" :before-close="handleClose"
        @close="emits('update:show', false)">
        <div class="starter-wrapper">
            <div v-for="(item, index) in radioGroupAry" class="starter-box">
                <!-- <div class="starter-box-title font-bold text-16px text-color-#[000] leading-44px"> -->
                <p class="starter-title font-bold text-[#333]">{{ item.metaDataName }}</p>
                <el-select class="starter-selector" v-model="selectAry[index]"
                    :placeholder="$t('workflow.selectTokenOfData')">
                    <el-option v-for="ele in item.haveAttributesCredentialList" :value="ele.id"
                        :label="`${ele.tokenName} ( ${ele.tokenSymbol} )`" :key="ele.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button class="footer-btn" @click="emits('update:show', false)">
                    {{
                            $t('common.cancel')
                    }}
                </el-button>
                <el-button class="footer-btn" type="primary" @click="startUp">
                    {{
                            $t('common.startUp')
                    }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { preparationStartCredentialList } from '@/api/workflow'
const { t } = useI18n()

const handleClose = () => {
    emits('update:show', false)
}
const radioGroupAry: any = ref([])

const selectAry: any = ref([])

const emits = defineEmits(['update:show', 'startTask'])
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    show: {
        type: Boolean,
        default: false
    },
    workflowId: {
        type: String,
        default: ''
    },
    workflowVersionId: {
        type: Number,
        default: -1
    }
})
const startUp = () => {
    // TODO 校验
    if (selectAry.value.length && selectAry.value.length === radioGroupAry.value.length) {
        emits('startTask', selectAry.value)
    } else {
        ElMessage.error(t('workflow.selectCredentialForData'))
    }

}
onMounted(() => {
    preparationStartCredentialList({
        workflowId: props.workflowId,
        workflowVersion: props.workflowVersionId,

    }).then(res => {
        const { code, data } = res
        if (code === 10000) {
            data.forEach((ele: any) => {
                ele.haveAttributesCredentialList.unshift(ele.noAttributesCredential)
            });
            radioGroupAry.value = data
        }
    })
})
</script>

<style scoped lang='scss'>
.starter-wrapper {

    // max-height: 513px;
    .starter-box {
        height: 54px;
        padding: 20px;
        border: 1px solid #eeeeee;
        border-radius: 8px;
        display: flex;
        align-items: center;

        &:not(:last-child) {
            margin-bottom: 20px;
        }

        .starter-title {
            flex-basis: 200px;
        }

        .starter-selector {
            width: 100%;
            padding-left: 9px;

            :deep(.el-input__inner) {
                border-radius: 24px;
            }
        }

        // .starter-box-title {
        //     height: 44px;
        //     border-bottom: 1px solid #eeeeee;

        //     p {
        //         padding-left: 30px;
        //     }
        // }

        // .starter-box-content-box {
        //     height: 106px;
        //     padding: 13px 30px;
        //     width: 100%;
        //     font-size: 14px;
        //     // margin: 13px 30px;
        //     // overflow-y: auto;

        //     :deep(.el-radio-group) {
        //         width: 100%;
        //         display: flex;
        //         flex-direction: column;
        //         flex-wrap: nowrap;
        //         overflow-y: auto;
        //         align-items: flex-start;
        //     }

        //     .starter-box-content {
        //         margin-bottom: 10px;
        //     }

        // }
    }


}

.dialog-footer {
    .footer-btn {
        width: 100px;
        height: 40px;
        border-radius: 25px !important;
    }
}
</style>