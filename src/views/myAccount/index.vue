<template>
  <div class="flex-1">
    <Banner>
      <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
      </template>
    </Banner>
    <MyNode v-if="activekey == 1" />
    <Account v-else />
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
    name: 'head.Nickname'
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
<style lang="scss">
.account-form {
  .el-form-item__label {
    font-size: 16px;
    font-weight: 900;
    color: #333333;
    font-family: DINPro-Bold, Ali-Bold;
  }
}
</style>