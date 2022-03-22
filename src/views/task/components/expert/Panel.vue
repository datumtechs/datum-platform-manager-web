<template>
    <div class="w-360px bg-[#F7F8F9]">
        <div>
            <div v-for="tab in tabList" :key="tab.id"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
const tabList = reactive([
    {
        id: 1,
        label: ''
    },
    {
        id: 2,
        label: ''
    },
    {
        id: 3,
        label: ''
    },
    {
        id: 4,
        label: ''
    },
    {
        id: 5,
        label: ''
    }
])
</script>

<style scoped lang='scss'>
</style>