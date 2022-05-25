<template>
  <div class="flex-1">
    <Banner :bg-name="'clocksWatches'" :showRouter="false" :detailName="workFlowName"
      :backShow="true" @back="$router.go(-1),  keepAlive.setCurrent(0,route.path)">
      <template #briefInfo>
        <p class="text-color-[#999999] ml-60px">
          {{ locale == 'zh' ? `共 ${total} 条该工作流的运行记录` : `${total}
          operation records of this workflow in total`}}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <el-table v-tableTooltip :data="tableData" class="mt-30px com-table">
        <el-table-column type="index" width="80">
          <template #header>{{ t('common.num') }}</template>
        </el-table-column>
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="workflowVersionName"
          :label="t('workflow.workflowVersionName')">
          <template #default="scope">
            <span class="font-medium  leading-20px link-btn" @click="details(scope.row)">{{
                scope.row.workflowVersionName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="createTime"
          :label="t('workflow.creationTime')">
          <template #default="scope">{{ useFormatTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="status"
          :label="t('workflow.state')">
          <template #default="{ row }">
            {{ useWorkflowDetailsMap(row.status) || '-' }}
          </template>
        </el-table-column>
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="beginTime"
          :label="t('computeTask.startTime')">
          <template #default="{ row }">
            <div v-if="row.beginTime">
              {{ useFormatTime(row.beginTime) }}
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column :class-name="'show-ellipsis-tooltip'" prop="endTime"
          :label="t('workflow.timeUse')" :width="180">
          <template #default="{ row }">
            <div v-if="row.beginTime">
              {{ useDuring(row.endTime , row.beginTime) }}
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="t('common.actions')">
          <template #default="{ row }">
            <!-- 0 - 待运行 1 - 运行中 2 - 运行成功 3 - 运行失败 -->
            <!-- 已运行 -->
            <div v-if="row.status !== 0">
              <!-- <el-button type="text" circle @click="copy(row)">{{ t('common.copy') }}</el-button>
              <el-button type="text" circle @click="view(row)">{{
                  t('workflow.viewDetails')
              }}
              </el-button> -->
              <el-space :size="20">
                <span class="font-medium  leading-20px link-btn" @click="copy(row)">{{
                    t('common.copy')
                }}</span>
                <span class="font-medium  leading-20px link-btn" @click="view(row)">{{
                    t('workflow.viewDetails')
                }}</span>
              </el-space>
            </div>
            <!-- 未运行 -->
            <div v-else>
              <!-- <el-button type="text" circle @click="edit(row)">{{ t('common.edit') }}</el-button>
              <el-button type="text" circle @click="start(row)">{{ t('common.startUp') }}
              </el-button> -->
              <el-space :size="20">
                <span class="font-medium  leading-20px link-btn" @click="edit(row)">{{
                    t('common.edit')
                }}</span>
                <span class="font-medium  leading-20px link-btn" @click="start(row)">{{
                    t('common.startUp')
                }}</span>
              </el-space>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex my-50px justify-center">
        <el-pagination background layout="prev, pager, next" @current-change="(_) => {
          current = _
          queryVersionList()
        }" :total="total" />
      </div>
    </div>
    <SetNameDialog v-model:show="showDialog" :beforeName="beforeName" v-if="showDialog"
      @submit="copySubmit" />
    <GlobalPending v-model:show="pending.show" :content="pending.content" :title="pending.title" />
  </div>
</template>
<script lang="ts" setup>
import SetNameDialog from './SetNameDialog.vue'
import {useKeepAliveInfo } from '@/stores'
import { getWorkflowVersionList, copyWorkflow,startWorkFlow } from '@/api/workflow'
import { useFormatTime, useDuring, useWorkflowDetailsMap, useException } from '@/hooks'
import { ElMessage } from 'element-plus';
const web3: any = inject('web3')
const showDialog = ref(false)
const route = useRoute()
const router = useRouter()
const workflowId = route.params.id
const current = ref(1)
const total = ref(0)
const workFlowName = ref('')
const tableData = ref([])
const { t, locale } = useI18n()
const activeRow = ref<any>({})
const beforeName = ref('')
const keepAlive = useKeepAliveInfo()
const timer:any = ref()

type Pending = {
  show: boolean,
  content: string,
  title: string,
}

const pending: Pending = reactive({
  show: false,
  content: '',
  title: ''
})

const timeOutFn = ()=>{
  if(timer.value) clearTimeout(timer)
  queryVersionList()
  timer.value = setTimeout(()=>{
    timeOutFn()
  },3000)  
}


const queryVersionList = () => {
  keepAlive.setCurrent(current.value,route.path)
  getWorkflowVersionList({ current: current.value, size: 10, workflowId }).then(res => {
    const { data, code }: any = res
    if (code === 10000) {
      tableData.value = data.items
      const str = data.items[data.items.length - 1]?.workflowVersionName
      const index = str.lastIndexOf("-v")
      workFlowName.value = str.substring(0, index)
      current.value = data.current
      total.value = data.total
    }
  })
}

const view = (row: any) => {
  router.push({
    name: 'workflowSubtask', params: {
      id: row.workflowRunId
    }
  })
}

const edit = (row: any) => {
  let urlName = 'wizardMode'
  let params = {
    workflowId: row.workflowId,
    workflowVersion: row.workflowVersion,
    workflowName: row.workflowVersionName,
  }
  if (row.createMode === 1) {
    urlName = 'expertModel'
    params = Object.assign(params, {
      isSettingCompleted: 1,
      isReadonly: 0
    })
  } else {
    urlName = 'wizardMode'
  }

  router.push({
    name: urlName,
    params
  })
}

const start = async (row: any) => {
  pending.show = true
  pending.title = t('workflow.startWorkflow')
  pending.content = `${t('workflow.startWorkflow')}:<span class="text-color-[#2B60E9]"> ${row.workflowVersionName}</span}>`
  try {
    const sign = await web3.signForWallet({ type: 'tx' })
    pending.show = false
    if (sign) {
      const res = await startWorkFlow({
        sign,
        workflowId: row.workflowId,
        workflowVersion: row.workflowVersion,
      })
      const { code } = res
      if (code === 10000) {
        ElMessage.success(t('workflow.startSuccess'))
        queryVersionList()
      }
    }
  } catch (error: any) {
    pending.show = false
    useException(error.code)
  }
}

const details = (row: any) => {
  if (row.createMode == 2) {
    router.push({
      name: 'wizardMode', params: {
        workflowId: row.workflowId,
        workflowVersion: row.workflowVersion,
        views: 'view'
      }
    })
    return
  }
  router.push({
    name: 'expertModel', params: {
      workflowId: row.workflowId,
      workflowVersion: row.workflowVersion,
      workflowName: row.workflowVersionName,
      isSettingCompleted: 1,
      isReadonly: 1,
    }
  })
}


onMounted(() => {
  const currentKeep = keepAlive.getCurrent[route.path] || ''
  if(currentKeep) current.value = currentKeep
  timeOutFn()
})

onBeforeUnmount(()=>{
   if(timer.value)clearTimeout(timer.value)
})


const copy = (row: any) => {
  showDialog.value = true
  activeRow.value = row
  beforeName.value = workFlowName.value + '-v' + (total.value + 1)
}
const copySubmit = (name: string) => {
  copyWorkflow({
    workflowVersionName: name,
    workflowId: activeRow.value.workflowId,
    workflowVersion: activeRow.value.workflowVersion,
  }).then(res => {
    const { code } = res
    if (code == 10000) {
      ElMessage.success(t('workflow.copySuccess'))
      showDialog.value = false
      queryVersionList()
    }
  })
}
</script>
<style lang="scss" scoped>
</style>