<template>
  <div class="mt-50px step-two-wrap">
    <div class="flex items-center mb-36px text-14px">
      <div class="mr-20px text-color-[#666666]">{{ $t('task.selection') }} ：</div>
      <div class="flex items-center justify-center text-color-[#333333]">
        <span>{{ props.taskParams.one.name || "ai" }}</span>
        <el-icon class="rotate-180 mx-5px">
          <back />
        </el-icon>
      </div>
    </div>
    <div class="flex environment justify-between">
      <el-form
        v-for="item in 2"
        :key="item"
        class="w-530px com-border-eee rounded-8px border-b-1px border"
        label-position="top"
        :model="form"
      >
        <div
          class="p-30px border-bottom text-color-[#333333] text-16px font-medium font-600"
        >{{ item == 1 ? $t('task.environmentTraining') : $t('task.environmentPrediction') }}</div>
        <div class="p-30px">
          <div class="pb-20px text-color-[#333333] font-medium font-600">{{ $t('task.lowestNeed') }}</div>
          <el-form-item :label="`${$t('common.cpu')}：`">
            <el-input
              v-model="form.cpu"
              :placeholder="`${$t('task.pleaseEnter')}${$t('common.cpu')}`"
              class="input-with-select"
            >
              <template #append>
                <div class="w-70px flex justify-center">{{ $t('common.cores') }}</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="`${$t('common.memory')}：`">
            <el-input
              v-model="form.memory"
              :placeholder="`${$t('task.pleaseEnter')}${$t('common.memory')}`"
              class="input-with-select"
            >
              <template #append>
                <el-select v-model="form.memorySymbol" style="width: 110px">
                  <el-option
                    v-for="item in companyList"
                    :label="`${item}`"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="`${$t('common.bandwidth')}：`">
            <el-input
              v-model="form.bandwidth"
              :placeholder="`${$t('task.pleaseEnter')}${$t('common.bandwidth')}`"
              class="input-with-select"
            >
              <template #append>
                <el-select v-model="form.bandwidthSymbol" style="width: 110px">
                  <el-option
                    v-for="item in companyList"
                    :label="`${item}`"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <div
            class="text-color-[#333333] text-16px font-medium font-600 pt-46px pb-20px"
          >{{ $t('task.longestTime') }}</div>
          <el-form-item>
            <el-input
              v-model="form.time"
              :placeholder="`${$t('task.pleaseEnter')}${$t('task.longestTime')}`"
              class="input-with-select"
            >
              <template #append>
                <el-select v-model="form.timeSymbol" style="width: 110px">
                  <el-option
                    v-for="item in timeCompanyList"
                    :label="$t(`${item.label}`)"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="flex items-center pt-20px">
      <el-button round class="h-50px previous" @click="previous">{{ $t('common.previous') }}</el-button>
      <el-button round class="h-50px previous ml-20px">{{ $t('common.saveAndReturn') }}</el-button>
      <NextButton @click="next" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
import NextButton from './NextButton.vue'
const emit = defineEmits(['previous', 'getParams', 'next'])
const props = defineProps({
  taskParams: {
    type: Object,
    default: () => ({ one: {} })
  }
})

const form = ref({
  cpu: '',
  memory: '',
  memorySymbol: 'MB',
  bandwidth: '',
  bandwidthSymbol: 'MB',
  time: '',
  timeSymbol: 'minute'
})

const companyList = ref(['KB', 'MB', 'GB'])
const timeCompanyList = ref([{
  label: 'common.second',
  value: 'second'
},
{
  label: 'common.minute',
  value: 'minute'
},
{
  label: 'common.hours',
  value: 'hours'
}])

const next = () => {
  emit('getParams')
}


const previous = () => {
  emit('previous')
  emit('next')
}


</script>
<style lang="scss">
.environment .el-form {
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
</style>