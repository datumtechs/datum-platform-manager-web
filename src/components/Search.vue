<template>
  <teleport to="#search">
    <div class="input-wrap w-full h-full">
      <el-input
        class="flex"
        v-model="input1"
        clearable
        @blur="submit"
        @clear="submit"
        :prefix-icon="Search"
        :placeholder="props.placeholder"
      >
        <template #suffix>
          <el-popover
            :ref="(e:any)=>popoverRef = e"
            placement="bottom"
            :width="428"
            v-model:visible="visible"
          >
            <template #reference>
              <img class="w-24px cursor-pointer" @click="visible=true" src="@/assets/images/header/select.png" />
            </template>
            <div class="content p-28px pt-18px">
              <slot v-if="asyncVisible" name="content"></slot>
              <div class="popver-footer text-right pt-30px">              
                  <el-button class="w-140px" style="height:40px" round @click="cancel">{{t('common.cancel')}}</el-button>
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
const visible = ref(false) 
const asyncVisible = ref(false) 
const {t} = useI18n()
// const popoverKey = ref(Date.now())
const props = defineProps({
  placeholder:{
    type:String,
    default:''
  }
})

const emit = defineEmits(['search'])

const submit =()=>{
  emit('search',input1.value)
  popoverRefHide()
}

const popoverRef = ref()

const cancel = ()=>{
  popoverRefHide()
}

const popoverRefHide = () => {
  // unref(popoverRef).hide()
  visible.value = false
}


onMounted(()=>{
  setTimeout(()=>{
     asyncVisible.value =true
  })
})

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
      position: relative;
        .el-icon{
          position: absolute;
          right: 40px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>