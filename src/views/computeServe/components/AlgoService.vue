<template>
    <div v-if="list.length" :class="{ 'gridGroup': type === 1 }">
        <div class="w-full mb-50px" v-for="(item, i) in list" :key="i">
            <p class="text-20px text-color-[#333333] mb-20px font-600">{{ item.name }}</p>
            <div v-if="type === 0" class="flex flex-wrap">
                <div class="flex flex-wrap mb-30px mr-50px" v-for="(v, index) in item.childrenList" :key="index">
                    <AlgoCard @task="(branchInfo) => taskEmitter({ branch3: branchInfo, branch2: item })" :obj="v" />
                </div>
            </div>
            <div v-else>
                <div class="flex flex-wrap mb-30px mr-50px" :key="i">
                    <AlgoCard @task="(branchInfo) => taskEmitter({ branch3: branchInfo, branch2: { id: 'noPrivacy' } })"
                        :obj="item" />
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <el-empty :description="t('common.noData')" />
    </div>
</template>

<script setup lang='ts'>
import AlgoCard from './AlgoCard.vue'
import xgBoost from '@/assets/images/computeServe/XGBoost.png'
const { t } = useI18n()
const props = defineProps({
    list: {
        type: Object,
        default: () => { }
    },
    type: {
        type: Number,
        default: 0
    }
})

const taskEmitter = (obj: any) => {
    emits('createTask', obj)
}

const emits = defineEmits(['createTask'])
</script>

<style scoped lang='scss'>
.gridGroup {
    display: grid;
    grid-template-columns: 50% 50%;
}
</style>