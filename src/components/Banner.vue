<template>
  <div
    class="w-full h-167px flex justify-between relative border-bottom px-50px py-42px"
    :style="{ background: `url(${bgUrl}) no-repeat right`, 'background-size': 'auto 100%' }"
  >
    <div class="w-full black-font text-48px text-color-[#393939] font-900 leading-58px">
      <el-icon v-if="backShow">
        <back />
      </el-icon>
      {{ $t(`${$route.meta.label}`) }}
      <div class="text-14px font-medium font-400 text-color-[#999999] leading-20px mt-14px">
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
import bgMap1 from '@/assets/Images/banner/backgroundMap1.png'
import bgMap2 from '@/assets/Images/banner/backgroundMap2.png'
import bgMap3 from '@/assets/Images/banner/backgroundMap3.png'
import bgMap4 from '@/assets/Images/banner/backgroundMap4.png'
import bgMap5 from '@/assets/Images/banner/backgroundMap5.png'

const props = defineProps({
  bgIndex: {
    type: Number,
    default: 1
  },
  backShow: { type: Boolean, default: false }
})

const bgUrl = computed(() => {
  let bgMap = bgMap1
  switch (props.bgIndex) {
    case 1:
      bgMap = bgMap1;
      break;
    case 2:
      bgMap = bgMap2;
      break;
    case 3:
      bgMap = bgMap3;
      break;
    case 4:
      bgMap = bgMap4;
      break;
    case 5:
      bgMap = bgMap5;
      break;
    default:
      bgMap = bgMap1;
      break;
  }
  return bgMap
})

</script>
<style lang="scss" scoped>
</style>