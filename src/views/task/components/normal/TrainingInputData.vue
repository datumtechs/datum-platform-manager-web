<template>
  <div class="mt-50px step-two-wrap">
    <div class="flex items-center mb-36px text-14px">
      <div class="mr-20px text-color-[#666666]">{{ $t('task.selection') }} ：</div>
      <NoticeText :noticeText="props.noticeText" />
    </div>
    <div class="flex items-center text-14px">
      <div class="mr-20px text-color-[#666666] font-medium w-130px">{{ $t('task.selectSponsor') }} ：</div>
      <el-select v-model="identityId" :suffix-icon="CaretBottom" :placeholder="$t('task.selectSponsor')"
        :disabled="taskParams.isSettingCompleted" style="flex:0 0 440px"
        class="h-40px rounded-20px border-1 basis-1/2 border-solid border-color-[#EEEEEE]">
        <el-option v-for="(v) in props.orgList" :label="v.nodeName" :value="v.identityId">
        </el-option>
      </el-select>
     
    </div>
    <div class="flex items-center text-14px mt-20px">
      <div class="mr-20px text-color-[#666666] font-medium w-130px">{{ $t('task.PSI') }} ：</div>
      <el-switch v-model="psi" :disabled="taskParams.isSettingCompleted" />
    </div>
    <TaskParamsTransfer :fieldType="[...props.fieldType]" :sellectionAlgPsi="true" :disabledData="psiInputTwo?.metaData"
      :key="'input'" @update:params="psiInputOne = $event" :params="psiInputParams.one" :num="1"
      :taskParams="props.taskParams" :orgList="props.orgList" />
    <div class="h-30px"></div>
    <TaskParamsTransfer :fieldType="[props.fieldType[0], props.fieldType[2]]" :sellectionAlgPsi="true"
      :disabledData="psiInputOne?.metaData" :key="'output'" @update:params="psiInputTwo = $event"
      :taskParams="props.taskParams" :params="psiInputParams.two" :num="2" :orgList="props.orgList" />
    <div class="flex items-center pt-20px" v-if="!views">
      <el-button v-waves round class="h-50px previous" @click="previous">{{ $t('common.previous') }}</el-button>
      <el-button v-waves round class="h-50px previous ml-20px" @click="preserv">{{ $t('common.saveAndReturn') }}</el-button>
      <NextButton @click="submit" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NoticeText from './NoticeText.vue';
import TaskParamsTransfer from '@/components/TaskParamsTransfer.vue';
import { CaretBottom } from '@element-plus/icons-vue'
import NextButton from './NextButton.vue'
import { setWorkflowOfWizardMode } from '@/api/workflow'
const router: any = useRouter()
const {t} = useI18n()
const emit = defineEmits(['previous', 'getParams', 'next'])
const props: any | { orgList: any } = defineProps({
  noticeText: {
    type: Object,
    default: () => ({})
  },
  step: {
    type: Number,
    default: 1
  },
  type: {
    type: Number,
    default: 0
  },
  workflowInfo: {
    type: Object,
    default: () => ({})
  },
  orgList: {
    type: Array,
    default: (): any => []
  },
  fieldType: {
    type: Array,
    default: (): any => []
  },
  taskParams: {
    type: Object,
    default: () => ({})
  },
   views: {
    type: Boolean,
    default: false
  }
})

const psiInputParams = reactive({ one: [], two: [] })
const psiInputOne = ref<any>({})
const psiInputTwo = ref<any>({})
const identityId = ref('')
const psi = ref(false)

const next = () => {
  emit('getParams')
  emit('next')
}


const previous = () => {
  emit('previous')
}


const handParams = (obj: any) => {
  return new Promise((resolve, reject) => {
    try {
      const item = {
        identityId: obj?.metaData[0],
        metaDataId: obj?.metaData[1],
        keyColumn: obj?.idColumn.columnIdx,
        dependentVariable: obj?.label.columnIdx,
        dataColumnIds: obj?.feature.map((_: any) => _.columnIdx).join(',')
      }
      resolve(item)
    } catch (e) {
        ElMessage.closeAll()
        ElMessage.warning(t('task.selectData'))
       reject('err') 
    }
  })
}

const preserv = () => {
  submit('preserv')
}

const submit = async (str?: string | any) => {
  const data = await handParams(psiInputOne.value)
  const data2 = await handParams(psiInputTwo.value)

  setWorkflowOfWizardMode({
    workflowId: props.workflowInfo.workflowId,
    workflowVersion: props.workflowInfo.workflowVersion,
    algorithmId: props.taskParams.algorithmId,
    calculationProcessId: props.taskParams.calculationProcessId,
    trainingInput: {
      identityId: identityId.value,
      isPsi: psi.value || false,
      item: [
        data,
        data2
      ]
    },
    calculationProcessStep: {
      step: props.step,
      type: props.type
    }
  }).then(res => {
    const { code } = res
    if (code === 10000) {
      if (str == 'preserv') {
        router.go(-1)
        return
      }
      next()
    }
  })
}


const init = () => {
  const { trainingInput } = props.taskParams
  psi.value = trainingInput.isPsi || undefined
  identityId.value = trainingInput?.identityId
  psiInputParams.one = trainingInput?.item[0] || []
  psiInputParams.two = trainingInput?.item[1] || []
}

watch(() => props.taskParams, () => {
  init()
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
}

.previous {
  border-radius: 25px !important;
  padding: 20px 40px !important;
}
</style>