<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :back-show="true" :bg-name="'arrow'" @back="router.go(-1)">
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <BaseInfo v-if="activekey == 0" :tableData="tableData" />
      <MetaData v-if="activekey == 1" :data="MetadataData" />
      <TaskInvolved v-if="activekey == 2" :metaDataId="metaDataId" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import BaseInfo from './dataComponents/BaseInfo.vue';
import MetaData from './dataComponents/MetaData.vue';
import TaskInvolved from './dataComponents/TaskInvolved.vue'
import { type Router, useRouter, useRoute } from 'vue-router'
import { useUsersInfo } from '@/stores'
import { queryDataDetails } from '@/api/data'
import { enums } from '@/utils/enum'

const { t } = useI18n()
const router: Router = useRouter()
const store = useUsersInfo()
const route = useRoute()
const activekey = ref(0)
const metaDataId: string | any = route.query.metaDataId || ''
const list = ref([
  {
    name: 'myData.basicInfo'
  },
  {
    name: 'myData.metadata'
  },
  {
    name: 'myData.tasksInvolved'
  }
])

const MetadataData = ref([{
  remarks: "myData"
}])

const TaskInvolvedData = ref([{
  remarks: "myData"
}])


const tableData = ref<any[]>([])
const tabsChange = (index: string) => {
  activekey.value = +index
}

const filterDate = (time: number) => {
  if (!time) return ''
  return new Date(time).toLocaleString()

}


const query = () => {
  queryDataDetails({ metaDataId: metaDataId }).then(res => {
    const { data, code } = res
    if (code == 10000) {
      tableData.value = [{
        lName: 'myData.dataName',
        lProp: data.metaDataName,
        rName: 'myData.credentialSymbol',
        rProp: data.tokenSymbol,
      }, {
        lName: 'myData.launchTime',
        lProp: filterDate(data.publishedAt),
        rName: 'myData.industryData',
        rProp: t(enums.industry[data.industry])// data.industry,
      }, {
        lName: 'myData.dataFormat',
        lProp: data.fileType,
        rName: 'myData.dataSize',
        rProp: data.size,
      }, {
        lName: 'myData.rowsData',
        lProp: data.rows,
        rName: 'myData.columnsData',
        rProp: data.columns,
      }, {
        lName: 'myData.dataDescription',
        lProp: data.remarks,
        last: true
      }]
      MetadataData.value = data.columnsList
    }
  })
}



onMounted(() => {
  if (!store.token) {
    router.push({ name: 'marketplace' })
  }
  if (store.token && !metaDataId) {
    return router.go(-1)
  }
  query()
})


</script>
<style lang="scss" scoped></style>