<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
// import Home from '@/views/home/index.vue'
import Side from '@/components/layout/Side.vue'
import { ElContainer, ElHeader } from 'element-plus';
</script>
<template>
  <el-container>
    <el-header class="p-0 h-auto">
      <Header />
    </el-header>
    <el-container v-if="$route.path !== '/'">
      <el-aside width="219px">
        <Side />
      </el-aside>
      <router-view></router-view>
    </el-container>
    <router-view v-else></router-view>
  </el-container>
</template>
<style scoped lang="scss">
</style>
