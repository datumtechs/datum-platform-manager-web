<template>
  <el-dialog
    :title="$t('projects.runningResult')"
    :visible="resultVisible"
    @close="$emit('update:resultVisible', false)"
  >
    <div v-loading="loading" class="result-section">
      <div v-for="item in taskResultList" :key="item.identityId" class="result-card">
        <!-- <p class="result-title">
        {{ `结果-${index + 1}` }}
      </p> -->
        <el-form label-width="110px" label-position="left" class="result-form" size="mini">
          <el-form-item :label="`${$t('result.orgName')}`">
            <span>{{ item.identityName || '' }}</span>
          </el-form-item>
          <el-form-item :label="`${$t('result.orgId')}`">
            <span>{{ item.identityId || '' }}</span>
          </el-form-item>
          <el-form-item label="IP">
            <span>{{ item.ip || '' }}</span>
          </el-form-item>
          <el-form-item :label="$t('result.port')">
            <span>{{ item.port || '' }}</span>
          </el-form-item>
          <el-form-item :label="$t('result.fileName')">
            <span>{{ item.fileName || '' }}</span>
          </el-form-item>
          <el-form-item :label="$t('result.filePath')">
            <span>{{ item.filePath || '' }}</span>
          </el-form-item>
          <el-form-item :label="$t('result.metadataId')">
            <span>{{ item.metadataId || '' }}</span>
          </el-form-item>
          <el-form-item :label="$t('projects.creationTime')">
            <span>{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') || '' }}</span>
          </el-form-item>
          <el-form-item :label="$t('assets.updateTime')">
            <span>{{ dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss') || '' }}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <!-- <el-link type="primary" :href="taskResultDetils.filePath">{{ $t('projects.download') }}</el-link> -->
    </div>
  </el-dialog>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: 'TaskResult',
  props: {
    resultVisible: {
      type: Boolean,
      default: false
    },
    taskResultList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false
    }
  },
  watch: {
    taskResultList (val) {
      if (val && val.length > 0) {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loading = true
  },
  methods: { dayjs }
}
</script>
<style lang="scss" scoped>
.result-section {
  min-height: 400px;
  .result-card {
    padding: 20px;
    margin-bottom: 20px;
    .result-title {
      margin-bottom: 20px;
    }
    .result-form {
      border: 1px solid #e9e9e9;
      padding: 0 10px;
      .el-form-item {
        margin-bottom: 5px;
      }
      ::v-deep .el-form-item__label {
        font-size: 12px !important;
        font-family: DINPro-Medium, Ali-Medium;
      }
    }
  }
}
</style>