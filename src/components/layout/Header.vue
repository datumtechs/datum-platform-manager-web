<script setup lang="ts">
import Menu from '@/components/layout/Menu.vue'
import Search from './../Search.vue'
import PersonalCenter from '@/components/layout/PersonalCenter.vue'
</script>
<template>
  <header class="flex">
    <img class="logo" @click="$router.push('/')" src="@/assets/Images/header/logo.png"/>
    <component :is="$route.path == '/'? Menu : Search"></component>
    <PersonalCenter />
  </header>
</template>
<style scoped lang="scss">
header{
  height: 70px;
  align-items: center;
  background: #FFFFFF;
  opacity: 0.79;
  box-shadow: inset 0px -1px 0px 0px #EEEEEE;
  .logo{
    width: 164px;
    height: 26px;
    margin-left: 37px;
    cursor: pointer;
  }

}
</style>
