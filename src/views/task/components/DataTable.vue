<template>
  <el-table :data="props.data" class="mt-50px com-table">
    <el-table-column type="index" width="100">
      <template #header>{{ $t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="taskName" show-overflow-tooltip :label="$t('workflow.workflowName')" />
    <el-table-column
      show-overflow-tooltip
      prop="dataProvider"
      :label="$t('workflow.workflowAlgorithm')"
    />
    <el-table-column
      show-overflow-tooltip
      prop="credentialName"
      :label="$t('workflow.workflowSteps')"
    />
    <el-table-column show-overflow-tooltip prop="price" :label="$t('workflow.latestRunningTime')" />
    <el-table-column
      show-overflow-tooltip
      prop="createAt"
      :label="$t('workflow.creationTime')"
      :width="180"
    >
      <template #default="scope">{{ new Date(scope.row.createAt).toLocaleString() || '' }}</template>
    </el-table-column>
    <el-table-column :label="$t('common.actions')" :fixed="'right'" :width="330">
      <template #default="scope">
        <el-button
          type="text"
          :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
          circle
          @click="viewData(scope.row)"
        >{{ $t('workflow.viewRecords') }}</el-button>
        <el-button
          type="text"
          :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
          circle
          @click="Edit(scope.row)"
        >{{ $t('workflow.continueEditing') }}</el-button>
        <el-button
          type="text"
          :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
          circle
          @click="del(scope.row)"
        >{{ $t('workflow.deleteWorkflow') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
const router: Router = useRouter()
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})

const Edit = (obj: any) => {
  router.push({ path: '/createTask', query: { id: obj.id } })
}
const viewData = (obj: any) => {
  router.push({ name: 'workflowDetails', params: { id: obj.id } })
}
const del = (obj: any) => {

}
</script>
<style lang="scss" scoped>
</style>