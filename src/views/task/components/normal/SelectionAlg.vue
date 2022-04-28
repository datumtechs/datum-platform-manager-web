<template>
  <el-form v-bind="$attrs" :label-position="'top'" :rules="rules" :ref="(el: any) => formRef = el" :model="form"
    class="mt-38px">
    <el-form-item :label="`${t('task.taskName')}:`" prop="workflowName">
      <div class="absolute -top-30px cursor-pointer" :style="{ left: locale === 'zh' ? '142px' : '161px' }">
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
      <el-input :input-style="{ borderColor: '#EEEEEE', height: '50px' }" :minlength="8" :maxlength="64"
        v-model="form.workflowName"></el-input>
    </el-form-item>
    <el-form-item :label="`${t('task.stepOneSelectComputingTitle')}:`" prop="calculationType">
      <el-radio-group v-model="form.calculationType"
        @change="form.algorithmId = undefined, form.calculationProcessId = undefined">
        <el-radio :label="item.id" v-for="item in algList" :key="item.id">{{ item.name }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="form.calculationType == 1000" :label="`${$t('task.stepOneSelectAlgorithmTitle')}:`"
      prop="algorithmId">
      <el-radio-group v-model="form.algorithmId" @change="(algChange(), form.calculationProcessId = undefined)">
        <el-radio :label="item.id" v-for="item in algTypelist[0].childrenList" :key="item.id">{{ item.name }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="form.calculationType == 2000" :label="`${t('task.stepOneSelectAIAlgorithmTitle')}:`"
      prop="algorithmId">
      <el-radio-group v-model="form.algorithmId" @change="(algChange(), form.calculationProcessId = undefined)">
        <el-radio :label="item.id" v-for="item in algTypelist[0].childrenList" :key="item.id">{{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="processList.length" :label="`${$t('task.stepOneSelectProcedureTitle')}:`"
      prop="calculationProcessId">
      <el-radio-group v-model="form.calculationProcessId">
        <el-radio :label="item.calculationProcessId" v-for="item in processList" :key="item.id">{{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="`${t('task.pleaseComments')}:`">
      <el-input :input-style="{ borderColor: '#EEEEEE', height: '50px' }" show-word-limit type="textarea" :rows="4"
        v-model="form.workflowDesc"></el-input>
    </el-form-item>
  </el-form>
  <NextButton @click="next" />
</template>
<script lang="ts" setup>
import { getAlgTree } from '@/api/algorithm'
import { postCreateWorkflowWizard, getProcessList } from '@/api/workflow'
import NextButton from './NextButton.vue'
import { useWorkFlow } from '@/stores'
const { locale, t } = useI18n()
const store = useWorkFlow()
const algList: any = ref<any[]>([])//算法列表 //最外层
const algTypelist = computed(() => algList.value.filter((v: any) => v.id == form.calculationType))//具体算法
const processList = ref<any[]>([])//计算流程列表
const emit = defineEmits(["getParams", 'next', 'getStep', 'getNoticeText', 'activeStep'])
const props = defineProps({
  taskParams: { type: Object, default: () => ({}) }
})
watch(locale, () => {
  formRef.value.clearValidate()
})
watch(algList, () => {
  if (props.taskParams?.algorithmId) {
    setTaskParams()
  }
})


const form: any = reactive({
  workflowName: "",
  calculationType: undefined,
  algorithmId: undefined,
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

const setStepList = () => {
  processList.value.forEach(v => {
    if (v.calculationProcessId == form.calculationProcessId) {
      emit('getStep', { list: v.stepItem, algPSI: v.name.indexOf('PSI') > -1 })
    }
  })
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
      store.setWorkerFlow({
        workflowId: data.workflowId,
        workflowVersion: data.workflowVersion,
      })
      setStepList()
      getNoticeText()
      emit('next')
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

const algChange = (type?: any) => {
  processList.value = []
  getProcessList({ algorithmId: form.algorithmId }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      processList.value = data
      getNoticeText()
      setStepList()
      if (type == 'notice') {
        emit('activeStep', props.taskParams.calculationProcessStep.step, true)
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
  if (algList.value.length) {
    algList.value.forEach((v: any) => {
      if (v.childrenList.some((item: any) => item.id == algorithmId)) {
        form.calculationType = v.id //选择算法大分类
      }
    })
  }
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
        if (item.id == form.algorithmId) paramsText.algorithmText = v.name
      })
    }
  })
  processList.value.forEach((v: any) => {
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
<style lang="scss" scoped>
</style>