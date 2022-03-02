<template>
  <el-menu router class="side-menu">
    <el-menu-item :index="item.path" v-for="item in routeList">{{ item.name }}</el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import routePath from '@/router/routePath'
const routeList = routePath.filter(v => v.meta.show.includes(2)) 
</script>
<style lang="scss" scoped>
.side-menu {
  height: calc(100vh - 70px);
}
</style>
