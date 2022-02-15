<template>
  <div class="step-box">
    <div
      v-for="item in stepList"
      :key="item.id"
      class="step-mini-box"
      :class="{ active: item.step === step, pass: item.step < step }"
    >
      <p class="step-pointer"></p>
      <p class="step-text">{{ item.label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    step: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {}
  },
  computed: {
    stepList() {
      return [
        { id: 1, step: 1, label: this.$t('projects.associatedWorkflow') },
        { id: 2, step: 2, label: this.$t('node.baseInfo') },
        { id: 3, step: 3, label: this.$t('projects.scheduling') }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.step-box {
  width: 100%;
  height: 96px;
  background: #ffffff;
  display: flex;
  border: 1px solid #ebeef9;
  justify-content: center;
  align-items: center;
  .step-mini-box {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 11;
    &:not(:first-child) {
      &:before {
        z-index: -1;
        content: '';
        display: inline-block;
        position: absolute;
        transform: translateX(-90px);
        width: 140px;
        height: 2px;
        top: 3px;
        background-color: #e6e6e6;
      }
    }
    &:nth-child(2) {
      z-index: 10;
    }
    &:nth-child(3) {
      z-index: 9;
    }
    .step-text {
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 14px;
      color: #333333;
      margin-top: 24px;
    }
    .step-pointer {
      text-align: center;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #bdbdbd;
      position: relative;
    }

    &.active > .step-pointer {
      background-color: #fff;
      border-radius: 50%;
      position: relative;
      &::before {
        content: '';
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        width: 16px;
        border-radius: 50%;
        height: 16px;
        background-color: #3c3588;
        z-index: -1;
      }
    }
    &.pass > .step-pointer {
      background-color: #3c3588;
      border-radius: 50%;
      position: relative;
      &::after {
        z-index: -1;
        content: '';
        display: inline-block;
        position: absolute;
        width: 140px;
        transform: translateX(20px);
        height: 2px;
        top: 3px;
        background-color: #3c3588;
      }
    }
  }
}
</style>