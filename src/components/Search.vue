<script setup lang="ts">
import {Search,Operation} from '@element-plus/icons-vue'
const input1 = ''
</script>
<template>
<div id="search">
    <el-input
        class="flex"
        v-model="input1"
        :suffix-icon="Operation"
         :prefix-icon="Search"
        placeholder="Please input">
       <!-- <template #append>.com</template> -->
    </el-input>
</div>
</template>
<style lang="scss" scoped>
#search{
  width: 100%;
  padding: 0 25px 0 45px;
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
    }
    .el-input__prefix{
        left:22px;
        font-size: 18px;
    }
    .el-input__suffix{
      right:23px;
      font-size: 18px;
    }
  }
   
}
</style>