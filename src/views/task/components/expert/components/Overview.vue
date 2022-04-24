<template>
    <div class="p-30px leading-20px">
        <div>
            <p class="font-bold text-color-[#333] text-14px">{{ overview.algorithmName }}</p>
            <p class="mt-10px text-color-[#999]">{{ overview.algorithmDesc }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{ t('expert.author') }}</p>
            <p class="mt-10px text-color-[#999]">{{ overview.author }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{ t('expert.supportNum') }}</p>
            <p class="mt-10px text-color-[#999]">{{ overview.supportNum }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{ t('expert.supportLang') }}</p>
            <p class="mt-10px text-color-[#999]">{{ overview.supportLang }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useExpertMode } from '@/stores'
const { t } = useI18n()
const overview = reactive({
    algorithmDesc: '用于跨组织的纵向联合分类模型训练',
    algorithmName: 'PSI',
    author: 'Rosetta',
    supportNum: '>=2',
    supportLang: 'Python'
})

const isSelectNode = computed(() =>useExpertMode)

</script>

<style scoped lang='scss'>
</style>