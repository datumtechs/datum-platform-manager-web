<script setup lang="ts">
import Menu from '@/components/layout/Menu.vue'
import PersonalCenter from './components/PersonalCenter.vue'
</script>
<template>
  <header class="flex h-70px items-center opacity-79 bg-light-50 w-full h-full">
    <img class="logo w-125px h-32px ml-40px cursor-pointer" @click="$router.push('/')"
      src="@/assets/images/header/datum-black.png" />
    <Menu />
    <PersonalCenter />
  </header>
</template>
<style scoped lang="scss">
header {
  box-shadow: inset 0px -1px 0px 0px #eeeeee;
}
</style>
