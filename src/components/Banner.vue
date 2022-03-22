<template>
  <div
    class="w-full h-167px flex justify-between relative border-bottom px-5vw py-42px com-main"
    :style="{ background: `url(${bgUrl}) no-repeat right`, 'background-size': 'auto 100%' }"
  >
    <div class="w-full black-font text-48px text-color-[#393939] font-900 leading-58px">
      <el-icon v-if="backShow" class="cursor-pointer" @click="emit('back')">
        <back />
      </el-icon>
      {{ $t(`${$route.meta.label}`) }}
      <div
        class="text-14px font-medium font-400 text-color-[#999999] leading-20px"
        :class="$slots.select ? 'mt-8px' : 'mt-14px'"
      >
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
import arrow from '@/assets/Images/banner/arrow.png'
import book from '@/assets/Images/banner/book.png'
import clocksWatches from '@/assets/Images/banner/clocksWatches.png'
import flag from '@/assets/Images/banner/flag.png'
import rocket from '@/assets/Images/banner/rocket.png'
const emit = defineEmits(['back'])
const props = defineProps({
  bgName: {
    type: String,
    default: 'arrow'
  },
  backShow: { type: Boolean, default: false }
})

const bgUrl = computed(() => {
  let bgMap = arrow
  switch (props.bgName) {
    case 'arrow':
      bgMap = arrow;
      break;
    case 'book':
      bgMap = book;
      break;
    case 'clocksWatches':
      bgMap = clocksWatches;
      break;
    case 'flag':
      bgMap = flag;
      break;
    case 'rocket':
      bgMap = rocket;
      break;
    default:
      bgMap = arrow;
      break;
  }
  return bgMap
})

</script>
<style lang="scss" scoped>
</style>