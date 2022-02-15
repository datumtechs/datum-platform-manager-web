<template>
  <div class="banner-content">
    <div v-if="type === 'data'" class="left-area">
      <p class="meta-name">{{ fileName }}</p>
      <p class="meta-id">
        <span class="pre-title">ID:</span>&nbsp;
        <span class="value">{{ metaDataId }}</span>
      </p>
    </div>
    <div v-else class="left-area">
      <p class="meta-name">{{ taskName }}</p>
      <p class="meta-id">
        <span class="pre-title">ID:</span>&nbsp;
        <span class="value">{{ taskId }}</span>
      </p>
    </div>
    <div v-if="type === 'data'" class="right-box">
      <div class="logo-box">
        <img src="@/assets/images/default/data.svg" alt="" class="logo-avatar" />
        <span class="logo-name">{{ orgName }}</span>
      </div>
      <div class="identifier-box">
        <p class="name">{{ $t('node.identifier') }}:</p>
        <p class="value">{{ identityId }}</p>
      </div>
    </div>
    <div v-else class="right-step-box">
      <BannerStep v-bind="$attrs" />
    </div>
  </div>
</template>
<script>
import BannerStep from './BannerStep'
export default {
  name: 'DataBanner',
  components: {
    BannerStep
  },
  props: {
    type: {
      type: String,
      default: 'data'
    },
    taskName: {
      type: String,
      default: ''
    },
    taskId: {
      type: String,
      default: ''
    },
    identityId: {
      type: String,
      default: ''
    },
    orgName: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    },
    metaDataId: {
      type: String,
      default: ''
    }
  }
}
</script>
