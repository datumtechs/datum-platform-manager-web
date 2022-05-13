<template>
  <div class="flex items-center private-switch-wrap cursor-pointer">
    <div :class="locale == 'en' ? 'w-161px':'w-142px'">
      <el-button class="h-40px" plain type="primary" @click="change" round>
      {{$t('task.goTo')}}{{ isExpertMode? $t('task.wizardMode') :$t('task.expertMode') }}
    </el-button>
    </div>
    <question-mark />
  </div>
</template>
<script lang="ts" setup>
const switchValue = ref(false)
const {locale} = useI18n()
const emit = defineEmits(['change'])
const props = defineProps(['mode'])
const isExpertMode = computed(() => props.mode === 'expert')
const change = () => {
  emit('change', isExpertMode.value ? 'normal' : 'expert')
}


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