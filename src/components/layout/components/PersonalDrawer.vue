<template>
  <el-drawer
    :title="$t('head.myAccountTitle')"
    :size="'300px'"
    ref="drawer"
    :model-value="props.drawerShow"
    :append-to-body="true"
    :custom-class="'moirae-info-drawer'"
    @close="emit('drawerShowchange')"
  >
    <ul class="pl-0px">
      <li
        @click="toLink('account')"
        class="cursor-pointer list-none py-10px mb-6px flex items-center"
      >
        <el-icon>
          <edit />
        </el-icon>
        <span class="ml-10px">{{ $t('head.editNickname') }}</span>
      </li>
      <li @click="toLink('node')" class="cursor-pointer list-none py-10px mb-6px flex items-center">
        <el-icon>
          <IconLink />
        </el-icon>
        <span class="ml-10px">{{ $t('head.nodeManagement') }}</span>
      </li>
      <li @click="logout" class="cursor-pointer list-none py-10px mb-6px flex items-center">
        <el-icon>
          <help />
        </el-icon>
        <span class="ml-10px">{{ $t('head.logout') }}</span>
      </li>
    </ul>
  </el-drawer>
</template>
<script setup lang="ts">
import { USEUSERSINFO } from '@/stores'
import { Logout } from '@/api/login'
import { Edit, Link as IconLink, Help } from '@element-plus/icons-vue'
import { type Router, useRouter } from 'vue-router'
const emit = defineEmits(['drawerShowchange'])
const props = defineProps({
  drawerShow: Boolean
})
const childRef = ref()
const router: Router = useRouter()

const toLink = (type: string) => {
  emit('drawerShowchange')
  router.push({ name: "myAccount", params: { infoType: type } })
}

const logout = async () => {
  try {
    const res: any = await Logout()
    console.log(res)
    const { code } = res
    if (code === 10000) {
      emit('drawerShowchange')
      USEUSERSINFO().clean()
    }
  } catch (error) {
    console.log(error)
  }
}

</script>
<style lang="scss" scoped>
.moirae-info-drawer {
  :global(.el-drawer__header) {
    padding: 20px 0 10px 0 !important;
    margin: 0 20px;
    margin-bottom: 10px !important;
    border-bottom: 1px solid #eee;
    &:first-child {
      font-style: normal;
      font-size: 16px;
      color: #000;
      letter-spacing: 0;
    }
  }
  :global(.el-drawer__body) {
    padding-top: 0 !important;
  }
  .cursor-pointer {
    &:hover {
      color: #0052d9;
    }
  }
}
</style>