<template>
  <div class="flex-1 task-wrap com-main workflow-normal">
    <Banner :bg-name="'newTask'" :showRouter="isRouterWorkFlow" @back="$router.go(-1)" :back-show="!isRouterWorkFlow"
      :detailName="workflowName">
      <template #briefInfo v-if="isRouterWorkFlow">{{ t('task.createTaskBriefInfo') }}</template>
    </Banner>
    <div class="com-main-data-wrap main-content">
      <NormalMode :key="normalTimeKey" @getWorkName="getWorkName" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NormalMode from './components/NormalMode.vue'
const { t,locale } = useI18n()
const route: any = useRoute()
const isRouterWorkFlow = computed(() => route.params?.workflowId ? false : true)
const workflowName = ref('')
const getWorkName = (str: string) => {
  workflowName.value = str
}


const normalTimeKey = ref(Date.now())

watch(route, () => {
  normalTimeKey.value = Date.now()
})
watch(locale, () => {
  normalTimeKey.value = Date.now()
})

</script>
<style lang="scss" scoped>
.workflow-normal {
  :deep(.el-form) {
    .el-form-item__label {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 22px;
    }
    .el-form-item--default {
      margin-bottom: 38px;
    }
  }

}
</style>