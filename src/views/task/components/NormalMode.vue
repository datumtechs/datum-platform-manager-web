<template>
  <div class="normal-wrap p-26px">
    <div class="flex item-center px-9px py-5px bg-color-[#F7F8F9] h-80px">
      <div
        @click="activeIndex = index"
        class="flex-1 flex-col flex pl-31px leading-24px justify-center font-800"
        v-for="(item, index) in list"
        :key="item.setp"
        :class="{ active: activeIndex == index }"
      >
        <div class="setp-item-name text-22px font-medium font-800 text-color-[#CCCCCC]">
          {{ $t('task.step') }}
          <span class="ml-10px font-800">{{ item.setp }}</span>
          <span class="cover inline-block w-11px h-11px top-6px -left--6px bg-color-[#F7F8F9]"></span>
        </div>
        <p
          class="setp-item-info font-medium text-color-[#666666] text-16px font-500 mt-5px"
        >{{ $t(`${item.info}`) }}</p>
      </div>
    </div>
    <div v-if="activeIndex == 0" class="mt-38px mb-42px ml-6px">
      <slot name="mode"></slot>
      <StepOne
        :taskParams="taskParams"
        @next="activeIndex = 1"
        @getParams="(params) => (taskParams.one = params)"
      />
    </div>
    <StepTwo
      v-if="activeIndex == 1"
      :taskParams="taskParams"
      @previous="activeIndex = 0"
      @next="activeIndex = 2"
      @getParams="(params) => (taskParams.two = params)"
    />
    <StepThree
      v-if="activeIndex == 2"
      :taskParams="taskParams"
      @previous="activeIndex = 1"
      @next="activeIndex = 3"
      @getParams="(params) => (taskParams.three = params)"
    />
    <Stepfour
      v-if="activeIndex == 3"
      :taskParams="taskParams"
      @previous="activeIndex = 2"
      @next="activeIndex = 4"
      @getParams="(params) => (taskParams.four = params)"
    />
    <StepFive
      v-if="activeIndex == 4"
      :taskParams="taskParams"
      @previous="activeIndex = 3"
      @next="submit"
      @getParams="(params) => (taskParams.four = params)"
    />
  </div>
</template>
<script lang="ts" setup>
import StepOne from './normal/StepOne.vue';
import StepTwo from './normal/StepTwo.vue';
import StepThree from './normal/StepThree.vue';
import Stepfour from './normal/Stepfour.vue';
import StepFive from './normal/StepFive.vue';
const activeIndex = ref(4)
const list = [
  {
    setp: '01',
    info: 'task.stepOneInfo'
  },
  {
    setp: '02',
    info: 'task.stepTwoInfo'
  },
  {
    setp: '03',
    info: 'task.stepThreeInfo'
  },
  {
    setp: '04',
    info: 'task.stepFourInfo'
  },
  {
    setp: '05',
    info: 'task.stepFiveInfo'
  },

]
const taskParams = ref({
  one: {},
  two: {},
  three: {},
  four: {},
  five: {}
})

const previous = () => {
  activeIndex.value = 0
}
const submit = () => {

}
</script>
<style lang="scss" scoped>
.normal-wrap {
  .cover {
    transform: rotate(45deg);
  }
  .active {
    background: #2b60e9;
    border-radius: 8px;
    .setp-item-name,
    .setp-item-info {
      color: #ffffff !important;
    }
    .cover {
      background: #2b60e9;
      border-left: 1px solid #fff;
    }
  }
}
</style>