<template>
    <div class="flex-1 h-full relative">
        <DetailBanner :backShow="true">
            <template #briefInfo>Identifier：XXXXXXXXXXXXXXXXXXXXX</template>
            <template #machineInfo class="flex">
                <div class="flex text-center">
                    <div class="flex flex-col w-160px relative borderR">
                        <p
                            class="text-14px text-color-[#999999] leading-20px"
                        >{{ $t('node.totalCpu') }}</p>
                        <p class="text-14px text-color-[#333] mt-4px font-bold">1111</p>
                    </div>
                    <div class="flex flex-col w-160px relative borderR">
                        <p
                            class="text-14px text-color-[#999999] leading-20px"
                        >{{ $t('node.totalMemory') }}</p>
                        <p class="text-14px text-color-[#333] mt-4px font-bold">2222</p>
                    </div>
                    <div class="flex flex-col w-160px">
                        <p
                            class="text-14px text-color-[#999999] leading-20px"
                        >{{ $t('node.totalBandwidth') }}</p>
                        <p class="text-14px text-color-[#333] mt-4px font-bold">33333</p>
                    </div>
                </div>
            </template>
        </DetailBanner>
        <div class="mt-30px max-w-1200px px-25px mx-auto">
            <div class="w-427px h-50px">
                <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
            </div>
            <!-- <DataTable v-if="activekey === 0" />
            <ComputationTable v-else />-->
        </div>
    </div>
</template>

<script setup lang='ts'>
const activekey = ref(0)
const list = reactive([
    {
        name: 'myData.basicInfo'
    },
    {
        name: 'myData.metadata'
    },
    {
        name: 'myData.tasksInvolved'
    }
])
const tabsChange = (index: string) => {
    console.log(index);
    activekey.value = +index
}
</script>

<style scoped lang='scss'>
</style>