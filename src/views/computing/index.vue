
<template>
  <div>
    <com-tabs-card :list="list" @tabs-change="tabsChange">
      <template #tabsItem1>
            <p >1</p>
      </template>
       <template #tabsItem0>
            <p >0s</p>
      </template>
    </com-tabs-card>
  </div>
</template>
<script lang="ts" setup>
import ComputeTask from './ComputeTask.vue'
import De from './components/Details.vue'
 

const list = ref([
  {
    name:'123',
    ref:ComputeTask
  },
    {
    name:'21',
    ref: De
  }
])
const tabsChange = (index:number)=>{
  console.log(index)
}



</script>