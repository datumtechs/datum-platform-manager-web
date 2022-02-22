<script setup lang="ts">
import {Search,Operation} from '@element-plus/icons-vue'
const input1 = ''
</script>
<template>
<div id="search" class="pl-45px pr-25px flex-1">
  <el-input
    class="flex"
    v-model="input1"
    :prefix-icon="Search"
    placeholder="Please input">
    <template #suffix>
      <img src="@/assets/Images/header/select.png"/>
    </template>
  </el-input>
</div>
</template>
<style lang="scss" scoped>
#search{
  ::v-deep .el-input{
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    background: #FFFFFF;
    border-radius: 24px;
    border: 1px solid #E9E9E9;
    align-items: center;
     .el-input__inner{
      height: 100%;
      padding-left: 53px;
      padding-right: 46px;
      border: none;
      text-indent: 5px;
    }
    .el-input__prefix{
        left:22px;
        font-size: 18px;
    }
    .el-input__suffix{
      right:23px;
      img{
        width: 18px;
        height: 16.5px;
      }
      .el-input__suffix-inner{
        align-items: center;
      }
    }
  }
   
}
</style>