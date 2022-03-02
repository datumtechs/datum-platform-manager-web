<template>
  <el-descriptions
    :title="$t('assets.authorization')"
    direction="vertical"
    :column="1"
    class="info-box"
  >
    <el-descriptions-item :label="$t('assets.authType')">
      <el-input v-model="curType" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('assets.applicationTime')">
      <el-input
        :value="dayjs(detailObj.applyTime).format('YYYY-MM-DD HH:mm:ss')"
        size="small"
        readonly
        class="info-input"
      ></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('assets.authValue')">
      <el-input v-model="authValueStr" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
    <el-descriptions-item v-if="detailObj.authType === 2" :label="$t('assets.usedValue')">
      <el-input v-model="useAuthValue" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import { formatNumber } from 'utils'
import dayjs from 'dayjs'
export default {
  props: {
    detailObj: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    curType () {
      return this.getType(this.detailObj.authType)
    },
    authValueStr () {
      if (this.detailObj.authType === 1) return `${dayjs(this.detailObj.authBeginTime).format('YYYY-MM-DD HH:mm:ss')} To ${dayjs(this.detailObj.authEndTime).format('YYYY-MM-DD HH:mm:ss')}`
      return formatNumber(this.detailObj.authValue)
    },
    useAuthValue () {
      return formatNumber(this.detailObj.usedTimes)
    }
  },
  mounted () { },
  methods: {
    dayjs,
    getType (type) {
      switch (type) {
        case 1:
          return this.$t('data.byTime')
        case 2:
          return this.$t('data.byNumber')
        case 3:
          return this.$t('data.permanent')
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.info-box {
  width: 880px;
  .info-input {
    width: 400px;
  }
  .info-input-textarea {
    width: 840px;
  }
}
</style>