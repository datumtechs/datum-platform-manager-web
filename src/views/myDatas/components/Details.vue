<template>
  <div class="flex-1 task-wrap com-mian">
    <Banner :back-show="true" :bg-name="'arrow'" @back="router.go(-1)">
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <BaseInfo v-if="activekey == 0" :tableData="tableData" />
    <MetaData v-if="activekey == 1" :data="MetadataData" />
    <TaskInvolved v-if="activekey == 2" :data="TaskInvolvedData" />
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
    name: 'myDatas.basicInfo'
  },
  {
    name: 'myDatas.metadata'
  },
  {
    name: 'myDatas.tasksInvolved'
  }
])

const MetadataData = ref([{
  remarks: "myDatas"
}])

const TaskInvolvedData = ref([{
  remarks: "myDatas"
}])


const tableData = ref([{
  lName: 'myDatas.dataName',
  lProp: "dataName",
  rName: 'myDatas.credentialSymbol',
  rProp: "credentialSymbol",
}, {
  lName: 'myDatas.launchTime',
  lProp: "launchTime",
  rName: 'myDatas.industryData',
  rProp: "industryData",
}, {
  lName: 'myDatas.dataFormat',
  lProp: "dataFormat",
  rName: 'myDatas.dataSize',
  rProp: "dataSize",
}, {
  lName: 'myDatas.rowsData',
  lProp: "rowsData",
  rName: 'myDatas.columnsData',
  rProp: "columnsData",
}, {
  lName: 'myDatas.dataDescription',
  lProp: "dataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescriptiondataDescription",
  last: true
}])
const tabsChange = (index: string) => {
  activekey.value = +index
}

</script>
<style lang="scss" scoped></style>