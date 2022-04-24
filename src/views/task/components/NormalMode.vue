<template>
  <div class="normal-wrap pt-40px pb-40px">
    <div class="flex item-center justify-between px-9px py-5px bg-color-[#F7F8F9] h-80px">
      <div @click="activeStep(index)" class="w-max-220px flex-col flex pl-31px leading-24px justify-center font-800"
        v-for="(item, index) in list" :key="item.setp" :style="{
          flex: list.length <= 1 ? 'flex-230px' : 'flex-1'
        }" :class="{ active: activeIndex == index }">
        <div class="setp-item-name text-22px font-medium font-800 text-color-[#CCCCCC]">
          {{ $t('task.step') }}
          <span class="ml-10px font-800">{{ item.setp }}</span>
          <span class="cover inline-block w-11px h-11px relative top-6px -left--6px bg-color-[#F7F8F9]"></span>
        </div>
        <p class="setp-item-info font-medium text-color-[#666666] text-16px font-500 mt-5px">{{ $t(`${item.info}`) }}
        </p>
      </div>
    </div>
    <div v-show="activeIndex == 0" class="mt-38px mb-42px ml-6px">
      <PrivateSwitch :mode="'normal'" v-if="!route.params.workflowId" @change="$router.push({ name: 'expertModel' })" />
      <SelectionAlg @getStep="getStepInfo" @getNoticeText="getNoticeText" @activeStep="activeStep"
        :taskParams="selectionAlgParams" @next="next" @getParams="(params) => { }" />
    </div>
    <transition name="fade-main" mode="out-in">
      <component v-if="comList.length" :is="componentList[list[activeIndex]?.type]?.components" :taskParams="taskParams"
        :noticeText="noticeText" @previous="previous" @next="next" @getParams="(params: any) => {
        }" />
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { getWorkflowSettingOfWizardMode } from '@/api/workflow'
import PrivateSwitch from './PrivateSwitch.vue'
import SelectionAlg from './normal/SelectionAlg.vue';
import PSIInputData from './normal/PSIInputData.vue';//psi训练输入数据
import TrainingInputData from './normal/TrainingInputData.vue';//训练输入数据
import ForecastInputData from './normal/ForecastInputData.vue';//预测输入数据
import ComputingEnvironment from './normal/ComputingEnvironment.vue';//计算环境
import ResultReceiver from './normal/ResultReceiver.vue';//结果接收方
import { useWorkFlow } from '@/stores'
import { onBeforeRouteLeave } from 'vue-router';
import { ElMessage } from 'element-plus';
const { t } = useI18n()
const store = useWorkFlow()
const route = useRoute()
const router = useRouter()
const activeIndex = ref(0)
// const componentsType = ref(null)
const comList = ref([])
const noticeText = ref({})
const workflowInfo = reactive<any>({
  workflowId: '',
  workflowVersion: ''
})
const selectionAlgParams = ref<any>({})
const taskParams: any = reactive({
  selectionAlg: {},
  selectTrainingInputData: {},
  selectForecastInputData: {},
  selectPSIInputData: {},
  selectComputingEnvironment: {},
  selectResultReceiver: {},
})


const componentList = markRaw<any[]>(
  //0-选择训练输入数据, 
  //1-选择预测输入数据,
  // 2-选择PSI输入数据,
  // 3-选择计算环境(通用), 
  //4-选择计算环境(训练&预测), 
  //5-选择结果接收方(通用), 
  //6-选择结果接收方(训练&预测)
  (() => {
    return new Array(6).fill('').map((v, index) => {
      let obj = {}
      switch (index) {
        case 0:
          obj = {
            components: TrainingInputData,//训练输入数据
            i18Text: "selectTrainingInputData"
          }; break;
        case 1:
          obj = {
            components: ForecastInputData,//预测输入数据
            i18Text: "selectForecastInputData"
          }; break;
        case 2:
          obj = {
            components: PSIInputData,//psi训练输入数据
            i18Text: "selectPSIInputData"
          }; break;
        case 3:
        case 4:
          obj = {
            components: ComputingEnvironment,//计算环境
            i18Text: "selectComputingEnvironment"
          }; break;
        case 5:
        case 6:
          obj = {
            components: ResultReceiver,//结果接收方
            i18Text: "selectResultReceiver"
          }; break;
        default: break;
      }
      return obj
    })
  })()
)
const list = ref<any[]>(
  [
    {
      setp: '01',
      info: 'task.selectionAlg',
    }
  ]
)

watch(activeIndex, () => {
  store.setStep(activeIndex.value)
})

const getNoticeText = (obj: any) => {
  noticeText.value = obj
}

const getStepInfo = (data: any) => {
  comList.value = data.list.map((v: any, index: number) => {
    list.value.push({
      setp: `0${index + 2}`,
      info: `task.${componentList[v.type]?.i18Text}`,
      type: v.type
    })
    return v
  })
  console.log(comList)
}

const submit = () => {
  console.log('submit')
}

const activeStep = (index: number, auth?: Boolean) => {
  const { step } = selectionAlgParams?.value?.calculationProcessStep
  if (+step < index && !auth) {
    ElMessage.warning(t('workflow.dataNotPerfect'))
    return
  }
  activeIndex.value = index
}

const next = () => {
  if (activeIndex.value >= list.value.length - 1) {
    submit()
  } else {
    activeStep(activeIndex.value + 1)
    store.setStep(activeIndex.value)
  }
}
const previous = () => {
  if (activeIndex.value > 0) {
    activeStep(activeIndex.value - 1)
  } else {
    activeStep(0)
  }
}

const initQuery = () => {
  if (!workflowInfo.workflowId) return
  getWorkflowSettingOfWizardMode({
    workflowId: workflowInfo.workflowId,
    workflowVersion: workflowInfo.workflowVersion,
    step: 1
  }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      selectionAlgParams.value = { ...data }
      activeIndex.value = data?.calculationProcessStep?.step || 1
    }
  })

}

const initParams = () => {
  const { workflowId, workflowVersion } = route.params,
    workerFlowInfo = store.getWorkerFlow
  if (workflowId) {
    workflowInfo.workflowId = workflowId
    workflowInfo.workflowVersion = workflowVersion
    store.setWorkerFlow({
      workflowId: workflowId,
      workflowVersion: workflowVersion,
    })
  } else if (workerFlowInfo.workflowId) {
    workflowInfo.workflowId = workerFlowInfo.workflowId
    workflowInfo.workflowVersion = workerFlowInfo.workflowVersion
  }
  initQuery()
}

onMounted(() => {
  initParams()
})


onBeforeRouteLeave((to, form) => {
  store.setStep(0)
  store.setWorkerFlow({
    workflowId: null,
    workflowVersion: null,
  })
})
</script>
<style lang="scss" scoped>
.normal-wrap {
  .cover {
    transform: rotate(45deg);
  }

  .active {
    background: #2b60e9;
    border-radius: 8px;

    .setp-item-name,
    .setp-item-info {
      color: #ffffff !important;
    }

    .cover {
      background: #2b60e9;
      border-left: 1px solid #fff;
    }
  }
}
</style>