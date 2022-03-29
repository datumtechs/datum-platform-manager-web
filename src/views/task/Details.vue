<template>
  <div class="flex-1">
    <Banner :bg-name="'clocksWatches'">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ $t('workflow.totalOf') }}
          <span class="text-color-[#2B60E9] text-16px">11990</span>
          {{ $t('workflow.recordWorkflow') }}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <el-table :data="recordList" class="mt-50px com-table">
        <el-table-column type="index" width="100">
          <template #header>{{ $t('common.num') }}</template>
        </el-table-column>
        <el-table-column prop="dataName" :label="$t('workflow.workflowName')" />
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
          prop="Trading"
          :label="$t('workflow.creationTime')"
          :width="180"
        />
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
    </div>
  </div>
</template>
<script lang="ts" setup>
const recordList = [
  {
    dataName: 'Tom',
    credentialName: 'No. 189, Grove St, Los Angeles',
  },
  {
    dataName: 'Tom',
    credentialName: 'No. 189, Grove St, Los Angeles',
  }
]

const copy = () => { }
const payment = () => { }
const startUp = () => { }
</script>
<style lang="scss" scoped></style>