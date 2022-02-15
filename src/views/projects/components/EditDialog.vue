<template>
  <el-dialog
    :visible="showDialog"
    :append-to-body="true"
    :destroy-on-close="true"
    :width="winWidth ? winWidth : '400px'"
    class="warn-dialog-box"
    :close-on-click-modal="closeOnClickModal"
    :before-close="handleClose"
  >
    <div slot="title" class="warn-title">{{ title }}</div>
    <!-- <div v-if="lang === 'zh'" class="warn-content">
      <p>确认删除{{ deleteType }}{{ curName }}?</p>
    </div>
    <div v-else class="warn-content">
      <p>Are you sure to delete the{{ deleteType }}?</p>
      <p>{{ curName }}?</p>
    </div> -->
    <slot name="content"> </slot>
    <div v-if="showFooter" slot="footer">
      <el-button size="small" class="btn" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      <el-button size="small" class="btn" type="primary" @click="submit()">{{ $t('common.apply') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ConnectorDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    winWidth: {
      type: String,
      default: '400'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  computed: {
    showDialog () {
      return this.show
    }
  },
  mounted () {},
  methods: {
    submit () {
      this.$emit('submitCb')
    },
    handleClose () {
      this.$emit('update:show', false)
      this.$emit('handleClose')
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item__label {
  font-size: 12px;
  color: #333333;
  line-height: 12px;
}
</style>
