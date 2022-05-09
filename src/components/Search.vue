<template>
  <teleport to="#search">
    <div class="input-wrap w-full h-full">
      <el-input
        class="flex"
        v-show="$route.meta.search"
        v-model="input1"
        :prefix-icon="Search"
        placeholder="Please input"
      >
        <template #suffix>
          <el-popover
            placement="bottom"
            title="Title"
            :width="428"
            trigger="click"
            content="this is content, this is content, this is content"
          >
            <template #reference>
              <img class="w-24px cursor-pointer" src="@/assets/images/header/select.png" />
            </template>
          </el-popover>
        </template>
      </el-input>
    </div>
  </teleport>
</template>
<script setup lang="ts">
// import { unref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input1 = ref('')
// const popoverRef = ref()
// const buttonRef = ref()

// const onClickOutside = () => {
//   unref(popoverRef).popperRef?.delayHide?.()
// }
</script>
<style lang="scss" scoped>
.input-wrap {
  :deep(.el-input) {
    display: block !important;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid #e9e9e9;
    align-items: center;
    .el-input__inner {
      height: 100%;
      padding-left: 53px;
      padding-right: 46px;
      border: none;
      text-indent: 5px;
    }
    .el-input__prefix {
      left: 22px;
      font-size: 18px;
    }
    .el-input__suffix {
      right: 23px;
      .el-input__suffix-inner {
        align-items: center;
      }
    }
  }
}
</style>