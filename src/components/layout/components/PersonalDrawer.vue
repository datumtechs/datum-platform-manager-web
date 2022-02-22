<script setup lang="ts">
import { Edit, Link as IconLink, Help } from '@element-plus/icons-vue'
const emit = defineEmits(['drawerShowchange'])
const props = defineProps({
  drawerShow: Boolean
})

const toLink = (type: string) => {
  console.log(type)
}

const logout = () => {

}
</script>
<template>
  <el-drawer
    :title="$t('head.myAccountTitle')"
    :size="'300px'"
    :model-value="props.drawerShow"
    :append-to-body="true"
    :custom-class="'moirae-info-drawer'"
    @close="emit('drawerShowchange')"
  >
    <ul class="pl-0px">
      <li
        @click="toLink('default')"
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