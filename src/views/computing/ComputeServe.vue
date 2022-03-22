<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :bg-name="'rocket'">
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="com-main-data-wrap mt-65px">
      <div class="w-full">
        <h5
          class="text-20px text-color-[#333333] mb-20px font-600"
        >{{ $t('computing.privacyStatistics') }}</h5>
        <div class="flex flex-wrap">
          <div
            class="w-317px box-flex-w h-265px overflow-hidden rounded-8px border-1px border-solid border-color-[#eeeeee]"
          >
            <img class="w-full h-135px border-top" src />
            <p class="text-16px text-color-[#000000] font-600 px-20px pt-20px pb-24px">XXXXXX</p>
            <div class="com-button w-120px h-40px mx-20px rounded-20px">{{ $t('menu.createTask') }}</div>
          </div>
        </div>
      </div>
      <div class="w-full mt-50px">
        <h5
          class="text-20px text-color-[#333333] mb-20px font-600"
        >{{ $t('computing.privacyAIComputing') }}</h5>
        <div class="flex flex-wrap">
          <div
            class="w-317px box-flex-w h-265px overflow-hidden rounded-8px border-1px border-solid border-color-[#eeeeee]"
          >
            <img class="w-full h-135px border-top" src />
            <p class="text-16px text-color-[#000000] font-600 px-20px pt-20px pb-24px">XXXXXX</p>
            <div class="flex w-full px-20px">
              <div class="com-button w-120px h-40px rounded-20px">{{ $t('menu.createTask') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
const router: Router = useRouter()
const activekey = ref(0)
const list = ref([
  {
    name: 'computing.privacyComputing'
  },
  {
    name: 'computing.nonPrivacyComputing'
  }
])


const tabsChange = (index: string) => {
  activekey.value = +index
}

</script>
<style lang="scss" scoped>
.box-flex-w {
  flex: 0 0 317px;
}
.border-top {
  border-radius: 8px 8px 0 0;
}
</style>