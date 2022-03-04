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

const bgUrl = computed(() => bgMap1)
const props = defineProps({ backShow: { type: Boolean, default: false } })

</script>
<style lang="scss" scoped>
</style>