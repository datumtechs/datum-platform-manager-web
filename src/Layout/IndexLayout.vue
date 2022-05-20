<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Side from '@/components/layout/Side.vue'
import { ElContainer, ElHeader } from 'element-plus';
// import { usekeepAliveStamp } from '@/stores'
// const keepAliveStamp = usekeepAliveStamp()

</script>
<template>
  <el-container class="min-w-1200px">
    <el-header class="p-0 h-70px w-full">
      <Header />
    </el-header>
    <el-container v-if="$route.path !== '/'">
      <el-aside width="219px">
        <Side />
      </el-aside>
      <div class="layout-main-wrap">
        <router-view v-slot="{ Component }">
          <transition name="fade-main" mode="out-in">
            <!-- <keep-alive > -->
              <component :is="Component" />
            <!-- </keep-alive> -->
          </transition>
        </router-view>
      </div>
    </el-container>
    <div class="layout-home" v-else>
      <router-view></router-view>
    </div>
  </el-container>
</template>
<style scoped lang="scss">

/* fade-main */
.fade-main-leave-active,
.fade-main-enter-active {
  transition: all 0.5s;
}

.fade-main-enter {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-main-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
