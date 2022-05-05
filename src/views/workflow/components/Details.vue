<template>
  <div class="flex-1">
    <Banner :bg-name="'clocksWatches'" :showRouter="false" :detailName="workFlowName"
      :backShow="true" @back="$router.go(-1)">
      <template #briefInfo>
        <p class="text-color-[#999999] ml-60px">
          {{ locale == 'zh' ? `共 ${total} 条该工作流的运行记录` : `${total}
          operation records of this workflow in total`}}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <el-table :data="tableData" class="mt-30px com-table">
        <el-table-column type="index" width="80">
          <template #header>{{ t('common.num') }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="workflowVersionName"
          :label="t('workflow.workflowVersionName')" />
        <el-table-column show-overflow-tooltip prop="createTime"
          :label="t('workflow.creationTime')">
          <template #default="scope">{{ useFormatTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="status" :label="t('workflow.state')">
          <template #default="{ row }">
            {{ useGlobalTaskMap(row.status) || '-' }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="beginTime" :label="t('computeTask.startTime')">
          <template #default="{ row }">
            <div v-if="row.beginTime">
              {{ useFormatTime(row.beginTime) }}
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="endTime" :label="t('workflow.timeUse')"
          :width="180">
          <template #default="{ row }">
            <div v-if="row.beginTime">
              {{ useDuring(row.endTime - row.beginTime) }}
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="t('common.actions')" :fixed="'right'">
          <template #default="{ row }">
            <!-- 0 - 待运行 1 - 运行中 2 - 运行成功 3 - 运行失败 -->
            <!-- 已运行 -->
            <div v-if="row.status !== 0">
              <el-button type="text" circle @click="copy">{{ t('common.copy') }}</el-button>
              <el-button v-if="row.status !== 1" type="text" circle @click="view">{{
                  t('workflow.viewDetails')
              }}
              </el-button>
            </div>
            <!-- 未运行 -->
            <div v-else>
              <el-button type="text" circle @click="edit(row)">{{ t('common.edit') }}</el-button>
              <el-button type="text" circle @click="start(row)">{{ t('common.startUp') }}
              </el-button>
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
  </div>
</template>
<script lang="ts" setup>
import { getWorkflowVersionList } from '@/api/workflow'
import { useFormatTime, useDuring, useGlobalTaskMap } from '@/hooks'
import { startWorkFlow } from '@/api/workflow'
const web3: any = inject('web3')

const route = useRoute()
const workflowId = route.params.id
const current = ref(1)
const total = ref(0)
const workFlowName = ref('')
const tableData = ref([])
const { t, locale } = useI18n()


const queryVersionList = () => {
  getWorkflowVersionList({ current: current.value, size: 10, workflowId }).then(res => {
    const { data, code }: any = res
    if (code === 10000) {
      tableData.value = data.items
      const str = data.items[0]?.workflowVersionName
      const index = str.lastIndexOf("-v")
      workFlowName.value = str.substring(0, index)
      current.value = data.current
      total.value = data.total
    }
  })
}

const view = () => { }
const edit = (row: any) => {

}
const start = async (row: any) => {
  const sign = await web3.signForWallet({ type: 'tx' })
  if (sign) {
    const res = await startWorkFlow({
      sign,
      workflowId: row.workflowId,
      workflowVersion: row.workflowVersion,
    })
    console.log(res);
  }

}

onMounted(() => {
  queryVersionList()
})


const copy = () => { }
const payment = () => { }
const startUp = () => { }
</script>
<style lang="scss" scoped>
</style>