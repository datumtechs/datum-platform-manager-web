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
      <ExpertTable v-loading="loading" v-if="activekey === 1" :data="tableData" @query="query"
        :size='size' :current="current" />
      <div class="flex my-50px justify-center">
        <el-pagination background layout="prev, pager, next" :total="total"
          v-model:current-page="current" @current-change="query" />
      </div>
    </div>
    <Search :placeholder="t('workflow.placeholder')" :keyword="keyword" @search="search"
      @reset="reset">
      <template #content>
        <div>
          <div class="search-label  mt-20px mb-10px font-900">{{ t('myData.TaskCategory') }}</div>
          <el-select class="w-full picker-rounded" clearable v-model="algValue"
            :placeholder="t('task.select')" :teleported="false">
            <el-option-group v-for="group in algList" :key="group.id" :label="group.name">
              <el-option v-for="item in group.childrenList" :key="item.id" :label="item.name"
                :value="item.id" />
            </el-option-group>
          </el-select>
        </div>
        <div>
          <div class="search-label mt-20px mb-10px font-900">{{ t('common.timeFrame') }}</div>
          <el-date-picker class="picker-rounded" v-model="date" type="daterange" :teleported="false"
            value-format="YYYY-MM-DD" :range-separator="t('common.to')"
            :start-placeholder="t('node.startTime')" :end-placeholder="t('common.endTime')" />
        </div>
      </template>
    </Search>
  </div>

</template>
<script lang="ts" setup>
import { getAlgTree } from '@/api/algorithm'         
import { useKeepAliveInfo } from '@/stores'
import { queryWorkflowList, queryWorkflowStats } from '@/api/workflow/index'
import DataTable from './components/DataTable.vue';
import ExpertTable from './components/ExpertTable.vue';
const { t, locale } = useI18n()
const route = useRoute()
const current = ref(1)
const size = ref(10)
const total = ref(0)
const tableData = ref([])
const flowStats = ref(0)
const activekey = ref(0)
const createMode = ref(2)
const loading = ref(false)
const date = ref()
const algList = ref<any[]>([])
const algValue = ref('')
const keyword = ref('')
const keepAlive = useKeepAliveInfo()


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

const search = (str: string) => {
  keyword.value = str
  query()
}

const tabsChange = (index: string) => {
  activekey.value = +index
  createMode.value = index == '0' ? 2 : 1
  keyword.value = ''
  current.value = 1
  algValue.value = '',
    date.value = []
}

const transferTimestamp = (str: string | undefined) => {
  if (!str) return ''
  try {
    return new Date(str).getTime()
  } catch (e: any) {
    console.log(e)
  }
}

const reset = () => {
  current.value = 1
  date.value = []
  algValue.value = ''
}

const query = () => {
  loading.value = true
  const params: any = {
    createMode: createMode.value,
    current: current.value, size: 10, taskStatus: 'ALL',
    keyword: keyword.value,
    algorithmId: algValue.value,
    begin: transferTimestamp(date.value && date.value[0]) || null,
    end: transferTimestamp(date.value && date.value[1]) || null,
  }

  keepAlive.setCurrent(current.value, route.path)
  keepAlive.setSearchParams({ ...params, date }, route.path)
  queryWorkflowList(params).then(res => {
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




const setKeepAliveInfo = () => {
  const comTabsKeep = keepAlive.getComTabs[route.path] || ''
  const currentKeep = keepAlive.getCurrent[route.path] || ''
  const searchParams = keepAlive.getSearchParams[route.path] || ''
  console.log(searchParams);

  if (comTabsKeep) {
    activekey.value = comTabsKeep;
    createMode.value = comTabsKeep === 1 ? 1 : 2
  }
  if (currentKeep) current.value = currentKeep
  keyword.value = searchParams['keyword'] // 反选效果
  algValue.value = searchParams['algorithmId']
  date.value = searchParams['date']
}

const queryAlg = () => {
  getAlgTree().then(res => {
    const { data, code } = res
    if (code === 10000) {
      algList.value = data?.childrenList[0]?.childrenList
    }
  })
}

onMounted(() => {
  setKeepAliveInfo()
  query()
  getTaskStats()
  queryAlg()
})

</script>
<style lang="scss">
.picker-rounded {
  border-radius: 20px;
  height: 40px;

  .select-trigger {
    .el-input__inner {
      border-radius: 20px;
      height: 40px;
      text-indent: 20px;
    }
  }
}
</style>