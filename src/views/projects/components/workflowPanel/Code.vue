<template>
  <div class="drawer-detail-box">
    <div class="drawer-detail-title">
      <p class="main">{{ $t('projects.code') }}</p>
    </div>
    <div class="drawer-detail-content">
      <div style="white-space: pre-line" class="drawer-code-box" v-html="code"></div>
      <!-- <code style="white-space: pre-line" class="drawer-code-box">{{ code }}</code> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.drawer-detail-content {
  background-color: #f5f8fa;
  .drawer-code-box {
    font-size: 12px;
    line-height: 18px;
    color: #4e4879;
  }
}
</style>