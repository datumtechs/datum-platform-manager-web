<template>
  <div class="task-wrap com-main">
    <Banner :bg-name="'globalTask'">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ t('myData.tasksBriefInfoFirstParagraph') }}
          <span class="text-color-[#2B60E9] text-16px">{{ pageObj.total }}</span>
          {{ t('myData.tasksBriefInfoTwoParagraph') }}
        </p>
      </template>
    </Banner>
    <div class="main-content com-main-data-wrap">
      <el-table v-tableTooltip v-loading="loading" :data="tableData"
        class="mt-30px com-table _com_el-table-wrap">
        <el-table-column type="index" width="80" :index="indexMethod">
          <template #header>{{ t('common.num') }}</template>
        </el-table-column>
        <el-table-column width="300" :class-name="'show-ellipsis-tooltip'" prop="id"
          :label="t('computeTask.taskId')" />
        <el-table-column :label="t('computeTask.taskStatus')">
          <template #default="{ row }">
            <div>
              {{ useGlobalTaskMap(row.status) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="t('computeTask.startTime')">
          <template #default="{ row }">
            <div>{{ useFormatTime(row.createAt) }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="t('computeTask.totalTime')">
          <template #default="{ row }">
            <div>{{ useDuring(row.endAt - row.startAt) }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="t('common.actions')">
          <template #default="scope">
            <span class="font-medium  leading-20px link-btn" @click="viewData(scope.row)">{{
                t('node.viewTask')
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flex my-50px justify-center">
      <el-pagination background layout="prev, pager, next" v-model:current-page="pageObj.current"
        v-model:page-size="pageObj.size" :total="pageObj.total" @current-change="queryList" />
    </div>
    <Search :keyword="keyword" :placeholder="t('computeTask.placeholder')" @search="search"
      @reset="reset">
      <template #content>
        <!-- <div class="search-label  mt-20px mb-10px font-900">{{ t('myData.TaskCategory') }}</div>
        <el-select class="w-full picker-rounded" clearable v-model="algValue"
          :placeholder="t('task.select')">
          <el-option-group v-for="group in algList" :key="group.id" :label="group.name">
            <el-option v-for="item in group.childrenList" :key="item.id" :label="item.name"
              :value="item.id" />
          </el-option-group>
        </el-select> -->
        <div class="search-label ont-bold mt-20px mb-10px">{{ t('computeTask.taskStatus') }}</div>
        <el-radio-group v-model="taskStatus">
          <el-radio label="ALL">{{ t('common.all') }}</el-radio>
          <el-radio label="SUCCESS">{{ t('common.success') }}</el-radio>
          <el-radio label="FAIL">{{ t('status.failed') }}</el-radio>
        </el-radio-group>
        <div class="search-label mt-20px mb-10px font-bold">{{ t('common.timeFrame') }}</div>
        <el-date-picker class="picker-rounded" v-model="date" type="daterange"
          value-format="YYYY-MM-DD" :range-separator="t('common.to')"  :teleported="false"
          :start-placeholder="t('node.startTime')" :end-placeholder="t('common.endTime')" />
      </template>
    </Search>
  </div>
</template>
<script lang="ts" setup>
// import { getAlgTree } from '@/api/algorithm'
import { type Router, useRouter } from 'vue-router'
import { queryTaskList } from '@/api/task'
import { useFormatTime, useDuring, useTableIndex, useGlobalTaskMap } from '@/hooks'
import {useKeepAliveInfo } from '@/stores'
const keepAlive = useKeepAliveInfo()

const router: Router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const pageObj = reactive({
  total: 0,
  current: 1,
  size: 10
})
const date = ref()

const keyword = ref('')
const taskStatus = ref('ALL')


const indexMethod = (index: number) => useTableIndex(index, pageObj.current, pageObj.size)

const search = (str: string) => {
  keyword.value = str
  queryList()
}


// const getStatus = (status: number) => {
//   //1:等待中; 2:计算中; 3:失败; 4:成功
//   switch (status) {
//     case 1:
//       return t('status.pending')
//     case 2:
//       return t('status.running')
//     case 3:
//       return t('status.failed')
//     case 4:
//       return t('status.succeed')
//     default:
//       break;
//   }
// }

const transferTimestamp = (str: string | undefined) => {
  if (!str) return ''
  try {
    return new Date(str).getTime()
  } catch (e: any) {
    console.log(e)
  }
}

const setKeepAliveInfo = ()=>{
  const currentKeep = keepAlive.getCurrent[route.path] || ''
  const searchParams = keepAlive.getSearchParams[route.path] || ''
  if(currentKeep) pageObj.current = currentKeep
  keyword.value = searchParams['keyword'] // 反选效果
  date.value = searchParams['date']
  taskStatus.value = searchParams['taskStatus'] || 'ALL'
}

const reset = ()=>{
  taskStatus.value = 'ALL'
  date.value = []
  pageObj.current = 1
}

const queryList = () => {
  loading.value = true
  const params:any = {
    current: pageObj.current, size: pageObj.size,
    taskStatus: taskStatus.value,
    keyword: keyword.value,
    begin: transferTimestamp(date.value && date.value[0]) || null,
    end: transferTimestamp(date.value && date.value[1]) || null,
   }
   console.log(1)
  keepAlive.setCurrent(pageObj.current,route.path)
  keepAlive.setSearchParams({...params, date},route.path)
  queryTaskList(params).then(res => {
    const { data, code } = res
    if (code === 10000) {
      tableData.value = data.items
      pageObj.total = data.total
    }
    loading.value = false
  }).catch(error => {
    loading.value = false
  })
}

const viewData = (obj: any) => {
  router.push({
    name: "computeTaskDetails", query: {
      taskId: obj.id
    }
  })
}

// const queryAlg = () => {
//   getAlgTree().then(res => {
//     const { data, code } = res
//     if (code === 10000) {
//       algList.value = data?.childrenList[0]?.childrenList
//     }
//   })
// }


onMounted(() => {
  setKeepAliveInfo()
  queryList()
  // queryAlg()
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