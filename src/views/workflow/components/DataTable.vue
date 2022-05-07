<template>
  <el-table :data="props.data" class="mt-40px com-table _com_el-table-wrap">
    <el-table-column type="index" width="80" :index="indexMethod">
      <template #header>{{ t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="workflowName" show-overflow-tooltip
      :label="t('workflow.workflowName')" />
    <el-table-column show-overflow-tooltip prop="algorithmName"
      :label="t('workflow.workflowAlgorithm')" />
    <el-table-column show-overflow-tooltip prop="calculationProcessName"
      :label="t('workflow.workflowSteps')" />
    <el-table-column show-overflow-tooltip prop="lastRunTime"
      :label="t('workflow.latestRunningTime')">
      <template #default="scope">{{ scope.row.lastRunTime && useFormatTime(scope.row.lastRunTime) ||
          '-'
      }}</template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="createTime" :label="t('workflow.creationTime')"
      :width="180">
      <template #default="scope">{{ useFormatTime(scope.row.createTime) }}</template>
    </el-table-column>
    <el-table-column :label="t('common.actions')" :fixed="'right'">
      <template #default="{ row }">

        <div v-if="!row.isSettingCompleted">
          <el-button type="text" @click="Edit(row)">{{ t('workflow.continueEditing') }}</el-button>
          <el-button type="text" @click="del(row)">{{ t('workflow.deleteWorkflow') }}
          </el-button>
        </div>
        <div v-else>
          <el-button type="text" @click="operationRecord(row)">{{ t('workflow.operationRecord') }}
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import { type Router, useRouter } from 'vue-router'
import { deleteWorkflow } from '@/api/workflow/index'
import { useFormatTime, useTableIndex } from '@/hooks'
const emit = defineEmits(['query'])
const indexMethod = (index: number) => useTableIndex(index, props.current, props.size)
const { t } = useI18n()
const router: Router = useRouter()
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  },
  current: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    default: 10
  }
})

const Edit = (obj: any) => {
  router.push({
    name: 'wizardMode', params: {
      workflowId: obj.workflowId,
      workflowVersion: obj.workflowVersion,
      workflowName: obj.workflowName,
    }
  })
}

const operationRecord = (obj: any) => {
  router.push({
    name: 'workflowDetails', params: {
      id: obj.workflowId
    }
  })
}

const del = (obj: any) => {
  ElMessageBox.confirm(
    t('workflow.deleteWorkflowTips'),
    t('account.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning',
    }
  )
    .then(() => {
      deleteWorkflow({ workflowId: obj.workflowId }).then(res => {
        const { data, code } = res
        if (code === 10000) {
          ElMessage.success(t('common.success'))
          emit('query')
        }
      })
    })
    .catch(() => { })
}
</script>
<style lang="scss" scoped>
</style>