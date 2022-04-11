<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :bg-name="'myData'">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ $t('myData.tasksBriefInfoFirstParagraph') }}
          <span
            class="text-color-[#2B60E9] text-16px"
          >{{ dataTotal }}</span>
          {{ $t('myData.tasksBriefInfoTwoParagraph') }}
        </p>
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <DataTable
        :data="tableData"
        @purchase="purchase"
        @viewData="viewData"
        @viewCredential="viewCredential"
      />
      <div class="flex my-50px justify-center">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="(_) => {
            current = _
          }"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
import { queryUserDataList, queryDataStats } from '@/api/data'
const router: Router = useRouter()
const tableData = ref([])
const current = ref(1)
const total = ref(0)
const dataTotal = ref(0)

const purchase = (obj: any) => { }
const viewData = (obj: any) => {
  router.push({
    path: "/data/details", query: {
      metaDataId: obj.metaDataId
    }
  })
}
const viewCredential = (obj: any) => {
  router.push({ name: "dataCredentials", params: { ...obj } })
}


const query = () => {
  queryUserDataList({ current: current.value, size: 10 }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      tableData.value = data.items
      current.value = data.current
      total.value = data.total
    }
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