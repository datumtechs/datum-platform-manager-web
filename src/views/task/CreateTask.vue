<template>
  <div class="flex-1">
    <Banner :bg-index="5">
      <template #briefInfo>{{ $t('task.createTaskBriefInfo') }}</template>
    </Banner>
    <TaskMain />
  </div>
</template>
<script lang="ts" setup>
import TaskMain from './components/TaskMain.vue';
</script>
<style lang="scss" scoped></style>