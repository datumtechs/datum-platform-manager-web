<template>
  <div class="task-wrap com-main">
    <Banner :bg-name="'computeServe'">
      <template #select>
        <ComTabs :list="titleList" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="main-content com-main-data-wrap mt-55px">
      <!-- <div v-if="!loading">
        {{ activekey === 2 }} -->
      <div v-if="activekey < 2">
        <div v-if="list[activekey]?.length" class="w-full mb-50px"
          v-for="(item, i) in list[activekey]" :key="i">
          <p class="text-20px text-color-[#333333] mb-20px font-600">{{ item.name }}</p>
          <div class="flex flex-wrap">
            <div class="flex flex-wrap mb-30px mr-50px" v-for="(v, index) in item.childrenList"
              :key="index">
              <div
                class="w-317px box-flex-w h-265px overflow-hidden rounded-8px border-1px border-solid border-color-[#eeeeee]">
                <img class="w-full h-135px border-top" :src="v.imageUrl || xgBoost" />
                <p class="text-16px text-color-[#333333] font-600 px-20px pt-20px pb-24px">{{
                    v.name
                }}</p>
                <div class="com-button w-120px h-40px mx-20px rounded-20px cursor-pointer"
                  @click="createTask(v, item)">{{ t('menu.createTask') }}</div>
              </div>
            </div>
          </div>
        </div>
        <el-empty v-else :description="t('common.noData')" />
      </div>
      <div v-else>
        <div v-for="(item, i) in list[activekey]">
          {{ item }}
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
import { getAlgTree } from '@/api/algorithm'
import xgBoost from '@/assets/images/computeServe/XGBoost.png'
const router: Router = useRouter()
const { t } = useI18n()
const activekey = ref(0)
const loading = ref(false)
const titleList = ref([
  {
    name: 'computing.privacyComputing'
  },
  {
    name: 'computing.nonPrivacyComputing'
  },
  {
    name: 'computing.applicationScenarios'
  }
])
const list: any = ref([{ privacy: [] }, { noPrivacy: [] }])
const appList: any = ref([{ name: 'AI象棋' }])

const tabsChange = (index: string) => {
  activekey.value = +index
}

const query = () => {
  loading.value = true
  getAlgTree().then(res => {
    loading.value = false
    const { data, code } = res
    if (code === 10000) {
      list.value[0] = data?.childrenList[0]?.childrenList || []
      list.value[1] = data?.childrenList[1]?.childrenList || []
    }
  }).catch(err => {
    loading.value = false
  })
}
const createTask = (row: any, item: any) => {
  router.push({ name: "wizardMode", params: { calculationType: item.id, algorithmId: row.id } })
}

onMounted(() => {
  list.value = [...list.value, ...appList.value]
  console.log(list.value);

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