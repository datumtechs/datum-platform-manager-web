<template>
  <section class="h-300px banner">
    <div class="h-300px max-w-1160px mx-auto px-37px flex justify-center flex-col">
      <div class="flex items-end">
        <img :src="mainLogo" />
        <span class="text-[24px] font-bold leading-33px pl-9px">{{ t('home.explorer') }}</span>
      </div>
      <el-input v-model="searchText" :placeholder="$t('home.explorerHint')" :prefix-icon="Search"
        class="w-668px mt-35px search-input" type="text">
        <template #suffix>
          <div @click="handleQuery()"
            class="w-110px bg-bg-main text-[#fff] leading-50px font-medium rounded-25px cursor-pointer text-[16px] -mr-11px">
            {{ t('common.search') }}</div>
        </template>
      </el-input>
    </div>
  </section>
</template>

<script setup lang='ts'>
import mainLogo from '@assets/images/home/mainLogo.png'
import { Search } from '@element-plus/icons-vue'
import { queryNavigation } from '@/api/home'

const { t } = useI18n()
const searchText = ref('')

const handleQuery = () => {

  if (!searchText.value) return
  // 搜索关键字. 任务id跳任务详情（精确匹配）、 组织id跳组织详情（精确匹配）
  queryNavigation({
    keyword: searchText.value
  }).then((res: any) => {
    const { code, data } = res
    if (code === 10000) {
      
    }
  })
}

</script>


<style scoped lang='scss'>
.banner {
  background: url("@/assets/images/home/banner.png") no-repeat;
  background-size: 100% 100%;

  .search-input {
    :deep(.el-input__inner) {
      height: 50px;
      line-height: 50px;
      border-radius: 25px;
      padding-left: 60px;
    }

    :deep(.el-icon) {
      font-size: 24px;
      margin-left: 15px;
      color: #333;
    }

    ::after {
      width: 110px;
      height: 50px;
    }
  }
}
</style>