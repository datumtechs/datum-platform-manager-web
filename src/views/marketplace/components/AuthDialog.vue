<template>
  <el-dialog :visible="showForm" :title="$t('data.applyForAuth')" width="480px" class="dialog-box" @close="close">
    <div slot="title" class="dialog-title">
      {{ $t('data.applyForAuth') }}
    </div>
    <ApplyInfo ref="applyInfo" :form-obj="formObj" />
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      <el-button size="small" type="primary" @click="applyFn">{{ $t('data.apply') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ApplyInfo from './ApplyInfo.vue'
// import dayjs from 'dayjs'
// import { changeSizeFn } from '@/utils/utils'
import { dataApi } from 'apis'
import dayjs from 'dayjs'
export default {
  components: { ApplyInfo },
  props: {
    showForm: {
      type: Boolean,
      default: true
    },
    formObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters('app', ['address'])
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions('app', ['getLoginNonce', 'getUserType', 'resetLogin']),
    async applyFn() {
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
        const pass = checks[curMode]()
        pass && this.getAuth(begin, end, curMode)
      } else {
        await this.resetLogin()
        this.$Web3Service.connectWallet()
      }
    },
    async getAuth(begin, end) {
      const sign = await this.getSign()
      const type = await this.getUserType()
      const params = {
        authBeginTime: dayjs(begin).valueOf(),
        authEndTime: dayjs(end).valueOf(),
        authType: this.curMode,
        authValue: this.authValue,
        id: Number(this.formObj.id),
        sign,
        userType: type,
        address: this.address
      }
      dataApi.authData(params).then(res => {
        this.handleClose()
        this.$emit('query')
        if (res.code === 10000) {
          this.$message.success(this.$t('tip.authSuccess'))
        }
      })
    },
    async getSign() {
      try {
        await this.getLoginNonce()
        const sign = await this.$Web3Service.signForWallet()
        return sign
      } catch (error) {
        console.log(error)
      }
    },
    handleClose() {
      //保证关闭后刷新页面
      this.$emit('update:showForm', false)
    },
    close() {
      this.handleClose()
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-box {
  ::v-deep .el-dialog {
    border-radius: 10px;
  }
  .dialog-title {
    font-size: 18px;
    font-family: DINPro-Medium, Ali-Medium;
  }
}
</style>
