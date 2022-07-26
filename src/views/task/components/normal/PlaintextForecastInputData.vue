 v-waves <template>
  <div class="mt-50px step-two-wrap">
    <div class="flex items-center mb-36px text-14px">
      <div class="mr-20px text-color-[#666666]">{{ $t('task.selection') }} ：</div>
      <NoticeText :noticeText="props.noticeText" />
    </div>

    <div class="flex items-center text-14px">
      <div class="mr-15px text-color-[#666666] font-medium w-135px">{{ $t('task.selectSponsor') }} ：
      </div>
      <el-select v-model="identityId" :suffix-icon="CaretBottom" :placeholder="$t('task.selectSponsor')"
        :disabled="taskParams.isSettingCompleted" style="flex:0 0 440px" popper-class="max-width"
        class="h-40px rounded-20px border-1 basis-1/2 border-solid border-color-[#EEEEEE]">
        <el-option v-for="(v) in props.orgList" :label="v.nodeName" :value="v.identityId">
        </el-option>
      </el-select>
    </div>

    <div class="flex items-center text-14px mt-20px" v-if="taskParams?.ptPredictionInput?.inputModel">
      <div class="mr-20px text-color-[#666666] font-medium w-130px">{{ $t('task.selectModel') }} ：
      </div>
      <el-cascader clearable :disabled="taskParams.isSettingCompleted"
        class="h-40px rounded-20px border-1 w-440px border-solid  border-color-[#EEEEEE]" :suffix-icon="CaretBottom"
        v-model="model" :options="optionsList" :props="cascaderProps" />
    </div>

    <div class="flex items-center text-14px mt-20px text-color-[#999]" v-if="taskParams?.ptPredictionInput?.inputModel">
      <div class="mr-20px w-130px"> </div>
      {{ $t('task.resultsModelTips') }}
    </div>

    <!-- {{model}} -->
    <div class="flex items-center text-14px mt-20px">
      <div class="mr-20px text-color-[#666666] font-medium w-130px">{{ $t('task.select') }}{{ $t('role.powerProvider')
      }} ：</div>
      <el-radio-group v-model="powerType" @change="powerIdentityId = ''">
        <el-radio :label="0">{{ $t('task.automaticAllocation') }}</el-radio>
        <el-radio :label="1">{{ $t('task.manualSelection') }}</el-radio>
      </el-radio-group>
    </div>



    <div class="flex items-center text-14px  mt-20px">
      <div class="mr-15px text-color-[#666666] font-medium w-135px"></div>
      <el-select v-if="powerType === 1" v-model="powerIdentityId" size="small"
        :disabled="props.isSettingCompleted || props.isReadonly" :placeholder="t('task.selectComputingProvider')"
        style="flex:0 0 440px" popper-class="max-width"
        class="h-40px w-200px rounded-20px border-1 basis-1/2 border-solid border-color-[#EEEEEE]">
        <el-option v-for="node in props.dataOrgList" :key="node.identityId" :label="node.nodeName"
          :value="node.identityId">
        </el-option>
      </el-select>
    </div>



    <TaskParamsTransfer :fieldType="[props.fieldType[0], props.fieldType[2]]" :sellectionAlgPsi="true"
      :disabledData="psiInputTwo?.metaData" :key="'input'" @update:params="psiInputOne = $event"
      :taskParams="props.taskParams" :params="psiInputParams.one" :num="1" :orgList="props.dataOrgList" />
    <div class="h-30px"></div>
    <!-- <TaskParamsTransfer :fieldType="[props.fieldType[0], props.fieldType[2]]"
      :sellectionAlgPsi="true" :taskParams="props.taskParams" :disabledData="psiInputOne?.metaData"
      :key="'output'" @update:params="psiInputTwo = $event" :params="psiInputParams.two" :num="2"
      :orgList="props.dataOrgList" /> -->
    <div class="flex items-center pt-20px" v-if="!views">
      <el-button v-waves round class="h-50px previous" @click="previous">{{ $t('common.previous') }}
      </el-button>
      <el-button v-waves round class="h-50px previous ml-20px" @click="preserv">{{
          $t('common.saveAndReturn')
      }}</el-button>
      <NextButton @clicks="submit" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NoticeText from './NoticeText.vue';
import TaskParamsTransfer from '@/components/TaskParamsTransfer.vue';
import { CaretBottom } from '@element-plus/icons-vue'
import NextButton from './NextButton.vue'
import { setWorkflowOfWizardMode } from '@/api/workflow'
import { getUserModelList } from '@/api/task'
import { queryAlgoDetail } from '@/api/algorithm'
import { ElMessage } from 'element-plus';
// import { useExpertMode } from '@/stores'

const router: any = useRouter()
const route: any = useRoute()
const { t } = useI18n()
const emit = defineEmits(['previous', 'getParams', 'next'])
// const baseOrgList: any = computed(() => useExpertMode().getBaseOrgList)
const props: any = defineProps({
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
  dataOrgList: {
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

// const handleComputingSelectChange = (value: any) => {
//   useExpertMode().setComputingProvider(value)
// }


const powerIdentityId = ref('')
const powerType = ref(0)
const psiInputParams = reactive({ one: [], two: [] })
const psiInputOne = ref<any>({})
const psiInputTwo = ref<any>({})
const identityId = ref('')
const model = ref<any[]>([])
const psi = ref(false)
const optionsList = ref<any[]>([])


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
      if (!item.identityId || !item.metaDataId || !item.keyColumn) {
        throw 'err'
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
  // const data2 = await handParams(psiInputTwo.value)

  if (powerType.value && !powerIdentityId.value) {
    ElMessage.closeAll()
    ElMessage.warning(t('task.selectData'))
    return
  }


  setWorkflowOfWizardMode({
    workflowId: props.workflowInfo.workflowId,
    workflowVersion: props.workflowInfo.workflowVersion,
    algorithmId: props.taskParams.algorithmId,
    calculationProcessId: props.taskParams.calculationProcessId,
    ptPredictionInput: {
      identityId: identityId.value,
      inputModel: props.taskParams.ptPredictionInput.inputModel || true,
      algorithmId: props.taskParams?.ptPredictionInput?.algorithmId || '',
      dataInput: data,
      powerType: powerType.value,
      powerIdentityId: powerIdentityId.value,
      model: {
        metaDataId: model.value[1] || '',
      }
    },
    calculationProcessStep: {
      step: props.step,
      type: props.type
    }
  }).then(res => {
    const { code } = res
    if (code === 10000) {
      if (str == 'preserv') {
        console.log(route.params);
        if (route.params?.workflowId) {
          router.go(-1)
          return
        }
        router.push({ name: 'workflow' })
        return
      }
      next()
    }
  })
}

const init = () => {
  const { ptPredictionInput } = props.taskParams
  identityId.value = ptPredictionInput?.identityId
  psiInputParams.one = ptPredictionInput?.dataInput || []
  powerType.value = ptPredictionInput?.powerType || []
  powerIdentityId.value = ptPredictionInput?.powerIdentityId || []
}


const cascaderProps = ref({
  lazy: true,
  lazyLoad(node: any, resolve: any) {
    const { value, level, pathValues } = node
    if (!value) {
      resolve([])
      return
    }
    getUserModelList({
      algorithmId: props.taskParams?.predictionInput?.algorithmId,
      identityId: pathValues[0]
    }).then(res => {
      const { code, data } = res
      if (code == 10000) {
        resolve(data.map((v: any) => ({
          value: v.metaDataId,
          label: v.metaDataId,
          leaf: true
        })))
      } else {
        resolve([])
      }
    })
  }
})


const queryAlgoList = () => {
  if (props.type == 8 && props.step == 1) {
    optionsList.value = props.orgList.map((v: any) => {
      return {
        leaf: false,
        value: v.identityId,
        label: v.nodeName,
      }
    })
    if (props.taskParams.ptPredictionInput?.model?.metaDataId) {
      model.value = [
        props.taskParams.ptPredictionInput?.model?.identityId,
        props.taskParams.ptPredictionInput?.model?.metaDataId
      ]
    }
  } else {
    optionsList.value = [
      {
        value: '',
        label: t('expert.frontModel'),
        leaf: true
      }
    ]
    model.value = ['']
  }
}



watch(() => props.taskParams, () => {
  init()
})

onMounted(queryAlgoList)




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
  padding: 23px 40px !important;
}
</style>