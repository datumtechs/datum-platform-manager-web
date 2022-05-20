<template>
    <div class="decorate-wrapper">
        <Banner :bg-name="'network'">
            <template #briefInfo>
                <p v-if="locale === 'zh'">全网共 {{ totalNode }} 个可参与隐私计算任务的节点</p>
                <p v-else>{{ totalNode }} participant nodes in the privacy computing network</p>
            </template>
        </Banner>
        <div v-loading="nodeLoading"
            class="main-content mt-30px max-w-1200px mx-auto overflow-hidden">
            <NodeCard v-for="(node, index) in nodeList" :size="10" :page="1" :node="node"
                :index="index" :key="index" />
        </div>
        <div class="flex my-50px justify-center">
            <el-pagination background layout="prev, pager, next"
                v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                :total="pageObj.total" />
        </div>
        <Search :keyword="keyword" :placeholder="t('node.placeholder')" @search="search" @reset="orderBy = ''">
            <template #content>
                <p class="search-label mb-10px">
                    {{ t('node.sortBy') }}
                </p>
                <el-select class="w-full" size="large" v-model="orderBy" :teleported="false">
                    <el-option v-for="item in sortList" :key="item.id" :label="t(item.label)"
                        :value="item.orderBy" />
                </el-select>
            </template>
        </Search>
    </div>

</template>

<script setup lang='ts'>
import NodeCard from './NodeCard.vue'
import { getOrgList } from '@/api/node'
import {useKeepAliveInfo } from '@/stores'
const { t, locale } = useI18n()
const totalNode = ref(1876)
const orderBy = ref('')
const size = ref(10)
const current = ref(1)
let nodeList: any = ref([])
const nodeLoading = ref(false)
const keyword = ref('')
const keepAlive = useKeepAliveInfo()
const route = useRoute()
const sortList = ref([
    {
        id: 1,
        orderBy: 'CORE',
        label: 'node.totalCpu'
    },
    {
        id: 2,
        orderBy: 'MEMORY',
        label: 'node.totalMemory'
    },
    {
        id: 3,
        orderBy: 'BANDWIDTH',
        label: 'node.totalBandwidth'
    },
    {
        id: 4,
        orderBy: 'NAME',
        label: 'common.name'
    },
    {
        id: 5,
        orderBy: 'TASK_COUNT',
        label: 'node.computations'
    },
    {
        id: 6,
        orderBy: 'TOKEN_COUNT',
        label: 'node.credentials'
    }
])

const pageObj = reactive({
    total: 0,
    current: 1,
    size: 10
})

watch(() => pageObj.current, () => {
    queryOrgList()
})

const search = (text: string) => {
    keyword.value = text
    queryOrgList()
}

const queryOrgList = async () => {
    nodeLoading.value = true
    const { code, data } = await getOrgList({
        orderBy: orderBy.value, size: size.value, current: pageObj.current, keyword: keyword.value
    })
    nodeLoading.value = false
    if (code === 10000) {
        nodeList.value = data.items
        pageObj.total = data.total
    }
}


const setKeepAliveInfo = ()=>{
//    const comTabsKeep = keepAlive.getComTabs[route.path] || ''
  const currentKeep = keepAlive.getCurrent[route.path] || ''
  const searchParams = keepAlive.getSearchParams[route.path] || ''
//   if(comTabsKeep)activekey.value = comTabsKeep
  if(currentKeep) {
      pageObj.current = currentKeep
      return
  }
  keyword.value = searchParams['keyword'] // 反选效果
  queryOrgList()
}


onMounted(() => {
    setKeepAliveInfo()
})
</script>
<style scoped lang='scss'>
</style>