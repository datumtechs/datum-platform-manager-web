<template>
    <div class="w-242px bg-[#F7F8F9]">
        <p class="text-18px font-black mt-16px pl-24px">{{ $t('common.algorithm') }}</p>
        <div v-for="algo in algoList" class="flex flex-col items-center mt-24px">
            <p
                class="h-36px w-230px text-14px leading-20px text-[#000] font-bold pl-18px flex items-center"
            >{{ algo.label }}</p>
            <ul class="mt-4px">
                <li
                    class="h-36px w-230px drag-box cursor-pointer flex items-center pl-18px"
                    @dragstart="dragstart($event, item)"
                    @dragend="dragend($event, item)"
                    :draggable="true"
                    v-for="item in algo.children"
                    :key="item.id"
                >{{ item.label }}</li>
            </ul>
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
.drag-box {
    &:hover {
        background: #e6ecf8;
    }
}
</style>
