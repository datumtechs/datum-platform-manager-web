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
      <TaskInvolved v-if="activekey == 2" :data="TaskInvolvedData" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import BaseInfo from './BaseInfo.vue';
import MetaData from './MetaData.vue';
import TaskInvolved from './TaskInvolved.vue'
import { type Router, useRouter } from 'vue-router'
const router: Router = useRouter()
const activekey = ref(0)
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


const tableData = ref([{
  lName: 'myData.dataName',
  lProp: "dataName",
  rName: 'myData.credentialSymbol',
  rProp: "credentialSymbol",
}, {
  lName: 'myData.launchTime',
  lProp: "launchTime",
  rName: 'myData.industryData',
  rProp: "industryData",
}, {
  lName: 'myData.dataFormat',
  lProp: "dataFormat",
  rName: 'myData.dataSize',
  rProp: "dataSize",
}, {
  lName: 'myData.rowsData',
  lProp: "rowsData",
  rName: 'myData.columnsData',
  rProp: "columnsData",
}, {
  lName: 'myData.dataDescription',
  lProp: "dataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescription",
  last: true
}])
const tabsChange = (index: string) => {
  activekey.value = +index
}

</script>
<style lang="scss" scoped></style>