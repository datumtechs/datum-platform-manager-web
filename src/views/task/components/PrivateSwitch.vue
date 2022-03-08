<template>
  <div class="flex items-center private-switch-wrap cursor-pointer">
    <div
      class="text-16px font-600 leading-22px mr-10px text-color-[#333333]"
    >{{ $t('task.expertMode') }}</div>
    <div
      class="w-70px h-28px rounded-14px overflow-hidden border-1 border-solid border-[#cccccc]"
      @click="change"
    >
      <div
        class="bg-color-[#fff] w-full h-full flex items-center px-7px"
        :style="{ background: switchValue ? '#2B60E9' : '#fff' }"
      >
        <div
          :style="{
            backgroundColor: switchValue ? '#fff' : '#666666',
            transform: `translateX(${switchValue ? 40 : 0}px)`
          }"
          class="w-14px h-14px bg-color-[#666666] rounded-7px private-switch-transform"
        ></div>
      </div>
    </div>
    <question-mark />
  </div>
</template>
<script lang="ts" setup>
const switchValue = ref(false)
const emit = defineEmits(['change'])
const props = defineProps(['mode'])
const change = () => {
  switchValue.value = !switchValue.value
  emit('change', switchValue.value)
}

nextTick(() => {
  switchValue.value = props.mode
})

</script>
<style lang="scss">
$tiems: 0.5s;
.private-switch-wrap {
  .private-switch-transform {
    transition: transform $tiems;
    -moz-transition: transform $tiems; /* Firefox 4 */
    -webkit-transition: transform $tiems; /* Safari 和 Chrome */
    -o-transition: transform $tiems; /* Opera */
  }
}
</style>