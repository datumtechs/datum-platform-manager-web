
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
 

const list = ref([
  {
    name:'123'
  },
    {
    name:'21'
  }
])
const tabsChange = (index:number)=>{
  console.log(index)
}



</script>