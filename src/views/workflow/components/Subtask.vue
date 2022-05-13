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
      <el-table :data="tableData" class="mt-30px com-table">
        <el-table-column type="index" width="80">
          <template #header>{{ t('common.num') }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="taskId"
          :label="t('myData.taskID')" />
        <el-table-column show-overflow-tooltip prop="status" :label="t('workflow.state')">
          <template #default="{ row }">
            {{ useWorkflowDetailsMap(row.status) || '-' }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="taskType"
          :label="t('workflow.taskSteps')">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="createTime"
          :label="t('computeTask.taskStartTime')">
          <template #default="scope">{{ useFormatTime(scope.row.createTime) }}</template>
        </el-table-column>
   
        <el-table-column :label="t('common.actions')" :fixed="'right'">
          <template #default="{ row }">
              <el-button type="text" circle @click="details(row)">{{ t('workflow.viewTaskResults') }}</el-button>
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
import { useFormatTime, useDuring, useWorkflowDetailsMap } from '@/hooks'
import { startWorkFlow } from '@/api/workflow'
const showDialog = ref(false)
const route = useRoute()
const router = useRouter()
const workflowRunId = route.params.id
const current = ref(1)
const total = ref(0)
const workFlowName = ref('')
const tableData = ref([])
const { t, locale } = useI18n()


const query = ()=>{
  getWorkflowRunTaskList({
      workflowRunId: workflowRunId
    }).then(res=>{
         const {code,data} = res
         if(code  == 10000){
             tableData.value = data
         }
    })
}

const details = ()=>{
  
}

onMounted(() => {
  query()
})

</script>
<style lang="scss" scoped>
</style>