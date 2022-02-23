<template>
    <div class="mt-60px">
        <Title :text="$t('home.dataOverview')">
            <template #pic>
                <img src="@assets/images/home/overview.png" />
            </template>
        </Title>
        <div class="mt-16px h-435px border-1 border-solid border-[#EEEEEE] flex">
            <div class="w-500px py-66px px-60px grid grid-cols-3 grid-rows-3 gap-x-20px gap-y-50px">
                <div v-for="item in viewList" :key="item.id">
                    <p class="leading-17px text-[14px] text-shallow">{{ item.label }}</p>
                    <p class="leading-29px text-[24px] text-deep mt-18px font-bold">{{ item.value }}</p>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Title from './Title.vue'
const { t } = useI18n()
const viewList = computed(() => {
    return [
        {
            id: 1,
            label: t('home.privacyComputations'),
            value: 222
        },
        {
            id: 2,
            label: t('home.participatingAddresses'),
            value: 3333
        },
        {
            id: 3,
            label: t('home.activeAddresses'),
            value: 4444
        },
        {
            id: 4,
            label: t('home.aIModels'),
            value: 5555
        },
        {
            id: 5,
            label: t('home.modelCredentials'),
            value: 2223
        },
        {
            id: 6,
            label: t('home.modelCredUse'),
            value: 44123
        },
        {
            id: 7,
            label: t('home.dataAmount'),
            value: 1231231
        },
        {
            id: 8,
            label: t('home.dataCredentials'),
            value: 45555
        },
        {
            id: 9,
            label: t('home.dataCredUse'),
            value: 6666
        }
    ]
})
</script>

<style scoped lang='scss'>
.aaa {
    color: var(--vt-c-text-dark-2);
}
</style>