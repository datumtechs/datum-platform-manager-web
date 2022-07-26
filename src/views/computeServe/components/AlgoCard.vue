<template>
    <div
        class="w-317px box-flex-w h-265px overflow-hidden rounded-8px border-1px border-solid border-color-[#eeeeee]">
        <img class="w-full h-135px border-top" :src="obj.imageUrl || xgBoost" />
        <p class="text-16px text-color-[#333333] font-600 px-20px pt-20px pb-24px">
            {{
                    obj.name
            }}</p>
        <div class="com-button w-120px h-40px mx-20px rounded-20px cursor-pointer"
            @click="emits('task', obj)">{{ $t('menu.createTask') }}</div>
    </div>
</template>

<script setup lang='ts'>
import xgBoost from '@/assets/images/computeServe/XGBoost.png'
const emits = defineEmits(['task'])

const props = defineProps({
    obj: {
        type: Object,
        default: () => { }
    }
})
</script>