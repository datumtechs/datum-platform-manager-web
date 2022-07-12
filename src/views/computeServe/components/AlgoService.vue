<template>
    <div v-if="list.length">
        <div class="w-full mb-50px" v-for="(item, i) in list" :key="i">
            <p class="text-20px text-color-[#333333] mb-20px font-600">{{ item.name }}</p>
            <div class="flex flex-wrap">
                <div class="flex flex-wrap mb-30px mr-50px" v-for="(v, index) in item.childrenList"
                    :key="index">
                    <div
                        class="w-317px box-flex-w h-265px overflow-hidden rounded-8px border-1px border-solid border-color-[#eeeeee]">
                        <img class="w-full h-135px border-top" :src="v.imageUrl || xgBoost" />
                        <p class="text-16px text-color-[#333333] font-600 px-20px pt-20px pb-24px">
                            {{
                                    v.name
                            }}</p>
                        <div class="com-button w-120px h-40px mx-20px rounded-20px cursor-pointer"
                            @click="emit('createTask', v, item)">{{ t('menu.createTask') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <el-empty :description="t('common.noData')" />
    </div>
</template>

<script setup lang='ts'>
import xgBoost from '@/assets/images/computeServe/XGBoost.png'
const { t } = useI18n()
const props = defineProps({
    list: {
        type: Array<any>,
        default: () => { }
    },
})

const emit = defineEmits(['createTask'])
</script>

<style scoped lang='scss'>
</style>