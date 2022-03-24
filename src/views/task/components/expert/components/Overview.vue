<template>
    <div class="p-30px leading-20px">
        <div>
            <p class="font-bold text-color-[#333] text-14px">{{ obj.algorithmName }}</p>
            <p class="mt-10px text-color-[#999]">{{ obj.algorithmDesc }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{ $t('expert.author') }}</p>
            <p class="mt-10px text-color-[#999]">{{ obj.author }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{ $t('expert.supportNum') }}</p>
            <p class="mt-10px text-color-[#999]">{{ obj.supportNum }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{ $t('expert.supportLang') }}</p>
            <p class="mt-10px text-color-[#999]">{{ obj.supportLang }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
const obj = reactive({
    algorithmDesc: '用于跨组织的纵向联合分类模型训练',
    algorithmName: 'PSI',
    author: 'Rosetta',
    supportNum: '>=2',
    supportLang: 'Python'
})
</script>

<style scoped lang='scss'>
</style>