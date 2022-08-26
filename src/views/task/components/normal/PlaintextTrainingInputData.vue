<template>
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
    <div class="flex items-center text-14px mt-20px">
      <div class="mr-20px text-color-[#666666] font-medium w-130px">{{ $t('task.select') }}{{ $t('role.powerProvider')
      }} ：</div>
      <el-radio-group v-model="powerType" :disabled="taskParams.isSettingCompleted" @change="() => {
        powerIdentityId = ''
      }">
        <el-radio :label="0">{{ $t('task.automaticAllocation') }}</el-radio>
        <el-radio :label="1">{{ $t('task.manualSelection') }}</el-radio>
      </el-radio-group>
    </div>
    <div class="flex items-center text-14px  mt-20px">
      <div class="mr-15px text-color-[#666666] font-medium w-135px"></div>
      <el-select v-if="powerType === 1" v-model="powerIdentityId" :disabled="taskParams.isSettingCompleted"
        :placeholder="t('task.selectComputingProvider')" style="flex:0 0 440px" popper-class="max-width"
        class="h-40px w-200px rounded-20px border-1 basis-1/2 border-solid border-color-[#EEEEEE]">
        <el-option v-for="item in powerOrgList" :key="item.identityId" :label="item.nodeName" :value="item.identityId">
        </el-option>
      </el-select>
    </div>
    <TaskParamsTransfer :fieldType="[...props.fieldType]" :sellectionAlgPsi="true" :disabledData="psiInputTwo?.metaData"
      :key="'input'" @update:params="psiInputOne = $event" :params="psiInputParams.one" :num="1"
      :taskParams="props.taskParams" :orgList="props.dataOrgList" />
    <div class="h-30px"></div>

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
import { ElMessage } from 'element-plus';
import { useExpertMode } from '@/stores'
import type { PropType } from 'vue';

const router: any = useRouter()
const route: any = useRoute()
const { t } = useI18n()
const emit = defineEmits(['previous', 'getParams', 'next'])
const computingProvider: any = ref('')
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
  dataOrgList: {
    type: Array as PropType<any[]>,
    default: (): any[] => []
  },
  powerOrgList: {
    type: Array as PropType<any[]>,
    default: (): any[] => []
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
// const store = useExpertMode()

// const baseOrgList: any = computed(() => useExpertMode().getBaseOrgList)
// console.log(baseOrgList);

const psiInputParams = reactive({ one: [] })
const psiInputOne = ref<any>({})
const psiInputTwo = ref<any>({})
const identityId = ref('')
const powerIdentityId = ref('')
const powerType = ref(0)


// const handleComputingSelectChange = (value: any) => {
//   useExpertMode().setComputingProvider(value)
// }

const next = () => {
  emit('getParams')
  emit('next')
}


const previous = () => {
  emit('previous')
}


const handParams = (obj: any, verifiedList: any) => {
  return new Promise((resolve, reject) => {
    try {
      if (!Object.keys(obj).length) {
        ElMessage.closeAll()
        ElMessage.warning(t('task.selectData'))
        throw 'err'
      }
      const item = {
        identityId: obj?.metaData[0],
        metaDataId: obj?.metaData[1],
        keyColumn: obj?.idColumn.columnIdx,
        dependentVariable: obj?.label.columnIdx,
        dataColumnIds: obj?.feature.map((_: any) => _.columnIdx).join(',')
      }
      // if (!item.identityId || !item.metaDataId || !item.keyColumn || !item.dependentVariable || !item.dataColumnIds) {
      //   // if (!item.identityId || !item.metaDataId || !item.keyColumn) {
      //   throw 'err'
      // }

      if (!item.identityId || !item.metaDataId) {
        ElMessage.closeAll()
        ElMessage.warning(t('task.selectData'))
        throw 'err'
      }
      verifiedList.forEach((v: string) => {
        const items: any = obj[v] || ''
        if (v == 'feature') {
          ElMessage.closeAll()
          if (!items?.length) {
            ElMessage.warning(`${t('task.selectData')}${t('task.feature')}`);
            throw 'err'
          }
        } else if (!items.columnIdx) {
          ElMessage.closeAll()
          if (v == 'label') ElMessage.warning(`${t('task.selectData')}${t('task.label')}`)
          if (v == 'idColumn') ElMessage.warning(`${t('task.selectData')}${t('task.idColumn')}`)

          throw 'err'
        }
      })

      resolve(item)
    } catch (e) {
      reject('err')
    }
  })
}

const preserv = () => {
  submit('preserv')
}

const submit = async (str?: string | any) => {
  if (!identityId.value) {
    ElMessage.closeAll()
    ElMessage.warning(t('task.selectSponsor'))
    return
  }

  const data = await handParams(psiInputOne.value, [...props.fieldType].map(v => v.type))
  if (powerType.value && !powerIdentityId.value) {
    ElMessage.closeAll()
    ElMessage.warning(t('task.selectComputingProvider'))
    return
  }

  setWorkflowOfWizardMode({
    workflowId: props.workflowInfo.workflowId,
    workflowVersion: props.workflowInfo.workflowVersion,
    algorithmId: props.taskParams.algorithmId,
    calculationProcessId: props.taskParams.calculationProcessId,
    ptTrainingInput: {
      identityId: identityId.value,
      powerType: powerType.value,
      powerIdentityId: powerIdentityId.value,
      dataInput: data
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
  const { ptTrainingInput } = props.taskParams
  identityId.value = ptTrainingInput?.identityId
  powerIdentityId.value = ptTrainingInput?.powerIdentityId
  powerType.value = ptTrainingInput?.powerType
  psiInputParams.one = ptTrainingInput?.dataInput || []
}

watch(() => props.taskParams, () => {
  // baseOrgList.value = useExpertMode().getBaseOrgList
  // console.log(useExpertMode().getBaseOrgList);
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
  padding: 23px 40px !important;
}
</style>