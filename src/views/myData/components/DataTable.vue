<template>
  <el-table v-tableTooltip v-loading="dataLoading" :data="props.data" class="mt-30px com-table">
    <el-table-column type="index" width="100">
      <template #header>{{ t('common.num') }}</template>
    </el-table-column>
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="metaDataName"
      :label="t('myData.dataName')" />
    <el-table-column :class-name="'show-ellipsis-tooltip'" prop="nodeName"
      :label="t('myData.dataProvider')">
      <template #default="{ row }">
        <div class="flex">
          <CertificationLabel :obj="row" />
          <p class="w-120px ellipse cursor-pointer pl-10px" @click="linkToNode(row)">{{
              row.nodeName
          }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column :class-name="'show-ellipsis-tooltip'" :label="t('myData.dataSize')">
      <template #default="{ row }">
        <div>
          {{ useSize(row.size) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column :class-name="'show-ellipsis-tooltip'" :label="t('myData.industryData')">
      <template #default="{ row }">
        <div>{{ $t(`${enums.industry[row.industry]}`) }}</div>
      </template>
    </el-table-column>
    <el-table-column :class-name="'show-ellipsis-tooltip'" :label="t('myData.useScene')">
      <template #default="{ row }">
        <div>
          <el-space wrap :size="10" :spacer="(row.isSupportPtAlg && row.isSupportCtAlg) ? '|' : ''">
            <span>{{ row.isSupportPtAlg ? $t('expert.plaintext') : '' }}</span>
            <span>{{ row.isSupportCtAlg ? $t('expert.cipherText') : '' }}</span>
          </el-space>
        </div>
      </template>
    </el-table-column>
    <!-- <el-table-column :class-name="'show-ellipsis-tooltip'" prop="tokenPrice" :label="t('myData.price')" /> -->
    <el-table-column :label="t('common.actions')" :width="300">
      <template #default="{ row }">
        <el-space :size="20">
          <span class="font-medium  leading-20px link-btn" @click="purchase(row)">{{
              t('myData.viewHoldingCredentials')
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
import { useExchangeFrom, useSize } from '@/hooks'
import { useKeepAliveInfo } from '@/stores'
import { enums } from '@/utils/enum'
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
  emit('purchase', obj)

  // const dexUrl = `${chainCfg.value.dexUrl}swap?outputCurrency=${obj.tokenAddress}&exactField=OUTPUT&exactAmount=1`
  //TODO dex
  // window.open(dexUrl, "_blank");
}

const linkToNode = (row: any) => {
  router.push({
    path: `/nodes/details/${row.identityId}`,
  })
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