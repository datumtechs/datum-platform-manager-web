<template>
  <div class="com-main-data-wrap">
     <div class="h-50px">
         <ComTabs :list="props.list" :activekey="activekey" @change="tabsChange" />
     </div>
    <div  v-for="(item,index) in props.list" :key="index" v-show="activekey == index">
        <slot :name="`tabsItem${index}`"></slot>{{index}}
    </div>
    {{$parent}}
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['tabsChange'])
type Foo = {
    name: string;
};
const props = defineProps({
    list:{
        type: Array,
        default: () => []
    }
})

const activekey = ref(0)
const tabsChange = (index:number)=>{
    activekey.value = index
    emit('tabsChange',activekey.value)
}


</script>
<style lang="scss" scoped></style>