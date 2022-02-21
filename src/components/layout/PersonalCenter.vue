<script setup lang="ts">
import {UserFilled} from '@element-plus/icons-vue'
</script>
<template>
  <div class="personal flex">
    <img class="langue rounded-1/2" src="@/assets/Images/header/langue.png"/>
    <div class="head rounded-1/2 flex">
      <el-icon ><user-filled  /></el-icon>
    </div>
     <span>username</span>
  </div>
</template>
<style lang="scss" scoped>
.personal{
  align-items: center;
  padding-right: 48px;
  cursor: pointer;
  .langue{
    width: 40px;
    height: 40px;
  }
  .head{
    @extend .langue;
    margin-left: 20px;
    margin-right: 11px;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: #ccc;
  }
}
</style>