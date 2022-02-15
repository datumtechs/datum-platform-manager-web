<template>
  <div>
    <div class="person-node-manage-head">
      <el-button size="mini" @click="$emit('close')">{{ $t('common.back') }}</el-button>
      <el-button
        size="mini"
        type="primary"
        @click=";(dialogVisible = true), (loading = false)"
        v-if="tableData.length < 10"
        >{{ $t('common.add') }}</el-button
      >
    </div>
    <el-table ref="nodeTable" :data="tableData" style="width: 100%" @current-change="handleCurrentChange">
      <!-- <el-table-column :width="'50px'" type="selection" /> -->
      <el-table-column prop="nodeName" :label="$t('node.nodeName')" />
      <el-table-column prop="identityIp" :label="$t('common.nodeIP')" />
      <el-table-column prop="identityPort" :label="$t('common.nodePort')" />
      <!-- <el-table-column prop="connectFlag" :label="$t('assets.status')" :width="'80px'">
        <div slot-scope="{ row }" class="_flex-box">
          <i v-show="row.connectFlag" class="el-icon-success"></i>
          <i v-show="!row.validFlag" class="el-icon-circle-close"></i>
          <i v-show="row.validFlag && !row.connectFlag" class="el-icon-connection"></i>
        </div>
        <template slot="header">
          {{ $t('assets.status') }}
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <p>
                <i class="el-icon-success"></i>
                {{ $t('head.linkSuccess') }}
              </p>
              <p>
                <i class="el-icon-circle-close"></i>
                {{ $t('head.linkFailed') }}
              </p>
              <p>
                <i class="el-icon-connection"></i>
                {{ $t('head.linkConnection') }}
              </p>
            </div>
            <i class="el-icon-question ml10"></i>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('common.actions')">
        <div slot-scope="{ row, $index }" class="_flex-box">
          <!-- <el-button
            v-if="!row.connectFlag"
            size="mini"
            type="primary"
            circle
            icon="el-icon-link"
            @click="connect(row.identityId, row)"
          >
          </el-button> -->
          <el-button
            :type="row.publicFlag || row.connectFlag ? '' : 'danger'"
            size="mini"
            :disabled="!!(row.publicFlag || row.connectFlag)"
            icon="el-icon-delete"
            circle
            @click="del(row, $index)"
          ></el-button>
        </div>
        <!-- <template slot="header">
          {{ $t('common.actions') }}
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              {{ $t('head.click') }}
              <i class="el-icon-link"></i>
              {{ $t('head.nodeChange') }}
            </div>
            <i class="el-icon-question ml10"></i>
          </el-tooltip>
        </template> -->
      </el-table-column>
    </el-table>
    <!-- <el-button size="mini" type="primary" class="apply-button" @click="connect">
            {{ $t('common.connect') }}
          </el-button> -->
    <el-dialog
      :title="$t('node.addNodeTitle')"
      width="480px"
      :visible="dialogVisible"
      :destroy-on-close="true"
      :append-to-body="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close=";(dialogVisible = false), infoForm()"
    >
      <el-form ref="infoForm" label-position="top" :model="nodeForm" :rules="rules" @submit.native.prevent>
        <el-form-item prop="nodeIP" :label="$t('common.nodeIP')">
          <el-input
            v-model.trim="nodeForm.nodeIP"
            maxlength="20"
            :placeholder="`${$t('common.pleaseEnter')}${$t('common.nodeIP')}`"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nodePort" :label="$t('common.nodePort')">
          <el-input
            v-model.trim="nodeForm.nodePort"
            maxlength="8"
            :placeholder="`${$t('common.pleaseEnter')}${$t('common.nodePort')}`"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=";(dialogVisible = false), infoForm()">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="add" :loading="loading">{{ $t('common.apply') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { userApi } from 'apis'
export default {
  data() {
    const self = this
    return {
      dialogVisible: false,
      loading: false,
      identityId: '',
      nodeForm: {
        nodeIP: ''
      },
      tableData: [],

      rules: {
        nodeIP: [
          {
            required: true,
            // eslint-disable-next-line no-empty-pattern
            validator: ({}, value, callback) => {
              if (!value) {
                callback(new Error(`${self.$t('common.pleaseEnter')}${self.$t('common.nodeIP')}`))
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
            // eslint-disable-next-line no-empty-pattern
            validator: ({}, value, callback) => {
              if (!value) {
                callback(new Error(`${self.$t('common.pleaseEnter')}${self.$t('common.nodePort')}`))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    // handleCommand(command, row, index) {
    //   switch (command) {
    //     case 'delete':
    //       this.del(row)
    //       break
    //     case 'connect':
    //       this.connect(row)
    //       break
    //     case 'disconnect':
    //       this.disconnect(row)
    //       break
    //     default:
    //       console.log('默认')
    //       break
    //   }
    // },
    connect(identityId, row) {
      const that = this
      that
        .$confirm(`${that.$t('node.connectNodeTips')}${row.identityIp}`, that.$t('node.connectNodeTitle'), {
          confirmButtonText: that.$t('common.apply'),
          cancelButtonText: that.$t('common.cancel'),
          lockScroll: false,
          showClose: false,
          type: 'warning'
        })
        .then(() => {
          userApi
            .postConnectIdentity({
              identityId: identityId || that.identityId
            })
            .then(res => {
              const { code } = res
              if (code === 10000) {
                that.query()
              }
            })
        })
        .catch(() => {
          console.log('取消连接')
          that.loading = false
        })
    },
    // disconnect(row) {
    //   const that = this
    //   userApi
    //     .postDisconnectIdentity({
    //       identityId: row.identityId
    //     })
    //     .then(res => {
    //       const { code, data } = res
    //       if (code == 10000) {
    //         that.query()
    //       }
    //     })
    // },
    del(row) {
      const that = this
      that.loading = true
      that
        .$confirm(`${that.$t('node.deleteNode')}${row.identityIp}`, that.$t('node.deleteNode'), {
          confirmButtonText: that.$t('common.apply'),
          cancelButtonText: that.$t('common.cancel'),
          lockScroll: false,
          showClose: false,
          type: 'warning'
        })
        .then(() => {
          userApi
            .deletsConnectIdentity({
              identityId: that.identityId
            })
            .then(res => {
              const { code } = res
              if (code === 10000) {
                that.query()
              }
              that.loading = false
            })
            .catch(() => {
              that.loading = false
            })
        })
        .catch(() => {
          console.log('取消删除')
          that.loading = false
        })
    },
    query() {
      userApi
        .getOrgList({
          current: 1,
          size: 10
        })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            this.tableData = data || []
            this.$nextTick(() => {
              this.tableData.forEach(v => {
                if (v.identityId === this.identityId || v.connectFlag) {
                  this.handleCurrentChange(v)
                }
              })
            })
          }
        })
    },
    add() {
      const self = this
      self.$refs.infoForm.validate(valid => {
        if (valid) {
          self.loading = true
          userApi
            .postAddNode({
              identityIp: self.nodeForm.nodeIP,
              identityPort: self.nodeForm.nodePort
            })
            .then(res => {
              self.dialogVisible = false
              self.infoForm()
              const { code } = res
              self.loading = false
              if (code === 10000) {
                self.query()
              }
            })
            .catch(() => {
              self.infoForm()
            })
        }
      })
    },
    infoForm() {
      this.nodeForm.nodeIP = ''
      this.nodeForm.nodePort = ''
    },
    handleCurrentChange(row) {
      if (row && row.identityId) {
        this.$refs.nodeTable.clearSelection()
        this.$refs.nodeTable.toggleRowSelection(row)
        this.identityId = row.identityId
        console.log(this.identityId)
      }
    },
    cancel(index) {
      this.tableData[index].edit = false
    },
    edit(row, index) {
      this.tableData[index].edit = true
    }
    // submit(row) {
    //   console.log('submit')
    // }
  }
}
</script>
<style lang="scss" scoped>
.mr20 {
  margin-right: 20px;
}
.ml10 {
  margin-left: 5px;
}
._flex-box {
  display: flex;
  .el-icon-success {
    font-size: 18px;
    color: #67c23a;
  }
  .el-icon-circle-close {
    font-size: 18px;
    color: #f56c6c;
  }
  .el-icon-connection {
    font-size: 16px;
  }
}
.person-node-manage-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
::v-deep .el-table__header {
  .el-checkbox__input {
    display: none;
  }
}
.apply-button {
  margin-top: 30px;
}
</style>