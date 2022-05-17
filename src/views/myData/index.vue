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
      <DataTable :data="tableData" @purchase="purchase" @viewData="viewData" :loading="dataLoading"
        @viewCredential="viewCredential" />
      <div class="flex my-50px justify-center">
        <el-pagination background layout="prev, pager, next" @current-change="(_) => {
          current = _
        }" :total="total" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import DataTable from './components/DataTable.vue'
import { type Router, useRouter } from 'vue-router'
import { queryUserDataList, queryDataStats } from '@/api/data'
const { t } = useI18n()
const chainCfg: any = inject('chainCfg')
const router: Router = useRouter()
const tableData = ref([])
const current = ref(1)
const total = ref(0)
const dataTotal = ref(0)

const dataLoading = ref(false)
const purchase = (row: any) => {
  const dexUrl = `${chainCfg.value.dexUrl}swap?outputCurrency=${row.tokenAddress}&exactField=OUTPUT&exactAmount=1`
  //TODO dex
  window.open(dexUrl, "_blank");
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


const query = () => {
  dataLoading.value = true
  queryUserDataList({ current: current.value, size: 10 }).then(res => {
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
  query()
  queryTotal()
})


</script>
<style lang="scss" scoped>
</style>