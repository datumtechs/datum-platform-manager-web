<template>
    <div class="flex-1 h-full relative">
        <div class="main-content mt-30px max-w-1200px mx-auto overflow-hidden">
            <div class="inline-block h-50px">
                <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
            </div>
            <!-- <DataTable v-if="activekey === 0" />
            <ComputationTable v-else />-->
            <BaseInfo v-if="activekey === 0" :tableData="tableData" />
            <MetaData v-if="activekey === 1" :data="metadataData" />
            <TaskInvolved v-if="activekey === 2" :metaDataId="metaDataId" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import BaseInfo from '@/components/dataComponents/BaseInfo.vue'
import MetaData from '@/components/dataComponents/MetaData.vue'
import TaskInvolved from '@/components/dataComponents/TaskInvolved.vue'
import { queryDataDetails } from '@/api/data'
import { useFormatTime } from '@/hooks'
import { enums } from '@/utils/enum'

const route = useRoute()
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

const metaDataId: any = computed(() => route.query.metaDataId || '')

const metadataData = ref([])
const tableData = ref<any[]>([])
const { t } = useI18n()

// const industry = computed(() => t(enums.industry[data.industry]))

const getDataDetails = async () => {
    const { code, data } = await queryDataDetails({ metaDataId: metaDataId.value })

    if (code == 10000) {
        tableData.value = [{
            lName: 'myData.dataName',
            lProp: data.metaDataName,
            rName: 'myData.credentialSymbol',
            rProp: data.tokenSymbol,
        }, {
            lName: 'myData.launchTime',
            lProp: useFormatTime(data.publishedAt),
            rName: 'myData.industryData',
            rProp: t(enums.industry[data.industry])
        }, {
            lName: 'myData.dataFormat',
            lProp: data.fileType,
            rName: 'myData.dataSize',
            rProp: data.size,
        }, {
            lName: 'myData.rowsData',
            lProp: data.rows,
            rName: 'myData.columnsData',
            rProp: data.columns,
        }, {
            lName: 'myData.dataDescription',
            lProp: data.remarks,
            last: true
        }]
        metadataData.value = data.columnsList
    }
}

onMounted(() => {
    getDataDetails()
})

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