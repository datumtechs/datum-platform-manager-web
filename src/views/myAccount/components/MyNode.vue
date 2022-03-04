<template>
  <div class="mx-24px my-57px account mb-100px">
    <el-table :data="tableData">
      <el-table-column type="index" width="100">
        <template #header>{{ $t('common.num') }}</template>
      </el-table-column>
      <el-table-column prop="nodeName" :label="$t('node.nodeName')" />
      <el-table-column prop="identityIp" :label="$t('node.nodeIP')" />
      <el-table-column prop="identityPort" :label="$t('node.nodePort')" />
      <el-table-column :label="$t('common.actions')">
        <template #default="scope">
          <el-button
            type="text"
            :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
            circle
            @click="del(scope.row, scope.index)"
          >{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="w-170px h-50px rounded-25px com-button my-40px absolute right-[0]"
    >{{ $t('node.addNode') }}</div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()

const tableData = [
  {
    nodeName: 'Tom',
    identityIp: 'No. 189, Grove St, Los Angeles',
  },
  {
    nodeName: 'Tom',
    identityIp: 'No. 189, Grove St, Los Angeles',
  }
]
const del = (row: any, index: Number) => {
  ElMessageBox.confirm(
    `${t('account.tipsText')}${row.nodeName}`,
    t('account.tips'),
    {
      confirmButtonText: t('common.delete'),
      cancelButtonText: t('common.cancel'),
      type: 'info',
    }
  )
    .then(() => {
      submit()
    })
}

const submit = () => {

}
</script>
<style lang="scss">
.account {
  .el-table {
    .el-table__header .el-table__cell {
      border-bottom: none;
      height: 50px;
    }
    .el-table__body .el-table__row {
      height: 70px;
    }
  }
}
</style>