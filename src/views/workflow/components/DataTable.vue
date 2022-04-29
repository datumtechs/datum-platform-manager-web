<template>
  <el-table :data="props.data" class="mt-30px com-table _com_el-table-wrap">
    <el-table-column type="index" width="100">
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
          '--'
      }}</template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="createTime" :label="t('workflow.creationTime')"
      :width="180">
      <template #default="scope">{{ useFormatTime(scope.row.createTime) }}</template>
    </el-table-column>
    <el-table-column :label="t('common.actions')" :fixed="'right'" :width="330">
      <template #default="scope">
        <el-button type="text" circle @click="operationRecord(scope.row)">{{
            t('workflow.operationRecord')
        }}</el-button>
        <el-button type="text" v-if="!scope.row.isSettingCompleted" circle @click="Edit(scope.row)">
          {{ t('workflow.continueEditing') }}</el-button>
        <el-button type="text" circle @click="del(scope.row)">{{ t('workflow.deleteWorkflow') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import { type Router, useRouter } from 'vue-router'
import { deleteWorkflow } from '@/api/workflow/index'
import { useFormatTime } from '@/hooks'
const emit = defineEmits(['query'])
const { t } = useI18n()
const router: Router = useRouter()
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})

const Edit = (obj: any) => {
  let urlName = obj.createMode == 2 ? 'wizardMode' : 'expertModel'
  router.push({
    name: urlName, params: {
      workflowId: obj.workflowId,
      workflowVersion: obj.workflowVersion,
      workflowName: obj.workflowName,
    }
  })
}
const operationRecord = (obj: any) => {
  router.push({
    name: 'workflowDetails', params: {
      id: obj.workflowId,
      workflowName: obj.workflowName,
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