<template>
  <div class="normal-wrap pt-40px pb-40px" v-loading="loading">
    <div class="flex item-center justify-between px-9px py-5px bg-color-[#F7F8F9] h-80px">
      <div @click="setActiveStep(index)" v-waves class="w-max-220px flex-col flex pl-31px leading-24px justify-center font-800"
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
    <div :style="{'pointer-events':views ? 'none': 'auto'}">
      <div v-show="activeIndex == 0" class="mt-38px mb-42px ml-6px">
        <PrivateSwitch :mode="'normal'" v-if="!workfolwParams.workflowId"
          @change="$router.push({ name: 'expertModel' })" />
        <SelectionAlg @getNoticeText="getNoticeText" :activeIndex="activeIndex" :taskParams="workfolwParams" @init="init(),activeIndex=1" :processList="processList"
          @getParams="slectionAlgParams" />
      </div>
       <component :is="componentList[list[activeIndex]?.type]?.components" 
          :workflowInfo="{ ...workflowInfo }"
          :step="activeIndex" 
          :type="list[activeIndex]?.type" 
          :fieldType="fieldType" 
          :taskParams="workfolwParams"
          :orgList="orgList"
          :dataOrgList="dataOrgList"
          :views="views"
          :noticeText="noticeText"
          @previous="previous" 
          @next="next" 
          @getParams="(params: any) => { }" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getUserOrgList } from '@/api/login'
import { getWorkflowSettingOfWizardMode, startWorkFlow, getProcessList } from '@/api/workflow'
import PrivateSwitch from './PrivateSwitch.vue'
import SelectionAlg from './normal/SelectionAlg.vue';
import PSIInputData from './normal/PSIInputData.vue';//psi训练输入数据
import TrainingInputData from './normal/TrainingInputData.vue';//训练输入数据
import ForecastInputData from './normal/ForecastInputData.vue';//预测输入数据
import ComputingEnvironment from './normal/ComputingEnvironment.vue';//计算环境
import ResultReceiver from './normal/ResultReceiver.vue';//结果接收方
import { useWorkFlow } from '@/stores'
import { onBeforeRouteLeave } from 'vue-router';
import { LoginNonceId } from '@/api/login'
import { useWallet, useUsersInfo } from '@/stores'
import { ElMessage } from 'element-plus';
const userInfoStore = useUsersInfo()
const walletStore = useWallet()
const web3: any = inject('web3')
const loading = ref(false)
const { t } = useI18n()
const store = useWorkFlow()
const route = useRoute()
const router = useRouter()
const activeIndex = ref(0)
const orgList: any = ref<any>([])
const dataOrgList: any = ref<any>([])
const comList = ref([])
const noticeText = ref({})
const workfolwParams = ref<any>({})
const processList = ref([])//流程列表
const workflowInfo = reactive<any>({
  workflowId: '',
  workflowVersion: ''
})
const emit = defineEmits(['getWorkName'])
const views = ref(false)

const componentList = markRaw<any[]>(
  //0-选择训练输入数据, 
  //1-选择预测输入数据,
  // 2-选择PSI输入数据,
  // 3-选择计算环境(通用), 
  //4-选择计算环境(训练&预测), 
  //5-选择结果接收方(通用), 
  //6-选择结果接收方(训练&预测)
  (() => {
    return new Array(7).fill('').map((v, index) => {
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

const fieldType = ref<any[]>([{
  name: "task.idColumn",//id列
  type: "idColumn",
  tips:"task.idColumnTips"
}, {
  name: "task.label",//标签
  type: "label",
  tips:"task.labelTips"
}, {
  name: "task.feature",//特征
  type: "feature",
  tips:"task.featureTips"
}])

watch(activeIndex, () => {
  store.setStep(activeIndex.value)
})

const getNoticeText = (obj: any) => {
  noticeText.value = obj
}
const aa = (event:any)=>{
  event.preventDefault()
  event.stopPropagation()

}

const getStepInfo = (data: any) => {
  if (list.value.length > 1) return
  comList.value = data.map((v: any, index: number) => {
    list.value.push({
      setp: `0${index + 2}`,
      info: `task.${componentList[v.type]?.i18Text}`,
      type: v.type
    })
    return v
  })
}

const slectionAlgParams = (params: any) => {
  queryProcessList(params.algorithmId)
}

const getLoginNonce = async () => {
  try {
    const address: string | null = userInfoStore.getAddress
    if (address) {
      const {
        data, code
      } = await LoginNonceId(address)
      if (code !== 10000) {
        return new Error('Wallet address exception')
      }
      walletStore.setNonceId(data.nonce)
    } else {
      console.log('get address error');
    }
  } catch (error) {
    console.log(error)
  }
}


const submit = async () => {
  try {
    await web3.connectWallet()
    await getLoginNonce()
    const res = await web3.signForWallet('sign')
    startWorkFlow({
      "sign": res,
      "workflowId": workflowInfo.workflowId,
      "workflowVersion": workflowInfo.workflowVersion
    }).then(res => {
      const { data, code } = res
      if (code == 10000) {
        router.push({ name: 'workflow' })
      }
    })
  } catch (error) {
    console.log(error)
  }

}

const activeStep = (index: number) => {
  activeIndex.value = index
}

const next = () => {
  if (activeIndex.value >= list.value.length - 1 && list.value.length > 1) {
    submit()
  } else {
    activeStep(activeIndex.value + 1)
    store.setStep(activeIndex.value)
  }
  query()
}
const previous = () => {
  if (activeIndex.value > 0) {
    activeStep(activeIndex.value - 1)
  } else {
    activeStep(0)
  }
  query(activeIndex.value)

}

const setActiveStep = (index: number) => {
  if( activeIndex.value == index) return
  if (workfolwParams.value?.completedCalculationProcessStep + 1 < index) {
    ElMessage.warning(t('task.pleaseCompleteStep'))
    return
  }
  activeIndex.value = index
  query(index)
}

const query = (index?: number) => {
  if (!workflowInfo.workflowId) return
  loading.value = true
  getWorkflowSettingOfWizardMode({
    workflowId: workflowInfo.workflowId,
    workflowVersion: workflowInfo.workflowVersion,
    step: index ? index : store.getStep == 0 ? 1 : store.getStep
  }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      workfolwParams.value = { ...data }
      emit('getWorkName', data.workflowName)
    }
    loading.value = false
  }).catch((e) => {
    console.log('接口报错', e)
    loading.value = false
  })
}

const queryProcessList = (algorithmId: number) => {//流程列表
  processList.value = []
  getProcessList({ algorithmId }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      processList.value = data
      setProces()
    }
  })
}

const setProces = () => {//设置流程
  processList.value.forEach((v: any) => {
    if (v.calculationProcessId == workfolwParams.value.calculationProcessId) {
      getStepInfo(v.stepItem)
    }
  })
}


const init = () => {
  const workflowId = route.params.workflowId || store.getWorkerFlow.workflowId
  const workflowVersion = route.params.workflowVersion || store.getWorkerFlow.workflowVersion
  views.value = route.params.views  == 'view'
  if (workflowId) {
    workflowInfo.workflowId = workflowId
    workflowInfo.workflowVersion = workflowVersion
    store.setWorkerFlow({
      workflowId: workflowId,
      workflowVersion: workflowVersion,
    })
    query()
  }
}


const queryOrgList = () => {//查询组织列表
  if (orgList.value.length) return
  getUserOrgList().then(res => {
    const { data, code } = res
    if (code === 10000) {
      orgList.value = data
    }
  })
}
const queryIsDataOrgList = () => {//查询组织列表
  if (orgList.value.length) return
  getUserOrgList({includeData:true}).then(res => {
    const { data, code } = res
    if (code === 10000) {
      dataOrgList.value = data
    }
  })
}


onMounted(() => {
  init()
  queryOrgList()
  queryIsDataOrgList()
})


onBeforeRouteLeave((to, form) => {
  store.setStep(0)
  store.setWorkerFlow({
    workflowId: null,
    workflowVersion: null,
  })
})
</script>
<style>

</style>
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