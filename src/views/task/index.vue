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
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
import DataTable from './components/DataTable.vue';
const router: Router = useRouter()
const tableData = [
  {
    dataName: 'Tom',
    credentialName: 'No. 189, Grove St, Los Angeles',
  },
  {
    dataName: 'Tom',
    credentialName: 'No. 189, Grove St, Los Angeles',
  }
]
const purchase = (obj: any) => { }
const viewData = (obj: any) => {
  router.push({ name: "dataDetails", params: { ...obj } })
}
const viewCredential = (obj: any) => {
  router.push({ name: "dataCredentials", params: { ...obj } })
}
</script>
<style lang="scss" scoped>
</style>