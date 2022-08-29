<template>
    <div class="p-30px env-box h-full overflow-auto">
        <p class="text-color-[#333] font-bold">{{  t('expert.setAlgoEnv')  }}</p>
        <div class="mt-40px">
            <p>{{  t('expert.minimumResource')  }}</p>
            <div class="mt-20px">
                <p class="mb-10px">{{  t('common.cpu')  }}</p>
                <el-select :disabled="true" class="w-full" v-model="props.envObj.costCpu" @change="handleCpuChangeFn"
                    placeholder="Select" size="large">
                    <el-option v-for="item in cpuOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="mt-20px">
                <p class="mb-10px">{{  t('common.memory')  }}</p>
                <el-input :disabled="true" min="1" type="number" class="no-number"
                    oninput="value=value.replace(/[^0-9]/g,'').replace(/\b(0+)/gi,'')" @change="handleMemoryChangeFn"
                    v-model.trim="props.envObj.costMem">
                    <template #suffix>
                        <p class="font-14px leading-40px">MB</p>
                    </template>
                </el-input>
            </div>
            <div class="mt-20px">
                <p class="mb-10px">{{  t('common.bandwidth')  }}</p>
                <el-input :disabled="true" type="number" class="no-number"
                    oninput="value=value.replace(/[^0-9]/g,'').replace(/\b(0+)/gi,'')" @change="handleBandwidthChangeFn"
                    v-model.trim="props.envObj.costBandwidth">
                    <template #suffix>
                        <p class="font-14px leading-40px">Mbps</p>
                    </template>
                </el-input>
            </div>
        </div>
        <div class="mt-30px">
            <p class="mb-10px">{{  t('expert.longestComputingTime')  }}</p>
            <el-input :disabled="isReadonly" min="1" type="number" class="no-number"
                oninput="value=value.replace(/\b(0+)/gi,'').replace(/[^0-9]/g,'')" @change="handleRuntimeChangeFn"
                v-model.trim="props.envObj.runTime">
                <template #suffix>
                    <p class="font-14px leading-40px">{{  t('common.minute')  }}</p>
                </template>
            </el-input>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useExpertMode } from '@/stores'
const { t } = useI18n()

const props = defineProps({
    envObj: {
        type: Object,
        default: () => { }
    },
    isReadonly: {
        type: Boolean,
        default: false
    }
})

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

const handleCpuChangeFn = (cpu: string) => {
    useExpertMode().setEnvByType({
        type: 'costCpu',
        data: cpu
    })
}
const handleMemoryChangeFn = (costMem: string) => {
    useExpertMode().setEnvByType({
        type: 'costMem',
        data: costMem
    })
}
const handleBandwidthChangeFn = (costBandwidth: string) => {
    useExpertMode().setEnvByType({
        type: 'costBandwidth',
        data: costBandwidth
    })
}
const handleRuntimeChangeFn = (runTime: string) => {
    useExpertMode().setEnvByType({
        type: 'runTime',
        data: runTime
    })
}


</script>