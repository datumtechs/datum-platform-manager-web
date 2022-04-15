<template>
  <div
    class="main-banner max-w-1200px m-auto h-167px items-center flex justify-between relative border-bottom com-main"
    :style="{ background: `url(${bgUrl}) no-repeat right`, 'background-size': '100% 100%' }">
    <div class="w-full font-bold text-48px text-color-[#393939] font-900 leading-58px">
      <el-icon v-if="backShow" class="cursor-pointer" @click="emit('back')">
        <back />
      </el-icon>
      {{ $t(`${$route.meta.label}`) }}
      <div class="text-14px font-medium font-400 text-color-[#999999] leading-20px"
        :class="$slots.select ? 'mt-8px' : 'mt-14px'">
        <slot name="briefInfo"></slot>
      </div>
    </div>

    <div class="absolute h-50px -bottom-25px min-w-100px">
      <slot name="select"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
import network from '@/assets/Images/banner/network.png'
import market from '@/assets/Images/banner/market.png'
import workflow from '@/assets/Images/banner/workflow.png'
import computeServe from '@/assets/Images/banner/computeServe.png'
import globalTask from '@/assets/Images/banner/globalTask.png'
import newTask from '@/assets/Images/banner/newTask.png'
import myData from '@/assets/Images/banner/myData.png'
import myAuth from '@/assets/Images/banner/myAuth.png'
import myAccount from '@/assets/Images/banner/myAccount.png'
const emit = defineEmits(['back'])
const props = defineProps({
  bgName: {
    type: String,
    default: 'network'
  },
  backShow: { type: Boolean, default: false }
})

const bgUrl = computed(() => {
  let bgMap = ''
  switch (props.bgName) {
    case 'network':
      bgMap = network;
      break;
    case 'market':
      bgMap = market;
      break;
    case 'workflow':
      bgMap = workflow;
      break;
    case 'computeServe':
      bgMap = computeServe;
      break;
    case 'globalTask':
      bgMap = globalTask;
      break;
    case 'newTask':
      bgMap = newTask;
      break;
    case 'myData':
      bgMap = myData;
      break;
    case 'myAuth':
      bgMap = myAuth;
      break;
    case 'myAccount':
      bgMap = myAccount;
      break;
    default:
      bgMap = network;
      break;
  }
  return bgMap
})

</script>
<style lang="scss" scoped>
</style>