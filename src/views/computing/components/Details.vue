<template>
  <div class="flex-1 task-wrap com-main">
    <Banner :back-show="true" :bg-name="'clocksWatches'" @back="router.go(-1)">
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="com-main-data-wrap">
      <BaseInfo v-if="activekey == 0" />
      <PartyInfo v-if="activekey == 1" :data="MetadataData" />
      <TaskEvents v-if="activekey == 2" :data="TaskInvolvedData" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import BaseInfo from './BaseInfo.vue';
import PartyInfo from './PartyInfo.vue';
import TaskEvents from './TaskEvents.vue'
import { type Router, useRouter } from 'vue-router'
const router: Router = useRouter()
const activekey = ref(0)
const list = ref([
  {
    name: 'myData.basicInfo'
  },
  {
    name: 'common.partyInfo'
  },
  {
    name: 'computeTask.taskEvents'
  }
])

const MetadataData = ref([{
  remarks: "myData"
}])

const TaskInvolvedData = ref([{
  remarks: "myData"
}])



const tabsChange = (index: string) => {
  activekey.value = +index
}

</script>
<style lang="scss" scoped></style>


<!--// <template>
//   <div>
//     <com-tabs-card :list="list" @tabs-change="tabsChange">
//       <template #tabsItem1>
//             <p >1</p>
//       </template>
//        <template #tabsItem0>
//             <p >0s</p>
//       </template>
//     </com-tabs-card>
//   </div>
// </template>
// // <script lang="ts" setup>


 

// const list = ref([
//   {
//     name:'123'
//   },
//     {
//     name:'21'
//   }
// ])
// const tabsChange = (index:number)=>{
//   console.log(index)
// }



// </script>
-->