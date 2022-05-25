<template>
    <div class="flex-1 task-wrap com-main">
        <Banner :back-show="true" :bg-name="'clocksWatches'" :showRouter="false"
            :detailName="detailName" @back="router.go(-1)">
            <template #select>
                <ComTabs :keep="false" :list="hasModel ? list : modelList" :activekey="activekey"
                    @change="tabsChange" />
            </template>
        </Banner>
        <div class="com-main-data-wrap mt-63px">
            <ResultFile v-if="activekey === 0" :tableData="tableData" />
            <TaskEvents v-if="activekey === 1" :data="eventList" />
            <ModelEvaluation v-if="activekey === 2" :modelEvaluate="modelEvaluate" />
        </div>
    </div>
</template>
<script setup lang='ts'>
import ResultFile from './ResultFile.vue'
import ModelEvaluation from './ModelEvaluation.vue'
import { getWorkflowRunTaskResult } from '@/api/workflow'
import { useFormatTime, useDuring, useWorkflowDetailsMap } from '@/hooks'

const modelList = reactive([
    {
        name: 'computeTask.taskResult'
    },
    {
        name: 'computeTask.taskEvents'
    },
    {
        name: 'computeTask.modelEvaluation'
    }
])

const list = reactive([
    {
        name: 'computeTask.taskResult'
    },
    {
        name: 'computeTask.taskEvents'
    }
])
const detailName = ref('')
const eventList = ref([])
const modelEvaluate = ref('')
const route = useRoute()
const router = useRouter()
const activekey = ref(0)
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

const hasModel = computed(() => route.query.hasModel)
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