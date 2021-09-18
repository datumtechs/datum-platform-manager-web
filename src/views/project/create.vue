<template>
  <div class="create">
    <div class="create-title">
      {{ $t('route.create') }}
    </div>
    <div class="create-wrap">
      <div class="create-item">
        <span>{{ $t('project.selectTemple') }}</span>
        <div class="template">
          <div
            :class="[
              'template-item',
              isEnglish ? 'isEnglish' : '',
              templateIndex === index ? 'active' : '',
            ]"
            v-for="(item, index) in templates"
            :key="index"
            @click="handleSelect(index)"
          >
            <span class="template-item-text">
              {{ $t(item.projectName) }}
            </span>
            <i class="el-icon-success select-icon"></i>
          </div>
        </div>
      </div>
      <div class="create-item">
        <span>{{ $t('project.name') }}</span>
        <div class="edit-input">
          <el-input
            v-model="input"
            :placeholder="$t('project.nameP')"
          ></el-input>
        </div>
      </div>
      <div class="create-item">
        <span>{{ $t('project.description') }}</span>
        <div class="create-input">
          <el-input
            type="textarea"
            :rows="4"
            :placeholder="$t('project.descriptionP')"
            v-model="textarea"
          >
          </el-input>
        </div>
      </div>
      <div class="create-item create-btn">
        <jz-button
          @click="handleCancel"
          :height="41"
          :width="116"
          class="cancel"
        >
          {{ $t('project.cancel') }}
        </jz-button>
        <jz-button
          type="jz-button--primary"
          :width="116"
          :height="41"
          @click="handleSubmit"
        >
          {{ $t('project.submit') }}
        </jz-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { AppModule } from '@/store/modules/app'
import { addProject, getProjectTemplate } from '@/api/project'

@Component({
  name: 'create',
  components: {
    JzButton,
  },
})
export default class createIndex extends Vue {
  private templateIndex = 0
  private templates = [
    // {
    //   id: 1,
    //   lable: 'create.blank',
    // },
    // {
    //   id: 2,
    //   lable: 'create.blacklist',
    // },
    // {
    //   id: 3,
    //   lable: 'create.qualified',
    // },
    // {
    //   id: 4,
    //   lable: 'create.collaborative',
    // },
    // {
    //   id: 5,
    //   lable: 'create.scorecard',
    // },
  ]
  private input = ''
  private textarea = ''
  private projectTempId = ''
  private data = {
    input: '',
    textarea: '',
    projectTempId: '',
  }
  private handleSelect(index: number) {
    this.templateIndex = index
    const { projectName, projectDesc, id } = this.templates[index]
    if (this.templateIndex == 0) {
      this.input = ''
      this.textarea = ''
    } else {
      this.input = projectName
      this.textarea = projectDesc
      this.projectTempId = id
    }
  }
  // 取消
  private handleCancel() {
    const { input, textarea } = this.data
    this.input = input
    this.textarea = textarea
    this.$router.push('/project/all')
  }
  private async handleSubmit() {
    const { input, textarea, projectTempId } = this
    const data = {
      projectName: input,
      projectDesc: textarea,
      projectTempId: projectTempId,
    }
    const { projectName } = this.templates[this.templateIndex]
    if (input == projectName) {
      this.$message.error('项目名称必须修改')
      return
    }
    const res: any = await addProject(data)
    if (res.code === 10000) {
      this.$router.push('/project/all')
    } else {
      this.$message.error(res.msg)
    }
  }
  private async getProjectTemplateList() {
    const { data } = await getProjectTemplate()
    this.templates = data
  }

  get isEnglish() {
    return AppModule.language === 'en'
  }
  created() {
    this.getProjectTemplateList()
  }
}
</script>

<style scoped lang="stylus">
.create
  margin 20px auto
  width: 1150px;
  .create-title
    font-weight: 500;
    font-style: normal;
    font-size: 24px;
    margin-bottom 24px
  .create-wrap
    height: 732px;
    box-sizing border-box
    padding 30px
    background #fff
    box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
    .create-item
      width 700px
      padding-top 10px
      margin-bottom 40px
      span
        display block
        letter-spacing: 0.32px;
        color: #000;
        line-height 24px
        padding-bottom 8px
      span:first-child
        margin-bottom 10px
      .edit-input
        >>> .el-input__inner
          height 40px!important
          line-height 40px!important
          border-radius 0!important
      .create-input
        >>> .el-textarea__inner
          resize: none;
          height 91px
          border-radius 0!important
      .cancel
        margin-right 60px
      .template
        display flex
        width 1000px
        .template-item
          width: 136px;
          height: 64px;
          background-color: #F6F6F6;
          margin-right 10px
          line-height 64px;
          text-align center
          cursor pointer
          position relative
          .template-item-text
            color rgba(0,0,0,0.49)
          span
            line-height 64px;
            font-size 14px
          .select-icon
            position absolute
            right 8px
            top 8px
            display none
        .isEnglish
          span
            font-size 14px
            line-height 20px
            vertical-align:middle;
            display: inline-block;
        .template-item:hover
          background-color: rgba(95,79,251,0.03);
        .active
          border 1px solid #5F4FFB
          background-color: rgba(95,79,251,0.03);
          span
            color #5F4FFB
          .select-icon
            display block
            color #5F4FFB
    .create-btn
      display flex
</style>
