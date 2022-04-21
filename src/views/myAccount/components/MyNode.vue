<template>
  <div class="mx-24px my-57px account mb-100px relative">
    <el-table :data="tableData">
      <el-table-column type="index" width="100">
        <template #header>{{ t('common.num') }}</template>
      </el-table-column>
      <el-table-column prop="nodeName" :label="t('node.nodeName')" />
      <el-table-column prop="identityIp" :label="t('node.nodeIP')" />
      <el-table-column prop="identityPort" :label="t('node.nodePort')" />
      <el-table-column :label="t('common.actions')">
        <template #default="scope">
          <el-button
            type="text"
            :disabled="!!(scope.row.publicFlag || scope.row.connectFlag)"
            circle
            @click="del(scope.row, scope.index)"
          >{{ t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      @click="dialogFormVisible = true"
      class="w-170px h-50px rounded-25px com-button my-40px absolute right-[0] cursor-pointer"
    >{{ t('node.addNode') }}</div>
    <el-dialog
      v-model="dialogFormVisible"
      :width="600"
      :title="t('node.addNode')"
      :destroy-on-close="true"
    >
      <el-form :model="form" :label-width="80" :rules="rules" :ref="(e: any) => formRef = e">
        <el-form-item :label="t('node.nodeIP')" prop="nodeIP">
          <el-input v-model="form.nodeIP" maxlength="20" />
        </el-form-item>
        <el-form-item :label="t('node.nodePort')" prop="nodePort">
          <el-input v-model="form.nodePort" maxlength="8" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button
            class="w-100px"
            style="height: 40px;"
            round
            @click="cancel"
          >{{ t('common.cancel') }}</el-button>
          <el-button
            class="w-100px"
            style="height: 40px;"
            round
            type="primary"
            @click="addNode"
          >{{ t('common.submit') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
// import { ElMessageBox, ElMessage } from 'element-plus'
import { getUserOrgList, postJoinOrg, delNodeOrg } from '@/api/login'
const { t } = useI18n()
const dialogFormVisible = ref(false)
const form = ref({
  nodeIP: '',
  nodePort: ""
})
const formRef = ref()
const rules = ref(
  {
    nodeIP: [
      {
        required: true,
        validator: ({ }, value: any, callback: any) => {
          if (!value) {
            callback(new Error(`${t('task.pleaseEnter')}${t('node.nodeIP')}`))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    nodePort: [
      {
        required: true,
        validator: ({ }, value: any, callback: any) => {
          if (!value) {
            callback(new Error(`${t('task.pleaseEnter')}${t('node.nodePort')}`))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
  }
)


const tableData = ref([])
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
      delSubmit(row)
    })
}

const addNode = () => {
  formRef.value?.validate((bol: boolean) => {
    if (bol) {
      console.log(form.value)
      addSubmit()
    }
  })
}


const delSubmit = (row: { id: number }) => {
  delNodeOrg({ identityId: row.id }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      query()
      ElMessage.success(t('common.success'))
    }
  })
}

const cancel = () => {
  formRef.value?.resetFields()
  dialogFormVisible.value = false
}

const addSubmit = () => {
  postJoinOrg({ identityIp: form.value.nodeIP, identityPort: form.value.nodePort }).then(res => {
    const { data, code } = res
    if (code === 10000) {
      query()
      ElMessage.success(t('common.success'))
    }
    cancel()
  })
}

const query = () => {
  getUserOrgList().then(res => {
    const { data, code } = res
    if (code === 10000) {
      console.log(data)
      tableData.value = data
    }
  })
}

onMounted(() => {
  query()
})


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