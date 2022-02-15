<template>
  <div class="drawer-detail-box">
    <div class="drawer-detail-title">
      <p class="main" style="margin-bottom: 8px">{{ overviewObj.algorithmName }}</p>
      <p class="sub">{{ overviewObj.algorithmDesc }}</p>
    </div>
    <div class="drawer-detail-content">
      <div>
        <p class="drawer-detail-content-title">{{ $t('projects.author') }}</p>
        <p class="drawer-detail-content-content">
          {{ overviewObj.author }}
        </p>
      </div>
      <div>
        <p class="drawer-detail-content-title">{{ $t('projects.supportNum') }}</p>
        <p class="drawer-detail-content-content">
          {{ overviewObj.maxNumbers !== overviewObj.minNumbers ? '>=' : '' }}
          {{ overviewObj.minNumbers }}
        </p>
      </div>
      <div>
        <p class="drawer-detail-content-title">{{ $t('projects.supportLang') }}</p>
        <p class="drawer-detail-content-content">
          {{ overviewObj.supportLanguage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    overviewObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      details: {
        algorithmName: '',
        algorithmDesc: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>