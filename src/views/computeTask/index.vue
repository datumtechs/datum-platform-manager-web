<template>
  <div class="task-wrap com-main">
    <Banner :bg-name="'globalTask'">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ t('myData.tasksBriefInfoFirstParagraph') }}
          <span class="text-color-[#2B60E9] text-16px">11990</span>
          {{ t('myData.tasksBriefInfoTwoParagraph') }}
        </p>
      </template>
    </Banner>
    <div class="main-content com-main-data-wrap">
      <el-table :data="tableData" class="mt-30px com-table _com_el-table-wrap">
        <el-table-column type="index" width="100" :index="indexMethod">
          <template #header>{{ t('common.num') }}</template>
        </el-table-column>
        <el-table-column width="300" show-overflow-tooltip prop="id"
          :label="t('computeTask.taskId')" />
        <el-table-column width="100" prop="status" :label="t('computeTask.taskStatus')">
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
        <el-table-column :label="t('common.actions')" :fixed="'right'">
          <template #default="scope">
            <el-button type="text" circle @click="viewData(scope.row)">{{ t('common.view') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flex my-50px justify-center">
      <el-pagination background layout="prev, pager, next" v-model:current-page="pageObj.current"
        v-model:page-size="pageObj.size" :total="pageObj.total" />
    </div>
    <Search :placeholder="t('workflow.placeholder')" @search="search">
      <template #content>
        <div>
          <div class="search-label  mt-20px mb-10px font-900">{{t('myData.TaskCategory')}}</div>
          <el-select class="w-full picker-rounded" clearable v-model="algValue" :placeholder="t('task.select')">
            <el-option-group
              v-for="group in algList"
              :key="group.id"
              :label="group.name"
            >
              <el-option
                v-for="item in group.childrenList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-option-group>
          </el-select>
        </div>
        <div>
          <div class="search-label mt-20px mb-10px font-900">{{t('common.timeFrame')}}</div>
          <el-date-picker
            class="picker-rounded"
            v-model="date"
            type="daterange"
            value-format="YYYY-MM-DD"
            :range-separator="t('common.to')"
            :start-placeholder="t('node.startTime')"
            :end-placeholder="t('common.endTime')"
          />
        </div>
      </template>
    </Search>
  </div>
</template>
<script lang="ts" setup>
import { getAlgTree } from '@/api/algorithm'
import { type Router, useRouter } from 'vue-router'
import { queryTaskList } from '@/api/task'
import { useFormatTime, useDuring, useTableIndex, useGlobalTaskMap } from '@/hooks'
const router: Router = useRouter()
const { t } = useI18n()
const tableData = ref([])
const pageObj = reactive({
  total: 0,
  current: 1,
  size: 10
})
const date = ref()
const algList = ref<any[]>([])
const algValue = ref('')
const keyword = ref('')


const indexMethod = (index: number) => useTableIndex(index, pageObj.current, pageObj.size)
watch(() => pageObj.current, (newValue, oldValue) => {
  queryList()
});

const search = (str:string)=>{
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

const transferTimestamp = (str:string|undefined)=>{
  if(!str) return ''
  try{
     return new Date(str).getTime()
  }catch(e:any){
    console.log(e)
  }
}

const queryList = () => {
  queryTaskList({
      current: pageObj.current, size: pageObj.size, taskStatus: 'ALL' ,
      keyword:keyword.value,
      algorithmId: algValue.value,
      begin: transferTimestamp(date.value && date.value[0]) || null,
      end: transferTimestamp(date.value && date.value[1])|| null,
  }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      tableData.value = data.items
      pageObj.total = data.total
    }
  })
}

const viewData = (obj: any) => {
  router.push({
    name: "computeTaskDetails", query: {
      taskId: obj.id
    }
  })
}

const queryAlg =()=>{
  getAlgTree().then(res => {
    const { data, code } = res
    if (code === 10000) {
      algList.value = data?.childrenList[0]?.childrenList
    }
  })
}


onMounted(() => {
  queryList()
  queryAlg()
})
</script>
<style lang="scss">
.picker-rounded{
    border-radius: 20px;
    height: 40px;
    .select-trigger{
      .el-input__inner{
        border-radius: 20px;
         height: 40px;
         text-indent: 20px;
      }
    }
}
</style>