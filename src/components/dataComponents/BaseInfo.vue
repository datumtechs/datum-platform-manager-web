<template>
  <el-table
    :data="props.tableData"
    :span-Method="arraySpanMethod"
    border
    class="mt-63px mb-30px"
    row-key="lName"
    :show-header="false"
  >
    <el-table-column class-name="h-100px">
      <template #default="{ row }">
        <div class="pl-32px">
          <p class="text-color-[#999999]">{{ $t(`${row.lName}`) }}:</p>
          <p class="text-color-[#393939] black-font">{{ row.lProp }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column class-name="h-100px">
      <template #default="{ row }">
        <div class="pl-32px" v-if="!row.last">
          <p class="text-color-[#999999]">{{ $t(`${row.rName}`) }}:</p>
          <p class="text-color-[#393939] black-font">{{ row.rProp }}</p>
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

const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  }
})
console.log(props.tableData)

const arraySpanMethod = ({ row }: SpanMethodProps): [number, number] | undefined => {
  if (row.last) {
    return [1, 2]
  }
}

</script>