<template>
  <el-popover
    @show="popoverShow = true"
    @hide="popoverShow = false"
    placement="bottom-end"
    popper-class="users-el-popover"
    :width="180"
    trigger="hover"
  >
    <template #reference>
      <div class="flex items-center" v-if="store.getToken">
        <span
          class="head rounded-1/2 flex w-35px h-35px ml-20px mr-11px items-center justify-center"
        >
          <el-icon class="text-20px">
            <user-filled />
          </el-icon>
        </span>
        <span class="w-67px truncate">{{ store.userName }}</span>
      </div>
    </template>
    <ul class="pl-0px">
      <li
        @click="toLink('account')"
        class="cursor-pointer list-none mx-8px mt-8px py-10px pl-15px flex items-center"
      >
        <span class="ml-10px coror-[#333333] text-14px">{{ $t('head.editNickname') }}</span>
      </li>
      <li
        @click="toLink('node')"
        class="cursor-pointer list-none mx-8px mt-4px mb-2px py-10px pl-15px flex items-center"
      >
        <span class="ml-10px coror-[#333333] text-14px">{{ $t('head.nodeManagement') }}</span>
      </li>
      <li class="item-hr"></li>
      <li
        @click="logout"
        class="cursor-pointer list-none mx-8px mb-8px mt-2px py-10px pl-15px flex items-center"
      >
        <span class="ml-10px coror-[#333333] text-14px">{{ $t('head.logout') }}</span>
      </li>
    </ul>
  </el-popover>
</template>
<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { useUsersInfo } from '@/stores'
import { Logout } from '@/api/login'
import { Edit, Link as IconLink, Help } from '@element-plus/icons-vue'
import { type Router, useRouter } from 'vue-router'
const emit = defineEmits(['drawerShowchange'])
const store = useUsersInfo()
const popoverShow = ref(false)
const router: Router = useRouter()

const toLink = (type: string) => {
  emit('drawerShowchange')
  router.push({ name: "myAccount", params: { infoType: type } })
}

const logout = async () => {
  try {
    const res: any = await Logout()
    const { code } = res
    if (code === 10000) {
      emit('drawerShowchange')
      useUsersInfo().clean()
    }
  } catch (error) {
    console.log(error)
  }
}

</script>
<style lang="scss" scoped>
.item-hr {
  border-bottom: 1px solid #eee;
}
.cursor-pointer {
  &:hover {
    background: #f7f8f9;
    border-radius: 4px;
  }
}
:global(.users-el-popover) {
  padding: 0 !important;
  transform: translate(-100px, 70px) !important;
}
:global(.users-el-popover .el-popper__arrow) {
  display: none;
}
</style>