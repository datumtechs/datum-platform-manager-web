<template>
    <div v-for="(item, i) in props.appList">
        <div class="application-box" :style='`background:url(${item.imgUrl})`'>
            <p class="mt-37px text-color-[#333] font-500 leading-31px text-[22px]">{{ item.name }}
            </p>
            <p class="mt-6px text-color-[#666] font-[14px] w-555px h-40px leading-16px">{{
                    item.content
            }}</p>
            <p class="cursor-pointer mt-19px">
                <span
                    class="inline-block font-medium align-middle text-color-[#2B60E9] text-[16px] leading-22px">
                    {{
                            $t('computing.learnNow')
                    }}</span>
                <img :src="arrow" alt="" class="arrow pl-7px align-middle">
            </p>
        </div>
    </div>
</template>

<script setup lang='ts'>


import arrow from '@/assets/images/computeServe/arrow.svg'
import type { PropType } from 'vue';

export interface objType {
    name: '',
    imgUrl: '',
    content: ''
}


const props = defineProps({
    appList: {
        type: Array as PropType<objType[]>,
        default: () => []
    }
})
</script>

<style scoped lang='scss'>
.application-box {
    width: 100%;
    height: 190px;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    padding-left: 50px;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #eee;

    .arrow {
        &:hover {
            transform: translateX(10px);
            transition: all 0.5s;
        }
    }
}
</style>