<template>
   <transition name="slide-fade">
      <div v-if="showSlide" class="flex mt-57px h-178px">
         <div class="w-980px h-178px">
            <el-skeleton style="width: 980px" :count="1" :rows="5" class="flex"
               :loading="skeletonLoading" animated>
               <template #template>
                  <div v-for="item in 5" class="w-176px h-178px mr-20px mt-10px">
                     <el-skeleton :rows="4" animated :loading="skeletonLoading" />
                  </div>
               </template>
               <template #default>
                  <Swiper :modules="[Controller, Autoplay]" @swiper="setControlledSwiper"
                     :autoplay="{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }"
                     :loop="isSwiperLoop" class="mySwiper h-178px" :space-between="20"
                     :slides-per-view="5">
                     <SwiperSlide
                        class="slide cursor-pointer px-20px py-16px w-176px h-178px mr-20px border-1 border-solid border-[#EEEEEE]"
                        @click="linkToTaskDetail(box)" v-for="box in taskList" :key="box.id">
                        <span v-if="box.type === '1'" class="slide-expert-label">
                           {{ t('task.expertMode') }}
                        </span>
                        <span v-else class="slide-wizard-label">
                           {{ t('task.wizardMode') }}
                        </span>
                        <el-tooltip effect="light" :content="box.algo" placement="top-start">
                           <p
                              class="text-[16px] text-[#333] mt-38px leading-22px font-medium ellipse">
                              {{ box.algo }} </p>
                        </el-tooltip>
                        <el-tooltip effect="light" :content="box.label" placement="bottom-start">
                           <p class="mt-6px text-[14px] text-[#333] leading-20px ellipse">{{
                                 box.label
                           }}</p>
                        </el-tooltip>
                        <p class="mt-32px text-[#666] leading-20px flex items-center">
                           <img class="w-24px h-24px org-img mr-8px" :src="box.imageUrl" alt="">
                           <el-tooltip effect="light" :content="box.nodeName"
                              placement="bottom-start">
                              <span @click.stop="linkToNode(box)"
                                 class="ellipse w-110px org-name text-[14px] text-color-[#666] leading-20px">{{
                                       box.nodeName
                                 }}</span>
                           </el-tooltip>
                        </p>
                     </SwiperSlide>
                  </Swiper>
               </template>
            </el-skeleton>
         </div>
         <div @click="linkToComputeTask"
            class="w-156px text-center ml-20px h-178px cursor-pointer border-1 border-solid border-[#EEEEEE] flex flex-col justify-center items-center">
            <p class="w-120px text-[#252525] font-bold">{{ t('home.viewAllComputingTask') }}</p>
            <img class="w-24px h-24px mt-12px" :src="arrow" />
         </div>
      </div>
   </transition>
</template>

<script setup lang='ts'>
import arrow from '@assets/images/home/slide-arrow.png'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Controller, Autoplay } from 'swiper';
import 'swiper/css'
import { getLatestTaskList } from '@/api/home'

interface LatestTask {
   id: number | string,
   endAt: string,
   imageUrl: string,
   createAt: number,
   startAt: number,
   taskName: string,
   nodeName: string,
   identityId: string,
   type?: string,
   label?: string,
   algo?: string,
}

const showSlide = ref(true)
const { t } = useI18n()
const router = useRouter()
const skeletonLoading = ref(true)

const isSwiperLoop = computed(() => taskList.value.length > 5)

const taskList = ref<LatestTask[]>([])
const controlledSwiper: any = ref(null);
const setControlledSwiper = (swiper: any) => {
   controlledSwiper.value = swiper;
};

const linkToTaskDetail = (row: any) => {
   router.push({
      name: 'computeTaskDetails', query: {
         taskId: row.id
      }
   })
}

const linkToComputeTask = () => {
   router.push({
      name: 'computeTask'
   })
}

const linkToNode = (row: any) => {
   console.log('toNode');

   router.push({
      name: 'nodeDetailIndex', params: {
         identityId: row.identityId
      }
   })
}


const _findLabel = (str: string, char: string, n: number) => {
   let x = str.indexOf(char);
   if (n === 1) {
      x = str.indexOf(char);
   } else {
      for (let i = 1; i < n; i++) {
         x = str.indexOf(char, x + 1);
      }
   }
   return str.slice(x + 1, str.length)
}

const getGlobalTask = () => {
   getLatestTaskList({
      size: 10,
      current: 1,
      taskStatus: 'ALL'
   }).then((res: any) => {
      const { code, data } = res
      if (code === 10000) {
         skeletonLoading.value = false
         if (data.length < 5) showSlide.value = false
         const arr = JSON.parse(JSON.stringify(data));
         arr.forEach((item: LatestTask) => {
            const nameArr = item.taskName.split('_')
            item.algo = nameArr[2]
            item.type = nameArr[3]
            item.label = _findLabel(item.taskName, '_', 4)
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

.slide-fade-leave-active,
.slide-fade-enter-active {
   transition: all 0.5s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
   height: 0px;
   opacity: 0;
}

.slide-fade-leave-from,
.slide-fade-enter-to {
   height: 178px;
   opacity: 0;
}
</style>