<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
// import Home from '@/views/home/index.vue'
import Side from '@/components/layout/Side.vue'
import { ElContainer, ElHeader } from 'element-plus';
</script>
<template>
  <el-container class="min-w-1000px min-w-500px">
    <el-header class="p-0 h-auto">
      <Header />
    </el-header>
    <el-container v-if="$route.path !== '/'">
      <el-aside width="219px">
        <Side />
      </el-aside>
      <div class="layout-mian-wrap">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
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
.layout-mian-wrap::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
}
.layout-mian-wrap::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  height: 30px;
  border-radius: 10px;
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #d8d8d8;
}
.layout-mian-wrap::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
</style>
