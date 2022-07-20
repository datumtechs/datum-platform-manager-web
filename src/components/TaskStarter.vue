<template>
    <el-dialog v-model="props.show" :title="props.title" :width="'591px'"
        custom-class="starterDialog" :before-close="handleClose"
        @close="emits('update:show', false)">
        <div class="starter-wrapper">
            <div v-for="(data, index) in 4" class="starter-box">
                <!-- <div class="starter-box-title font-bold text-16px text-color-#[000] leading-44px"> -->
                <p class="starter-title font-bold text-[#000]">Data-{{ index + 1 }}</p>
                <el-select class="starter-selector" :placeholder="$t('workflow.selectTokenOfData')">
                    <!-- <el-option></el-option> -->
                </el-select>
                <!-- </div> -->
                <!-- <div class="starter-box-content-box flex">
                    <el-radio-group v-model="radioGroupAry[index]">
                        <el-radio class="starter-box-content" v-for="(token, num) in 4"
                            :label="num + ''">Bank {{ radioGroupAry[index] }}
                            Token A (Taken{{ num }}) 失效日期:2022-04-22
                        </el-radio>
                    </el-radio-group>
                </div> -->
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button class="footer-btn" @click="emits('update:show', false)">
                    {{
                            $t('common.cancel')
                    }}
                </el-button>
                <el-button class="footer-btn" type="primary" @click="">{{
                        $t('common.startUp')
                }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
const { t } = useI18n()
const handleClose = () => {
    emits('update:show', false)
}
const radioGroupAry = ref([
    '0', '0', '0', '0'
])

const emits = defineEmits(['update:show'])
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    show: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped lang='scss'>
.starter-wrapper {
    // max-height: 513px;
    overflow-y: auto;

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
            flex-basis: 120px;
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