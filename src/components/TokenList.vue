<template>
    <el-dialog custom-class="tokenDialog" v-model="showDialog" :title="props.title" :width="'871px'"
        @close="emits('update:showDialog', false)">
        <div class="token-table-box">
            <p class="token-table-box-title font-bold">{{ $t('common.noAttributeCredential') }}</p>
            <el-table :data="nfTokenData">
                <el-table-column type="index" width="80" :label="$t('common.num')">
                </el-table-column>
                <el-table-column prop="tokenName" :label="$t('myData.credentialName')">
                </el-table-column>
                <el-table-column props="tokenSymbol" :label="$t('myData.credentialSymbol')">
                </el-table-column>
                <el-table-column props="holdings" :label="$t('myData.holdings')">
                </el-table-column>
                <el-table-column :label="$t('common.actions')">
                    <template>
                        <span class="font-medium  leading-20px link-btn" @click="">{{
                                $t('common.purchase')
                        }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="token-table-box">
            <p class="token-table-box-title font-bold">{{ $t('common.attributeCredential') }}</p>
            <el-table :data="nftTokenData">
                <el-table-column type="index" width="80" :label="$t('common.num')">
                </el-table-column>
                <el-table-column prop="tokenName" :label="$t('myData.credentialName')">
                </el-table-column>
                <el-table-column prop="credentialId" :label="$t('common.credentialId')">
                </el-table-column>
                <el-table-column prop="period" :label="$t('common.period')"></el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>

<script setup lang='ts'>
const { t } = useI18n()
const props = defineProps({
    showDialog: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    nfTokenData: {
        type: Array,
        default: () => []
    },
    nftTokenData: {
        type: Array,
        default: () => []
    }
})
const emits = defineEmits(['update:showDialog'])
</script>

<style scoped lang='scss'>
.token-table-box {
    margin-bottom: 40px;

    .token-table-box-title {
        font-size: 16px;
        margin-bottom: 18px;
        color: #000;
    }
}
</style>