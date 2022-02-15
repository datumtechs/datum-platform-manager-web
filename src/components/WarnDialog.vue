<template>
  <el-dialog
    :visible="showDialog"
    :append-to-body="true"
    width="400px"
    class="warn-dialog-box"
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
    <div slot="footer">
      <el-button size="small" class="btn" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      <el-button size="small" class="btn" type="danger" @click="deleteFn()">{{
        confirmText ? confirmText : $t('common.delete')
      }}</el-button>
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
    curName: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: ''
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
    deleteFn () {
      this.$emit('deleteCb')
    },
    handleClose () {
      this.$emit('update:show', false)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
