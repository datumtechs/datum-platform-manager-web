<script setup lang="ts">
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import { LANGUAGE } from '@/stores'
import IndexLayout from '@/Layout/IndexLayout.vue'
const language = computed(()=> LANGUAGE().langue == 'zh' ? elementZhLocale : elementEnLocale)
</script>

<template>
  <el-config-provider :locale="language">
    <!-- <component :is="$route.path == '/' ? Home : IndexLayout"></component> -->
    <IndexLayout />
  </el-config-provider>
</template>
