<template>
  <div class="flex-1">
    <Banner :bg-name="'clocksWatches'" :showRouter="false" :detailName="workFlowName" :backShow="true"
      @back="$router.go(-1)">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ locale == 'zh' ? `共${total}条该工作流的运行记录` : `${total}
          operation records of this workflow in total`}}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <el-table :data="tableData" class="mt-30px com-table">
        <el-table-column type="index" width="100">
          <template #header>{{ t('common.num') }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="workflowVersionName" :label="t('workflow.workflowVersionName')" />
        <el-table-column show-overflow-tooltip prop="createTime" :label="t('workflow.creationTime')">
          <template #default="scope">{{ useFormatTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="status" :label="t('workflow.state')">
          <template #default="{ row }">
            {{ useGlobalTaskMap(row.status) || '--' }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="beginTime" :label="t('computeTask.startTime')">
          <template #default="scope">{{ useFormatTime(scope.row.beginTime) }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="endTime" :label="t('workflow.timeUse')" :width="180">
          <template #default="{ row }">
            <div>{{ useDuring(row.endTime - row.beginTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="t('common.actions')" :fixed="'right'" :width="330">
          <template #default="scope">
            <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle @click="copy">{{
                t('common.copy')
            }}</el-button>
            <!--
    <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle
              @click="payment">{{ t('common.payment') }}</el-button>
                         <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle
              @click="startUp">{{ t('common.continuePayment') }}</el-button>
  -->
            <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle
              @click="startUp">{{ t('common.edit') }}</el-button>
            <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle
              @click="startUp">{{ t('workflow.viewDetails') }}</el-button>
            <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle
              @click="startUp">{{ t('common.startUp') }}</el-button>
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
import { getWorkflowVersionList } from '@/api/workflow'
import { useFormatTime, useDuring, useGlobalTaskMap } from '@/hooks'
const route = useRoute()
const workflowId = route.params.id
const current = ref(1)
const total = ref(0)
const workFlowName = ref('')
const tableData = ref([])
const { t, locale } = useI18n()
const query = () => {
  getWorkflowVersionList({ current: current.value, size: 10, workflowId }).then(res => {
    const { data, code }: any = res
    if (code === 10000) {
      tableData.value = data.items
      const str = data.items[0]?.workflowVersionName
      const index = str.lastIndexOf("-v")
      workFlowName.value = str.substring(0, index)
      current.value = data.current
      total.value = data.total
    }
  })
}

onMounted(() => {
  query()
})


const copy = () => { }
const payment = () => { }
const startUp = () => { }
</script>
<style lang="scss" scoped>
</style>