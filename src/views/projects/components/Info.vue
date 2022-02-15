<template>
  <div class="info-form-box">
    <el-form ref="infoForm" :model="infoForm" label-position="top" label-width="100px" class="demo-dynamic">
      <el-form-item prop="name" :label="$t(`common.name`)">
        <el-input v-model="infoForm.name" disabled size="small" class="limit-width" placeholder=""></el-input>
      </el-form-item>
      <el-form-item prop="desc" :label="$t(`projects.desc`)">
        <el-input
          v-model="infoForm.desc"
          disabled
          size="small"
          type="textarea"
          rows="5"
          class="limit-width"
          placeholder=""
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    infoForm: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.info-form-box {
  margin-top: 26px;
  ::v-deep .el-form-item__label {
    height: 12px;
    font-size: 12px;
    color: #333333;
    line-height: 12px;
    margin-bottom: 10px;
  }
  .limit-width {
    width: 880px;
  }
  .form-btn {
    height: 36px;
    width: 120px;
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>