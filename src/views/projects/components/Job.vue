<template>
  <div class="flow-wrapper">
    <div class="search-box">
      <SearchBar @searchCb="searchCb" />
      <el-button type="primary" @click="newJob">{{ $t('projects.createJob') }}</el-button>
    </div>
    <div class="tabs-table">
      <el-table v-loading="loading" style="width: 100%" :data="tableData">
        <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"> </el-table-column>
        <el-table-column prop="name" :label="`${$t('common.name')}`">
          <template slot-scope="{ row }">
            <div class="link-btn pointer" @click="linkToSubJob(row)">{{ row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="creator" :label="`${$t('projects.associatedWorkflow')}`">
          <template slot-scope="{ row }">
            <div>{{ row.workflowName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="creator" :label="`${$t('projects.creationTime')}`">
          <template slot-scope="{ row }">
            <div>{{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('common.actions')}`" width="260">
          <template slot-scope="{ row }">
            <div class="table-btn-group">
              <el-button class="pointer link-btn" type="text" @click="editFn(row)">{{ $t('common.edit') }}</el-button>
              <el-button
                class="pointer link-btn"
                :disabled="row.jobStatus !== 1"
                type="text"
                @click="actionFn(row, 1)"
                >{{ $t('common.pause') }}</el-button
              >
              <!-- 0-未开始,1-运行中,2-运行成功,3-运行失败 -->
              <el-button
                class="pointer link-btn"
                :disabled="row.jobStatus !== 0"
                type="text"
                @click="actionFn(row, 2)"
                >{{ $t('common.restart') }}</el-button
              >
              <el-button class="pointer warn-btn" type="text" @click="deleteFn(row)">{{
                $t('common.delete')
              }}</el-button>
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
    </div>
    <EditDialog
      v-if="showEditDialog"
      win-width="600px"
      class="edit-dialog"
      :show.sync="showEditDialog"
      :title="$t('projects.editJob')"
      @submitCb="validate"
    >
      <div slot="content">
        <div class="content-box-title">{{ $t('node.baseInfo') }}</div>
        <div class="content-box">
          <el-form ref="infoForm" label-position="top" :model="jobForm">
            <el-form-item prop="name" :label="$t('common.name')" :rules="rules">
              <el-input v-model="jobForm.name" size="small" class="select-box"></el-input>
            </el-form-item>
            <el-form-item :label="$t('projects.desc')">
              <el-input v-model="jobForm.desc" type="textarea" rows="3" size="small" class="select-box"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </EditDialog>
    <JobFlow :show-add-dialog.sync="showAddDialog" :project-id="projectId" @initData="initData" />
  </div>
</template>

<script>
import { projectApi } from 'apis'
import SearchBar from 'components/SearchBar'
import EditDialog from './EditDialog.vue'
import dayjs from 'dayjs'
import { mapMutations } from 'vuex'
import projectMixin from './mixin'
import JobFlow from './JobFlow.vue'
import TablePaginationMinx from '@/mixin/TablePaginationMinx'

export default {
  components: { SearchBar, EditDialog, JobFlow },
  mixins: [ projectMixin, TablePaginationMinx ],
  props: {
    projectId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      curJobId: '',
      curStep: 1,
      pageSize: 10,
      curPage: 1,
      totalNum: 0,
      tableData: [],
      searchText: '',
      showEditDialog: false,
      showAddDialog: false,
      loading: false,
      curStep3Err: '',
      jobForm: {
        name: '',
        desc: ''
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    ...mapMutations('workflow', [ 'SET_SUB_JOB_NAME' ]),
    dayjs,
    deleteFn (item) {
      projectApi.deleteBatchJob({ jobIds: [ item.id ] }).then(res => {
        const { code, msg } = res
        if (code === 10000) {
          this.$message.success(msg)
          this.initData()
        }
      })
    },
    actionFn (item, type) {
      projectApi
        .actionJob({
          actionType: type,
          id: item.id
        })
        .then(res => {
          const { code, msg } = res
          if (code === 10000) {
            this.$message.success(msg)
            this.initData()
          }
        })
    },
    datePickerChange (value, type = 2) {
      const timestamp = new Date(`${value} 00:00:00`).getTime()
      if (this.timestamp === timestamp) {
        this[`pickerOptions${type}`].selectableRange = `${this.getHM().H}:${this.getHM().M}:00-23:59:59`
      } else {
        this[`pickerOptions${type}`].selectableRange = `00:00:00-23:59:59`
      }
    },
    linkToSubJob (row) {
      this.SET_SUB_JOB_NAME(row.name)
      this.$router.push({
        name: 'subJob',
        query: {
          id: row.id,
          name: row.name
        }
      })
    },
    editFn (row) {
      this.curJobId = row.id
      this.curStep = 1
      this.jobForm.name = row.name || ''
      this.jobForm.desc = row.desc || ''
      this.showEditDialog = true
    },
    validate () {
      this.$refs['infoForm'].validate(valid => {
        if (valid) {
          this.submitCb()
        }
      })
    },
    submitCb () {
      // TODO:检验
      projectApi
        .editJobBaseInfo({
          id: this.curJobId,
          desc: this.jobForm.desc,
          name: this.jobForm.name
        })
        .then(res => {
          const { code, msg } = res
          if (code === 10000) {
            this.showEditDialog = false
            this.$message.success(msg)
            this.resetjobDate()
            this.initData()
          }
        })
    },
    newJob () {
      this.curStep = 1
      this.showAddDialog = true
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    searchCb (text) {
      this.searchText = text
      this.initData()
    },

    initData () {
      this.loading = true
      projectApi
        .queryJobList({
          projectId: this.projectId,
          current: this.curPage,
          size: this.pageSize,
          jobName: this.searchText
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
.edit-dialog {
  ::v-deep .el-dialog {
    min-height: 325px;
  }
  .content-box {
    margin: 20px auto;
    width: 100%;
    .content-line {
      margin-bottom: 22px;
      // &:last-child {
      // margin-bottom: 76px;
      // }
    }
    .date-box {
      white-space: nowrap;
      display: flex;
      gap: 10px;
      align-items: center;
      .input-date {
        width: 265px;
      }
      .data-box-text {
        line-height: 32px;
      }
    }
    .title-box {
      font-size: 12px;
      color: #333333;
      line-height: 12px;
      margin-bottom: 10px;
    }
    .select-box {
      width: 100%;
    }
  }
  .btn-box {
    // position: absolute;
    // bottom: 20px;
    // right: 30px;
    display: flex;
    justify-content: flex-end;
    .next-btn {
      width: 120px;
      height: 36px;
      border: 1px solid #3c3588;
      border-radius: 2px;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 12px;
    }
    :nth-child(2) {
      margin-left: 20px;
    }
  }
}
</style>