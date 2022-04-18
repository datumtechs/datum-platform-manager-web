<script setup lang="ts">
import PersonalPopoverVue from './PersonalPopover.vue';
// import { UserFilled } from '@element-plus/icons-vue'
import Login from '@/components/login/index.vue'
import { useUsersInfo } from '@/stores'
const store = useUsersInfo()
const loginShow = ref(false)
const { t } = useI18n()
const loginShowChange = () => {
  loginShow.value = !loginShow.value
}

</script>
<template>
  <div class="personal flex items-center cursor-pointer w-220px">
    <PersonalPopoverVue />
    <UsersPersonalPopover v-if="store.getToken" />
    <div
      v-else
      @click="() => loginShow = true"
      class="w-126px h-40px rounded-2/1 flex items-center justify-center border text-light-50 font-500 ml-11px text-color-[#fff]"
    >{{ t('head.connect') }}</div>
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
