<template>
  <div class="task-wrap com-main">
    <Banner :bg-name="'myData'">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ t('myData.tasksBriefInfoFirstParagraph') }}
          <span class="text-color-[#2B60E9] text-16px">{{ dataTotal }}</span>
          {{ t('myData.tasksBriefInfoTwoParagraph') }}
        </p>
      </template>
    </Banner>
    <div class="main-content com-main-data-wrap">
      <DataTable @purchase="purchase" :data="tableData" @viewData="viewData" :loading="dataLoading"
        @viewCredential="viewCredential" />
      <div class="flex my-50px justify-center">
        <el-pagination background layout="prev, pager, next" @current-change="query"
          v-model:current-page="current" :total="total" />
      </div>
    </div>
    <Search :keyword="keyword" :showFilter="false" @search="search"
      :placeholder="t('myData.marketPlaceholder')"></Search>
    <!-- <TokenList :title="`${$t('myData.viewHoldingCredentials')}  ( ${currentDataName} )`"
      v-model:showDialog="showDialog" /> -->

    <TokenList v-if="showDialog"
      :title="`${$t('myData.viewHoldingCredentials')} - ${currentDataName}`" :id="currentMetadataId"
      v-model:showDialog="showDialog" />
  </div>
</template>
<script lang="ts" setup>
import DataTable from './components/DataTable.vue'
import { type Router, useRouter } from 'vue-router'
import { queryUserDataList, queryDataStats } from '@/api/data'
import { useKeepAliveInfo } from '@/stores'
const keepAlive = useKeepAliveInfo()

const { t } = useI18n()
const chainCfg: any = inject('chainCfg')
const showDialog = ref(false)
const currentDataName = ref('')
const currentMetadataId = ref('')
const router: Router = useRouter()
const route = useRoute()
const tableData = ref([])
const current = ref(1)
const total = ref(0)
const dataTotal = ref(0)
const keyword = ref('')

const dataLoading = ref(false)


const purchase = (row: any) => {
  currentDataName.value = row.metaDataName
  currentMetadataId.value = row.metaDataId
  showDialog.value = !showDialog.value
}
const viewData = (row: any) => {
  router.push({
    path: "/data/details", query: {
      metaDataId: row.metaDataId,
      dataName: row.metaDataName,
    }
  })
}
const viewCredential = (obj: any) => {
  router.push({ name: "dataCredentials", params: { ...obj } })
}


const search = (str: string) => {
  keyword.value = str
  query()
}

const query = () => {
  dataLoading.value = true
  keepAlive.setCurrent(current.value, route.path)
  queryUserDataList({ current: current.value, size: 10, keyword: keyword.value }).then(res => {
    const { data, code } = res
    dataLoading.value = false
    if (code === 10000) {
      tableData.value = data.items
      current.value = data.current
      total.value = data.total
    }
  }).catch(err => {
    dataLoading.value = false
  })
}
const queryTotal = () => {
  queryDataStats().then(res => {
    const { data, code } = res
    if (code === 10000) {
      dataTotal.value = data.dataCount
    }
  })
}

onMounted(() => {
  const currentKeep = keepAlive.getCurrent[route.path] || ''
  if (currentKeep) current.value = currentKeep
  query()
  queryTotal()
})


</script>
<style lang="scss" scoped>
</style>