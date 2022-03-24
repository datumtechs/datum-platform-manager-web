<template>
    <div class="flex-1 h-full relative">
        <DetailBanner :backShow="true" @back="router.go(-1)">
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
            <div class="inline-block h-50px">
                <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
            </div>
            <!-- <DataTable v-if="activekey === 0" />
            <ComputationTable v-else />-->
            <BaseInfo v-if="activekey === 0" :tableData="tableData" />
            <MetaData v-if="activekey === 1" />
            <TaskInvolved v-if="activekey === 2" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import BaseInfo from '@/components/dataComponents/BaseInfo.vue'
import MetaData from '@/components/dataComponents/MetaData.vue'
import TaskInvolved from '@/components/dataComponents/TaskInvolved.vue'

const router = useRouter()
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
    activekey.value = +index
}
const tableData = reactive([{
    lName: 'myData.dataName',
    lProp: "dataName",
    rName: 'myData.credentialSymbol',
    rProp: "credentialSymbol",
}, {
    lName: 'myData.launchTime',
    lProp: "launchTime",
    rName: 'myData.industryData',
    rProp: "industryData",
}, {
    lName: 'myData.dataFormat',
    lProp: "dataFormat",
    rName: 'myData.dataSize',
    rProp: "dataSize",
}, {
    lName: 'myData.rowsData',
    lProp: "rowsData",
    rName: 'myData.columnsData',
    rProp: "columnsData",
}, {
    lName: 'myData.dataDescription',
    lProp: "dataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescription",
    last: true
}])
</script>

<style scoped lang='scss'>
.borderR:after {
    content: "";
    height: 48px;
    width: 1px;
    background: #eee;
    position: absolute;
    right: 0;
}
</style>