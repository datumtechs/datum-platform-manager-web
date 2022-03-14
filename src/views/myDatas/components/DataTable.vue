<template>
  <el-table :data="props.data" class="mt-50px com-table">
    <el-table-column type="index" width="100">
      <template #header>{{ $t('common.num') }}</template>
    </el-table-column>
    <el-table-column prop="dataName" :label="$t('myDatas.dataName')" />
    <el-table-column show-overflow-tooltip prop="dataProvider" :label="$t('myDatas.dataProvider')" />
    <el-table-column
      show-overflow-tooltip
      prop="credentialName"
      :label="$t('myDatas.credentialName')"
    />
    <el-table-column show-overflow-tooltip prop="price" :label="$t('myDatas.price')" />
    <el-table-column
      show-overflow-tooltip
      prop="Trading"
      :label="$t('myDatas.Trading')"
      :width="180"
    />
    <el-table-column :label="$t('common.actions')" :fixed="'right'" :width="330">
      <template #default="scope">
        <el-button
          type="text"
          :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
          circle
          @click="purchase(scope.row)"
        >{{ $t('myDatas.purchase') }}</el-button>
        <el-button
          type="text"
          :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
          circle
          @click="viewData(scope.row)"
        >{{ $t('myDatas.viewData') }}</el-button>
        <el-button
          type="text"
          :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
          circle
          @click="viewCredential(scope.row)"
        >{{ $t('myDatas.viewCredential') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
const router: Router = useRouter()
const emit = defineEmits(['purchase', 'viewData', 'viewCredential'])
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})

const purchase = (obj: any) => { }
const viewData = (obj: any) => {
  emit('viewData', obj)
}
const viewCredential = (obj: any) => {
  emit('viewCredential', obj)
}
</script>
<style lang="scss" scoped>
</style>