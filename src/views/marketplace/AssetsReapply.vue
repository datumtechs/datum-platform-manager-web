<template>
  <div class="common-wrapper">
    <div class="data-wrapper">
      <Breadcrumb :cur-name="dataName" />
      <div class="reapply-box">
        <ApplyInfo ref="applyInfo" :form-obj="formObj" />
      </div>
      <div slot="footer" class="footer">
        <el-button size="small" class="footer-btn" @click="handleClose">{{ $t('common.cancel') }}</el-button>
        <el-button
          size="small"
          class="footer-btn"
          type="primary"
          @click="applyFn"
        >{{ $t('data.apply') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from 'components/breadcrumb/Breadcrumb.vue'
import { dataApi, assetsApi } from 'apis'
import ApplyInfo from './components/ApplyInfo.vue'
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
  components: { Breadcrumb, ApplyInfo },
  props: {},
  data () {
    return {
      formObj: {
        dataName: '',
        identityName: '',
        size: '',
        rows: ''
      }
    }
  },
  computed: {
    dataName () {
      return this.$route.query.dataName
    },
    metaDataPkId () {
      return this.$route.query.metaDataPkId
    },
    userMetaDataId () {
      return this.$route.query.id
    },
    metaDataId () {
      return this.$route.query.metaDataId
    },
    ...mapGetters('app', [ 'address' ])
  },
  watch: {},
  mounted () {
    this.initData()
  },
  methods: {
    ...mapActions('app', [ 'getLoginNonce', 'getUserType', 'resetLogin' ]),
    searchCb () { },
    initData () {
      assetsApi
        .getMetaDetail({
          metaDataPkId: this.metaDataPkId,
          userMetaDataId: this.userMetaDataId
        })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            this.formObj.dataName = data.dataName
            this.formObj.identityName = data.identityName
            this.formObj.size = data.size
            this.formObj.rows = data.rows
          }
        })
    },
    handleClose () {
      this.$router.go(-1)
    },
    async applyFn () {
      const that = this
      const { curMode, startDate, startTime, endDate, endTime, authValue } = that.$refs.applyInfo.queryParams()

      this.curMode = curMode
      this.authValue = authValue
      let begin, end
      const checks = {
        1: () => {
          if (!startDate || !startTime || !endDate || !endTime) {
            that.$message.error(that.$t('tip.plzInputTime'))
            return false
          }
          // TODO 输入截止小于开始时间
          begin = startDate + ' ' + startTime
          end = endDate + ' ' + endTime
          return true
        },
        2: () => {
          if (!authValue) {
            that.$message.error(that.$t('tip.plzInputTimes'))
            return false
          }
          return true
        }
      }
      // 判断是否登录 未登录 先调用登录
      if (that.address) {
        // 校验 请输入时间 请输入次数
        const pass = checks[ curMode ]()
        pass && this.getAuth(begin, end, curMode)
      } else {
        await this.resetLogin()
        this.$Web3Service.connectWallet()
      }
    },
    async getAuth (begin, end) {
      const sign = await this.getSign()
      const type = await this.getUserType()
      const params = {
        authBeginTime: dayjs(begin).valueOf(),
        authEndTime: dayjs(end).valueOf(),
        authType: this.curMode,
        authValue: this.authValue,
        metaDataId: this.metaDataId,
        sign,
        userType: type,
        address: this.address
      }
      dataApi.authData(params).then(res => {
        if (res.code === 10000) {
          this.$message.success(this.$t('tip.authSuccess'))
          this.handleClose()
        } else {
          this.$message.error(this.$t('tip.authFailed'))
        }
      })
    },
    async getSign () {
      try {
        await this.getLoginNonce()
        const sign = await this.$Web3Service.signForWallet()
        return sign
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.reapply-box {
  width: 600px;
  margin: 20px 20px;
  .title {
    padding-top: 30px;
    font-family: DINPro-Medium, Ali-Medium;
    font-size: 16px;
    color: #120d33;
    line-height: 18px;
  }
  .line {
    margin: 20px 20px 0;
  }
  .full-line {
    width: 1000px;
    .input-date {
      width: 160px;
    }
    .and {
      text-align: center;
      line-height: 32px;
    }
  }
}
.footer {
  margin: 40px 0 0 20px;
  padding: 0 20px;
  .footer-btn {
    width: 140px;
  }
}
</style>