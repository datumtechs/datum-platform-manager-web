<template>
  <el-table :data="props.tableData" :span-Method="arraySpanMethod" border
    :class="isPathIncludeNode ? 'mt-30px' : 'my-60px'" class="mb-30px" row-key="lName"
    :show-header="false">
    <el-table-column class-name="h-100px">
      <template #default="{ row }">
        <div class="px-32px flex justify-between" v-if="row.last && type === 'task'">
          <p v-for="item in row.lProp" class="text-color-[#393939] font-bold">
            <span>{{ t(`${item.label}`) }}:</span>
            <span>&nbsp;&nbsp;{{ item.value }}</span>
          </p>
        </div>
        <div class="px-32px" v-else>
          <p class="text-color-[#999999]">{{ t(`${row.lName}`) }}:</p>
          <p class="text-color-[#393939] font-bold">{{ row.lProp }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column class-name="h-100px">
      <template #default="{ row }">
        <div class="px-32px" v-if="!row.last">
          <p class="text-color-[#999999]">{{ t(`${row.rName}`) }}:</p>
          <p class="text-color-[#393939] font-bold">{{ row.rProp }}</p>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { usePathIncludeNode } from '@/hooks'
const { t } = useI18n()
const isPathIncludeNode = usePathIncludeNode()

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
  },
  type: {
    type: String,
    default: 'data'
  }
})

const arraySpanMethod = ({ row }: SpanMethodProps): [number, number] | undefined => {
  if (row.last) {
    return [1, 2]
  }
}

</script>