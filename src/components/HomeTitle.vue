<template>
  <div class="homepage-title-box">
    <div class="main">
      <span class="main-title-box" v-html="title"></span>
    </div>
    <div class="subtitle">
      <slot name="subtitle"> </slot>
    </div>
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
.homepage-title-box {
  padding-top: 0.6rem;
  color: #ffffff;
  .main {
    font-family: DINPro-Medium, Ali-Medium;
    font-size: 30px;
    letter-spacing: 0;
    text-align: center;
    line-height: 38px;
    .main-title-box {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        background: url('../assets/images/home/1.icon2.png');
        background-size: 100%;
        width: 32px;
        height: 33px;
        display: block;
        left: -52px;
        top: 5px;
      }
      &:after {
        content: '';
        position: absolute;
        background: url('../assets/images/home/1.icon2.png');
        background-size: 100%;
        width: 32px;
        height: 33px;
        display: block;
        right: -52px;
        top: 5px;
      }
    }
  }
  .subtitle {
    margin-top: 0.16rem;
    text-align: center;

    font-size: 18px;
    color: #c8c8c8;
    letter-spacing: 0;
  }
}
</style>
