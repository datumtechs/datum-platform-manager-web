<template>
  <div class="mt-30px">
    <div>
      <PrivateSwitch :mode="'expert'" @change="$router.push({ name: 'wizardMode' })" />
    </div>
    <div class="my-30px flex border-1 border-solid border-color-[#EEE] operation-box">
      <Algorithm :isSettingCompleted="isSettingCompleted ? true : false" />
      <Flow :status-list="statusList" :workflow-status="workflowStatus"
        :isSettingCompleted="isSettingCompleted ? true : false" />
      <Panel :isSettingCompleted="isSettingCompleted ? true : false" />
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
import { getWorkflowStatusOfExpertMode, getWorkflowSettingOfExpertMode } from '@/api/expert'
import { useExpertMode } from '@/stores'

// 1. unset 2. unSave 3. paramsEdit
const mode = ref('')

const route = useRoute()
const showDialog = computed(() =>
  route.params.workflowId ? false : true
)

const workflowId = computed(() => route.params.workflowId)
const workflowVersion = computed(() => route.params.workflowVersion)
const isInEdit = computed(() => !!workflowId.value && !!workflowVersion.value)
const isSettingCompleted = computed(() => route.params.isSettingCompleted)

watch(() => isInEdit.value, (newV, oldV) => {
  if (newV) {
    queryStatus()
  }
})

onBeforeUnmount(() => {
  useExpertMode().resetWorkflow()
  useExpertMode().setShowPanel(false)
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

const queryNodeSetting = () => {
  getWorkflowSettingOfExpertMode({
    workflowId: workflowId.value,
    workflowVersion: workflowVersion.value
  }).then(res => {
    const { code, data } = res
    if (code === 10000) {
      useExpertMode().setNodeList(data.workflowNodeList)
    }
  })
}


onMounted(() => {
  if (isInEdit.value && isSettingCompleted.value) {
    queryStatus()
    queryNodeSetting()
  }
})


</script>
<style lang="scss" scoped>
.operation-box {
  height: calc(100vh - 191px);
  border-radius: 8px;
}
</style>