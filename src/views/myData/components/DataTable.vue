<template>
  <el-table v-tableTooltip v-loading="dataLoading" :data="props.data" class="mt-30px com-table">
    <el-table-column type="index" width="100">
      <template #header>{{ t('common.num') }}</template>
    </el-table-column>
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="metaDataName"
      :label="t('myData.dataName')" />
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="nodeName"
      :label="t('myData.dataProvider')" />
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="tokenName"
      :label="t('myData.credentialName')" />
    <el-table-column :class-name="'show-ellipsis-tooltip'" :label="t('auth.holdQuantity')">
      <template #default="{ row }">
        <div v-if="row.authorizeBalance">{{ useExchangeFrom(row.tokenBalance) }}</div>
        <div v-else>-</div>
      </template>
    </el-table-column>
    <el-table-column :class-name="'show-ellipsis-tooltip'" :label="t('workflow.authorizeBalance')">
      <template #default="{ row }">
        <div v-if="row.authorizeBalance">{{ useExchangeFrom(row.authorizeBalance) }}</div>
        <div v-else>-</div>
      </template>
    </el-table-column>
    <!-- <el-table-column :class-name="'show-ellipsis-tooltip'" prop="tokenPrice" :label="t('myData.price')" /> -->
    <el-table-column :label="t('common.actions')" :width="300">
      <template #default="{ row }">
        <el-space :size="20">
          <span class="font-medium  leading-20px link-btn" @click="purchase(row)">{{
              t('myData.purchase')
          }}</span>
          <span class="font-medium  leading-20px link-btn" @click="viewData(row)">{{
              t('myData.viewData')
          }}</span>
        </el-space>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { type Router, useRouter } from 'vue-router'
import { useExchangeFrom } from '@/hooks'
const chainCfg: any = inject('chainCfg')
const router: Router = useRouter()
const { t } = useI18n()
const emit = defineEmits(['purchase', 'viewData', 'viewCredential'])
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  },
  dataLoading: {
    type: Boolean,
    default: false
  }
})

const purchase = (obj: any) => {
  const dexUrl = `${chainCfg.value.dexUrl}swap?outputCurrency=${obj.tokenAddress}&exactField=OUTPUT&exactAmount=1`
  //TODO dex
  window.open(dexUrl, "_blank");
}
const viewData = (obj: any) => {
  emit('viewData', obj)
}
const viewCredential = (obj: any) => {
  emit('viewCredential', obj)
}
</script>
<style lang="scss" scoped>
</style>