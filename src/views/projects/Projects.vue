<template>
  <div class="common-wrapper">
    <div class="data-wrapper pd20">
      <div class="data-wrapper-title">{{ $t('menu.projects') }}</div>
      <div class="table-search-bar">
        <SearchBar :placeholder="$t('projects.searchProject')" @searchCb="searchCb" />
        <el-button type="primary" icon="el-icon-plus" @click="addProjectFn">{{ $t('cases.newProject') }}</el-button>
      </div>
      <div class="table-box">
        <el-table v-loading="loading" style="width: 100%" :data="tableData">
          <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80">
          </el-table-column>
          <el-table-column :label="`${$t('common.name')}`">
            <template slot-scope="{ row }">
              <div class="pointer link-btn" @click="linkToView(row)">{{ row.projectName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="userName" :label="`${$t('projects.creator')}`"> </el-table-column>
          <el-table-column :label="`${$t('projects.creationTime')}`" width="160">
            <template slot-scope="{ row }">
              <div>{{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="`${$t('common.actions')}`" width="260">
            <template slot-scope="{ row }">
              <div class="table-btn-group">
                <span class="pointer link-btn" @click="showEdit(row)">{{ $t('common.edit') }}</span>
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
          win-width="600px"
          class="edit-dialog"
          :show.sync="showEditDialog"
          :title="$t('projects.editProject')"
          @submitCb="submitCb"
        >
          <div slot="content">
            <div class="content-box-title">{{ $t('node.baseInfo') }}</div>
            <div class="content-box">
              <el-form ref="projectEdit" label-position="top" :model="projectForm">
                <el-form-item prop="name" :label="$t('common.name')" :rules="rules">
                  <el-input v-model="projectForm.name" size="small" class="select-box"></el-input>
                </el-form-item>
                <el-form-item :label="$t('projects.desc')">
                  <el-input
                    v-model="projectForm.desc"
                    type="textarea"
                    rows="3"
                    size="small"
                    class="select-box"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </EditDialog>
        <WarnDialog :show.sync="showWarning" :title="warnTitle" @deleteCb="deleteCb">
          <div slot="content">
            <div v-if="lang === 'zh'" class="warn-content">
              <p>确认删除{{ deleteType }}&nbsp;{{ curName }}&nbsp;?</p>
            </div>
            <div v-else class="warn-content">
              <p>Are you sure to delete the{{ deleteType }}?</p>
              <p>&nbsp;{{ curName }}&nbsp;?</p>
            </div>
          </div>
        </WarnDialog>
      </div>
    </div>
  </div>
</template>

<script>
import WarnDialog from 'components/WarnDialog.vue'
import SearchBar from 'components/SearchBar'
import projectMixin from './components/mixin'
import { projectApi } from 'apis'
import dayjs from 'dayjs'
import EditDialog from './components/EditDialog.vue'
export default {
  components: { SearchBar, WarnDialog, EditDialog },
  mixins: [ projectMixin ],
  props: {},
  data () {
    return {
      loading: false,
      projectForm: {
        name: '',
        desc: ''
      },
      showEditDialog: false,
      curName: '',
      curSelectId: '',
      showWarning: false,
      totalNum: 0,
      tableData: [],
      pageSize: 10,
      curPage: 1,
      searchText: '',
      warnTitle: ''
    }
  },
  computed: {
    deleteType () {
      return this.$t('menu.projects')
    },
    initialVariable () {
      return {
        searchText: this.searchText,
        curPage: this.curPage,
        pageSize: this.pageSize
      }
    }
  },
  watch: {
    initialVariable: {
      handler: function (val) {
        this.initData()
      },
      deep: true
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    dayjs,
    submitCb () {
      this.$refs['projectEdit'].validate(valid => {
        if (valid) {
          projectApi
            .updateProject({
              id: this.curSelectId,
              projectName: this.projectForm.name,
              projectDesc: this.projectForm.desc
            })
            .then(res => {
              const { code } = res
              if (code === 10000) {
                this.showEditDialog = false
                this.$message.success(`${this.$t('projects.editProject')}${this.$t('common.success')}`)
                this.initData()
              }
            })
            .catch(e => {
              this.showEditDialog = false
            })
        }
      })
    },
    showEdit (row) {
      this.showEditDialog = true
      this.curSelectId = row.id
      this.projectForm.name = row.projectName
      this.projectForm.desc = row.projectDesc
    },
    deleteCb () {
      // 删除需要判断临界值 改变当前的页码
      projectApi
        .deleteProject({
          id: this.curSelectId
        })
        .then(res => {
          const { code } = res
          this.showWarning = false
          if (code === 10000) {
            this.$message.success(this.$t(`tip.deleteSuccess`))
            this.initData()
          } else {
            this.$message.error(this.$t(`tip.deleteFailed`))
          }
        })
    },
    deleteFn (row) {
      this.showWarning = true
      this.warnTitle = this.$t('projects.deleteProject')
      this.curName = row.projectName
      this.curSelectId = row.id
    },
    linkToView (row) {
      this.$router.push({
        // path: `/projects/projectView/${row.id}/${row.projectName}`
        name: 'projectView',
        query: {
          id: row.id,
          name: row.projectName
        }
      })
    },
    addProjectFn () {
      this.$router.push({
        name: 'createProject'
      })
    },
    handleSizeChange (size) {},
    handlePageChange () {},
    initData () {
      this.loading = true
      projectApi
        .queryProjectPageList({
          current: this.curPage,
          size: this.pageSize,
          projectName: this.searchText
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
    },
    searchCb (text) {
      this.searchText = text
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
.table-search-bar {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
.table-box {
  margin-top: 20px;
}
</style>