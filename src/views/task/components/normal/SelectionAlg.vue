<template>
  <el-form v-bind="$attrs" :label-position="'top'" :rules="rules" :ref="(el: any) => formRef = el" :model="form"
    class="mt-38px">
    <el-form-item :label="`${t('task.taskName')}:`" prop="workflowName" class="select-alg-require-icon">
      <div class="absolute -top-30px cursor-pointer" :style="{ left: locale === 'zh' ? '119px' : '174px' }">
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
    <el-form-item :label="`${t('task.stepOneSelectComputingTitle')}:`" prop="calculationType" class="select-alg-require-icon">
      <el-radio-group v-model="form.calculationType" :disabled="disabled"
        @change="form.algorithmId = undefined, form.calculationProcessId = undefined">
        <el-radio :label="item.id" v-for="item in algList" :key="item.id">{{ item.name }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="algTypelist[0]?.childrenList" class="select-alg-require-icon" :label="`${form.calculationType == 2000 ? t('task.stepOneSelectAIAlgorithmTitle') :t('task.stepOneSelectAlgorithmTitle')}:`"
      prop="algorithmId">
      <el-radio-group v-model="form.algorithmId" @change="algChange" :disabled="disabled">
        <el-radio :label="item.id" v-for="item in algTypelist[0]?.childrenList" :key="item.id">{{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="props.processList.length && form.algorithmId && form.calculationType !== 1000" class="select-alg-require-icon" :label="`${$t('task.stepOneSelectProcedureTitle')}:`"
      prop="calculationProcessId">
      <el-radio-group v-model="form.calculationProcessId" :disabled="disabled">
        <el-radio :label="item.calculationProcessId" v-for="item in props.processList" :key="item.calculationProcessId">{{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="`${t('task.pleaseComments')}:`">
      <el-input :disabled="disabled" :input-style="{ borderColor: '#EEEEEE', height: '50px' }" show-word-limit
        type="textarea" :rows="4" :maxlength="200" v-model="form.workflowDesc"></el-input>
    </el-form-item>
  </el-form>
  <NextButton v-if="!disabled" @clicks="next" />
</template>
<script lang="ts" setup>
import { getAlgTree } from '@/api/algorithm'
import { postCreateWorkflowWizard } from '@/api/workflow'
import NextButton from './NextButton.vue'
import { useWorkFlow } from '@/stores'
const { locale, t } = useI18n()
const route:any = useRoute()
const store = useWorkFlow()
const algList: any = ref<any[]>([])//算法列表 //最外层
const algTypelist = computed(() => algList.value.filter((v: any) => v.id == form.calculationType))//具体算法
const disabled = ref(false)
const emit = defineEmits(["getParams", 'init', 'getNoticeText'])
const props: any = defineProps({
  taskParams: { type: Object, default: () => ({}) },
  processList: { type: Array, default: (): any[] => [] }//计算流程列表
})
watch(locale, () => {
  formRef.value.clearValidate()
})
watch(() => algList.value, () => {
  if (props.taskParams?.algorithmId) {
    setTaskParams()
  }
})
watch(() => props.taskParams, (e) => {
  if (e.workflowId) disabled.value = true
  if (algList.value.length) {
    setTaskParams()
  }
})

watch(() => props.processList, (e) => {
  if(form.calculationType == 1000){
   form.calculationProcessId = e[0]?.calculationProcessId
  }
})


const form: any = reactive({
  workflowName: "",
  calculationType: +route.params?.calculationType || undefined,
  algorithmId:  +route.params?.algorithmId || undefined,
  calculationProcessId: undefined,
  workflowDesc: ""
})

const formRef = ref()
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
  calculationType: [{ required: true, message: t('task.stepOneSelectComputingTitle') }],
  algorithmId: [{ required: true, message: t('task.stepOneSelectAlgorithmTitle') }],
  calculationProcessId: [{ required: true, message: t('task.stepOneSelectProcedureTitle') }]
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
    "algorithmId": form.algorithmId,
    "calculationProcessId": form.calculationProcessId || 0,
    "workflowDesc": form.workflowDesc,
    "workflowName": form.workflowName,
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
      algList.value = data?.childrenList[0]?.childrenList
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
    if (v.childrenList.some((item: any) => item.id == algorithmId)) {
      form.calculationType = v.id //选择算法大分类
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
    calculationTypeText: '',
    algorithmText: '',
    calculationProcessText: ''
  }
  algList.value.forEach((v: any) => {
    if (v.id == form.calculationType) {
      paramsText.calculationTypeText = v.name
      v.childrenList.forEach((item: any) => {
        if (item.id == form.algorithmId) paramsText.algorithmText = item.name
      })
    }
  })
  props.processList.forEach((v: any) => {
    if (v.calculationProcessId == form.calculationProcessId) {
      paramsText.calculationProcessText = v.name
    }
  })
  emit('getNoticeText', paramsText)
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