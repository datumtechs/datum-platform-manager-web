<template>
    <div class="flex items-center px-10px mb-30px">
        <img class="w-15px h-15px" :src="type === 'committee' ? committee : trusted" alt="" />
        <p class="ml-10px  font-medium text-[#333]">
            {{ content }}
        </p>
    </div>
</template>

<script setup lang='ts'>
import committee from '@/assets/images/center/committee.png'
import trusted from '@/assets/images/center/trusted.png'
const props = defineProps({
    content: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'trusted'
    }
})
</script>

<style scoped lang='scss'>
</style>