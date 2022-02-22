<script setup lang="ts">
import routePath from '@/router/routePath'
const routeList = routePath.filter(v=> v.meta.show.includes(2)) 
</script>

<template>
<el-menu
  router>
  <el-menu-item :index="item.path" v-for="item in routeList" >{{item.name}}</el-menu-item>
</el-menu>
</template>