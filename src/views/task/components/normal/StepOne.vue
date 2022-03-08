<template>
  <el-form
    :label-position="'top'"
    :rules="rules"
    :ref="(el: any) => formRef = el"
    :model="form"
    class="mt-38px"
  >
    <el-form-item :label="`${$t('task.taskName')}:`" prop="name">
      <div
        class="absolute -top-30px cursor-pointer"
        :style="{ left: locale === 'zh' ? '142px' : '161px' }"
      >
        <question-mark>
          <template #content>
            {{ $t('task.taskNameRules') }}
            <br />
            1、{{ $t('task.taskNameRulesOne') }}
            <br />
            2、{{ $t('task.taskNameRulesTwo') }}
            <br />
            3、{{ $t('task.taskNameRulesThree') }}
            <br />
            4、{{ $t('task.taskNameRulesfour') }}
            <br />
          </template>
        </question-mark>
      </div>
      <el-input
        :input-style="{ borderColor: '#EEEEEE', height: '50px' }"
        :minlength="8"
        :maxlength="64"
        v-model="form.name"
      ></el-input>
    </el-form-item>
    <el-form-item :label="`${$t('task.stepOneSelectComputingTitle')}:`" prop="calculationType">
      <el-radio-group v-model="form.calculationType">
        <el-radio :label="1">{{ $t('task.statistics') }}</el-radio>
        <el-radio :label="2">{{ $t('task.AiComputing') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-if="form.calculationType == 1"
      :label="`${$t('task.stepOneSelectAlgorithmTitle')}:`"
      prop="algorithm"
    >
      <el-radio-group v-model="form.algorithm">
        <el-radio :label="1">统计算法1</el-radio>
        <el-radio :label="2">统计算法1</el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="form.calculationType == 2">
      <el-form-item :label="`${$t('task.stepOneSelectAIAlgorithmTitle')}:`" prop="algorithm">
        <el-radio-group v-model="form.algorithm">
          <el-radio :label="1">AI算法1</el-radio>
          <el-radio :label="2">AI算法1</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.calculationType == 2"
        :label="`${$t('task.stepOneSelectProcedureTitle')}:`"
        prop="procedure"
      >
        <el-radio-group v-model="form.procedure">
          <el-radio :label="1">{{ $t('task.procedureTrain') }}</el-radio>
          <el-radio :label="2">{{ $t('task.procedurePredict') }}</el-radio>
          <el-radio :label="3">{{ $t('task.procedureAll') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <el-form-item :label="`${$t('task.stepOneSelectComputingTitle')}:`">
      <el-input
        :input-style="{ borderColor: '#EEEEEE', height: '50px' }"
        show-word-limit
        type="textarea"
        :rows="4"
        v-model="form.remake"
      ></el-input>
    </el-form-item>
  </el-form>
  <NextButton @click="next" />
</template>
<script lang="ts" setup>
import NextButton from './NextButton.vue'
const { locale, t } = useI18n()
const form = ref({
  name: "",
  calculationType: undefined,
  algorithm: undefined,
  procedure: undefined,
  remake: ""
})

watch(locale, () => {
  formRef.value.clearValidate()
})

const formRef = ref()
const rules = ref({
  name: [{ required: true, message: `${t('task.pleaseEnter')}${t('task.taskName')}` }],
  calculationType: [{ required: true, message: t('task.stepOneSelectComputingTitle') }],
  algorithm: [{ required: true, message: t('task.stepOneSelectAlgorithmTitle') }],
  procedure: [{ required: true, message: t('task.stepOneSelectProcedureTitle') }]
})

const next = () => {
  formRef.value.validate().then((v: any) => {
    console.log(v)
  }).catch(() => {
    console.log('验证失败')
  })
}
</script>
<style lang="scss" scoped></style>