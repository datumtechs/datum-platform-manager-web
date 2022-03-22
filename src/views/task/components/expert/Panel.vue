<template>
    <div class="w-360px bg-[#F7F8F9]">
        <div class="flex h-40px bg-[#fff]">
            <div
                class="flex flex-auto text-center text-[#333] font-medium text-14px items-center justify-center"
                :class="{ active: currentTab === tab.value }"
                @click="currentTab = tab.value"
                v-for="tab in tabList"
                :key="tab.id"
            >{{ tab.label }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
const { t } = useI18n()
const currentTab = ref('overview')
const tabList = reactive([
    {
        id: 1,
        value: "overview",
        label: t('expert.overview')
    },
    {
        id: 2,
        value: "input",
        label: t('expert.input')
    },
    {
        id: 3,
        value: "output",
        label: t('expert.output')
    },
    {
        id: 4,
        value: "code",
        label: t('expert.code')
    },
    {
        id: 5,
        value: "environment",
        label: t('expert.environment')
    }
])
</script>

<style scoped lang='scss'>
.active {
    background: #f7f8f9;
}
</style>