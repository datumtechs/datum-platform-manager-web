<template>
  <el-form v-bind="$attrs" :label-position="'top'" :rules="rules" :ref="(el: any) => formRef = el" :model="form"
    class="mt-38px">
    <el-form-item :label="`${t('task.taskName')}:`" prop="workflowName" class="select-alg-require-icon">
      <div class="absolute -top-30px cursor-pointer" :style="{ left: locale === 'zh' ? '80px' : '107px' }">
        <question-mark>
          <template #content>
            {{ t('task.taskNameRules') }}
            <br />
            1、{{ t('task.taskNameRulesOne') }}
            <br />
            2、{{ t('task.taskNameRulesTwo') }}
            <br />
            3、{{ t('task.taskNameRulesThree') }}
            <br />
            4、{{ t('task.taskNameRulesFour') }}
            <br />
          </template>
        </question-mark>
      </div>
      <el-input :disabled="disabled" :input-style="{ borderColor: '#EEEEEE', height: '50px' }" :minlength="8"
        :maxlength="64" v-model.trim="form.workflowName"></el-input>
    </el-form-item>
    <!-- conputing type  2: Privacy  3: no Privacy -->
    <el-form-item :label="`${t('task.stepOneComputingTypeTitle')}:`" prop="computingType"
      class="select-alg-require-icon">
      <el-radio-group v-model="form.computingType" :disabled="disabled" @change="(e) => {
        form.algorithmId = undefined
        form.calculationProcessId = undefined;
        form.calculationType = undefined;
      }">
        <el-radio :label="item.id" v-for="(item, index) in algList" :key="item.id">{{
            item.name
        }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- alg type  -->
    <el-form-item v-if="form.computingType == 2" :label="`${t('task.stepOneSelectComputingTitle')}:`
    " prop="calculationType" class="select-alg-require-icon">
      <el-radio-group v-model="form.calculationType" :disabled="disabled"
        @change="form.algorithmId = undefined, form.calculationProcessId = undefined">
        <el-radio :label="item.id" v-for="item in algTypelist[0]?.childrenList || []" :key="item.id">{{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- alg -->
    <el-form-item v-if="algIsShow()" class="select-alg-require-icon" :label="algDetailsTitleName" prop="algorithmId">
      <el-radio-group v-model="form.algorithmId" @change="algChange" :disabled="disabled">
        <el-radio :label="item.id" v-for="item in algDetailsList" :key="item.id">{{
            item.name
        }}
        </el-radio>
      </el-radio-group>
    </el-form-item>


    <el-form-item v-if="props.processList.length && form.algorithmId && form.calculationType !== 1000"
      class="select-alg-require-icon" :label="`${$t('task.stepOneSelectProcedureTitle')}:`" prop="calculationProcessId">
      <el-radio-group v-model="form.calculationProcessId" :disabled="disabled">
        <el-radio :label="item.calculationProcessId" v-for="item in props.processList" :key="item.calculationProcessId">
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="`${t('task.pleaseComments')}:`">
      <el-input :disabled="disabled" :input-style="{ borderColor: '#EEEEEE', height: '50px' }" show-word-limit
        type="textarea" :rows="4" :maxlength="200" v-model.trim="form.workflowDesc">
      </el-input>
    </el-form-item>
  </el-form>
  <NextButton v-if="!disabled" @clicks="next" />
</template>
<script lang="ts" setup>
import { getAlgTree } from '@/api/algorithm'
import { postCreateWorkflowWizard } from '@/api/workflow'
import NextButton from './NextButton.vue'
import { useWorkFlow } from '@/stores'
const emit = defineEmits(["getParams", 'init', 'getNoticeText'])
const { locale, t } = useI18n()
const route: any = useRoute()
const store = useWorkFlow()
const algList: any = ref<any[]>([])//算法树 //最外层
const disabled = ref(false)
const formRef = ref()
const algTypelist = computed(() => algList.value.filter((v: any) => v.id == form.computingType))//算法类型列表
const algDetailsList = ref<any[]>([])
const algDetailsTitleName = ref<any>()

const props: any = defineProps({
  taskParams: { type: Object, default: () => ({}) },
  processList: { type: Array, default: (): any[] => [] },//计算流程列表
  activeIndex: { type: Number, default: 0 }
})

const form: any = reactive({
  workflowName: "",
  computingType: "",
  calculationType: +route.params?.calculationType || undefined,
  algorithmId: +route.params?.algorithmId || undefined,
  calculationProcessId: undefined,
  workflowDesc: ""
})



const rules = ref({
  workflowName: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value && (String(value).length) < 8) {
          return callback(t('task.taskNameRulesThree'))
        }
        return callback()
      },
    },
    { required: true, message: `${t('task.pleaseEnter')}${t('task.taskName')}` },
  ],
  computingType: [{ required: true, message: t('task.stepOneComputingTypeTitle') }],
  calculationType: [{ required: true, message: t('task.stepOneSelectComputingTitle') }],
  algorithmId: [{ required: true, message: t('task.stepOneSelectAlgorithmTitle') }],
  calculationProcessId: [{ required: true, message: t('task.stepOneSelectProcedureTitle') }]
})

watch(locale, () => {
  formRef.value.clearValidate()
})
watch(() => algList.value, () => {
  if (props.taskParams?.algorithmId) setTaskParams()
})
watch(() => props.taskParams, (e) => {
  if (e.workflowId) disabled.value = true
  if (algList.value.length && props.activeIndex <= 1) setTaskParams()
})

watch(() => props.processList, (e) => {
  if (props.processList.length == 1) {
    form.calculationProcessId = e[0]?.calculationProcessId
  }
})
watch(() => algDetailsList.value, (e) => {
  // form.calculationProcessId = ''
  // form.algorithmId = ''
  if (algDetailsList.value?.length && algDetailsList.value.length == 1) {
    setTimeout(() => {
      form.algorithmId = algDetailsList.value[0].id
      algChange()
    }, 100)
  }
})




const next = () => {
  formRef.value.validate().then((v: any) => {
    submit()
  })
}


const algChange = (type?: any) => {
  if (type !== 'notice') form.calculationProcessId = undefined
  emit('getParams', form)
  getNoticeText()
}


const submit = () => {
  postCreateWorkflowWizard({
    "workflowName": form.workflowName,
    "algorithmId": form.algorithmId,
    "calculationProcessId": form.calculationProcessId || 0,
    "workflowDesc": form.workflowDesc,
  }).then(res => {
    const { data, code } = res
    if (code == 10000) {
      // emit('getParams', form)
      store.setWorkerFlow({
        workflowId: data.workflowId,
        workflowVersion: data.workflowVersion,
      })
      getNoticeText()
      emit('init')
    }
  })
}


const queryAlgTree = () => {
  getAlgTree().then(res => {
    const { data, code } = res
    if (code === 10000) {
      algList.value = data?.childrenList || []
      if (form.algorithmId) {
        algChange()
      }
    }
  })
}



const setTaskParams = () => {
  const {
    workflowName,
    algorithmId,
    workflowDesc,
    calculationProcessId
  } = props.taskParams


  algList.value.forEach((v: any) => {
    if (v.id !== 3) {
      v.childrenList.forEach((v2: any) => {
        v2.childrenList.forEach((v3: any) => {
          if (v3.id == algorithmId) {
            form.computingType = v.id
            form.calculationType = v2.id
          }
        })
      })
    }
    if (v.id == 3) {
      v.childrenList.forEach((v2: any) => {
        if (v2.id == algorithmId) {
          form.computingType = v.id
        }
      })
    }
  })

  form.workflowName = workflowName
  form.algorithmId = algorithmId
  form.calculationProcessId = calculationProcessId
  form.workflowDesc = workflowDesc
  algChange('notice')
}

const getNoticeText = () => {
  const paramsText = {
    computingType: "",
    calculationTypeText: '',
    algorithmText: '',
    calculationProcessText: ''
  }
  algList.value.some((v: any) => {
    if (v.id == form.computingType && v.id !== 3) {
      paramsText.computingType = v.name
      v.childrenList.some((v2: any) => {
        if (v2.id == form.calculationType) {
          paramsText.calculationTypeText = v2.name
          v2.childrenList.some((item: any) => {
            if (item.id == form.algorithmId) {
              paramsText.algorithmText = item.name
              return true
            }
          })
          return true
        }
      })
      return true
    }
    if (v.id == 3) {
      v.childrenList.some((item: any) => {
        paramsText.computingType = v.name
        if (item.id == form.algorithmId) {
          paramsText.algorithmText = item.name
          return true
        }
      })
      return true
    }
  })

  setTimeout(() => {
    console.log(props.processList);
    props.processList.forEach((v: any) => {
      if (v.calculationProcessId == form.calculationProcessId) {
        paramsText.calculationProcessText = v.name
      }
    })
    emit('getNoticeText', paramsText)
  }, 100)
}



const algIsShow = () => {
  let show = false
  if (form.computingType == 2 && form.calculationType) {
    if (form.calculationType == 1000) algDetailsTitleName.value = t('task.stepOneSelectAlgorithmTitle')
    if (form.calculationType == 2000) algDetailsTitleName.value = t('task.stepOneSelectAIAlgorithmTitle')
    if (form.calculationType == 3000) algDetailsTitleName.value = t('task.pleaseSelectFeatureEngineeringAlgorithm')
    algTypelist.value[0]?.childrenList.forEach((v: any) => {
      if (v.id == form.calculationType) algDetailsList.value = v.childrenList
    })
    show = true
  }
  if (form.computingType == 3) {//3非隐私
    algList.value?.forEach((v: any) => {
      if (v.id == form.computingType) algDetailsList.value = v.childrenList
    })
    algDetailsTitleName.value = t('task.pleaseSelectnNoPrivacyAlgorithm')
    show = true
  }
  return show
}



onMounted(() => {
  queryAlgTree()
})

</script>
<style lang="scss">
.select-alg-require-icon {
  position: relative;

  &:before {
    content: "*";
    color: var(--el-color-danger);
    position: absolute;
    left: -12px;
    top: 6px;
    width: 20px;
  }
}
</style>