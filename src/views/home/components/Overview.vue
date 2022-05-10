<template>
    <div class="mt-60px">
        <Title :text="t('home.dataOverview')">
            <template #pic>
                <img src="@assets/images/home/overview.png" />
            </template>
        </Title>
        <div class="mt-16px h-435px border-1 border-solid border-[#EEEEEE] flex">
            <div class="w-500px py-66px px-60px grid grid-cols-2 grid-rows-3 gap-x-20px gap-y-50px">
                <div v-for="(item, key) in viewList" :key="item.id">
                    <div class="leading-17px text-[14px] text-shallow">{{ item.label }}
                    </div>
                    <div class="leading-29px text-[24px] text-deep mt-18px font-bold">
                        <CountUp v-if="item.title === 'dataSize'" class="w-150px ellipse" :options="{
                            decimalPlaces: 2, useGrouping: true
                        }" :end-val="useSizeWithUnit(item.value).value">
                            <template #suffix>
                                <span>{{
                                        useSizeWithUnit(item.value).unit
                                }}</span>
                            </template>
                        </CountUp>

                        <CountUp v-else class="w-150px ellipse" :options="{ useGrouping: true }"
                            :end-val="item.value" />
                    </div>
                </div>
            </div>
            <DataCharts />
        </div>
    </div>
</template>

<script setup lang='ts'>
import Title from './Title.vue'
import DataCharts from './DataCharts.vue'
import { useSizeWithUnit } from '@/hooks'
import CountUp from 'vue-countup-v3'

const props = defineProps({
    globalStats: {
        type: Object,
        default: () => { }
    }
})

const { t } = useI18n()
const viewList = computed(() => [
    {
        id: 1,
        title: 'taskCount',
        label: t('home.privacyComputations'),
        value: 0
    }, {
        id: 2, title: 'addressCountOfTask',
        label: t('home.participatingAddresses'),
        value: 0
    }, {
        id: 3,
        title: 'addressCountOfActive',
        label: t('home.activeAddresses'),
        value: 0
    }, {
        id: 7,
        title: 'dataSize',
        label: t('home.dataAmount'),
        value: 0
    }, {
        id: 8,
        title: 'dataTokenCount',
        label: t('home.dataCredentials'),
        value: 0
    }, {
        id: 9,
        title: 'dataTokenUsed',
        label: t('home.dataCredUse'),
        value: 0
    }
])

watchEffect(() => {
    viewList.value.forEach(item => {
        item.value = props.globalStats[item.title]
    })
})


</script>

<style scoped lang='scss'>
</style>