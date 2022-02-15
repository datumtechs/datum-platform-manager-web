<template>
  <div class="step-box">
    <el-steps :active="2" align-center>
      <el-step :title="createAt" :description="$t('step.taskStarted')">
        <i slot="icon" class="step"></i>
      </el-step>
      <el-step :title="startAt" :description="$t('step.computationStarted')" :class="{ 'error-line': status == 3 }">
        <i slot="icon" class="step"></i>
      </el-step>

      <el-step v-if="status == 4" :description="$t('step.computationSucceeded')" :title="endAt">
        <i slot="icon" class="step"></i>
      </el-step>
      <el-step v-else-if="status == 3" :title="endAt" :description="$t('step.computationFailed')" class="stepError">
        <i slot="icon" class="step"></i>
      </el-step>
      <el-step v-else description="" title="" class="pending">
        <i slot="icon" class="step"></i>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    status: {
      type: Number,
      default: -1
    },
    createAt: {
      type: String,
      default: ''
    },
    startAt: {
      type: String,
      default: ''
    },
    endAt: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.step-box {
  width: 90%;
  .step {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: url('../../../assets/images/home/icon1.svg') no-repeat;
    background-size: 100% 100%;
  }
  .stepError .step {
    background: url('../../../assets/images/home/icon2.svg') no-repeat;
    background-size: 100% 100%;
  }
  ::v-deep .el-step__icon {
    border-style: hidden;
    background-color: transparent !important;
  }
  ::v-deep .el-step__line-inner {
    color: #38ff82;
    border-color: #38ff82;
  }
  ::v-deep .el-step__title {
    font-size: 12px;
    color: #c8c8c8;
    letter-spacing: 0;
  }
  ::v-deep .stepError .el-step__description {
    font-family: DINPro-Medium, Ali-Medium;
    font-size: 12px;
    color: #f32e25;
    letter-spacing: 0;
    text-align: center;
  }

  ::v-deep .el-step__description {
    font-family: DINPro-Medium, Ali-Medium;
    font-size: 12px;
    color: #38ff82;
    letter-spacing: 0;
    text-align: center;
  }

  ::v-deep.el-step__line {
    background-color: #38ff82;
  }

  ::v-deep.error-line .el-step__line {
    background-color: #f32e25;
  }
}
</style>
