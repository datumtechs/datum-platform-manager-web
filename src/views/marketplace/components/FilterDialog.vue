<template>
  <div v-if="visible" class="form-wrapper">
    <el-form ref="form" label-position="top" :model="form" @submit.native.prevent label-width="80px">
      <el-form-item :label="$t('node.industry')">
        <el-row class="form-line">
          <el-select v-model="form.industry" size="mini" class="form-line">
            <el-option
              v-for="industry in industryList"
              :key="industry.id"
              :value="industry.value"
              :label="industry.label"
              >{{ industry.label }}</el-option
            >
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('node.dataType')">
        <el-row class="form-line">
          <el-select v-model="form.type" size="mini" class="form-line">
            <el-option v-for="type in typeList" :key="type.id" :value="type.value" :label="type.label">{{
              type.label
            }}</el-option>
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('node.dataSize')">
        <el-row class="form-line">
          <el-col :span="6" type="flex">
            <el-input v-model="form.size1" size="mini" />
          </el-col>
          <el-col :span="5" type="flex">
            <el-select v-model="form.size1unit" size="mini">
              <el-option v-for="size in sizeList" :key="size.id" :value="size.value" :label="size.label">{{
                size.label
              }}</el-option>
            </el-select>
          </el-col>
          <el-col :span="2"> to </el-col>
          <el-col :span="6">
            <el-input v-model="form.size2" size="mini" />
          </el-col>
          <el-col :span="5">
            <el-select v-model="form.size2unit" size="mini">
              <el-option v-for="size in sizeList" :key="size.id" :value="size.value" :label="size.label">{{
                size.label
              }}</el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div class="form-btn-group-box">
      <div class="btn cancel-btn pointer" @click="cancelForm">{{ $t('common.cancel') }}</div>
      <div class="btn apply-btn pointer">{{ $t('common.apply') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        industry: '',
        type: '',
        label: '',
        size1unit: 'MB',
        size2unit: 'MB'
      }
    }
  },
  computed: {
    industryList() {
      return [
        { id: 0, value: 'banking', label: this.$t('industry.banking') },
        { id: 1, value: 'insurance', label: this.$t('industry.insurance') },
        { id: 2, value: 'securities', label: this.$t('industry.securities') },
        { id: 3, value: 'othersFinance', label: this.$t('industry.othersFinance') },
        { id: 4, value: 'ICT', label: this.$t('industry.ICT') },
        { id: 5, value: 'manufacturing', label: this.$t('industry.manufacturing') },
        { id: 6, value: 'energyIndustry', label: this.$t('industry.energyIndustry') },
        { id: 7, value: 'transportation', label: this.$t('industry.transportation') },
        { id: 8, value: 'healthcare', label: this.$t('industry.healthcare') },
        { id: 9, value: 'publicServices', label: this.$t('industry.publicServices') },
        { id: 10, value: 'mediaAdvertising', label: this.$t('industry.mediaAdvertising') },
        { id: 11, value: 'otherIndustries', label: this.$t('industry.otherIndustries') }
      ]
    },
    typeList() {
      return [{ id: 0, value: 'CSV', label: 'CSV' }]
    },
    sizeList() {
      return [
        { id: 0, value: 'GB', label: 'GB' },
        { id: 1, value: 'MB', label: 'MB' },
        { id: 2, value: 'KB', label: 'KB' }
      ]
    }
  },
  methods: {
    cancelForm() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-wrapper {
  width: 350px;
  height: 256px;
  background: #ffffff;
  box-shadow: 0 0 20px 0 rgba(10, 16, 81, 0.2);
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  right: 0;
  padding: 20px 14px;
  overflow: hidden;
  ::v-deep .el-form-item {
    margin-bottom: 0;
  }
  ::v-deep .el-form-item__label {
    font-size: 12px;
    color: #5d5c65;
  }
  ::v-deep .el-form--label-top .el-form-item__label {
    padding-bottom: 0 !important;
    line-height: 17px !important;
  }

  ::v-deep .el-select .el-input.is-focus .el-input__inner {
    border: none;
  }

  ::v-deep .el-select .el-input__inner:focus {
    border: none;
  }

  ::v-deep .el-input--mini .el-input__inner {
    border: none;
  }

  ::v-deep .el-input__inner {
    font-size: 12px;
  }
  .form-line {
    width: 100%;
    &:after {
      width: 100%;
      height: 1px;
      background-color: #e1e3ec;
      bottom: 5px;
      position: relative;
    }
  }
  .form-btn-group-box {
    font-size: 12px;
    color: #3c3588;
    text-align: center;
    display: flex;
    margin-top: 12px;
    .btn {
      width: 100px;
      height: 27px;
      border: 1px solid #3c3588;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cancel-btn {
      color: #3c3588;
    }
    .apply-btn {
      margin-left: 30px;
      background-color: #3c3588;
      color: #fff;
    }
  }
}
</style>
