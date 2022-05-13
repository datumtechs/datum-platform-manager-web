<template>
  <teleport to="#search">
    <div class="input-wrap w-full h-full">
      <el-input
        class="flex"
        v-model="input1"
        @blur="submit"
        :prefix-icon="Search"
        :placeholder="props.placeholder"
      >
        <template #suffix>
          <el-popover
            placement="bottom"
            :width="428"
            trigger="click"
          >
            <template #reference>
              <img class="w-24px cursor-pointer" src="@/assets/images/header/select.png" />
            </template>
            <div class="content p-28px pt-18px">
              <slot name="content"></slot>
              <div class="popver-footer text-right pt-30px">              
                  <el-button class="w-140px" style="height:40px" round>{{t('common.cancel')}}</el-button>
                  <el-button class="w-140px" style="height:40px" type="primary" round @click="submit">{{t('common.submit')}}</el-button>
              </div>
            </div>
          </el-popover>
        </template>
      </el-input>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const input1 = ref('')
const {t} = useI18n()
const props = defineProps({
  placeholder:{
    type:String,
    default:''
  }
})

const emit = defineEmits(['search'])

const submit =()=>{
  emit('search',input1)
}

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