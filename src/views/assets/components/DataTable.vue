
<template>
  <div class="tabs-table">
    <el-table v-loading="dataLoading" style="width: 100%" :data="tableData">
      <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"></el-table-column>
      <el-table-column prop="dataName" :label="`${$t('node.dataName')}`"></el-table-column>
      <el-table-column prop="authType" :label="`${$t('assets.authType')}`">
        <template slot-scope="{ row }">
          <div>{{ getType(row.authType) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="authValue" :label="`${$t('assets.authValue')}`" width="180">
        <template slot-scope="{ row }">
          <div v-if="row.authType === 1">
            <p>{{ dayjs(row.authBeginTime).format('YYYY-MM-DD HH:mm:ss') }} &nbsp;&nbsp;To</p>
            <p>{{ dayjs(row.authEndTime).format('YYYY-MM-DD HH:mm:ss') }}</p>
          </div>
          <div v-if="row.authType === 2">{{ formatNumber(row.authValue) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="identityName" :label="`${$t('assets.owner')}`"></el-table-column>
      <el-table-column prop="applyTime" :label="`${$t('assets.applicationTime')}`">
        <template slot-scope="{ row }">
          <div>{{ dayjs(row.applyTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="authStatus" :label="`${$t('assets.status')}`">
        <!-- 0-申请中, 1-已授权, 2-已拒绝, 3-已失效 4-已失效 -->
        <template slot-scope="{ row }">
          <div>{{ getStatus(row.authStatus) }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="`${$t('common.actions')}`" width="200">
        <template slot-scope="{ row }">
          <div v-if="row.actionShow === 0" class="table-btn-group">
            <span class="pointer link-btn" @click="viewFn(row)">{{ $t('assets.view') }}</span>
            <!-- <span class="pointer link-btn" @click="revokeFn(row)">{{ $t('assets.revoke') }}</span>
            <span class="pointer link-btn" @click="reapply(row)">{{ $t('assets.reapply') }}</span>-->
          </div>
          <div v-if="row.actionShow === 1" class="table-btn-group">
            <span class="pointer link-btn" @click="reapply(row)">{{ $t('assets.reapply') }}</span>
          </div>
          <div v-if="row.actionShow === 2" class="table-btn-group">
            <span class="pointer warn-btn" @click="revokeFn(row)">{{ $t('assets.revoke') }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div></div>
      <el-pagination
        background
        :total="totalDataNum"
        :page-size.sync="pageSize"
        :current-page.sync="curPage"
        :page-sizes="[ 10, 20, 50, 100 ]"
        layout="total,sizes, prev, pager, next"
        class="pagination"
        @size-change="row => $emit('update:pageSize', row)"
        @current-change="row => $emit('update:curPage', row)"
      />
    </div>
    <WarnDialog
      :show.sync="showWarning"
      :confirm-text="confirmText"
      :title="warnTitle"
      :cur-name="curName"
      @deleteCb="deleteCb"
    >
      <div slot="content">
        <div>{{ $t('assets.confirmRevoke') }}&nbsp;"{{ curName }}"?</div>
      </div>
    </WarnDialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'
import WarnDialog from 'components/WarnDialog'
import { assetsApi } from 'apis'
import { formatNumber } from 'utils'
export default {
  components: { WarnDialog },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    totalDataNum: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    curPage: {
      type: Number,
      default: 1
    },
    dataLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: true,
      showWarning: false,
      curName: '',
      curId: '',
      metaDataPkId: ''
    }
  },
  computed: {
    ...mapGetters('app', [ 'user', 'address' ]),
    warnTitle () {
      return this.$t('assets.revoke')
    },
    confirmText () {
      return this.$t('common.apply')
    }
  },
  methods: {
    ...mapActions('app', [ 'getLoginNonce' ]),
    formatNumber,
    dayjs,
    async deleteCb () {
      if (this.user) {
        await this.getLoginNonce()
        const res = await this.$Web3Service.signForWallet()
        res && this.revokeAssets(res)
      } else {
        // this.showConnector = true
        this.$bus.$emit('showConnector', true)
        // 进入登录  调用 head function
        // this.$Web3Service.connectWallet()
      }
    },
    revokeAssets (sign) {
      assetsApi
        .revokeAssets({
          address: this.address,
          metadataAuthId: this.curId,
          sign
        })
        .then(res => {
          const { code } = res
          this.showWarning = false
          if (code === 10000) {
            this.$message.success(this.$t('common.actionSuccessFul'))
            this.$parent.initData()
          } else {
            this.$message.error(this.$t('common.actionFailed'))
          }
        })
    },
    getType (type) {
      switch (type) {
        case 0:
          return 'N/A'
        case 1:
          return this.$t('data.byTime')
        case 2:
          return this.$t('data.byNumber')

        default:
          break
      }
    },
    //  0-已申请(待审核), 1-已授权, 2-已拒绝, 3-已撤销, 4-已失效
    getStatus (status) {
      switch (status) {
        case 0:
          return this.$t('projects.applying')
        case 1:
          return this.$t('projects.authorized')
        case 2:
          return this.$t('projects.refused')
        case 3:
          return this.$t('projects.cancelled')
        case 4:
          return this.$t('projects.expired')
        default:
          return 'N/A'
      }
    },

    handlePageChange (page) {
      this.$emit('changeDataCurpage', page)
    },
    handleSizeChange (size) {
      this.$emit('changeDataPageSize', size)
    },
    indexMethod (index) {
      return (this.curPage - 1) * this.pageSize + index + 1
    },
    viewFn (row) {
      this.$router.push({
        path: '/assets/detail',
        query: {
          id: row.id,
          metaDataId: row.metaDataId,
          metaDataPkId: row.metaDataPkId,
          curName: row.dataName
        }
      })
    },
    revokeFn (row) {
      this.showWarning = true
      this.curName = row.dataName
      this.curId = row.metaDataAuthId
      this.metaDataPkId = row.metaDataPkId
    },
    // 重置
    reapply (row) {
      this.$router.push({
        name: 'assetsReapply',
        query: {
          id: row.id,
          dataName: row.dataName,
          metaDataPkId: row.metaDataPkId,
          metaDataId: row.metaDataId
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>