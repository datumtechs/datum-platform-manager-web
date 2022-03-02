<template>
   <div class="flex mt-57px h-178px">
      <div class="w-176px h-178px bg-[#ff0000] mr-20px" v-for="box in taskList" :key="box.id"></div>
      <div class="w-176px h-178px cursor-pointer border-1 border-solid border-[#EEEEEE] flex flex-col justify-center items-center">
         <p class="text-[#252525] font-bold">{{$t('home.viewAllComputingTask')}}</p>
         <img class="mt-6px" :src="arrow" />
      </div>
   </div>
</template>

<script setup lang='ts'>
import arrow from '@assets/images/home/slide-arrow.png'
const taskList = ref([
   {
      id: 1,
      label: '逻辑回归模型训练',
      endAt: '',
      orgName: '中国银行'
   },
   {
      id: 2,
      label: '逻辑回归模型训练',
      endAt: '',
      orgName: '中国银行'
   },
   {
      id: 3,
      label: '逻辑回归模型训练',
      endAt: '',
      orgName: '中国银行'
   },
   {
      id: 4,
      label: '逻辑回归模型训练',
      endAt: '',
      orgName: '中国银行'
   },
   {
      id: 5,
      label: '逻辑回归模型训练',
      endAt: '',
      orgName: '中国银行'
   }
])
</script>

<style scoped lang='scss'>
</style>