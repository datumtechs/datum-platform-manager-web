<template>
    <div class="p-30px leading-20px h-full overflow-auto">
        <div>
            <p class="font-bold text-color-[#333] text-14px">{{  props.overviewObj.algorithmName  }}
            </p>
            <p class="mt-10px text-color-[#999]">{{  props.overviewObj.algorithmDesc  }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{  t('expert.author')  }}</p>
            <p class="mt-10px text-color-[#999]">{{  props.overviewObj.author  }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{  t('expert.supportNum')  }}</p>
            <p class="mt-10px text-color-[#999]">{{  props.overviewObj.supportNum  }}</p>
        </div>
        <div class="mt-40px">
            <p class="font-bold text-color-[#333] text-14px">{{  t('expert.supportLang')  }}</p>
            <p class="mt-10px text-color-[#999]">{{  props.overviewObj.supportLanguage  }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
const { t } = useI18n()

const props = defineProps({
    overviewObj: {
        type: Object,
        default: () => { }
    }
})

</script>

<style scoped lang='scss'>
</style>