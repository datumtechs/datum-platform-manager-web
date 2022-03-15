<template>
  <div class="mt-50px step-two-wrap">
    <div class="flex items-center mb-36px text-14px step-two-wrap">
      <div class="mr-20px text-color-[#666666]">{{ $t('task.selection') }} ：</div>
      <div class="flex items-center justify-center text-color-[#333333]">
        <span>{{ props.taskParams.one.name || "ai" }}</span>
        <el-icon class="rotate-180 mx-5px">
          <back />
        </el-icon>
      </div>
    </div>
    <div class="flex receivers justify-between">
      <el-form
        v-for="item in 2"
        :key="item"
        class="w-530px com-border-eee rounded-8px border-b-1px border"
        label-position="top"
        :model="form"
      >
        <div class="p-30px">
          <div
            class="pb-20px text-color-[#333333] text-16px font-medium font-600"
          >{{ item == 1 ? $t('task.trainingResultReceivers') : $t('task.predictionResultReceivers') }}</div>
          <el-form-item>
            <el-radio-group v-model="form.radio">
              <el-radio :label="1">Option A</el-radio>
              <br />
              <el-radio :label="2">Option B</el-radio>
              <br />
              <el-radio :label="3">Option C</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="flex items-center pt-20px">
      <el-button round class="h-50px previous" @click="previous">{{ $t('common.previous') }}</el-button>
      <el-button round class="h-50px previous ml-20px">{{ $t('common.saveAndReturn') }}</el-button>
      <el-button
        round
        class="h-50px absolute right-0px com-button previous ml-20px"
      >{{ $t('task.startTask') }}</el-button>
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
  radio: ''
})



const next = () => {
  emit('getParams')
}


const previous = () => {
  emit('previous')
  emit('next')
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
</style>