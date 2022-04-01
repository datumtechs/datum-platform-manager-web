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
    <div class="flex items-center text-14px">
      <div class="mr-20px text-color-[#666666] font-medium w-130px">{{ $t('task.selectSponsor') }} ：</div>
      <el-select
        v-model="sponsorValue"
        :suffix-icon="CaretBottom"
        :placeholder="$t('task.selectSponsor')"
        style="flex:0 0 440px"
        class="h-40px rounded-20px border-1 basis-1/2 border-solid border-color-[#EEEEEE]"
      >
        <el-option
          v-for="item in sponsorOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-checkbox class="ml-26px mr-10px" v-model="psi" label="psi">{{ }}</el-checkbox>
      <span>{{ $t('task.PSI') }}</span>
    </div>
    <TaskParamsTransfer :num="1" :sponsorOptions="sponsorOptions" />
    <div class="h-30px"></div>
    <TaskParamsTransfer :num="2" :sponsorOptions="sponsorOptions" />
    <!--    <div
      class="flex items-center justify-center w-full h-50px rounded-25px border-1px border-solid border-color-[#EEE] text-color-[#2B60E9]"
    >
      <el-icon>
        <plus />
      </el-icon>
      <span class="ml-10px mr-5px">{{ $t('common.add') }}</span>
      {{ $t('common.data') }}
    </div>-->
    <div class="flex items-center pt-20px">
      <el-button round class="h-50px previous" @click="previous">{{ $t('common.previous') }}</el-button>
      <el-button round class="h-50px previous ml-20px">{{ $t('common.saveAndReturn') }}</el-button>
      <NextButton @click="next" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TaskParamsTransfer from '@/components/TaskParamsTransfer.vue';
import { Back, CaretBottom, Plus } from '@element-plus/icons-vue'
import NextButton from './NextButton.vue'
const emit = defineEmits(['previous', 'getParams', 'next'])
const props = defineProps({
  taskParams: {
    type: Object,
    default: () => ({ one: {} })
  }
})


const sponsorOptions = ref<{ value: string, label: string, children: any[] }[]>([{
  value: 'resource',
  label: 'Resource',
  children: [
    {
      value: 'axure',
      label: 'Axure Components',
    },
    {
      value: 'sketch',
      label: 'Sketch Templates',
    },
    {
      value: 'docs',
      label: 'Design Documentation',
    },
  ]
}])

const psi = ref(false)
const sponsorValue = ref('')


const next = () => {
  emit('getParams')
}


const previous = () => {
  emit('previous')
  emit('next')
}


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
  .previous {
    border-radius: 25px;
    padding: 0 40px;
  }
}
</style>