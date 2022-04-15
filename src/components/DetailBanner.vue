<template>
    <div class="banner-wrapper">
        <div class="inner-banner max-w-1200px m-auto h-167px flex justify-between relative py-42px">
            <div class="flex">
                <el-icon :size="40" v-if="backShow" class="cursor-pointer mr-20px"
                    @click="emit('back')">
                    <back />
                </el-icon>
                <div v-if="props.imgUrl" class="mr-14px h-36px">
                    <img class="w-40px h-40px rounded-1/2" :src="props.imgUrl" />
                </div>
                <div class="w-full font-bold text-48px text-color-[#393939] font-900 leading-58px">
                    <p class="leading-40px">
                        <slot name="primaryInfo"></slot>
                    </p>
                    <div
                        class="text-14px font-medium font-400 text-color-[#999999] leading-20px mt-14px">
                        <slot name="briefInfo"></slot>
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <slot name="machineInfo"></slot>
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
import top1bg from '@/assets/Images/home/top1bg.png'
const emit = defineEmits(['back'])
const props = defineProps({
    bgName: {
        type: String,
        default: 'arrow'
    },
    backShow: { type: Boolean, default: false },
    imgUrl: {
        type: String, default: ""
    }
})

</script>
<style lang="scss" scoped>
</style>