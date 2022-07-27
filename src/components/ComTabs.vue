<template>
  <div
    class="com-tabs relative h-full bg-color-[#EEEEEE] rounded-25px flex px-7px py-5px items-center justify-between cursor-pointer">
    <div :ref="setItemRef"
      class="px-40px h-full flex-1 flex items-center justify-center z-1 text-16px text-color-[#666666]"
      style="word-break: keep-all;white-space:nowrap" :class="{ active: + index === activeIndex }"
      v-for="(item, index) in props.list" :key="index" @click="tabsClick(index)">
      <p>{{ t(`${item.name}`) }}</p>
    </div>
    <div :style="{ width: sliderWidth + 'px', transform: `translateX(${translateX}px)` }"
      class="absolute z-0 top-5px h-40px bg-color-[#fff] rounded-20px tabs-slider"></div>
  </div>
</template>
<script lang="ts" setup>
import { useKeepAliveInfo } from '@/stores'
const route = useRoute()
const { t } = useI18n()
const tabsItems = ref<any[]>([])
const sliderWidth = ref(0)
const translateX = ref(0)
const keepAlive = useKeepAliveInfo()
const props = defineProps({
  list: {
    type: Object, default: () => []
  },
  activekey: {
    type: Number, default: 0
  },
  keep: {
    type: Boolean,
    default: true
  }
})
const activeIndex = toRefs(props).activekey

const emit = defineEmits(['change'])
const { locale } = useI18n()

watch(locale, (val, val1) => {
  nextTick(() => {
    handleTabs(+activeIndex.value)
  })
})

watch(activeIndex, (newV, oldV) => {
  console.log('newV', newV);
  console.log('oldV', oldV);

  nextTick(() => {
    handleTabs(+ activeIndex.value)
  })
})

const setItemRef = (el: any) => {
  if (el) tabsItems.value?.push(el)
}


onMounted(() => {
  // keepalive 与 props 优先级问题需要考虑  暂定有keepalive 优先
  if (keepAlive.getComTabs[route.path]) {
    handleTabs(keepAlive.getComTabs[route.path])
    emit('change', +keepAlive?.getComTabs[route.path])
    return
  }
  nextTick(() => {
    if (tabsItems.value?.length) {
      handleTabs(+activeIndex.value)
    }
  })
})

const tabsClick = (index: string | number) => {
  handleTabs(+index)
  if (typeof props.keep === 'undefined' || props.keep) keepAlive.setComTabs(+index, route.path)
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