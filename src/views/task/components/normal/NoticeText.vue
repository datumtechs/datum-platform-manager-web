<template>
  <div class="flex items-center justify-center text-color-[#333333]" :key="item" v-for="(item, index) in list">
    <span>{{ item }}</span>
    <el-icon v-show="index < list.length - 1" class="rotate-180 mx-5px">
      <back />
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
const props = defineProps(['noticeText'])
const list = computed(() => {
  let newList: any[] = []
  if (props.noticeText) {
    newList = Object.values(props.noticeText) || []
  }
  return newList
})
</script>