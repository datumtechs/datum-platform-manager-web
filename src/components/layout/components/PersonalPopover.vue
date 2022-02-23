<script setup lang="ts">
//import { getCurrentInstance } from 'vue'
import { USELANGUAGE } from '@/stores'
//const internalInstance: any = getCurrentInstance()
const { locale } = useI18n()
const changeLangue = (langue: string) => {
  locale.value = langue
  USELANGUAGE().saveLang(langue)
}

const popoverShow = ref(false)

</script>
<template>
  <el-popover
    @show="popoverShow = true"
    @hide="popoverShow = false"
    placement="bottom"
    popper-class="_el-popover"
    :width="140"
    trigger="hover"
  >
    <template #reference>
      <img
        v-if="popoverShow"
        class="langue rounded-1/2 w-40px h-40px"
        src="@/assets/Images/header/langue_active.png"
      />
      <img v-else class="langue rounded-1/2 w-40px h-40px" src="@/assets/Images/header/langue.png" />
    </template>
    <div class="popover flex flex-col justify-between">
      <p
        class="mb-24px text-l font-normal cursor-pointer"
        :class="{ active: USELANGUAGE().langue == 'zh' }"
        @click="changeLangue('zh')"
      >简体中文</p>
      <p
        @click="changeLangue('en')"
        class="text-l font-normal cursor-pointer"
        :class="{ active: USELANGUAGE().langue !== 'zh' }"
      >English</p>
    </div>
  </el-popover>
</template>
<style lang="scss" scoped>
.popover {
  color: #333333;
  .active {
    color: #0052d9;
  }
}

:global(._el-popover) {
  padding: 24px 20px !important;
  min-width: 140px !important;
}
</style>