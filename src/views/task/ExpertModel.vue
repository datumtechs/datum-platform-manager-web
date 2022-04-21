<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :bg-name="'newTask'">
      <template #briefInfo>{{ t('task.createTaskBriefInfo') }}</template>
    </Banner>
    <div class="com-main-data-wrap main-content">
      <ExpertModel />
    </div>
  </div>
</template>
<script lang="ts" setup>
import ExpertModel from './components/ExpertModel.vue'
const { t } = useI18n()

</script>
<style lang="scss">
.task-wrap {
  .el-form .el-form-item__label {
    // @extend .font-bold;
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    line-height: 22px;
  }

  .el-form .el-form-item--default {
    margin-bottom: 38px;
  }
}
</style>