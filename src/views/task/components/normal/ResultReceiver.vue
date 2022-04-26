<template>
  <div class="mt-50px step-two-wrap">
    <div class="flex items-center mb-36px text-14px step-two-wrap">
      <div class="mr-20px text-color-[#666666]">{{ $t('task.selection') }} ：</div>
      <NoticeText :noticeText="props.noticeText" />
    </div>
    <div class="flex receivers justify-between">
      <el-form v-for="item in 2" :key="item" class="w-530px com-border-eee rounded-8px border-b-1px border"
        :style="{ 'margin-right': item == 1 ? '20px' : '' }" label-position="top" :model="form">
        <div class="p-30px">
          <div class="pb-20px text-color-[#333333] text-16px font-medium font-600">{{
              item == 1 ?
                $t('task.trainingResultReceivers') : $t('task.predictionResultReceivers')
          }}</div>
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
    <div class="flex items-center pt-20px relative">
      <el-button round class="h-50px previous" @click="previous">{{ $t('common.previous') }}</el-button>
      <el-button round class="h-50px previous ml-20px">{{ $t('common.saveAndReturn') }}</el-button>
      <el-button round @click="next" class="h-50px absolute right-0px com-button previous ml-20px">{{
          $t('task.startTask')
      }}</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import NoticeText from './NoticeText.vue';
import { Back } from '@element-plus/icons-vue'
const emit = defineEmits(['previous', 'getParams', 'next'])
const props = defineProps({
  noticeText: {
    type: Object,
    default: () => ({})
  }
})

const form = ref({
  radio: ''
})



const next = () => {
  emit('getParams')
  emit('next')
}


const previous = () => {
  emit('previous')
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