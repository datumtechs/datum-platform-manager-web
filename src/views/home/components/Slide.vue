<template>
   <div class="flex mt-57px h-178px">
      <div class="w-980px overflow-hidden">
         <ul class="whitespace-nowrap w-1176px h-178px">
            <transition-group name="slide">
               <!-- 1176px -->
               <li
                  class="p-20px w-176px h-178px mr-20px cursor-pointer float-left cursor-pointer border-1 border-solid border-[#EEEEEE]"
                  v-for="box in taskList"
                  :key="box.id"
               >
                  <p class="text-[16px] text-[#333]">{{ box.label }}</p>
                  <p class="text-[16px] text-[#333]">{{ $t('common.success') }} !</p>
                  <p class="mt-40px text-[12px] text-[#999] leading-17px">35秒前</p>
                  <p class="mt-17px text-[#666] leading-20px">{{ box.orgName }}</p>
               </li>
            </transition-group>
         </ul>
      </div>
      <!-- <div class="w-176px h-178px bg-[#ff0000] mr-20px" v-for="box in taskList" :key="box.id"></div> -->
      <div
         class="w-176px h-178px cursor-pointer border-1 border-solid border-[#EEEEEE] flex flex-col justify-center items-center"
      >
         <p class="text-[#252525] font-bold">{{ $t('home.viewAllComputingTask') }}</p>
         <img class="mt-6px" :src="arrow" />
      </div>
   </div>
</template>

<script setup lang='ts'>
import arrow from '@assets/images/home/slide-arrow.png'
interface Task {
   id: number,
   label: string,
   endAt: string,
   orgName: string

}
let taskList: Array<Task> = reactive([
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
   },
   {
      id: 6,
      label: '逻辑回归模型训练',
      endAt: '',
      orgName: '中国银行'
   }

])
let count = ref(6)
const mockAdd = () => {
   setTimeout(() => {
      taskList.unshift({
         id: count.value++,
         label: 'Ti12夺冠',
         endAt: '',
         orgName: '中华小当家'
      })

      taskList.pop()
      mockAdd()
   }, 3000);

}
onMounted(() => {
   mockAdd()
})

</script>

<style scoped lang='scss'>
.slide-enter-active,
.slide-leave-active {
   animation: slide-in ease 0.8s;
}

@keyframes slide-in {
   0% {
      width: 0px;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      opacity: 0;
   }
   50% {
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      opacity: 0;
   }
   99% {
      width: 178px;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
      opacity: 1;
   }
   100% {
      width: 178px;
   }
}
</style>