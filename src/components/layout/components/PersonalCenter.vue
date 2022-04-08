<script setup lang="ts">
import PersonalPopoverVue from './PersonalPopover.vue';
import { UserFilled } from '@element-plus/icons-vue'
import Login from '@/components/login/index.vue'
import { useUsersInfo } from '@/stores'
const store = useUsersInfo()
const drawerShow = ref(false)
const loginShow = ref(false)
const drawerShowChange = () => {
  drawerShow.value = !drawerShow.value
}

const loginShowChange = () => {
  loginShow.value = !loginShow.value
}

</script>
<template>
  <div class="personal flex items-center cursor-pointer w-220px">
    <PersonalPopoverVue />
    <div class="flex items-center" v-if="store.getToken" @click="drawerShowChange">
      <span class="head rounded-1/2 flex w-35px h-35px ml-20px mr-11px items-center justify-center">
        <el-icon>
          <user-filled />
        </el-icon>
      </span>
      <span class="w-67px truncate">{{ store.userName }}</span>
    </div>
    <div
      v-else
      @click="() => loginShow = true"
      class="w-126px h-40px rounded-2/1 flex items-center justify-center border text-light-50 font-500 ml-11px text-color-[#fff]"
    >{{ $t('head.connect') }}</div>
    <PersonalDrawer
      v-if="drawerShow"
      :drawer-show="drawerShow"
      @drawerShowchange="drawerShowChange"
    />
    <Login v-if="loginShow" :login-show="loginShow" @loginShowChange="loginShowChange" />
  </div>
</template>
<style lang="scss" scoped>
.personal {
  .head {
    font-size: 20px;
    background: #ccc;
  }
}
.border {
  background: #2b60e9;
  border-radius: 20px;
  font-size: 14px;
  line-height: 20px;
}
</style>
