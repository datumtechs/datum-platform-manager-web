<template>
    <el-dialog v-model="props.show" append-to-body :title="props.title" :width="'591px'"
        custom-class="starterDialog" :before-close="handleClose"
        @close="emits('update:show', false)">
        <div v-loading="starterLoading" class="starter-wrapper">
            <div class="flex mb-20px mt-(-10px)">
                <el-icon :size="20" color="#333">
                    <Warning />
                </el-icon>
                <p class="pl-8px">{{ $t('workflow.filterOverdueTip') }}</p>
            </div>
            <div v-for="(item, index) in radioGroupAry" class="starter-box">
                <!-- <div class="starter-box-title font-bold text-16px text-color-#[000] leading-44px"> -->
                <p class="starter-title font-bold text-[#333]">{{ item.metaDataName }}</p>
                <el-select v-if="item.haveAttributesCredentialList" class="starter-selector"
                    v-model="selectAry[index]" :placeholder="$t('workflow.selectTokenOfData')">
                    <el-option v-for="ele in item.haveAttributesCredentialList" :value="ele.id"
                        :label="tokenLabel(ele)" :key="ele.id">
                    </el-option>
                </el-select>
                <p v-else class="flex-1">
                    <span v-if="locale === 'zh'">数据未包含凭证, 请前往
                        <router-link to="/marketplace">数据市场</router-link>
                        购买
                    </span>
                    <span v-else>The data does not contain the certificate, please go to the
                        <router-link to="/marketplace">data market</router-link> to
                        purchase.
                    </span>
                </p>
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
import { useFormatTime } from '@/hooks'
import { ElMessage } from 'element-plus'
import { Warning } from '@element-plus/icons-vue'
const { t, locale } = useI18n()
const starterLoading = ref(false)
const tokenLabel = (ele: any) => {
    if (ele.tokenSymbol) {
        return `${ele.tokenName}` + ` ( ${ele.tokenSymbol} ) `
    } else {
        return `${ele.tokenName}` + ` ( ${t('common.expireTime')}: ` + `  ${useFormatTime(+ele.characteristic)} )`
    }
}

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

const setFirstOption = (): void => {
    const len = radioGroupAry.value.length
    if (len > 0) {
        for (let i = 0; i < len; i++) {
            console.log('radioGroupAry[i]', radioGroupAry.value[i].haveAttributesCredentialList[0]);
            // console.log('radioGroupAry[i]', radioGroupAry.value[i].haveAttributesCredentialList);
            selectAry.value[i] = radioGroupAry?.value[i]?.haveAttributesCredentialList[0]?.id || ""
        }
    }
}

const queryList = () => {
    starterLoading.value = true
    preparationStartCredentialList({
        workflowId: props.workflowId,
        workflowVersion: props.workflowVersionId,

    }).then(res => {
        starterLoading.value = false
        const { code, data } = res
        if (code === 10000) {
            data.forEach((ele: any) => {
                ele.haveAttributesCredentialList.unshift(ele.noAttributesCredential)
            });
            radioGroupAry.value = data
            setFirstOption()
        }
    }).catch(err => {
        starterLoading.value = false
    })
}



onMounted(() => {
    queryList()
})
</script>

<style scoped lang='scss'>
.starter-wrapper {

    // max-height: 513px;
    .starter-box {
        min-height: 54px;
        padding: 20px;
        border: 1px solid #eeeeee;
        border-radius: 8px;
        display: flex;
        align-items: center;

        &:not(:last-child) {
            margin-bottom: 20px;
        }

        .starter-title {
            flex-basis: 150px;
            margin-right: 20px;
        }

        .starter-selector {
            padding-left: 20px;
            flex: 1;

            :deep(.el-input__inner) {
                border-radius: 24px;
            }
        }
    }
}

.dialog-footer {
    .footer-btn {
        width: 100px;
        height: 40px;
        border-radius: 25px !important;
    }
}

.el-select-dropdown__list {
    .el-select-dropdown__item {
        padding: 10px 32px 10px 20px;
        white-space: pre-wrap;
        text-overflow: unset;
        min-height: 34px;
        height: unset;
        line-height: 34px;
    }
}
</style>