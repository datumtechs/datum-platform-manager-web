<template></template>
<script setup lang='ts'>
import Web3Service from '@/utils/Web3Service';
import {
    provide,
    toRefs,
} from 'vue'
const web3 = new Web3Service()
provide('web3', web3);
</script>

<style scoped lang='scss'>
</style>