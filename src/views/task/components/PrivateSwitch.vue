<template>
  <div class="flex items-center private-switch-wrap cursor-pointer">
    <div class="flex items-center" @click="click">
          <img src="@/assets/images/task/switch.png" class="w-20px h-20px"/>
        <span class="text-color-[#2B60E9] mx-6px">
          {{ $t('task.goTo') }}{{ isExpertMode ? $t('task.wizardMode') : $t('task.expertMode') }}
        </span>
    </div>
    <!-- <el-button class="h-40px" plain type="primary" @click="change" round>
     
    </el-button> -->
    <question-mark class="w-14px font-14px ml-0px" />
  </div>
</template>
<script lang="ts" setup>
const switchValue = ref(false)
const { locale } = useI18n()
const emit = defineEmits(['change'])
const props = defineProps(['mode'])
const isExpertMode = computed(() => props.mode === 'expert')
const click = () => {
  emit('change', isExpertMode.value ? 'normal' : 'expert')
}


</script>
<!-- <style lang="scss">
$tiems: 0.5s;

.private-switch-wrap {
  .private-switch-transform {
    transition: transform $tiems;
    -moz-transition: transform $tiems;
    /* Firefox 4 */
    -webkit-transition: transform $tiems;
    /* Safari 和 Chrome */
    -o-transition: transform $tiems;
    /* Opera */
  }
}
</style> -->