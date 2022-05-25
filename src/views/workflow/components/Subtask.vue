<template>
  <div class="flex-1">
    <Banner :bg-name="'clocksWatches'" :showRouter="false" :detailName="workFlowName"
      :backShow="true" @back="$router.go(-1)">
      <template #briefInfo>
        <p class="text-color-[#999999] ml-60px">
          {{ locale == 'zh' ? `共 ${tableData.length} 个该工作流的子任务` : `${tableData.length}
          subtasks of this workflow in total`}}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <el-table v-tableTooltip :data="tableData" class="mt-30px com-table">
        <el-table-column type="index" width="80">
          <template #header>{{ t('common.num') }}</template>
        </el-table-column>
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="taskId"
          :label="t('myData.taskID')" />
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="status"
          :label="t('workflow.state')">
          <template #default="{ row }">
            {{ useWorkflowDetailsMap(row.status) || '-' }}
          </template>
        </el-table-column>
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="taskType"
          :label="t('workflow.taskSteps')">
        </el-table-column>
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="createTime"
          :label="t('computeTask.taskStartTime')">
          <template #default="scope">{{ useFormatTime(scope.row.createTime) }}</template>
        </el-table-column>

        <el-table-column :label="t('common.actions')" :fixed="'right'">
          <template #default="{ row }">
            <!-- <el-button type="text" v-if="row.status === 2 || row.status === 3" circle
              @click="details(row)">{{ t('workflow.viewTaskResults') }}
            </el-button> -->
            <span class="font-medium  leading-20px link-btn" @click="details(row)">{{
                t('workflow.viewTaskResults')
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex my-50px justify-center">
        <el-pagination background layout="prev, pager, next" @current-change="(_) => {
          current = _
          query()
        }" :total="total" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getWorkflowRunTaskList } from '@/api/workflow'
import { useFormatTime, useWorkflowDetailsMap } from '@/hooks'
const showDialog = ref(false)
const route = useRoute()
const router = useRouter()
const workflowRunId = route.params.id
const current = ref(1)
const total = ref(0)
const workFlowName = ref('')
const tableData = ref([])
const { t, locale } = useI18n()
const timer:any = ref()

const query = () => {
  getWorkflowRunTaskList({
    workflowRunId: workflowRunId
  }).then(res => {
    const { code, data } = res
    if (code == 10000) {
      tableData.value = data
      workFlowName.value = data[0]?.workflowVersionName
    }
  })
}

const details = (row: any) => {
  router.push({
    name: 'TaskResult', query: {
      hasModel: row.outputModel,
    }, params: {
      taskId: row.taskId
    }
  })
}

onMounted(() => {
  timeOutFn()
})

onBeforeUnmount(()=>{
   if(timer.value)clearTimeout(timer.value)
})


const timeOutFn = ()=>{
  if(timer.value) clearTimeout(timer)
  query()
  timer.value = setTimeout(()=>{
    timeOutFn()
  },3000)  
}


</script>
<style lang="scss" scoped>
</style>