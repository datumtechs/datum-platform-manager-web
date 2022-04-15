<template>
  <div
    class="com-tabs relative h-full bg-color-[#EEEEEE] rounded-25px flex px-7px py-5px items-center justify-between cursor-pointer">
    <div :ref="setItemRef"
      class="px-40px h-full flex-1 flex items-center justify-center z-1 text-16px text-color-[#666666]"
      style="word-break: keep-all;white-space:nowrap" :class="{ active: + index === activeIndex }"
      v-for="(item, index) in props.list" :key="index" @click="tabsClick(index)">
      <p>{{ $t(`${item.name}`) }}</p>
    </div>
    <div :style="{ width: sliderWidth + 'px', transform: `translateX(${translateX}px)` }"
      class="absolute z-0 top-5px h-40px bg-color-[#fff] rounded-20px tabs-slider"></div>
  </div>
</template>
<script lang="ts" setup>
const tabsItems = ref<any[]>([])
const sliderWidth = ref(0)
const translateX = ref(0)
const props = defineProps({
  list: {
    type: Object, default: () => []
  },
  activekey: {
    type: Number, default: 0
  }
})
const activeIndex = ref(props.activekey)

const emit = defineEmits(['change'])
const { locale } = useI18n()

watch(locale, () => {
  nextTick(() => {
    handleTabs(+activeIndex.value)
  })
})

const setItemRef = (el: any) => {
  if (el) tabsItems.value?.push(el)
}

onMounted(() => {
  nextTick(() => {
    if (tabsItems.value?.length) {
      handleTabs(+activeIndex.value)
    }
  })
})

const tabsClick = (index: string) => {
  handleTabs(+index)
  emit('change', +index)
}

const handleTabs = (index: number) => {
  let x = 0
  for (let i = 0; i < +index; i++) {
    x += tabsItems.value[i]?.offsetWidth
  }
  sliderWidth.value = tabsItems.value[+index]?.offsetWidth
  activeIndex.value = +index
  translateX.value = x
}

</script>
<style lang="scss">
$tiems: 0.5s;

.com-tabs {
  .tabs-slider {
    transition: transform $tiems;
    -moz-transition: transform $tiems;
    /* Firefox 4 */
    -webkit-transition: transform $tiems;
    /* Safari 和 Chrome */
    -o-transition: transform $tiems;
    /* Opera */
  }

  .active {
    color: #333333;
    font-family: DINPro-Medium, Ali-Medium;
    font-weight: 600;
  }
}
</style>
<style lang="scss" scoped>
</style>