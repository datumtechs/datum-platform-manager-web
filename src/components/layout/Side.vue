<template>
  <div class="side-menu-wrap flex flex-col text-14px">
    <el-menu router>
      <el-menu-item class="h-63px" :key="item.path" :class="{ active: handActive(item.path) }" :index="item.path"
        v-for="item in routeList">
        <div class="pl-30px pr-15px flex items-center">
          <img class="w-22px mr-14px" v-if="item.meta.icon" :src="handIcon(item.meta.icon)" />
          <p class="whitespace-pre-line leading-18px text-14px text-color-[#393939]">{{
            t(`${item.meta.label}`)
          }}</p>
        </div>
      </el-menu-item>
    </el-menu>
    <el-menu router class="flex-1 bg-color-[#F7F8F9] pt-26px">
      <el-menu-item class="h-63px mb-16px" index="createWorkFlow/wizardMode"
        @click="() => { $router.push({ name: 'wizardMode' }) }" v-if="privateList.length && store.token">
        <!-- :class="{ active: handActive('createTask') }" -->
        <div
          class="mx-15px h-50px w-full flex items-center justify-center bg-color-[#2B60E9] rounded-[25px] text-color-[#fff]">
          <el-icon class="mr-13px">
            <plus />
          </el-icon>
          {{ t('menu.createTask') }}
        </div>
      </el-menu-item>
      <el-menu-item class="h-63px" :key="item.path" :class="{ active: handActive(item.path) }" :index="item.path"
        v-show="store.token" v-for="item in privateList">
        <div class="pl-30px pr-15px flex items-center">
          <img class="w-22px mr-14px" v-if="item.meta.icon" :src="handIcon(item.meta.icon)" />
          <p class="whitespace-pre-line leading-18px text-14px text-color-[#393939]">{{
            t(`${item.meta.label}`)
          }}</p>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import routePath from '@/router/routePath'
import { HelpFilled, Plus } from '@element-plus/icons-vue'
import nodeIcon from '@/assets/Images/side/side-node-icon.png'
import marketplaceIcon from '@/assets/Images/side/side-marketplace-icon.png'
import computingIcon from '@/assets/Images/side/side-computing-icon.png'
import myTaskIcon from '@/assets/Images/side/side-my-task-icon.png'
import myData from '@/assets/Images/side/side-my-data-icon.png'
import myAuth from '@/assets/Images/side/side-my-auth-icon.png'
import myModelsIcon from '@/assets/Images/side/side-my-models-icon.png'
import computeTask from '@/assets/Images/side/side-computeTask-icon.png'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useUsersInfo } from '@/stores'
const { t } = useI18n()
const store = useUsersInfo()
const route: RouteLocationNormalizedLoaded = useRoute()
//@ts-ignore
const routeList = routePath.filter(v => v.meta.show.includes('side'))
//@ts-ignore
const privateList: any = routePath.filter(v => v.meta.show.includes('login')) || []

const handIcon = (name: string | undefined): any => {
  let itemIcon: any = HelpFilled
  switch (name) {
    case 'side-node-icon':
      itemIcon = nodeIcon; break;
    case 'side-marketplace-icon':
      itemIcon = marketplaceIcon; break;
    case 'side-computing-icon':
      itemIcon = computingIcon; break;
    case 'side-my-task-icon':
      itemIcon = myTaskIcon; break;
    case 'side-my-data-icon':
      itemIcon = myData; break;
    case 'side-my-models-icon':
      itemIcon = myModelsIcon; break;
    case 'side-my-auth-icon':
      itemIcon = myAuth; break;
    case 'side-computeTask-icon':
      itemIcon = computeTask; break;
    default:
      itemIcon = HelpFilled;
      break;
  }
  return itemIcon
}

const handActive = (path: string) => {
  const pathList = path.split('/')
  const routeList = route.path.split('/')
  return routeList.includes(pathList[1])
}

</script>
<style lang="scss" scoped>
.side-menu-wrap {
  height: calc(100vh - 70px);
  border-right: solid 1px rgba(238, 238, 238, 0.5);

  .el-menu {
    border-right: none;
  }

  .active {
    background: linear-gradient(90deg, rgba(238, 238, 238, 0) 0%, #e1e5ff 100%);
    border-right: solid 4px #0052d9;
  }
}
</style>
