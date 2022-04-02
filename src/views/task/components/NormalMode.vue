<template>
  <div class="normal-wrap pt-40px pb-40px">
    <div class="flex item-center justify-between px-9px py-5px bg-color-[#F7F8F9] h-80px">
      <div
        @click="activeIndex = index"
        class="w-max-220px flex-col flex pl-31px leading-24px justify-center font-800"
        v-for="(item, index) in list"
        :key="item.setp"
        :style="{
          flex: list.length <= 1 ? 'flex-230px' : 'flex-1'
        }"
        :class="{ active: activeIndex == index }"
      >
        <div class="setp-item-name text-22px font-medium font-800 text-color-[#CCCCCC]">
          {{ $t('task.step') }}
          <span class="ml-10px font-800">{{ item.setp }}</span>
          <span
            class="cover inline-block w-11px h-11px relative top-6px -left--6px bg-color-[#F7F8F9]"
          ></span>
        </div>
        <p
          class="setp-item-info font-medium text-color-[#666666] text-16px font-500 mt-5px"
        >{{ $t(`${item.info}`) }}</p>
      </div>
    </div>
    <div v-show="activeIndex == 0" class="mt-38px mb-42px ml-6px">
      <slot name="mode"></slot>
      <StepOne
        :taskParams="taskParams"
        @next="activeIndex = 1, stepChange()"
        @getParams="(params) => {
          taskParams['StepOne'] = params
        }"
      />
    </div>

    <component
      :is="{
        'stepTwoInfo': StepTwo,
        'stepThreeInfo': StepThree,
        'stepFourInfo': Stepfour,
        'stepFiveInfo': StepFive
      }[list[activeIndex].components]"
      :taskParams="taskParams"
      @previous="previous"
      @next="next"
      @getParams="(params: any) => {
        taskParams[list[activeIndex].components] = params
      }"
    />
  </div>
</template>
<script lang="ts" setup>
import StepOne from './normal/StepOne.vue';
import StepTwo from './normal/StepTwo.vue';
import StepThree from './normal/StepThree.vue';
import Stepfour from './normal/Stepfour.vue';
import StepFive from './normal/StepFive.vue';
const activeIndex = ref(0)
const list = ref(
  [
    {
      setp: '01',
      info: 'task.stepOneInfo',
      components: "stepOneInfo"
    }
  ]
)
const stepChange = () => {
  const { procedure } = taskParams.value.StepOne
  if (procedure == 1) {

    list.value = ['stepOneInfo', 'stepTwoInfo', 'stepFourInfo', 'stepFiveInfo'].map((v, index) => ({
      setp: `0${index + 1}`,
      info: `task.${v}`,
      components: v
    }))

  } else if (procedure == 2) {
    list.value = ['stepOneInfo', 'stepThreeInfo', 'stepFourInfo', 'stepFiveInfo'].map((v, index) => ({
      setp: `0${index + 1}`,
      info: `task.${v}`,
      components: v
    }))
  } else {
    list.value = ['stepOneInfo', 'stepTwoInfo', 'stepThreeInfo', 'stepFourInfo', 'stepFiveInfo'].map((v, index) => ({
      setp: `0${index + 1}`,
      info: `task.${v}`,
      components: v
    }))
  }

}

const taskParams: any = ref({
  stepOneInfo: { procedure: null },
  stepTwoInfo: {},
  stepThreeInfo: {},
  stepFourInfo: {},
  stepFiveInfo: {}
})


const submit = () => {
  console.log('submit')
}

const next = () => {
  if (activeIndex.value >= list.value.length - 1) {
    submit()
  } else {
    activeIndex.value = activeIndex.value + 1
    console.log(activeIndex.value)
  }
}
const previous = () => {
  if (activeIndex.value > 0) {
    activeIndex.value = activeIndex.value - 1
  } else {
    activeIndex.value = 0
  }
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