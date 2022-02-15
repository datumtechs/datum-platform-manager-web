<template>
  <div class="industry-label-box">
    <p class="industry-label-box-text">{{ title }}</p>
    <img src="~assets/images/home/1.bj7.svg" alt="" />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.industry-label-box {
  position: absolute;
  left: 166px;
  bottom: 0;
  text-align: left;
  .industry-label-box-text {
    white-space: nowrap;
    font-family: DINPro-Medium, Ali-Medium;
    font-size: 16px;
    color: #1cc2eb;
    letter-spacing: 0;
    z-index: 10000;
  }
}
</style>
