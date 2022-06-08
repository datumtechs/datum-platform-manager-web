<template>
  <div class="mt-50px step-two-wrap">
    <div class="flex items-center mb-36px text-14px step-two-wrap">
      <div class="mr-20px text-color-[#666666]">{{ $t('task.selection') }} ：</div>
      <NoticeText :noticeText="props.noticeText" />
    </div>
    <div class="my-30px w-full pl-24px text-color-[#0052D9] flex flex items-center h-36px bg-color-[#EEF4FF] rounded-[4px] text-14px">
        <img class="w-20px h-20px mr-8px" src="@/assets/images/auth/sigh.png"/>
        <span>{{t('task.resultReceiverTips')}}</span>
    </div>
    <div class="flex receivers justify-between">
      <el-form v-for="(item, i) in listLength" :rules="rules[i]" :ref="(e: any) => formRef[i] = e" :model="form[i]"
        :key="item" class="w-530px com-border-eee rounded-8px border-b-1px border"
        :style="{ 'margin-right': item == 1 ? '20px' : '' }" label-position="top">
        <div class="p-30px">
          <div class="pb-20px text-color-[#333333] text-16px font-medium font-600">{{
              item == 1 ?
                $t('task.trainingResultReceivers') : $t('task.predictionResultReceivers')
          }}</div>
          <el-form-item prop="checkList">
            <el-checkbox-group v-model="form[i].checkList">
              <template v-for="v in props.taskParams.algorithmId == 1001 ? props.dataOrgList : props.orgList" :key="item.identityId">
                <el-checkbox :label="v.identityId">{{ v.nodeName }}</el-checkbox>
                <br />
              </template>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="flex items-center pt-20px relative" v-if="!views">
      <el-button v-waves round class="h-50px previous" @click="previous">{{ $t('common.previous') }}</el-button>
      <el-button v-waves round class="h-50px previous ml-20px" @click="preserv">{{ $t('common.saveAndReturn') }}</el-button>
      <!-- <el-button round @click="next" class="h-50px absolute right-0px com-button previous ml-20px">{{
          $t('task.startTask')
      }}</el-button>
    -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import NoticeText from './NoticeText.vue';
import { setWorkflowOfWizardMode,getWorkflowSettingOfWizardMode } from '@/api/workflow'
const router: any = useRouter()
const route: any = useRoute()
const emit = defineEmits(['previous', 'next'])
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
    default: (): any => ([])
  },
  dataOrgList: {
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
const { t } = useI18n()
//5-选择结果接收方(通用), 
//6-选择结果接收方(训练&预测)
const listLength = ref(props.type == 6 ? 2 : 1)
const psiInput = ref({})
const formRef = ref<any>([])
const form = reactive({
  0: { checkList: [] },
  1: { checkList: [] }
})


const rules = reactive({
  0: {
    checkList: [{ required: true, message: `${t('task.selectResultReceiver')}` }]
  },
  1: {
    checkList: [{ required: true, message: `${t('task.selectResultReceiver')}` }]
  }
})

const preserv = () => {
  next('preserv')
}

const next = async (str?: string) => {
  //@ts-ignore
  const validate: any[] = new Array(listLength.value).fill(false)
  let resource = 1
  if (listLength.value <= 1) {
    resource = props.taskParams.value?.commonOutput.storePattern
  } else {
    resource = props.taskParams.value?.trainingAndPredictionOutput.prediction.storePattern
  }
  await validate.forEach(async (v, i) => {
    const result = await formRef.value[i].validate()
    if (result) {
      validate[i] = {
        storePattern: resource,
        identityId: form[i].checkList
      }
    }
  })


  if (validate.some(v => v == false)) return
  const params = listLength.value <= 1 ? {
    commonOutput: { ...validate[0] }
  } : {
    trainingAndPredictionOutput: {
      prediction: { ...validate[0] },
      training: { ...validate[1] }
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
        if(route.params) {
          router.push({name:'workflow'})
          return
        }
        router.go(-1)
        // emit('next')
      }
    }
  })
}


const init = () => {
  const data = props.taskParams
  if (data?.calculationProcessStep?.type == 5 || data?.calculationProcessStep?.type == 6) {
    const list = data?.calculationProcessStep?.type == 5 ?
      [data.commonOutput] : [{ ...data.trainingAndPredictionOutput.prediction }, { ...data.trainingAndPredictionOutput.training }]
    list.forEach((v, i) => {
      form[i].checkList = v.identityId
    })
    query()
  }
}

const previous = () => {
  emit('previous')
}


watch(() => props.taskParams, () => {
  init()
})


const query = (index?: number) => {
  if(props.taskParams.calculationProcessId !== 4) return
  getWorkflowSettingOfWizardMode({
    workflowId:  props.taskParams.workflowId,
    workflowVersion:  props.taskParams.workflowVersion,
    step: 1
  }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      psiInput.value = { ...data }?.psiInput
    }
  }).catch((e:any) => {
    console.log('接口报错', e)
  })
}


</script>
<style lang="scss">
.receivers {
  .el-form {
    .el-form-item__content .el-radio-group {
      display: block;

      .el-radio__label {
        margin-left: 12px;
        color: #333333;
      }
    }
  }
}

.previous {
  border-radius: 25px !important;
  padding: 20px 40px !important;
}
</style>