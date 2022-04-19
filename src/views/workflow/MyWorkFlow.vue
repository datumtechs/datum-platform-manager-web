<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :bg-name="'workflow'">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ t('workflow.totalOf') }}
          <span class="text-color-[#2B60E9] text-16px">{{ flowStats || 0 }}</span>
          {{ t('workflow.workTipsBriefInfoTwoParagraph') }}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap main-content">
      <DataTable :data="tableData" />
      <div class="flex my-50px justify-center">
        <el-pagination background layout="prev, pager, next" @current-change="(_) => {
          current = _
          query()
        }" :total="total" />
      </div>
    </div>
    <Search></Search>
  </div>

</template>
<script lang="ts" setup>
import DataTable from './components/DataTable.vue';
import { queryWorkflowList, queryWorkflowStats } from '@/api/workflow'
const { t } = useI18n()
const current = ref(1)
const total = ref(0)
const tableData = ref([])
const flowStats = ref(0)

const query = () => {
  queryWorkflowList({ current: current.value, size: 10, taskStatus: 'ALL' }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      tableData.value = data.items
      current.value = data.current
      total.value = data.total
    }
  })
}

const getTaskStats = () => {
  queryWorkflowStats({}).then(res => {
    const { data, code } = res
    if (code === 10000) {
      flowStats.value = data.taskCount
    }
  })
}

onMounted(() => {
  query()
  getTaskStats()
})

</script>
<style lang="scss" scoped>
</style>