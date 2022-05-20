<template>
  <div class="mt-50px step-two-wrap">
    <div class="flex items-center mb-36px text-14px">
      <div class="mr-20px text-color-[#666666]">{{ $t('task.selection') }} ：</div>
      <NoticeText :noticeText="props.noticeText" />
    </div>
    <div class="flex environment justify-between">
      <el-form v-for="(item, i) in listLength" :key="item" :rules="rules[i]"
        class="w-530px com-border-eee rounded-8px border-b-1px border" :ref="(e: any) => formRef[i] = e"
        label-position="top" ref:style="{ 'margin-right': item == 1 ? '20px' : '' }" :model="form[i]">
        <div class="p-30px border-bottom text-color-[#333333] text-16px font-medium font-600">{{
            item == 1 ?
              $t('task.environmentTraining') : $t('task.environmentPrediction')
        }}</div>
        <div class="p-30px">
          <div class="pb-20px text-color-[#333333] font-medium font-600">{{ $t('task.lowestNeed') }}</div>
          <el-form-item :label="`${$t('common.cpu')}：`" prop="cpu">
            <el-input v-model="form[i].cpu" :placeholder="`${$t('task.pleaseEnter')}${$t('common.cpu')}`"
              class="input-with-select">
              <template #append>
                <div class="w-70px flex justify-center">{{ $t('common.cores') }}</div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="`${$t('common.memory')}：`" prop="memory">
            <el-input v-model="form[i].memory" :placeholder="`${$t('task.pleaseEnter')}${$t('common.memory')}`"
              class="input-with-select">
              <template #append>
                <el-select v-model="form[i].memorySymbol" style="width: 110px">
                  <el-option v-for="item in companyList" :label="`${item}`" :key="item" :value="item"></el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="`${$t('common.bandwidth')}：`" prop="bandwidth">
            <el-input v-model="form[i].bandwidth" :placeholder="`${$t('task.pleaseEnter')}${$t('common.bandwidth')}`"
              class="input-with-select">
              <template #append>
                <el-select v-model="form[i].bandwidthSymbol" style="width: 110px">
                  <el-option v-for="item in companyList" :label="`${item}ps`" :key="item" :value="item"></el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <div class="text-color-[#333333] text-16px font-medium font-600 pt-46px pb-20px">{{ $t('task.longestTime') }}
          </div>
          <el-form-item prop="time">
            <el-input v-model="form[i].time" :placeholder="`${$t('task.pleaseEnter')}${$t('task.longestTime')}`"
              class="input-with-select">
              <template #append>
                <el-select v-model="form[i].timeSymbol" style="width: 110px">
                  <el-option v-for="item in timeCompanyList" :label="$t(`${item.label}`)" :key="item.value"
                    :value="item.value"></el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="flex items-center pt-20px" v-if="!views">
      <el-button v-waves round class="h-50px previous" @click="previous">{{ $t('common.previous') }}</el-button>
      <el-button v-waves round class="h-50px previous ml-20px" @click="preserv">{{ $t('common.saveAndReturn') }}</el-button>
      <NextButton @click="submit" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NoticeText from './NoticeText.vue';
import { setWorkflowOfWizardMode } from '@/api/workflow'
import NextButton from './NextButton.vue'
const router: any = useRouter()
const { t } = useI18n()
const emit = defineEmits(['previous', 'next'])
const props = defineProps({
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
  taskParams: {
    type: Object,
    default: () => ({})
  },
    views: {
    type: Boolean,
    default: false
  }
})


// 3-选择计算环境(通用), 
//4-选择计算环境(训练&预测), 
const listLength = ref(props.type == 4 ? 2 : 1)
const formRef = ref<any>([])
const paramsItem = {
  cpu: '',
  memory: '',
  memorySymbol: 'MB',
  bandwidth: '',
  bandwidthSymbol: 'MB',
  time: '',
  timeSymbol: 'minute'
}
const rulesItem = {
  cpu: [{ required: true, message: `${t('task.pleaseEnter')}${t('task.taskName')}` }],
  memory: [{ required: true, message: t('task.stepOneSelectComputingTitle') }],
  bandwidth: [{ required: true, message: t('task.stepOneSelectAlgorithmTitle') }],
  time: [{ required: true, message: t('task.stepOneSelectProcedureTitle') }]
}
const form = reactive({
  0: {
    ...paramsItem
  },
  1: {
    ...paramsItem
  }
})

const rules = reactive({
  0: {
    ...rulesItem
  },
  1: {
    ...rulesItem
  }
})



// const companyList = ref(['KB', 'MB', 'GB'])
const companyList = ref(['MB'])
const timeCompanyList = ref([
  {
    label: 'common.minute',
    value: 'minute'
  },
])

const preserv = () => {
  submit('preserv')
}


const submit = async (str?:any) => {  
  //@ts-ignore
  const validate: any[] = new Array(listLength.value).fill(false)
  // const data: any[] = []
  let resource = {}
  if (listLength.value <= 1) {
    resource = props.taskParams.value?.commonResource.costGpu
  } else {
    resource = props.taskParams.value?.trainingAndPredictionResource.costGpu
  }
  await validate.forEach(async (v, i) => {
    const result = await formRef.value[i].validate()
    if (result) {
      validate[i] = {
        costCpu: +form[i].cpu,
        costGpu: resource,
        costBandwidth: +form[i].bandwidth,
        costMem: +form[i].memory,
        runTime: +form[i].time,
      }
    }
  })


  if (validate.some(v => v == false)) return
  const params = listLength.value <= 1 ? {
    commonResource: { ...validate[0] }
  } : {
    trainingAndPredictionResource: {
      training: { ...validate[1] },
      prediction: { ...validate[0] }
    }
  }


  setWorkflowOfWizardMode({
    calculationProcessStep: {
      step: props.step,
      type: props.type
    },
    ...params,
    workflowId: props.taskParams.workflowId,
    workflowVersion: props.taskParams.workflowVersion,
    algorithmId: props.taskParams.algorithmId,
    calculationProcessId: props.taskParams.calculationProcessId
    // }
  }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      if (str == 'preserv') {
        router.go(-1)
        return
      }
      emit('next')
    }
  })
}



const init = () => {
  const data = props.taskParams
  if (data?.calculationProcessStep?.type == 3 || data?.calculationProcessStep?.type == 4) {
    const list = data?.calculationProcessStep?.type == 3 ?
      [data.commonResource] : [{ ...data.trainingAndPredictionResource.prediction }, { ...data.trainingAndPredictionResource.training }]
    list.forEach((v, i) => {
      form[i].cpu = v.costCpu
      form[i].memory = v.costMem
      form[i].bandwidth = v.costBandwidth
      form[i].time = v.runTime
    })
  }
}

const previous = () => {
  emit('previous')
}

watch(() => props.taskParams, () => {
  init()
})


</script>
<style lang="scss" scoped>
.environment  {
  :deep(.el-form){
   .el-form-item .el-form-item__label {
    font-size: 14px;
    font-weight: 400;
    font-family: DINPro-Medium, Ali-Medium;
    color: #333333;
    line-height: 20px;
  }

  .el-form-item .el-input--default {
    height: 40px;
    border-radius: 20px;
    border: 1px solid #eeeeee;

    .el-input__inner {
      border: none;
      height: 100%;
      border-radius: 20px 0 0 20px;
      text-indent: 20px;
    }

    .el-input-group__append {
      background: #f7f8f9;
      border-radius: 0 20px 20px 0;
      border: none;

      .el-input--default {
        border: none;
      }
    }
  }
  }
}

.previous {
  border-radius: 25px !important;
  padding: 0 40px !important;
}
</style>