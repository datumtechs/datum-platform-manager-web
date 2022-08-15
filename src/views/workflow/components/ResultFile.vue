<template>
    <el-table :data="props.tableData" border class="mb-30px" row-key="lName" :show-header="false">
        <el-table-column class-name="h-100px">
            <template #default="{ row }">
                <div class="px-32px">
                    <p class="text-color-[#999999]">{{ t(`${row.lName}`) }}:</p>
                    <p class="text-color-[#393939] font-bold">{{ row.lProp }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column class-name="h-100px">
            <template #default="{ row }">
                <div v-if="row.rType" class="px-32px">
                    <p class="text-color-[#999999] mb-10px">{{ t(`${row.rName}`) }}:</p>
                    <div class="mb-20px" v-for="item in row.rProp">
                        <el-descriptions :column="1" border>
                            <el-descriptions-item label-class-name="file-label"
                                class-name="file-content" :label="t('workflow.orgName')">{{
                                        item.org.nodeName
                                }}
                            </el-descriptions-item>
                            <el-descriptions-item label-class-name="file-label"
                                class-name="file-content" :label="t('workflow.orgID')">{{
                                        item.org.identityId
                                }}
                            </el-descriptions-item>
                            <el-descriptions-item label-class-name="file-label"
                                class-name="file-content" :label="t('workflow.fileUrl')">
                                <a href="javascript:void(0)" @click="downloadFn(item)"> {{
                                        item.filePath
                                }}</a>
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </div>
                <div v-else class="px-32px">
                    <p class="text-color-[#999999]">{{ t(`${row.rName}`) }}:</p>
                    <p class="text-color-[#393939] font-bold">{{ row.rProp }}</p>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
<script lang="ts" setup>
import { downloadResultFile } from '@/api/workflow'
import { downloadFile } from '@/utils'
const { t } = useI18n()
const props = defineProps({
    tableData: {
        type: Array,
        default: () => []
    }
})

const downloadFn = (item: any) => {
    console.log(item);

    downloadResultFile({
        metaDataId: item.metadataId
    }).then(res => {
        if (res) downloadFile(res, item.metadataId)
    }).catch(e => {
        console.log(e);
    })
}


</script>
<style scoped lang='scss'>
:deep(.el-descriptions__cell) {
    &.file-label {
        white-space: nowrap;
    }

    &.file-content {
        color: #393939;
        font-family: DINPro-Bold, Ali-Bold;
    }
}
</style>