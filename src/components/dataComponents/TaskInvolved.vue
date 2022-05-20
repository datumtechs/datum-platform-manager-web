<template>
  <el-table :data="list" :class="isPathIncludeNode ? 'mt-30px' : 'my-60px'"
    class="mb-50px table-header-bg-Grayscale" border>
    <el-table-column type="index" width="80" :index="indexMethod">
      <template #header>{{ t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="id" align="center" :label="t('myData.taskID')" />
    <el-table-column align="center" :label="t('computeTask.taskStatus')">
      <template #default="{ row }">
        {{ useGlobalTaskMap(row.status) }}
      </template>
    </el-table-column>
    <!-- 接口无该字段返回 <el-table-column prop="TaskCategory" align="center" :label="t('myData.TaskCategory')" />
    <el-table-column prop="capability" align="center" :label="t('myData.capability')" /> -->
    <el-table-column prop="createAt" align="center" :label="t('myData.createTime')">
      <template #default="{ row }">{{
          useFormatTime(row.createAt) || ''
      }}</template>
    </el-table-column>
    <el-table-column prop="totalTime" align="center" :label="t('myData.totalTime')">
      <template #default="{ row }">{{ formatDuring(row.endAt - row.createAt) }}</template>
    </el-table-column>
  </el-table>
  <div class="flex my-50px justify-center">
    <el-pagination background layout="prev, pager, next" v-model:current-page="pageObj.current"
      v-model:page-size="pageObj.size" :total="pageObj.total" @current-change="(_) => {
        getTaskListByData()
      }" />
  </div>
</template>
<script lang="ts" setup>
import { queryTaskListByData } from '@/api/data'
import { formatDuring } from '@/utils'
import { usePathIncludeNode, useGlobalTaskMap, useFormatTime, useTableIndex } from '@/hooks'
const { t } = useI18n()
const isPathIncludeNode = usePathIncludeNode()
const list = ref([])
const current = ref(1)
const total = ref(0)

const pageObj = reactive({
  total: 0,
  current: 1,
  size: 10
})

const props = defineProps({
  metaDataId: { type: String, default: '' }
})

const indexMethod = (index: number) => useTableIndex(index, pageObj.current, pageObj.size)

const getTaskListByData = () => {
  queryTaskListByData({ size: pageObj.size, current: pageObj.current, metaDataId: props.metaDataId }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      list.value = data.items
      pageObj.current = data.current
      pageObj.total = data.total
    }
  })
}
onMounted(() => {
  getTaskListByData()
})


</script>
<style lang="scss" scoped>
</style>