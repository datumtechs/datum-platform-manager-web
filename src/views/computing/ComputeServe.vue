<template>
  <div class="task-wrap com-main">
    <Banner :bg-name="'computeServe'">
      <template #select>
        <ComTabs :list="titleList" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="main-content com-main-data-wrap mt-55px">
      <div
        v-show="activekey == 0 ? list.privacy?.length : list.noPrivacy?.length"
        class="w-full mb-50px"
        v-for="(item, i) in (activekey == 0 ? list.privacy : list.noPrivacy)"
        :key="i"
      >
        <h5 class="text-20px text-color-[#333333] mb-20px font-600">{{ item.name }}</h5>
        <!--  >{{ $t('computing.privacyStatistics') }}</h5>-->
        <div class="flex flex-wrap">
          <div
            class="flex flex-wrap mb-30px mr-50px"
            v-for="(v, index) in item.childrenList"
            :key="index"
          >
            <div
              class="w-317px box-flex-w h-265px overflow-hidden rounded-8px border-1px border-solid border-color-[#eeeeee]"
            >
              <img class="w-full h-135px border-top" :src="v.imageUrl || xgBoost" />
              <p
                class="text-16px text-color-[#000000] font-600 px-20px pt-20px pb-24px"
              >{{ v.name }}</p>
              <div
                class="com-button w-120px h-40px mx-20px rounded-20px cursor-pointer"
                @click="createTask(v)"
              >{{ $t('menu.createTask') }}</div>
            </div>
          </div>
        </div>
      </div>
      <el-empty
        :description="$t('common.noData')"
        v-show="activekey == 0 ? !list.privacy?.length : !list.noPrivacy?.length"
      />
      <!--
      <div class="w-full mt-50px">
        <h5
          class="text-20px text-color-[#333333] mb-20px font-600"
        >{{ $t('computing.privacyAIComputing') }}</h5>
        <div class="flex flex-wrap">
          <div
            class="w-317px box-flex-w h-265px overflow-hidden rounded-8px border-1px border-solid border-color-[#eeeeee]"
          >
            <img class="w-full h-135px border-top" />
            <p class="text-16px text-color-[#000000] font-600 px-20px pt-20px pb-24px">XXXXXX</p>
            <div class="flex w-full px-20px">
              <div class="com-button w-120px h-40px rounded-20px">{{ $t('menu.createTask') }}</div>
            </div>
          </div>
        </div>
      </div>
      -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
import { getAlgTree } from '@/api/computing'
import xgBoost from '@/assets/Images/computeServe/XGBoost.png'
const router: Router = useRouter()
const activekey = ref(0)
const titleList = ref([
  {
    name: 'computing.privacyComputing'
  },
  {
    name: 'computing.nonPrivacyComputing'
  }
])
const list: any = ref({ privacy: [], noPrivacy: [] })



const tabsChange = (index: string) => {
  activekey.value = +index
}

const query = () => {
  getAlgTree().then(res => {
    const { data, code } = res
    if (code === 10000) {
      list.value.privacy = data?.childrenList[0]?.childrenList || []
      list.value.noPrivacy = data?.childrenList[1]?.childrenList || []
      console.log(list.value.privacy)
    }
  })
}
const createTask = (row: any) => {
  router.push({ name: "createTask", params: { ...row } })
}

onMounted(() => {
  query()
})





</script>
<style lang="scss" scoped>
.box-flex-w {
  flex: 0 0 317px;
}
.border-top {
  border-radius: 8px 8px 0 0;
}
</style>