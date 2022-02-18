<script setup lang="ts">
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import { useGlobalStore } from '@/stores/modules/global'
import { storeToRefs } from 'pinia'

const { lang } = storeToRefs(useGlobalStore())
// const lang = computed<string>(() => useGlobalStore.lang)
const globalStore = useGlobalStore()
const lang2 = computed(() => globalStore.lang)
console.log('store', lang)
// const lang = ref<string>(store.lang)
</script>
<template>
  <el-config-provider :locale="globalStore.lang === 'zh' ? elementZhLocale : elementEnLocale">
    <router-view />
  </el-config-provider>
</template>
<style>
@import '@/assets/css/base.scss';
</style>
