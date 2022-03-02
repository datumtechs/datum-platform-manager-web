<script setup lang="ts">
import Menu from '@/components/layout/Menu.vue'
import Search from './../Search.vue'
import PersonalCenter from './components/PersonalCenter.vue'
</script>
<template>
  <header class="flex h-70px items-center opacity-79 bg-light-50">
    <img
      class="logo w-164px h-26px ml-37px cursor-pointer"
      @click="$router.push('/')"
      src="@/assets/Images/header/logo.png"
    />
    <component :is="$route.path == '/' ? Menu : Search"></component>
    <PersonalCenter />
  </header>
</template>
<style scoped lang="scss">
header {
  box-shadow: inset 0px -1px 0px 0px #eeeeee;
}
</style>
