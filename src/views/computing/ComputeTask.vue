<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :bg-name="'globalTask'">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ $t('myData.tasksBriefInfoFirstParagraph') }}
          <span
            class="text-color-[#2B60E9] text-16px"
          >11990</span>
          {{ $t('myData.tasksBriefInfoTwoParagraph') }}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <el-table :data="list" class="mt-50px com-table _com_el-table-wrap">
        <el-table-column type="index" width="100">
          <template #header>{{ $t('common.num') }}</template>
        </el-table-column>
        <el-table-column prop="taskId" :label="$t('computeTask.taskId')" />
        <el-table-column
          show-overflow-tooltip
          prop="taskCategory"
          :label="$t('computeTask.taskCategory')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="startTime"
          :label="$t('computeTask.startTime')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="totalTime"
          :label="$t('computeTask.totalTime')"
        />
        <el-table-column :label="$t('common.actions')" :fixed="'right'" :width="100">
          <template #default="scope">
            <el-button
              type="text"
              :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
              circle
              @click="viewData(scope.row)"
            >{{ $t('common.view') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
const router: Router = useRouter()
const list = ref(
  [
    { dataName: 'XXX' }
  ]
)

const viewData = (obj: any) => {
  router.push({ name: "computeTaskDetails", params: { ...obj } })
}
</script>
<style lang="scss" scoped>
</style>