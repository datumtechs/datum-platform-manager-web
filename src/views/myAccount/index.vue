<template>
  <div class="min-w-1000px">
    <Banner :bg-name="'myAccount'">
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <div class="com-main-data-wrap account-form">
      <MyNode v-if="activekey == 1" />
      <Account v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Account from './components/Account.vue';
import MyNode from './components/MyNode.vue';
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
const route: RouteLocationNormalizedLoaded = useRoute()
const activekey = ref(route.params.infoType == 'node' ? 1 : 0)

const list = ref([
  {
    name: 'head.nickname'
  },
  {
    name: 'head.nodeManagement'
  }
])

watch(route, () => {
  console.log(1123)
})

const tabsChange = (index: string) => {
  activekey.value = +index
}


</script>
<style lang="scss" scoped>
.account-form {
  :deep(.el-form){
      .el-form-item__label {
        font-size: 16px;
        font-weight: 900;
        color: #333333;
        font-family: DINPro-Bold, Ali-Bold;
      }
  }

}
</style>