<template>
   <div class="flex mt-57px h-178px">
      <div class="w-980px h-178px">
         <Swiper :modules="[A11y, Autoplay]" :autoplay="{ delay: 3000 }" :loop="true"
            class="mySwiper h-178px" :space-between="10" :slides-per-view="5">
            <SwiperSlide
               class="slide p-20px w-176px h-178px mr-20px  border-1 border-solid border-[#EEEEEE]"
               v-for="box in taskList" :key="box.id">
               <p class="text-[16px] text-[#333]">{{ box.algo }}</p>
               <p class="mt-20px text-[12px] text-[#333]">{{ box.label }}</p>
               <p class="mt-30px text-[12px] text-[#999] leading-17px">{{ useFormatTime(box.endAt)
               }}</p>
               <p class="mt-17px text-[#666] leading-20px">
                  <img class="w-22px h-22px org-img mr-8px" :src="box.imageUrl" alt="">
                  <span class="ellipse w-110px org-name text-14px text-color-[#666] leading-20px">{{
                        box.nodeName
                  }}</span>
               </p>
            </SwiperSlide>
         </Swiper>
      </div>
      <div
         class="w-176px h-178px cursor-pointer border-1 border-solid border-[#EEEEEE] flex flex-col justify-center items-center">
         <p class="text-[#252525] font-bold">{{ t('home.viewAllComputingTask') }}</p>
         <img class="mt-6px" :src="arrow" />
      </div>
   </div>
</template>

<script setup lang='ts'>
import arrow from '@assets/images/home/slide-arrow.png'
import { useObserver } from '@/hooks'
import { Swiper, SwiperSlide, } from 'swiper/vue';
import { A11y, Autoplay } from 'swiper';
import 'swiper/css'
import { getLatestTaskList } from '@/api/home'
import { useFormatTime } from '@/hooks'

const { t } = useI18n()


interface Task {
   id: number,
   label: string,
   endAt: string,
   orgName: string

}
let taskList: any = ref([])
let count = ref(6)
const getGlobalTask = () => {
   getLatestTaskList({
      size: 10,
      current: 1,
      taskStatus: 'ALL'
   }).then((res: any) => {
      const { code, data } = res
      if (code === 10000) {
         const arr = JSON.parse(JSON.stringify(data));
         arr.forEach((item: any) => {
            const nameArr = item.taskName.split('_')
            item.algo = nameArr[2]
            item.label = nameArr[3]

         })
         taskList.value = arr
      }
   })
}

// watchEffect(() => {
//    setTimeout(() => {
//       getGlobalTask()
//    }, 1000)
// })

onMounted(() => {
   getGlobalTask()
})

</script>

<style scoped lang='scss'>
.org-img,
.org-name {
   vertical-align: middle;
   display: inline-block
}

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