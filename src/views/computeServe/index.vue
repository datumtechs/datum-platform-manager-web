<template>
  <div class="task-wrap com-main">
    <Banner :bg-name="'computeServe'">
      <template #select>
        <ComTabs :list="titleList" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="main-content com-main-data-wrap mt-55px">
      <div v-if="activekey < 2">
        <AlgoService :list="list[activekey]" :type="activekey" @createTask="createTask" />
        <!-- <el-empty v-else :description="t('common.noData')" /> -->
      </div>
      <div v-else>
        <AlgoUsage :appList="appList" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
import AlgoService from './components/AlgoService.vue'
import AlgoUsage from './components/AlgoUsage.vue'
import AiChess from '@/assets/images/computeServe/aiChess.png'
import { getAlgTree } from '@/api/algorithm'

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
const appList: any = ref([{
  name: 'AI象棋', content: t('computing.chineseChessContent'), imgUrl: AiChess
}])

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

const createTask = ({ branch3, branch2 }: any) => {
  router.push({ name: "wizardMode", params: { calculationType: branch2.id, algorithmId: branch3.id } })
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