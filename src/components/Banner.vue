<template>
  <div class="banner-wrapper">
    <div
      class="main-banner max-w-1200px m-auto h-167px items-center flex justify-between relative com-main"
      :style="{ background: `url(${bgUrl}) no-repeat right`, 'background-size': '100% 100%' }">
      <div class="w-full font-bold text-48px text-color-[#393939] font-900 leading-58px">
        <div class="arrow-group">
          <el-icon :size="40" v-if="backShow" class="cursor-pointer mr-20px" @click="emit('back')">
            <back />
          </el-icon>
          <div v-if="showRouter" class="font-backup font-600">
            {{ t(`${$route.meta.label}`) }}
          </div>
          <div v-else class="detail-name font-backup font-600">{{ detailName }}</div>
        </div>
        <div class="text-14px font-medium font-400 text-color-[#999999] leading-20px"
          :class="$slots.select ? 'mt-8px' : 'mt-14px'">
          <slot name="briefInfo"></slot>
        </div>
      </div>

      <div class="absolute h-50px -bottom-25px min-w-100px">
        <slot name="select"></slot>
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
import network from '@/assets/images/banner/network.png'
import market from '@/assets/images/banner/market.png'
import workflow from '@/assets/images/banner/workflow.png'
import computeServe from '@/assets/images/banner/computeServe.png'
import globalTask from '@/assets/images/banner/globalTask.png'
import newTask from '@/assets/images/banner/newTask.png'
import myData from '@/assets/images/banner/myData.png'
import myAuth from '@/assets/images/banner/myAuth.png'
import myAccount from '@/assets/images/banner/myAccount.png'
import publicCenter from '@/assets/images/banner/center.png'

const { t } = useI18n()
const emit = defineEmits(['back'])
const props = defineProps({
  bgName: {
    type: String,
    default: 'network'
  },
  backShow: { type: Boolean, default: false },
  detailName: {
    type: String,
    default: ''
  },
  showRouter: {
    type: Boolean,
    default: true
  }
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
    case 'publicCenter':
      bgMap = publicCenter;
      break;
    default:
      bgMap = network;
      break;
  }
  return bgMap
})

</script>
<style lang="scss" scoped>
.arrow-group {
  display: flex;
  align-items: center;
}

.detail-name {
  width: 600px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>