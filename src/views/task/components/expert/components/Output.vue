<template>
    <div class="p-30px">
        <p class="text-color-[#333] font-bold">{{ $t('expert.configureOutput') }}</p>
        <p class="mt-30px">{{ $t('expert.saveNotes') }}</p>
        <div v-if="workflowNodeSenderIdentityId">
            <p class="mt-30px text-color-[#333] font-bold">{{ $t('role.resultConsumer') }}</p>
            <el-checkbox-group
                v-model="checkList"
                :disabled="viewModel === 'view'"
                class="mt-10px"
                @change="handleCheckboxChange"
            >
                <el-checkbox
                    v-for="(item, index) in orgList"
                    :key="index"
                    :label="item.identityId"
                    :disabled="isDisable(item.identityId)"
                >
                    <span class="checkbox-label">{{ item.nodeName }}</span>
                </el-checkbox>
            </el-checkbox-group>
        </div>

        <p class="mt-30px text-color-[#333] font-bold">{{ $t('expert.storageForm') }}</p>
        <p class="mt-10px">{{ $t('expert.plaintext') }}</p>
    </div>
</template>

<script setup lang='ts'>
const workflowNodeSenderIdentityId = ''
const viewModel = ''
const checkList: any[] = []
const orgList: any[] = [{

}]

const isDisable = (id: string) => false

const handleCheckboxChange = () => { }
</script>

<style scoped lang='scss'>
</style>