<template>
  <div class="flex-1 task-wrap">
    <Banner :bg-index="5">
      <template #briefInfo>{{ $t('task.createTaskBriefInfo') }}</template>
    </Banner>
    <TaskMain />
  </div>
</template>
<script lang="ts" setup>
import TaskMain from './components/TaskMain.vue';
</script>
<style lang="scss">
.task-wrap {
  .el-form .el-form-item__label {
    // @extend .black-font;
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