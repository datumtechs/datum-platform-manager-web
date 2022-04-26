<template>
  <div class="mt-50px step-two-wrap">
    <div class="flex items-center mb-36px text-14px">
      <div class="mr-20px text-color-[#666666]">{{ $t('task.selection') }} ：</div>
      <NoticeText :noticeText="props.noticeText" />
    </div>
    <div class="flex items-center text-14px">
      <div class="mr-20px text-color-[#666666] font-medium w-130px">{{ $t('task.selectSponsor') }} ：</div>
      <el-select v-model="sponsorValue" :suffix-icon="CaretBottom" :placeholder="$t('task.selectSponsor')"
        style="flex:0 0 440px" class="h-40px rounded-20px border-1 basis-1/2 border-solid border-color-[#EEEEEE]">
        <el-option v-for="item in sponsorList" :key="item.identityId" :label="item.nodeName" :value="item.identityId">
        </el-option>
      </el-select>
    </div>
    <TaskParamsTransfer :key="'input'" @update:psiInputOne="psiInputOne = $event" :num="1" :sponsorList="sponsorList" />
    <div class="h-30px"></div>
    <TaskParamsTransfer :key="'output'" @update:psiInputTwo="psiInputTwo = $event" :num="2"
      :sponsorList="sponsorList" />
    <div class="flex items-center pt-20px">
      <el-button round class="h-50px previous" @click="previous">{{ $t('common.previous') }}</el-button>
      <el-button round class="h-50px previous ml-20px">{{ $t('common.saveAndReturn') }}</el-button>
      <NextButton @click="next" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NoticeText from './NoticeText.vue';
import TaskParamsTransfer from '@/components/TaskParamsTransfer.vue';
import { Back, CaretBottom, Plus } from '@element-plus/icons-vue'
import NextButton from './NextButton.vue'
import { getUserOrgList } from '@/api/login'
import { getWorkflowSettingOfWizardMode, setWorkflowOfWizardMode } from '@/api/workflow'
const emit = defineEmits(['previous', 'getParams', 'next'])
const sponsorList = ref<any[]>([])
const props = defineProps({
  noticeText: {
    type: Object,
    default: () => ({})
  },
  step: {
    type: Number,
    default: 1
  },
  workflowInfo: {
    type: Object,
    default: () => ({})
  }
})

const psiInputOne = ref({})
const psiInputTwo = ref({})
const sponsorValue = ref('')


const next = () => {
  emit('getParams')
  emit('next')
}


const previous = () => {
  emit('previous')
}

const query = () => {
  getUserOrgList().then(res => {
    const { data, code } = res
    if (code === 10000) {
      sponsorList.value = data
    }
  })
}

const queryStepInfo = () => {
  getWorkflowSettingOfWizardMode({
    workflowId: props.workflowInfo?.workflowId,
    workflowVersion: props.workflowInfo?.workflowVersion,
    step: props.step
  }).then(res => {
    const { data, code } = res
    if (code === 10000) {

    }
  })
}

const submit = () => {
  setWorkflowOfWizardMode({
    workflowDetailsOfWizardModeDtoReq: {
      psiInput: {},
      workflowId: props.workflowInfo.workflowId,
      workflowVersion: props.workflowInfo.workflowVersion
    }
  }).then(res => {
    const { data, code } = res
    if (code === 10000) {

    }
  })
}

onMounted(() => {
  query()
  queryStepInfo()
})

</script>
<style lang="scss">
.step-two-wrap {

  .el-cascader .el-input__inner,
  .el-select .el-input__inner {
    height: 40px;
    border: none;
    background: transparent;
    text-indent: 20px;
  }

  .el-cascader .el-input__suffix .el-icon,
  .el-select .el-input__suffix .el-icon {
    color: #333333;
  }

  .previous {
    border-radius: 25px;
    padding: 0 40px;
  }
}
</style>