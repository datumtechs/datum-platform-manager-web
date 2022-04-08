<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :bg-name="'arrow'">
      <template #briefInfo>
        <p class="text-color-[#999999]">
          {{ $t('myData.tasksBriefInfoFirstParagraph') }}
          <span
            class="text-color-[#2B60E9] text-16px"
          >11990</span>
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
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
import { queryUserDataList } from '@/api/data'
const router: Router = useRouter()
const tableData = ref([])
const current = ref(1)
const total = ref(10)

const purchase = (obj: any) => { }
const viewData = (obj: any) => {
  router.push({ name: "dataDetails", params: { ...obj } })
}
const viewCredential = (obj: any) => {
  router.push({ name: "dataCredentials", params: { ...obj } })
}


const query = () => {
  queryUserDataList().then(res => {
    const { data, code } = res
    if (code === 10000) {
      tableData.value = data.items
      current.value = data.current
      total.value = data.total
    }
  })
}

onMounted(() => {
  query()
})


</script>
<style lang="scss" scoped>
</style>