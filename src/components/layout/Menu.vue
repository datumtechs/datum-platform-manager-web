<script setup lang="ts">
import routePath from '@/router/routePath'
const routeList = routePath.filter(v => {
  // @ts-ignore
  return v.meta.show.includes(1)
})

</script>
<template>
  <div v-if="$route.path == '/'" class="menu flex flex-1 justify-center pr-50px pl-50px">
    <router-link
      class="menu-item inline-grid ml-49px text-l font-normal text-[14px] leading-6 no-underline"
      v-for="item in routeList"
      :key="item.path"
      :to="item.path"
    >{{ $t(`${item.meta.label}`) }}</router-link>
  </div>
  <div v-else id="search" class="pl-45px pr-25px flex-1"></div>
</template>
<style scoped lang="scss">
.menu {
  .menu-item {
    color: #333336;
  }
}
</style>
