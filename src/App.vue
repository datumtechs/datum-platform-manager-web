<script setup lang="ts">
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import { USELANGUAGE } from '@/stores'
import IndexLayout from '@/Layout/IndexLayout.vue'
import Web3 from 'web3'

onMounted(() => {
  
})

</script>
<template>
  <el-config-provider :locale="USELANGUAGE().langue == 'zh' ? elementZhLocale : elementEnLocale">
    <IndexLayout />
  </el-config-provider>
</template>
<style>
@import "@/assets/css/base.scss";
</style>
