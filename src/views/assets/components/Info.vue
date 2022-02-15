<template>
  <el-descriptions :title="$t('node.baseInfo')" direction="vertical" :column="2" class="info-box">
    <el-descriptions-item :label="$t('roles.dataProvider')">
      <el-input v-model="detailObj.identityName" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('node.industry')">
      <el-input v-model="industry" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('assets.launchTime')">
      <el-input
        :value="dayjs(detailObj.publishAt).format('YYYY-MM-DD HH:mm:ss')"
        size="small"
        readonly
        class="info-input"
      ></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('assets.updateTime')">
      <el-input
        :value="dayjs(detailObj.updateTime).format('YYYY-MM-DD HH:mm:ss')"
        size="small"
        readonly
        class="info-input"
      ></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('assets.format')">
      <el-input v-model="fileType" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('node.dataSize')">
      <el-input v-model="dataSize" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('node.rowNum')">
      <el-input v-model="rowNum" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('node.colNum')">
      <el-input v-model="colNum" size="small" readonly class="info-input"></el-input>
    </el-descriptions-item>
    <el-descriptions-item :label="$t('node.dataDesc')">
      <el-input
        v-model="detailObj.dataDesc"
        size="small"
        type="textarea"
        rows="6"
        readonly
        class="info-input-textarea"
      ></el-input>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { INDUSTRYMAP } from '@/config/constants'
import { changeSizeFn, formatNumber } from 'utils'
import dayjs from 'dayjs'
export default {
  components: {},
  props: {
    detailObj: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    rowNum () {
      return formatNumber(this.detailObj.rows)
    },

    colNum () {
      return formatNumber(this.detailObj.columns)
    },

    dataSize () {
      return changeSizeFn(this.detailObj.size)
    },

    fileType () {
      return this.getType(this.detailObj.fileType)
    },

    industry () {
      return this.$t(`industry.${INDUSTRYMAP.get(Number(this.detailObj.industry))}`)
    }
  },
  methods: {
    dayjs,
    getType (type) {
      if (type === '0') {
        return ''
      } else {
        return 'CSV'
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