<template>
  <div class="common-wrapper">
    <div class="data-wrapper">
      <div class="data-top-box">
        <div class="data-left-box">
          <p class="data-left-title">{{ $t('menu.data') }}</p>
          <p v-if="lang === 'en'" class="data-slogan">
            <span class="num">{{ totalNum }}</span>
            <span class="text">pieces of metadata in the RosettaNet</span>
          </p>
          <p v-else class="data-slogan">
            <span class="text">共 </span>
            <span class="num">{{ totalNum }}</span>
            <span class="text">个已发布的可用数据</span>
          </p>
          <el-input
            v-model="searchText"
            clearable
            prefix-icon="el-icon-search"
            type="text"
            :placeholder="$t('data.searchForData')"
            class="search"
          >
            <!-- <template slot="append">
              <el-button type="primary" @click="showFilterFn">{{ $t('data.filter') }}</el-button>
            </template> -->
          </el-input>
          <!-- <FilterDialog :visible.sync="showFilter" /> -->
        </div>
        <div class="data-right-box">
          <img src="@/assets/images/data/14.bj.png" alt="" />
        </div>
      </div>
      <div v-loading="loading" class="loading-wrapper">
        <div class="data-card-box">
          <div v-for="box in cardList" :key="box.id" class="data-card">
            <img :src="getUrl(box.industry)" alt="" class="data-card-bg" />
            <p class="data-card-title">
              <img src="@/assets/images/default/dataS.svg" alt="" class="data-card-img" />
              <el-tooltip class="item" effect="dark" :content="box.dataName" placement="top">
                <span class="data-card-text">{{ box.dataName }}</span>
              </el-tooltip>
              <!-- <span class="data-card-text">{{ box.dataName }}</span> -->
            </p>
            <div class="data-card-detail-box">
              <el-row class="mb12 data-card-detail-line">
                <el-col :span="12" class="data-card-detail-label">{{ $t('common.dataProvider') }}</el-col>
                <el-col :span="12" class="data-card-detail-value">{{ box.identityName }}</el-col>
              </el-row>
              <el-row class="mb12 data-card-detail-line">
                <el-col :span="12" class="data-card-detail-label">{{ $t('node.industry') }}</el-col>
                <el-col :span="12" class="data-card-detail-value">{{ getIndustry(box.industry) }}</el-col>
              </el-row>
              <el-row class="mb12 data-card-detail-line">
                <el-col :span="12" class="data-card-detail-label">{{ $t('node.dataType') }}</el-col>
                <el-col :span="12" class="data-card-detail-value">{{ getFileType(box.fileType) }}</el-col>
              </el-row>
              <el-row class="mb12 data-card-detail-line">
                <el-col :span="12" class="data-card-detail-label">{{ $t('node.dataSize') }}</el-col>
                <el-col :span="12" class="data-card-detail-value">{{ changeSizeFn(box.size) }}</el-col>
              </el-row>
            </div>
            <div class="btn-box">
              <!-- 授权状态: -1-未知(1.未登录故获取不到授权状态 2.用户未申请使用元数据), 0-已申请(待审核), 1-已授权, 2-已拒绝, 3-已撤销, 4-已失效") -->
              <div class="btn view pointer" @click="linkToMetadata(box)">{{ $t('node.viewMetaData') }}</div>
              <div v-if="box.authStatus == 0" class="btn applied-btn">{{ $t('data.applied') }}</div>
              <div v-else-if="box.authStatus == 1" class="btn auth-btn">{{ $t('data.authed') }}</div>
              <!-- 已拒绝数据申请可再次申请 -->
              <!-- <div v-else-if="box.authStatus == 2" class="btn refuse-btn pointer" @click="reAuthFn(box)">
                {{ $t('projects.refused') }}
              </div> -->
              <div v-else class="btn notAuth-btn pointer" @click="showDialog(box)">{{ $t('data.applyAuth') }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <div></div>
        <el-pagination
          background
          :total="totalNum"
          :page-size.sync="pageSize"
          :current-page.sync="curPage"
          :page-sizes="[8, 20, 50, 100]"
          layout="total,sizes, prev, pager, next"
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    <!-- <AuthDialog v-if="showForm" @_close="close" :form-obj="formObj" /> -->
    <AuthDialog v-if="showForm" :show-form.sync="showForm" @query="initData" :form-obj="formObj" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import { dataApi } from 'apis'
import { INDUSTRYMAP, FILEMAP } from 'constants'

import { changeSizeFn } from 'utils'
import AuthDialog from './components/AuthDialog.vue'
// import ConnectorDialog from '/components/ConnectorDialog.vue'

export default {
  components: {
    AuthDialog
    // ConnectorDialog
  },
  data() {
    return {
      loading: false,
      showForm: false,
      pageSize: 8,
      curPage: 1,
      totalNum: 0,
      searchText: '',
      formObj: {
        dataName: '',
        identityName: '',
        size: 0,
        rows: 0,
        id: ''
      },
      cardList: []
    }
  },
  computed: {
    ...mapGetters('app', ['user'])
  },
  watch: {
    searchText(val) {
      this.sensitive()
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    changeSizeFn,
    handleSizeChange() {
      this.initData()
    },
    handlePageChange() {
      this.initData()
    },
    setCurFormData(box) {
      this.showForm = true
      this.formObj.dataName = box.dataName
      this.formObj.identityName = box.identityName
      this.formObj.size = box.size
      this.formObj.rows = box.rows
      this.formObj.id = box.id
    },
    showDialog(box) {
      if (this.user) {
        this.setCurFormData(box)
      } else {
        // this.showConnector = true
        this.$bus.$emit('showConnector', true)
        // 进入登录  调用 head function
        // this.$Web3Service.connectWallet()
      }
    },
    sensitive: debounce(function () {
      this.initData()
    }, 500),
    initData() {
      this.loading = true
      dataApi
        .queryDataPageList({
          current: this.curPage,
          size: this.pageSize,
          dataName: this.searchText
        })
        .then(res => {
          this.loading = false
          if (res.code === 10000) {
            this.cardList = res.data.items
            this.totalNum = res.data.total
          }
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    showFilterFn() {
      this.showFilter = !this.showFilter
    },
    linkToMetadata(box) {
      this.$router.push({
        name: 'metaDetail',
        query: {
          metaDataId: box.metaDataId,
          orgName: box.dataName
        }
      })
    },
    getFileType(type) {
      return FILEMAP.get(Number(type)) ? FILEMAP.get(Number(type)) : ''
    },
    getIndustry(industry) {
      const dust = INDUSTRYMAP.get(Number(industry))
      if (dust) {
        return this.$t(`industry.${dust}`)
      }
      return ''
    },
    getUrl(industry) {
      const imgName = INDUSTRYMAP.get(Number(industry))
      if (imgName) {
        if (
          imgName === 'banking' ||
          imgName === 'insurance' ||
          imgName === 'securities' ||
          imgName === 'othersFinance'
        ) {
          return require('../../assets/images/industry/banking.png')
        }
        return require(`../../assets/images/industry/${imgName}.png`)
      } else {
        // default
        return require(`../../assets/images/industry/banking.png`)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.data-wrapper {
  width: 1200px;
  margin: 30px auto;
  min-height: calc(100vh - 152px);
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  .data-top-box {
    display: flex;
    justify-content: space-between;
    .data-left-box {
      position: relative;
      .data-left-title {
        font-family: DINPro-Medium, Ali-Medium;
        font-size: 40px;
        color: #1d2832;
      }
      .data-slogan {
        margin-top: 14px;
        line-height: 51px;
        .text {
          font-size: 15px;
          color: #000014;
          line-height: 38px;
        }
        .num {
          font-family: DINPro-Medium, Ali-Medium;
          font-size: 30px;
          color: #2d1069;
        }
      }
      .search {
        width: 400px;
        ::v-deep .el-input-group__append,
        .el-input-group__prepend {
          background: #2d1069;
          color: #ffffff;
        }
      }
    }
  }
  .data-card-box {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    .data-card {
      width: 259px;
      height: 343px;
      background: #ffffff;
      border: 1px solid #e3e8fb;
      border-radius: 4px;
      margin-bottom: 40px;
      &:not(:nth-child(4n + 4)) {
        margin-right: 38px;
      }
      .data-card-title {
        display: flex;
        align-items: center;
        margin: 10px 14px;
        .data-card-img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .data-card-text {
          font-family: DINPro-Medium, Ali-Medium;
          font-size: 14px;
          color: #1d2832;
          margin-left: 10px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .data-card-detail-box {
        padding: 0 14px;
        overflow: hidden;
        .data-card-detail-line {
          line-height: 17px;
        }
        .data-card-detail-label {
          font-size: 12px;
          color: #5d5c65;
        }
        .data-card-detail-value {
          font-size: 12px;
          color: #1d2832;
          text-align: right;
          white-space: nowrap;
        }
      }
      .btn-box {
        height: 58px;
        border-top: 1px solid #ebeef9;
        display: flex;
        align-items: center;
        padding: 0 14px;
        gap: 23px;
        .btn {
          flex: 1;
          width: 105px;
          height: 30px;
          border-radius: 15px;
          color: #fff;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .view {
          border: 1px solid #3c3588;
          background-color: #fff;
          color: #3c3588;
        }
        .auth-btn {
          border: 1px solid #0bb27a;
          background: #0bb27a;
        }
        .applied-btn {
          border: 1px solid #f5a623;
          background: #f5a623;
        }
        .refuse-btn {
          border: 1px solid #f5a623;
          background: #f5a623;
        }
        .notAuth-btn {
          border: 1px solid #3c3588;
          background: #3c3588;
        }
      }
    }
  }
}
</style>
