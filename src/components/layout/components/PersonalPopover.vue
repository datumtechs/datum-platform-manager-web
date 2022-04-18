<template>
  <el-popover @show="popoverShow = true" @hide="popoverShow = false" placement="bottom"
    popper-class="_el-popover" :width="140" trigger="hover">
    <template #reference>
      <!-- <img v-if="popoverShow" class="langue rounded-1/2 w-40px h-40px"
        src="@/assets/Images/header/langue_active.png" /> -->
      <img class="langue rounded-1/2 w-40px h-40px" src="@/assets/Images/header/langue.png" />
    </template>
    <div class="popover flex flex-col justify-between">
      <p class="mb-24px text-l font-normal cursor-pointer" :class="{ active: store.langue == 'zh' }"
        @click="changeLangue('zh')">简体中文</p>
      <p @click="changeLangue('en')" class="text-l font-normal cursor-pointer"
        :class="{ active: store.langue !== 'zh' }">English</p>
    </div>
  </el-popover>
</template>
<script setup lang="ts">
import { useLanguage } from '@/stores'
const store = useLanguage()
const { locale } = useI18n()
const changeLangue = (langue: string) => {
  locale.value = langue
  store.saveLang(langue)
}

const popoverShow = ref(false)

</script>
<style lang="scss" scoped>
.langue {
  &:hover {
    content: url("@/assets/Images/header/langue_active.png")
  }
}

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