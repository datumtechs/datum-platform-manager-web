<template>
  <div class="flex-1 task-wrap com-mian">
    <Banner :bg-name="'book'">
      <template #briefInfo>{{ $t('task.createTaskBriefInfo') }}</template>
    </Banner>
    <div class="com-main-data-wrap">
      <TaskMain />
    </div>
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