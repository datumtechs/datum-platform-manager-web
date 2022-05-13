<template>
   <div class="flex mt-57px h-178px">
      <div class="w-980px h-178px">
         <Swiper :modules="[A11y, Autoplay]"
            :autoplay="{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }"
            :loop="true" class="mySwiper h-178px" :space-between="20" :slides-per-view="5">
            <SwiperSlide
               class="slide cursor-pointer px-20px py-16px w-176px h-178px mr-20px border-1 border-solid border-[#EEEEEE]"
               v-for="box in taskList" :key="box.id">
               <span v-if="true" class="slide-expert-label">
                  {{ t('task.expertMode') }}
               </span>
               <span v-else class="slide-wizard-label">
                  {{ t('task.wizardMode') }}
               </span>
               <el-tooltip effect="light" :content="box.algo" placement="top-start">
                  <p class="text-[16px] text-[#333] mt-38px leading-22px font-medium ellipse">{{
                        box.algo
                  }} </p>
               </el-tooltip>
               <el-tooltip effect="light" :content="box.label" placement="bottom-start">
                  <p class="mt-6px text-[14px] text-[#333] leading-20px ellipse">{{ box.label }}</p>
               </el-tooltip>

               <p class="mt-32px text-[#666] leading-20px flex items-center">
                  <img class="w-24px h-24px org-img mr-8px" :src="box.imageUrl" alt="">
                  <el-tooltip effect="light" :content="box.nodeName" placement="top-start">
                     <span
                        class="ellipse w-110px org-name text-[14px] text-color-[#666] leading-20px">{{
                              box.nodeName
                        }}</span>
                  </el-tooltip>

               </p>
            </SwiperSlide>
         </Swiper>
      </div>
      <div @click="linkToComputeTask"
         class="w-156px ml-10px h-178px cursor-pointer border-1 border-solid border-[#EEEEEE] flex flex-col justify-center items-center">
         <p class="text-[#252525] font-bold">{{ t('home.viewAllComputingTask') }}</p>
         <img class="w-24px h-24px mt-12px" :src="arrow" />
      </div>
   </div>
</template>

<script setup lang='ts'>
import arrow from '@assets/images/home/slide-arrow.png'
import { useObserver } from '@/hooks'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Autoplay } from 'swiper';
import 'swiper/css'
import { getLatestTaskList } from '@/api/home'
import { useFormatTime } from '@/hooks'

const { t } = useI18n()
const router = useRouter()



interface Task {
   id: number,
   label: string,
   endAt: string,
   orgName: string
}

const linkToComputeTask = () => {
   router.push({
      name: 'computeTask'
   })
}


let taskList: any = ref([])


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

.slide {
   position: relative;

   .slide-expert-label,
   .slide-wizard-label {
      height: 22px;
      padding: 2px 13px 3px;
      color: #fff;
      font-size: 12px;
      border-radius: 8px 1px 8px 1px;
      position: absolute;
      left: -6px;
   }

   .slide-expert-label {
      background: #2676E9;
   }

   .slide-wizard-label {
      background: #774AFF;
   }
}


// .slide-enter-active,
// .slide-leave-active {
//    animation: slide-in ease 0.8s;
// }

// @keyframes slide-in {
//    0% {
//       width: 0px;
//       -webkit-transform: scaleX(0);
//       transform: scaleX(0);
//       opacity: 0;
//    }

//    50% {
//       -webkit-transform: scaleX(0);
//       transform: scaleX(0);
//       opacity: 0;
//    }

//    99% {
//       width: 178px;
//       -webkit-transform: scaleX(1);
//       transform: scaleX(1);
//       opacity: 1;
//    }

//    100% {
//       width: 178px;
//    }
// }
</style>