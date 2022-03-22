<template>
  <el-table
    :data="tableData"
    :span-method="arraySpanMethod"
    border
    class="mt-63px mb-30px"
    row-key="lName"
    :show-header="false"
  >
    <el-table-column class-name="h-100px">
      <template #default="{ row }">
        <div class="pl-32px" v-if="!row.last">
          <p class="text-color-[#999999]">{{ $t(`${row.lName}`) }}:</p>
          <p class="text-color-[#393939] black-font">{{ row.lProp }}</p>
        </div>
        <div class="pl-32px" v-else>
          <p class="text-color-[#999999]">{{ $t(`${row.lName}`) }}:</p>
          <div class="text-color-[#393939] black-font flex justify-between">
            <div class="flex-1">
              <span>{{ $t('common.cpu') }}</span>
              4
            </div>
            <div class="flex-1">
              <span>{{ $t('common.memory') }}</span>
              123
            </div>
            <div class="flex-1">
              <span>{{ $t('common.bandwidth') }}</span>
              123
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column class-name="h-100px">
      <template #default="{ row }">
        <div class="pl-32px" v-if="!row.last">
          <p class="text-color-[#999999]">{{ $t(`${row.rName}`) }}:</p>
          <p class="text-color-[#393939] black-font">{{ row.lProp }}</p>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
interface SpanMethodProps {
  row: any
  column: TableColumnCtx<any>
  rowIndex: number
  columnIndex: number
}

const arraySpanMethod = ({ row }: SpanMethodProps) => {
  if (row.last) {
    return [1, 2]
  }
}

const tableData = ref([{
  lName: 'computeTask.taskCategory',
  lProp: "taskCategory",
  rName: 'computeTask.taskStartTime',
  rProp: "taskStartTime",
}, {
  lName: 'computeTask.computingStartTime',
  lProp: "computingStartTime",
  rName: 'computeTask.taskEndTime',
  rProp: "taskEndTime",
}, {
  lName: 'computeTask.totalTime',
  lProp: "totalTime",
  rName: 'computeTask.taskTesult',
  rProp: "taskTesult",
}, {
  lName: 'computeTask.declaredComputingPowerRequired',
  lProp: "declaredComputingPowerRequired",
  last: true
}])

</script>