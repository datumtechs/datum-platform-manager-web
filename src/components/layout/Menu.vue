<script setup lang="ts">
import routePath from '@/router/routePath'
const routeList = routePath.filter(v=> v.meta.show !== false) 
</script>
<template>
  <div  class="menu flex flex-1 ">
    <router-link class="menu-item inline-grid" v-for="item in routeList" :key="item.path" :to="item.path">
      {{item.name}}
    </router-link>
  </div>
</template>
<style scoped lang="scss">
.menu{
  justify-content: center;
  padding: 0 30px 0 100px;
  .menu-item{
    margin-left: 49px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333336;
    line-height: 20px;
    text-decoration:none;
  }
}
</style>
