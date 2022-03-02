<template>
  <div
    class="com-tabs relative h-full bg-color-[#E8E8E8] rounded-25px flex px-7px py-5px items-center justify-between cursor-pointer"
  >
    <div
      :ref="setItemRef"
      class="px-20px h-full flex-1 flex items-center z-1 text-16px text-color-[#a5a5a5]"
      :class="{ active: +index == activeIndex }"
      v-for="(item, index) in props.list"
      @click="tabsClick(index)"
    >{{ item.name + '.' + index }}</div>
    <div
      :style="{ width: sliderWidth + 'px', transform: `translateX(${translateX}px)` }"
      class="absolute z-0 top-5px h-40px bg-color-[#fff] rounded-20px tabs-slider"
    ></div>
  </div>
</template>
<script lang="ts" setup>
const activeIndex = ref(0)
const tabsItems = ref<any[]>([])
const sliderWidth = ref(0)
const translateX = ref(0)
const props = defineProps({
  list: {
    type: Object, default: () => []
  }
})
const emit = defineEmits(['change'])

const setItemRef = (el: any) => {
  if (el) tabsItems.value?.push(el)
}

onMounted(() => {
  nextTick(() => {
    if (tabsItems.value?.length) {
      console.log(tabsItems.value[0]?.offsetWidth)
      sliderWidth.value = tabsItems.value[0]?.offsetWidth
    }
  })
})

const tabsClick = (index: string) => {
  let x = 0
  for (let i = 0; i < +index; i++) {
    x += tabsItems.value[i]?.offsetWidth
  }
  activeIndex.value = +index
  translateX.value = x
  emit('change', index)
}


const handleClick = () => {
  // console.log(el)
  // 67005272
  // 63628153
  //62563281
}
</script>
<style lang="scss">
$tiems: 0.5s;
.com-tabs {
  .tabs-slider {
    transition: transform $tiems;
    -moz-transition: transform $tiems; /* Firefox 4 */
    -webkit-transition: transform $tiems; /* Safari 和 Chrome */
    -o-transition: transform $tiems; /* Opera */
  }
  .active {
    color: #393939;
  }
}
</style>
<style lang="scss" scoped></style>