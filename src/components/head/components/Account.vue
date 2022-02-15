<template>
  <el-form ref="form" size="small" :rules="rules" :model="form" :label-width="lang === 'zh' ? '80px' : '120px'">
    <el-form-item :label="`${$t('head.walletAddress')}:`">
      <div :class="{ 'wallet-address': true, 'en-wallet-address': lang !== 'zh' ? true : false }">
        <span>
          {{ address }}
          <input ref="copyAddress" v-model="address" class="copy-Address" />
        </span>
        <br v-if="lang !== 'zh'" />
        <span>
          <i class="el-icon-document-copy" @click="copy"></i>
          <a :href="`https://scan.platon.network/address-detail?address=${address}`" target="_blank">{{
            $t('head.viewExplorer')
          }}</a>
        </span>
      </div>
    </el-form-item>
    <el-form-item :label="`${$t('common.nickname')}:`" prop="nickname">
      <el-input v-model="form.nickname" size="small" :placeholder="$t('head.nickPlaceholder')" :max="20"></el-input>
    </el-form-item>
    <el-form-item label=" ">
      <div class="button-wrap">
        <el-button size="small" @click="cancel">{{ $t('common.cancel') }}</el-button>
        <el-button size="small" type="primary" @click="submit">{{ $t('common.apply') }}</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  inheritAttrs: false,
  props: {
    address: {
      default: '',
      type: String
    }
  },
  data () {
    const self = this
    return {
      form: {
        nickname: ''
      },
      rules: {
        nickname: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(`${self.$t('head.nickPlaceholder')}`))
              } else if (String(value).length < 3 || String(value).length > 20) {
                callback(new Error(`${self.$t('head.nickValidateTips')}`))
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
  inject: [ 'address' ],
  computed: {
    ...mapGetters('app', [ 'user' ])
  },
  watch: {
    user: function () {
      this.form.nickname = this.user
    }
  },
  mounted () {
    this.form.nickname = this.user
  },
  methods: {
    ...mapActions('app', [ 'updateAuth' ]),
    copy () {
      // 有兼容性 暂时先这样
      try {
        const copyAddress = this.$refs.copyAddress
        copyAddress.select()
        const res = document.execCommand('copy')
        if (res) {
          this.$message.success(this.$t('head.copyStatusSuccess'))
          return
        }
        this.$message.error(this.$t('head.copyStatusFailed'))
      } catch {
        this.$message.error(this.$t('head.copyStatusFailed'))
      }
    },
    cancel () {
      this.$emit('close')
    },
    submit () {
      const self = this
      self.$refs.form.validate(valid => {
        if (valid) {
          self.updateAuth({ address: self.address, nickName: self.form.nickname })
          self.cancel()
        }
      })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>