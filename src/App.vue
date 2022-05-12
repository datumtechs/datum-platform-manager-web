<script setup lang="ts">
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import { useLanguage } from '@/stores'
import IndexLayout from '@/Layout/IndexLayout.vue'
import Web3Service from '@/utils/Web3Service'
import { queryCurrentChainInfo } from '@/api/chain'

const web3 = new Web3Service()
const chainConfig: any = ref({})
provide('web3', web3)
provide('chainConfig', chainConfig)




const queryConfig = () => {
  queryCurrentChainInfo().then(res => {
    const { data } = res
    if (data) chainConfig.value = data
  })
}


onMounted(() => {
  queryConfig()
})

</script>
<template>
  <el-config-provider :locale="useLanguage().langue == 'zh' ? elementZhLocale : elementEnLocale">
    <IndexLayout />
  </el-config-provider>
</template>
<style>
@import "@/assets/css/base.scss";
</style>
