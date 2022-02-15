<template>
  <div class="flow-wrapper">
    <div class="search-box">
      <SearchBar @searchCb="searchCb" />
      <el-button type="primary" @click="createFlow">{{ $t('projects.createFlow') }}</el-button>
    </div>
    <div class="tabs-table">
      <el-table v-loading="loading" border style="width: 100%" :data="tableData">
        <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"> </el-table-column>
        <el-table-column :label="`${$t('common.name')}`">
          <template slot-scope="{ row }">
            <div class="link-btn pointer" @click="linkToEdit(row)">
              {{ row.workflowName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('projects.creator')}`" width="350">
          <template slot-scope="{ row }">
            <div>{{ row.userName }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('projects.creationTime')}`" width="150">
          <template slot-scope="{ row }">
            <div>{{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('common.actions')}`" width="260">
          <template slot-scope="{ row }">
            <div class="table-btn-group">
              <span class="pointer link-btn" @click="editFn(row)">{{ $t('common.edit') }}</span>
              <!-- <span class="pointer link-btn">{{ $t('common.copy') }}</span> -->
              <span class="pointer warn-btn" @click="deleteFn(row)">{{ $t('common.delete') }}</span>
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
      <EditDialog
        v-if="showEditDialog"
        :win-width="'600px'"
        :show.sync="showEditDialog"
        :title="status === 'add' ? $t('projects.createFlow') : $t('projects.editFlow')"
        @submitCb="validate"
      >
        <div slot="content">
          <!-- <div v-if="status === 'add'" class="export-box pointer">
            <img src="@/assets/images/projects/6.icon1.svg" alt="" class="export-img" />
            <span class="export-text">{{ $t('projects.exportWorkFlow') }}</span>
          </div> -->
          <div class="export-form">
            <el-form ref="infoForm" label-position="top" :model="exportForm" @submit.native.prevent>
              <el-form-item prop="name" :label="$t('common.name')" :rules="rules">
                <el-input v-model="exportForm.name" size="small"></el-input>
              </el-form-item>
              <el-form-item :label="$t('projects.desc')">
                <el-input v-model="exportForm.desc" rows="4" type="textarea" size="small"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </EditDialog>
      <WarnDialog
        :show.sync="showWarning"
        :confirm-text="$t('common.delete')"
        :title="$t('projects.deleteWorkflow')"
        :cur-name="curName"
        @deleteCb="deleteCb"
      >
        <div slot="content">{{ $t('projects.deleteWorkflowTip') }}&nbsp;'{{ curName }}'?</div>
      </WarnDialog>
    </div>
  </div>
</template>

<script>
import SearchBar from 'components/SearchBar'
import { projectApi } from 'apis'
import dayjs from 'dayjs'
import WarnDialog from 'components/WarnDialog'
import EditDialog from './EditDialog'
import projectMixin from './mixin'
import TablePaginationMinx from '@/mixin/TablePaginationMinx'
export default {
  components: { SearchBar, EditDialog, WarnDialog },
  mixins: [ projectMixin, TablePaginationMinx ],
  props: {
    projectId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      exportForm: {
        name: '',
        desc: ''
      },
      curId: '',
      curName: '',
      showWarning: false,
      status: 'add',
      showEditDialog: false,
      loading: false,
      pageSize: 10,
      curPage: 1,
      totalNum: 0,
      tableData: [],
      searchText: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.initData()
  },
  methods: {
    dayjs,
    linkToEdit (row) {
      this.$router.push({
        name: 'workflowEdit',
        query: {
          id: row.id,
          name: row.workflowName,
          projectId: this.projectId
        }
      })
    },
    deleteCb () {
      projectApi.deleteWorkflow(this.curId).then(res => {
        const { code, msg } = res
        if (code === 10000) {
          this.$message.success(msg)
          this.showWarning = false
          this.initData()
        }
      })
    },
    deleteFn (row) {
      this.curId = row.id
      this.curName = row.workflowName
      this.showWarning = true
    },
    editFn (row) {
      this.status = 'edit'
      this.curId = row.id
      this.exportForm.name = row.workflowName
      this.exportForm.desc = row.workflowDesc
      this.showEditDialog = true
    },
    validate () {
      this.$refs['infoForm'].validate(valid => {
        if (valid) {
          this.submitCb()
        }
      })
    },
    async submitCb () {
      const data = {
        projectId: this.projectId,
        id: this.projectId,
        workflowName: this.exportForm.name,
        workflowDesc: this.exportForm.desc
      }
      let res
      if (this.status === 'add') {
        data.projectId = this.projectId
        res = await projectApi.addWorkflow(data)
      } else {
        data.id = this.curId
        res = await projectApi.editWorkflow(data)
      }
      const { code, msg } = res
      if (code === 10000) {
        this.status === 'add'
        this.$message.success(msg)
        // ? this.$message.success(this.$t('projects.createFlowSuccessFul'))
        // : this.$message.success(this.$t('projects.editFlowSuccessFul'))
        this.showEditDialog = false
        this.initData()
      }
    },
    createFlow () {
      this.status = 'add'
      this.exportForm.name = ''
      this.exportForm.desc = ''
      this.showEditDialog = true
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
        .queryWorkflowlist({
          projectId: this.projectId,
          current: this.curPage,
          size: this.pageSize,
          workflowName: this.searchText
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
.export-box {
  box-sizing: border-box;
  width: 540px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #3c3588;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .export-img {
    width: 16px;
    margin-right: 8px;
  }
  .export-text {
    align-items: center;
    font-family: DINPro-Medium, Ali-Medium;
    font-size: 12px;
    color: #3c3588;
    line-height: 36px;
  }
}
.export-form {
  font-size: 12px;
  color: #333333;
}
</style>