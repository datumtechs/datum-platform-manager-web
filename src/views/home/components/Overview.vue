<template>
    <div class="mt-60px">
        <Title :text="$t('home.dataOverview')">
            <template #pic>
                <img src="@assets/images/home/overview.png" />
            </template>
        </Title>
        <div class="mt-16px h-435px border-1 border-solid border-[#EEEEEE]">
            <div class="w-500px"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Title from './Title.vue'
</script>

<style scoped lang='scss'>
</style>