<template>
  <div class="w-100% h-167px flex justify-between">
    <div>
      <el-icon>
        <back />
      </el-icon>
      {{ $t(`${$route.meta.label}`) }}
    </div>
    <img :src />
  </div>
</template>
<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'

</script>
<style lang="scss" scoped>
</style>