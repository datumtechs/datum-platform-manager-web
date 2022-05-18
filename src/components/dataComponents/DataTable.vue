<template>
  <el-table v-tableTooltip :data="props.data" class="mt-30px com-table _com_el-table-wrap">
    <el-table-column type="index" width="100">
      <template #header>{{ t('common.num') }}</template>
    </el-table-column>
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="metaDataName" :label="t('myData.dataName')" />
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="nodeName" :label="t('myData.dataProvider')" />
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="tokenName" :label="t('myData.credentialName')" />
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="tokenPrice" :label="t('myData.price')" />
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="Trading" :label="t('myData.Trading')"
      :width="180" />
    <el-table-column :label="t('common.actions')" :fixed="'right'" :width="330">
      <template #default="scope">
        <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle
          @click="purchase(scope.row)">{{ t('myData.purchase') }}</el-button>
        <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle
          @click="viewData(scope.row)">{{ t('myData.viewData') }}</el-button>
        <el-button type="text" :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)" circle
          @click="viewCredential(scope.row)">{{ t('myData.viewCredential') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
const { t } = useI18n()
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