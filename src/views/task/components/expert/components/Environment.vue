<template>
    <div class="p-30px env-box">
        <p class="text-color-[#333] font-bold">{{ $t('expert.setAlgoEnv') }}</p>
        <div class="mt-40px">
            <p>{{ $t('expert.minimumResource') }}</p>
            <div class="mt-20px">
                <p class="mb-10px">{{ $t('common.cpu') }}</p>
                <el-select
                    class="w-full"
                    v-model.trim="obj.cores"
                    placeholder="Select"
                    size="large"
                >
                    <el-option
                        v-for="item in cpuOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>
            <div class="mt-20px">
                <p class="mb-10px">{{ $t('common.memory') }}</p>
                <el-input
                    min="1"
                    type="number"
                    class="no-number"
                    oninput="value=value.replace(/[^0-9]/g,'')"
                    v-model.trim="obj.memory"
                >
                    <template #suffix>
                        <p class="font-14px leading-40px">MB</p>
                    </template>
                </el-input>
            </div>
            <div class="mt-20px">
                <p class="mb-10px">{{ $t('common.bandwidth') }}</p>
                <el-input
                    min="1"
                    type="number"
                    class="no-number"
                    oninput="value=value.replace(/[^0-9]/g,'')"
                    v-model.trim="obj.bandwidth"
                >
                    <template #suffix>
                        <p class="font-14px leading-40px">Mbps</p>
                    </template>
                </el-input>
            </div>
        </div>
        <div class="mt-30px">
            <p class="mb-10px">{{ $t('expert.longestComputingTime') }}</p>
            <el-input
                min="1"
                type="number"
                class="no-number"
                oninput="value=value.replace(/[^0-9]/g,'')"
                v-model.trim="obj.longestComputingTime"
            >
                <template #suffix>
                    <p class="font-14px leading-40px">{{ $t('common.minute') }}</p>
                </template>
            </el-input>
        </div>
    </div>
</template>

<script setup lang='ts'>
const { t } = useI18n()
const cpuOptions = computed(() => [
    {
        id: 1,
        value: '1',
        label: `1 ${t('common.cores')}`
    },
    {
        id: 2,
        value: '2',
        label: `2 ${t('common.cores')}`
    },
    {
        id: 3,
        value: '4',
        label: `4 ${t('common.cores')}`
    },
    {
        id: 4,
        value: '8',
        label: `8 ${t('common.cores')}`
    },
    {
        id: 5,
        value: '16',
        label: `16 ${t('common.cores')}`
    },
])

const obj = reactive({
    cores: '1',
    memory: 32,
    bandwidth: 32,
    longestComputingTime: 1
});
</script>

<style scoped lang='scss'>
.env-box {
}
</style>