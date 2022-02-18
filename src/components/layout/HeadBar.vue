<template>
  <div class="header-wrapper">
    <div class="header-logo">juzix</div>
    <!-- <div class="header-search-box"></div> -->
    <div class="header-menu-box">
      <el-button @click="goFurther">{{ t('header.go') }} to Index</el-button>
    </div>
    <div class="header-option-box">
      <el-space :size="11" :wrap="false">
        <div class="header-option-"><img />用户头像</div>
        <div class="header-option-name">
          <p>用户名称{{}}</p>
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

<style scoped lang="scss">
.header-wrapper {
  height: 70px;
  background: #ffffff;
  opacity: 0.79;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 45px;
  border-bottom: 2px solid #e2e2e2;
  .header-option-box {
    display: flex;
  }
}
</style>
