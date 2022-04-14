<template>
  <div class="mt-20px">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :label="$t('role.taskSponsor')" name="taskSponsor"></el-tab-pane>
      <el-tab-pane :label="$t('role.resultConsumer')" name="resultConsumer">
      </el-tab-pane>
      <el-tab-pane :label="$t('role.dataProvider')" name="dataProvider"></el-tab-pane>
      <el-tab-pane :label="$t('role.powerProvider')" name="powerProvider"></el-tab-pane>
    </el-tabs>
    <el-table :header-cell-style="{ height: '50px' }" :row-style="{ height: '50px' }"
      :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" :label="$t('common.num')" key="index" width="80" />
      <!-- <el-table-column prop="taskRole" :label="$t('common.taskRole')" /> -->
      <el-table-column prop="nodeName" key="nodeName" :label="$t('common.name')" width="200" />
      <el-table-column prop="identityId" key="identityId" :label="$t('common.identityId')" />
      <el-table-column prop="info" key="taskSponsor" :label="$t('common.info')">
        <template #default="{ row }">
          <div v-if="activeName === 'taskSponsor'">
            {{ $t('node.address') }} : {{ row.address }}
          </div>
          <div v-else-if="activeName === 'dataProvider'">
            {{ $t('myData.credentialName') }} : {{ row.dataTokenName }}
          </div>
          <div v-else-if="activeName === 'powerProvider'">
            <p>{{ $t('common.cpu') }} : &nbsp; {{ row.usedCore }} {{ $t('common.cores') }}</p>
            <p>{{ $t('common.memory') }} : &nbsp; {{ useSize(row.usedMemory) }}</p>
            <p>{{ $t('common.bandwidth') }} : &nbsp; {{ useSize(row.usedBandwidth) + 'P/S' }}</p>
          </div>
          <div v-else>
            -
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import type { TabsPaneContext } from 'element-plus'
import { useSize } from '@/hooks'

interface RoleTableType {
  identityId: String
  nodeName: String
  usedBandwidth?: Number
  usedCore?: Number
  usedMemory?: Number
  dataTokenName?: String
  address?: String
}

const props = defineProps({
  taskSponsor: {
    type: Array,
    default: () => []
  },
  resultConsumer: {
    type: Array,
    default: () => []
  },
  dataProvider: {
    type: Array,
    default: () => []
  },
  powerProvider: {
    type: Array,
    default: () => []
  },
})

const activeName: any = ref('taskSponsor')

const handleClick = (tab: TabsPaneContext) => {

  activeName.value = tab.props.name
  tableData.value = props[tab.props.name]
  // nextTick(() => {
  //   
  // })
}
const tableData: any = ref([])

onMounted(() => {
  tableData.value = props.taskSponsor
})

</script>

<style scoped lang='scss'>
:deep(.el-tabs__item) {
  height: 60px;
  line-height: 60px;
}
</style>