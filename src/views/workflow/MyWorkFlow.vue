<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :bg-name="'workflow'">
      <template #briefInfo>
        <p class="text-color-[#999999]" v-if="locale === 'zh'">
          共
          <span class="text-color-[#2B60E9] text-16px">{{ flowStats || 0 }}</span>
          个隐私计算工作流
        </p>
        <p class="text-color-[#999999]" v-else>
          <span class="text-color-[#2B60E9] text-16px">{{ flowStats || 0 }}</span>
          privacy computing workflows
        </p>
      </template>
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="com-main-data-wrap main-content">
      <DataTable v-loading="loading" v-if="activekey === 0" :data="tableData" @query="query"
        :size='size' :current="current" />
      <ExpertTable v-loading="loading" v-else :data="tableData" @query="query" :size='size'
        :current="current" />
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
import ExpertTable from './components/ExpertTable.vue';
import { queryWorkflowList, queryWorkflowStats } from '@/api/workflow/index'
const { t, locale } = useI18n()
const current = ref(1)
const size = ref(10)
const total = ref(0)
const tableData = ref([])
const flowStats = ref(0)
const activekey = ref(0)
const createMode = ref(2)
const loading = ref(false)

const list = ref([
  {
    name: 'task.wizardMode'
  },
  {
    name: 'task.expertMode'
  }
])

watch(() => createMode.value, () => {
  query()
})


const tabsChange = (index: string) => {
  activekey.value = +index
  createMode.value = index == '0' ? 2 : 1
}

const query = () => {
  loading.value = true
  queryWorkflowList({
    createMode: createMode.value,
    current: current.value, size: 10, taskStatus: 'ALL'
  }).then(res => {
    loading.value = false
    const { data, code } = res
    if (code === 10000) {
      tableData.value = data.items
      current.value = data.current
      total.value = data.total
    }
  }).catch((e: any) => {
    loading.value = false
  })
}

const getTaskStats = () => {
  queryWorkflowStats({}).then(res => {
    const { data, code } = res
    if (code === 10000) {
      flowStats.value = data.workflowCount
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