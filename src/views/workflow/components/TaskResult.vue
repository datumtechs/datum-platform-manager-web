<template>
    <div class="flex-1 task-wrap com-main">
        <Banner :back-show="true" :bg-name="'clocksWatches'" :showRouter="false"
            :detailName="detailName" @back="router.go(-1)">
            <template #select>
                <ComTabs :keep="false"
                    :list="(modelEvaluate || informationValueEvaluate) ? modelList : list"
                    :activekey="activekey" @change="tabsChange" />
            </template>
        </Banner>
        <div class="com-main-data-wrap mt-63px main-content">
            <ResultFile v-if="activekey === 0" :tableData="tableData" />
            <TaskEvents v-if="activekey === 1" :data="eventList" />
            <DynamicOutput v-if="activekey === 2"
                :dataList="modelEvaluate ? modelEvaluate : informationValueEvaluate" />
            <!-- <DynamicOutput v-if="activekey === 2 && informationValueEvaluate"
                :dataList="informationValueEvaluate" /> -->
        </div>
    </div>
</template>
<script setup lang='ts'>
import ResultFile from './ResultFile.vue'
import DynamicOutput from './DynamicOutput.vue'
import { getWorkflowRunTaskResult } from '@/api/workflow'
import { useFormatTime, useDuring, useWorkflowDetailsMap } from '@/hooks'
const detailName = ref('')
const eventList = ref([])
const modelEvaluate = ref('')
const informationValueEvaluate = ref('')
const route = useRoute()
const router = useRouter()
const activekey = ref(0)
const modelList = [
    {
        name: 'computeTask.taskResult'
    },
    {
        name: 'computeTask.taskEvents'
    },
    {
        name: modelEvaluate.value ? 'computeTask.modelEvaluation' : 'computeTask.characteristicEngineering'
    }
]

const list = [
    {
        name: 'computeTask.taskResult'
    },
    {
        name: 'computeTask.taskEvents'
    }
]

const tableData = ref([{
    lName: 'computeTask.taskName',
    lProp: "",
    rName: 'computeTask.taskStatus',
    rProp: "",
}, {
    lName: 'computeTask.taskId',
    lProp: "",
    rName: 'computeTask.taskCategory',
    rProp: "",
}, {
    lName: 'computeTask.startTime',
    lProp: "",
    rName: 'computeTask.taskEndTime',
    rProp: "",
}, {
    lName: 'workflow.timeUse',
    lProp: "",
    rName: 'workflow.resultUrl',
    rType: 'array',
    rProp: "",
}])

const taskId = computed(() => route.params.taskId)

const tabsChange = (index: string) => {
    activekey.value = +index
}

const queryResultData = () => {
    getWorkflowRunTaskResult({
        taskId: taskId.value
    }).then(res => {
        const { code, data } = res
        if (code === 10000) {
            detailName.value = data.workflowVersionName
            eventList.value = data.eventList
            modelEvaluate.value = data.modelEvaluate || ''
            informationValueEvaluate.value = data.informationValueEvaluate || ''
            tableData.value[0].lProp = data.workflowVersionName
            tableData.value[0].rProp = useWorkflowDetailsMap(data.status) || ''
            tableData.value[1].lProp = data.taskId
            tableData.value[1].rProp = data.taskType
            tableData.value[2].lProp = useFormatTime(data.createTime)
            tableData.value[2].rProp = data.endAt ? useFormatTime(data.endAt) : '-'
            tableData.value[3].lProp = data.endAt ? useDuring(data.endAt, data.createTime) : '-'
            tableData.value[3].rProp = data.taskResultList
        }
    })
}

onMounted(() => {
    queryResultData()
})
</script>

<style scoped lang='scss'>
</style>