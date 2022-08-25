<template>
  <div class="mt-30px">
    <div class="flex items-center">
      <el-icon v-if="workflowName" :size="40" class="cursor-pointer mr-10px" @click="$router.go(-1)">
        <back />
      </el-icon>
      <p v-if="workflowName" class="mr-30px text-[32px] font-color-[#333] ellipse max-w-500px">{{
          workflowName
      }}</p>
      <PrivateSwitch :mode="'expert'" @change="$router.push({ name: 'wizardMode' })" />
    </div>
    <div class="my-30px flex border-1 border-solid border-color-[#EEE] operation-box overflow-auto">
      <Algorithm :isReadonly="isReadonly" :key="refreshTag" :isSettingCompleted="isSettingCompleted" />
      <Flow :isInEdit="isInEdit" :isReadonly="isReadonly" :status-list="statusList" :workflow-status="workflowStatus"
        :isSettingCompleted="isSettingCompleted" @showNameDialog="(_: boolean) => showDialog = _" />
      <Panel :isReadonly="isReadonly" :isSettingCompleted="isSettingCompleted ? true : false" />
    </div>
    <SetNameDialog v-model:show="showDialog" v-if="showDialog" @submit="copySubmit" />
  </div>
</template>
<script lang="ts" setup>
import Algorithm from './expert/Algorithm.vue'
import Panel from './expert/Panel.vue'
import Flow from './expert/Flow.vue'
import PrivateSwitch from './PrivateSwitch.vue'
import { getWorkflowStatusOfExpertMode, getWorkflowSettingOfExpertMode, createWorkflowOfExpertMode } from '@/api/expert'
import { useExpertMode } from '@/stores'
import { Back } from '@element-plus/icons-vue'
// 1. unset 2. unSave 3. paramsEdit
const { locale } = useI18n()

const route = useRoute()
const router = useRouter()
const showDialog = ref(false)

const refreshTag = ref(Date.now())
const workflowId = computed(() => route.params.workflowId)
const workflowVersion = computed(() => route.params.workflowVersion)
const isInEdit = computed(() => !!workflowId.value && !!workflowVersion.value)
const isSettingCompleted = computed(() => route.params.isSettingCompleted === '1')
const isReadonly = computed(() => route.params.isReadonly === '1')
const workflowName = computed(() => route.params.workflowName)

watch(() => isInEdit.value, (newV, oldV) => {
  if (newV) {
    showDialog.value = !isInEdit.value
    queryStatus()
  }
})

watch(locale, () => {
  refreshTag.value = Date.now()
})

onBeforeUnmount(() => {
  useExpertMode().resetWorkflow()
  useExpertMode().setShowPanel(false)
})

const workflowStatus = ref(0)
const statusList = ref([])

const copySubmit = (name: string) => {
  createWorkflowOfExpertMode({
    workflowName: name
  }).then(res => {
    console.log(res);
    const { code, data } = res
    if (code === 10000) {
      router.push({
        name: 'expertModel',
        params: {
          workflowId: data.workflowId,
          workflowVersion: data.workflowVersion,
          workflowName: name
          // TODO type edit / view / add
        }
      })
    }
  })
}

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
      useExpertMode().setIsPrivacy(data.workflowNodeList[0].alg.type === 0)
      useExpertMode().setNodeList(data.workflowNodeList)
    }
  })
}


onMounted(() => {
  showDialog.value = !isInEdit.value
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