<template>
  <div class="common-wrapper">
    <div class="data-wrapper">
      <Breadcrumb />
      <div class="pd20">
        <div class="data-wrapper-title">{{ $t('menu.projects') }}</div>
        <div class="select-box">
          <div class="select-title">{{ $t('projects.selectTemplate') }}</div>
          <div class="select-mini-box-wrapper">
            <div
              v-for="box in templateList"
              :key="box.id"
              class="select-mini-box pointer"
              :class="{ active: activeTemplateID === box.id }"
              @click=";(activeTemplateID = box.id), clearValidate()"
            >
              <p>{{ box.projectName }}</p>
              <!-- <i v-if="activeTemplate === box.name" class="el-icon-check active-icon"> </i> -->
              <img
                v-if="activeTemplateID === box.id"
                src="@/assets/images/cases/check.svg"
                alt=""
                class="active-icon"
              />
            </div>
          </div>
        </div>
        <div class="info-box">
          <div class="select-title">{{ $t('projects.enterInfo') }}</div>
          <div class="info-form-box">
            <el-form ref="infoForm" :model="infoForm" label-position="top" label-width="100px" class="demo-dynamic">
              <el-form-item prop="name" :label="$t(`common.name`)" :rules="rules">
                <el-input v-model="infoForm.name" size="small" class="limit-width" placeholder=""></el-input>
              </el-form-item>
              <el-form-item prop="desc" :label="$t(`projects.desc`)">
                <el-input
                  v-model="infoForm.desc"
                  size="small"
                  type="textarea"
                  rows="5"
                  class="limit-width"
                  placeholder=""
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" class="form-btn" @click="createFn('infoForm')">{{
                  $t('projects.create')
                }}</el-button>
                <el-button size="small" class="form-btn" @click="cancelFn()">{{ $t('common.cancel') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectApi } from 'apis'
import Breadcrumb from 'components/breadcrumb/Breadcrumb.vue'
import projectMixin from './components/mixin'
export default {
  components: { Breadcrumb },
  mixins: [projectMixin],
  props: {},
  data() {
    return {
      activeTemplateID: 0,
      templateList: [],
      infoForm: {
        name: '',
        desc: ''
      }
    }
  },
  mounted() {
    this.initTemplate()
  },
  methods: {
    initTemplate() {
      projectApi.queryTemplatelist().then(res => {
        const { code, data } = res
        if (code === 10000) {
          this.templateList = data
        }
      })
    },
    createFn() {
      this.$refs['infoForm'].validate(valid => {
        if (valid) {
          projectApi
            .addProject({
              projectDesc: this.infoForm.desc,
              projectName: this.infoForm.name,
              projectTempId: this.activeTemplateID
            })
            .then(res => {
              if (res.code === 10000) {
                this.$message.success(this.$t('common.success'))
                // debugger
                this.$router.push({
                  // path: `/projects/projectView/${res.data.id}/${this.infoForm.name}`
                  name: 'projectView',
                  query: {
                    id: res.data.id,
                    name: this.infoForm.name
                  }
                })
              } else {
                this.$message.error(this.$t('common.failed'))
              }
            })
        } else {
          console.log('error')
        }
      })
    },
    cancelFn() {
      this.$router.push({
        name: 'projects'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.select-title {
  height: 18px;
  font-family: DINPro-Medium, Ali-Medium;
  font-size: 16px;
  color: #120d33;
  line-height: 18px;
  margin-top: 16px;
}
.select-box {
  margin-top: 20px;
  background: #fbfcfd;
  height: 124px;
  padding: 0 20px;
  border: 1px solid #ffffff;

  .select-mini-box-wrapper {
    width: 1100px;
    margin-top: 18px;
    overflow-x: auto;
    display: flex;
    flex-wrap: nowrap;
    .select-mini-box {
      flex: none;
      position: relative;
      width: 160px;
      height: 52px;
      background: #f6f6f6;
      border-radius: 2px;
      text-align: center;
      font-family: DINPro-Medium, Ali-Medium;
      font-size: 12px;
      color: #120d33;
      line-height: 52px;
      margin-right: 20px;
      &.active {
        background: #1cc2eb;
        font-family: DINPro-Bold, Ali-Bold;
        color: #ffffff;
      }
      .active-icon {
        position: absolute;
        width: 15px;
        height: 15px;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
      }
      &:hover {
        background: #1cc2eb;
        opacity: 0.8;
        font-family: DINPro-Bold, Ali-Bold;
        color: #ffffff;
      }
    }
  }
}
.info-box {
  // height: 314px;
  background: #fbfcfd;
  padding: 0 20px;
  margin-top: 20px;
  overflow: hidden;
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
}
</style>