<template>
  <div class="h-70px bg-[#fff] flex opacity-79 items-center justify-between px-40px">
    <div>juzix</div>
    <!-- <div class="header-search-box"></div> -->
    <div>
      <el-button @click="goFurther">{{ t('header.go') }} to Index</el-button>
    </div>
    <div class="flex">
      <el-space :size="11" :wrap="false">
        <div><img />用户头像</div>
        <div>
          <p class="bg-red-100 w-100px flex text-size-[16px] text-red-600 hstack">用户名称{{}}</p>
        </div>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global'
const store = useGlobalStore()
const router = useRouter()
const { t, locale } = useI18n()
const goFurther = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  localStorage.lang = locale.value
  store.saveLang(locale.value)
  router.push({
    name: 'index'
  })
}

const props = defineProps({
  name: String
})

const emit = defineEmits(['showMoney'])

const showit = () => {
  emit('showMoney', '2222222222222222')
}

onMounted(() => {
  console.log('props ==========>', props)
  console.log('meta =========>', import.meta)
})
</script>

<style scoped lang="scss"></style>
