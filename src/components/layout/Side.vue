<template>
  <div class="side-menu-wrap flex flex-col text-14px">
    <el-menu router>
      <el-menu-item
        class="h-63px"
        :class="{ active: handActive(item.path) }"
        :index="item.path"
        v-for="item in routeList"
      >
        <div class="pl-30px pr-15px flex items-center">
          <img class="w-22px mr-14px" v-if="item.meta.icon" :src="handIcon(item.meta.icon)" />
          <p
            class="whitespace-pre-line leading-18px text-14px text-color-[#393939]"
          >{{ $t(`${item.meta.label}`) }}</p>
        </div>
      </el-menu-item>
    </el-menu>
    <el-menu router class="flex-1 bg-color-[#F7F8F9] pt-26px">
      <el-menu-item
        class="h-63px"
        :index="'/createTask'"
        :class="{ active: handActive('createTask') }"
      >
        <div
          class="mx-15px h-50px w-full flex items-center justify-center bg-color-[#2B60E9] rounded-[25px] text-color-[#fff]"
        >
          <el-icon class="mr-13px">
            <plus />
          </el-icon>
          {{ $t('menu.createTask') }}
        </div>
      </el-menu-item>
      <el-menu-item
        class="h-63px"
        :class="{ active: handActive(item.path) }"
        :index="item.path"
        v-for="item in List"
      >
        <div class="pl-30px pr-15px flex items-center">
          <img class="w-22px mr-14px" v-if="item.meta.icon" :src="handIcon(item.meta.icon)" />
          <p
            class="whitespace-pre-line leading-18px text-14px text-color-[#393939]"
          >{{ $t(`${item.meta.label}`) }}</p>
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
import credentialsIcon from '@/assets/Images/side/side-my-credentials-icon.png'
import myMmodelsIcon from '@/assets/Images/side/side-my-models-icon.png'
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

const route: RouteLocationNormalizedLoaded = useRoute()
const routeList = routePath.filter(v => v.meta.show.includes(2))
const List = routePath.filter(v => v.meta.show.includes(3))

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
    case 'side-my-credentials-icon':
      itemIcon = credentialsIcon; break;
    case 'side-my-models-icon':
      itemIcon = myMmodelsIcon; break;
    default:
      itemIcon = HelpFilled;
      break;
  }
  return itemIcon
}

const handActive = (path: string) => {
  const pathList = path.split('/')
  return pathList.includes(route.path.replace('/', ''))
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
