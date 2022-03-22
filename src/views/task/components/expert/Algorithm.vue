<template>
    <div class="w-242px bg-[#F7F8F9] px-25px py-15px">
        <p class="text-18px font-black">{{ $t('common.algorithm') }}</p>
        <div class="mt-40px">
            <div v-for="algo in algoList">
                <p
                    class="text-14px leading-20px text-[#000] font-bold mt-40px"
                >{{ $t('computing.privacyAIComputing') }}</p>
                <ul class="mt-20px">
                    <li
                        class="mb-10px"
                        @dragstart="dragstart($event, item)"
                        @dragend="dragend($event, item)"
                        v-for="item in algo.children"
                        :key="item.id"
                    >{{ item.label }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
const dragstart = (e: any, item: any) => {

}
const dragend = (e: any, item: any) => {

}
const { t } = useI18n()
const algoList = reactive({
    statisticList: {
        label: t('computing.privacyStatistics'),
        children: [
            {
                id: 1,
                label: '隐私加权求和'
            },
            {
                id: 2,
                label: '隐私求交集(PSI)'
            },
        ]
    },
    AIList: {
        label: t('computing.privacyAIComputing'),
        children: [
            {
                id: 1,
                label: '线性回归训练'
            },
            {
                id: 2,
                label: '线性回归预测'
            },
        ]
    }
}

)
</script>

<style scoped lang='scss'>
</style>