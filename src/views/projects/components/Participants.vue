<template>
  <div class="flow-wrapper">
    <div class="search-box">
      <SearchBar @searchCb="searchCb" />
      <el-button type="primary" @click="addFn()">{{ $t('projects.createParticipants') }}</el-button>
    </div>
    <div class="tabs-table">
      <el-table v-loading="loading" style="width: 100%" :data="tableData">
        <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"> </el-table-column>
        <el-table-column prop="userName" :label="`${$t('common.nickname')}`"> </el-table-column>
        <el-table-column :label="`${$t('node.capacity')}`" width="120">
          <template slot-scope="{ row }">
            <div>{{ $t(`projects.${roleMap.get(row.role)}`) }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('projects.joinTime')}`" width="240">
          <template slot-scope="{ row }">
            <div>{{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('common.actions')}`" width="200">
          <template slot-scope="{ row }">
            <div class="table-btn-group">
              <span class="pointer link-btn" @click="editFn(row)">{{ $t('common.edit') }}</span>
              <span class="pointer link-btn warn-btn" @click="deleteFn(row)">{{ $t('common.delete') }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <div></div>
        <el-pagination
          background
          :total="totalNum"
          :page-size.sync="pageSize"
          :current-page.sync="curPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="total,sizes, prev, pager, next"
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
      <WarnDialog
        :show.sync="showWarnDialog"
        :title="warnTitle"
        :cur-name="curName"
        :delete-type="deleteType"
        @deleteCb="deleteCb"
      >
        <div slot="content">{{ $t('projects.deleteParticipantTip') }}&nbsp;"{{ curDeleteName }}"?</div>
      </WarnDialog>
      <EditDialog
        v-if="showEditDialog"
        win-width="600px"
        :show.sync="showEditDialog"
        :title="editTitle"
        @submitCb="validate"
      >
        <div slot="content">
          <el-form ref="infoForm" label-position="top" :model="form">
            <!-- <div class="edit-content-line">
              <div class="edit-content-title">{{ $t('projects.selectUser') }}</div>
              <el-select v-model="curPerson" size="small" :style="{ marginBottom: '20px' }">
                <el-option
                  v-for="person in status === 'add' ? projectMemberList : memberList"
                  :key="person.id"
                  :value="person.id"
                  :label="person.userName"
                  :disabled="curNotSelectPerson === person.id"
                ></el-option>
              </el-select>
            </div>
            <div class="edit-content-line">
              <div class="edit-content-title">{{ $t('node.capacity') }}</div>
              <el-select v-model="curRole" size="small">
                <el-option v-for="role in roleList" :key="role.id" :value="role.id" :label="role.label"></el-option>
              </el-select>
            </div> -->
            <div class="edit-content-line">
              <el-form-item prop="curPerson" :label="$t('projects.selectUser')" :rules="selectTules">
                <el-select v-model="form.curPerson" size="small">
                  <el-option
                    v-for="person in status === 'add' ? projectMemberList : memberList"
                    :key="person.id"
                    :value="person.id"
                    :label="person.userName"
                    :disabled="curNotSelectPerson === person.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="edit-content-line">
              <el-form-item prop="curPerson" :label="$t('node.capacity')" :rules="selectTules">
                <el-select v-model="form.curRole" size="small">
                  <el-option v-for="role in roleList" :key="role.id" :value="role.id" :label="role.label"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div slot="title" class="connector-title">
          <span v-if="status === 'add'">{{ $t('projects.addParticipant') }}</span>
          <span v-else>{{ $t('common.edit') }}</span>
        </div>
      </EditDialog>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { roleMap } from 'constants'
import { projectApi } from 'apis'
import SearchBar from 'components/SearchBar'
import WarnDialog from 'components/WarnDialog.vue'
import EditDialog from './EditDialog.vue'
import projectMixin from './mixin'
import TablePaginationMinx from '@/mixin/TablePaginationMinx'

export default {
  components: { SearchBar, WarnDialog, EditDialog },
  mixins: [ projectMixin, TablePaginationMinx ],
  props: {
    projectId: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      form: {
        curPerson: '',
        curRole: ''
      },
      curNotSelectPerson: '',
      // curPerson: '',
      // curRole: '',
      memberList: [],
      projectMemberList: [],
      curDeleteName: '',
      projMemberId: '',
      status: 'add',
      deleteType: 'delete',
      curName: '',
      loading: false,
      roleMap,
      showEditDialog: false,
      showWarnDialog: false,
      pageSize: 10,
      curPage: 1,
      totalNum: 0,
      tableData: [],
      searchText: '',
      curTitle: this.$t('projects.deleteParticipant')
    }
  },
  computed: {
    warnTitle: function () {
      return this.$t('projects.deleteParticipant')
    },
    editTitle: function () {
      if (this.status === 'edit') {
        return this.$t('projects.editParticipants')
      } else {
        return this.$t('projects.addParticipants')
      }
    },
    roleList: function () {
      return [
        {
          id: 1,
          value: 'manager',
          label: this.$t('projects.manager')
        },
        {
          id: 2,
          value: 'editor',
          label: this.$t('projects.editor')
        },
        {
          id: 3,
          value: 'viewer',
          label: this.$t('projects.viewer')
        }
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.initData()
  },
  methods: {
    dayjs,
    validate () {
      this.$refs['infoForm'].validate(valid => {
        if (valid) {
          this.submitCb()
        }
      })
    },
    submitCb () {
      if (this.status === 'add') {
        projectApi
          .addProjMember({
            projectId: this.projectId,
            role: this.form.curRole,
            userId: this.form.curPerson
          })
          .then(res => {
            const { code } = res
            if (code === 10000) {
              this.$message.success(this.$t('projects.addSuccessFul'))
              this.showEditDialog = false
              this.initData()
            } else {
              this.$message.error(this.$t('projects.addFailed'))
            }
          })
      } else {
        projectApi
          .updateProjMember({
            id: this.projMemberId,
            role: this.form.curRole,
            userId: this.form.curPerson
          })
          .then(res => {
            const { code } = res
            if (code === 10000) {
              this.$message.success(this.$t('projects.updateSuccessFul'))
              this.showEditDialog = false
              this.initData()
            } else {
              this.$message.error(this.$t('projects.updateFailed'))
            }
          })
      }
    },
    editFn (row) {
      this.status = 'edit'
      this.form.curPerson = row.userId
      this.form.curRole = row.role
      this.projMemberId = row.memberId
      this.showEditDialog = true
    },
    deleteCb () {
      projectApi
        .deleteProjMember({
          projMemberId: this.projMemberId
        })
        .then(res => {
          const { code } = res
          if (code === 10000) {
            this.$message.success(this.$t('projects.deleteSuccessFul'))
            this.showWarnDialog = false
            this.initData()
          } else {
            this.$message.error(this.$t('projects.deleteFailed'))
          }
        })
    },
    resetDialog () {
      this.form.curRole = ''
      this.form.curPerson = ''
    },
    addFn () {
      this.resetDialog()
      this.status = 'add'
      this.showEditDialog = true
    },
    deleteFn (row) {
      this.curTitle = this.$t('projects.deleteParticipant')
      this.projMemberId = row.memberId
      this.curDeleteName = row.userName
      this.showWarnDialog = true
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    searchCb (text) {
      this.searchText = text
      this.initData()
    },
    initData () {
      this.queryMemeberList()
      this.queryAllUsers()
      this.queryProjectUsers()
    },
    queryProjectUsers () {
      this.loading = true
      projectApi
        .queryProjectUsers(this.projectId)
        .then(res => {
          this.loading = false
          const { code, data } = res
          if (code === 10000) {
            this.projectMemberList = data
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    queryAllUsers () {
      this.loading = true
      projectApi
        .queryAllUserNickname()
        .then(res => {
          this.loading = false
          const { code, data } = res
          if (code === 10000) {
            this.memberList = data
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    queryMemeberList () {
      this.loading = true
      projectApi
        .queryProjMemberPageList({
          projectId: this.projectId,
          current: this.curPage,
          size: this.pageSize,
          userName: this.searchText
        })
        .then(res => {
          this.loading = false
          const { code, data } = res
          if (code === 10000) {
            this.tableData = data.items
            this.totalNum = data.total
          }
        })
        .catch(e => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-content-line {
  width: 100%;
  .edit-content-title {
    font-size: 12px;
    color: #333333;
    line-height: 12px;
    margin-bottom: 10px;
  }
  & ::v-deep .el-select {
    width: 100%;
  }
}
</style>