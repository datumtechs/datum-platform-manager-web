<template>
  <div class="mt-46px">
    <div>
      <PrivateSwitch :mode="'expert'" @change="$router.push({ name: 'wizardMode' })" />
    </div>
    <div class="my-30px h-668px flex border-1 border-solid border-color-[#EEE] operation-box">
      <Algorithm />
      <Flow :status-list="statusList" :workflow-status="workflowStatus" />
      <Panel />
    </div>
    <SetNameDialog v-model:show="showDialog" />
  </div>
</template>
<script lang="ts" setup>
import Algorithm from './expert/Algorithm.vue'
import Panel from './expert/Panel.vue'
import Flow from './expert/Flow.vue'
import SetNameDialog from './expert/SetNameDialog.vue'
import PrivateSwitch from './PrivateSwitch.vue'
import { getWorkflowStatusOfExpertMode } from '@/api/expert'

const route = useRoute()
const showDialog = computed(() =>
  route.query.workflowId ? false : true
)

const workflowId = computed(() => route.query.workflowId)
const workflowVersion = computed(() => route.query.workflowVersion)
const isInEdit = computed(() => !!workflowId.value && !!workflowVersion.value)

watch(isInEdit, () => {
  if (isInEdit) {
    queryStatus()
  }
})

const workflowStatus = ref(0)
const statusList = ref([])
const queryStatus = () => {
  getWorkflowStatusOfExpertMode({
    workflowId: workflowId.value,
    workflowVersion: workflowVersion.value
  }).then(res => {
    const { code, data } = res
    if (code === 10000) {
      workflowStatus.value = data.runStatus
      statusList.value = data.workflowNodeStatusList
    }
  })
}

onMounted(() => {
  if (isInEdit.value) {
    queryStatus()
  }
})


</script>
<style lang="scss" scoped>
.operation-box {
  // height: calc(100vh - 406px);
}
</style>