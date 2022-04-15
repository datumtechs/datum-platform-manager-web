<template>
  <div class="flex-1">
    <Banner :bg-name="'clocksWatches'" :backShow="true" @back="$router.go(-1)">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ $t('workflow.totalOf') }}
          <span class="text-color-[#2B60E9] text-16px">11990</span>
          {{ $t('workflow.recordWorkflow') }}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <el-table :data="tableData" class="mt-30px com-table">
        <el-table-column type="index" width="100">
          <template #header>{{ $t('common.num') }}</template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="taskName"
          :label="$t('workflow.workflowName')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="dataProvider"
          :label="$t('workflow.workflowAlgorithm')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="credentialName"
          :label="$t('workflow.workflowSteps')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="price"
          :label="$t('workflow.latestRunningTime')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="createAt"
          :label="$t('workflow.creationTime')"
          :width="180"
        >
          <template #default="scope">{{ new Date(scope.row.createAt).toLocaleString() || '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('common.actions')" :fixed="'right'" :width="330">
          <template #default="scope">
            <el-button
              type="text"
              :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
              circle
              @click="copy"
            >{{ $t('common.copy') }}</el-button>
            <el-button
              type="text"
              :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
              circle
              @click="payment"
            >{{ $t('common.payment') }}</el-button>
            <el-button
              type="text"
              :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
              circle
              @click="startUp"
            >{{ $t('common.continuePayment') }}</el-button>
            <el-button
              type="text"
              :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
              circle
              @click="startUp"
            >{{ $t('common.viewResults') }}</el-button>
            <el-button
              type="text"
              :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
              circle
              @click="startUp"
            >{{ $t('common.startUp') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex my-50px justify-center">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="(_) => {
            current = _
            query()
          }"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { queryTaskDetails } from '@/api/task'
const route = useRoute()
const taskId = route.params.id
const current = ref(1)
const total = ref(0)
const tableData = ref([])

const query = () => {
  queryTaskDetails({ current: current.value, size: 10, taskId }).then(res => {
    const { data, code }: any = res
    if (code === 10000) {
      // tableData.value = [{ ...data }]
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
<style lang="scss" scoped></style>