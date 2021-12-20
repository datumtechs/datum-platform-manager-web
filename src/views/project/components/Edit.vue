<template>
  <div class="edit">
    <div class="edit-item">
      <span class="edit-item-text">{{ $t('project.name') }}</span>
      <div class="edit-input">
        <el-input v-model="input" :placeholder="$t('project.nameP')"></el-input>
      </div>
    </div>
    <div class="edit-item">
      <span class="edit-item-text">{{ $t('project.description') }}</span>
      <div class="edit-input">
        <el-input
          type="textarea"
          :rows="4"
          :placeholder="$t('project.descriptionP')"
          v-model="textarea"
        >
        </el-input>
      </div>
    </div>
    <div class="edit-item edit-btn">
      <jz-button class="cancel" @click="handlecancel" :height="41" :width="116">
        {{ $t('project.cancel') }}
      </jz-button>
      <jz-button
        type="jz-button--primary"
        :height="41"
        :width="116"
        @click="handleSubmit"
        v-preventReClick
      >
        {{ $t('project.submit') }}
      </jz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { getProjectDetail, setProject } from '@/api/project'

@Component({
  name: 'edit',
  components: {
    JzButton,
  },
})
export default class editIndex extends Vue {
  private id = ''
  private input = ''
  private textarea = ''
  // 取消
  private handlecancel() {
    this.$router.push('/project/all')
  }
  private async handleSubmit() {
    const { input, textarea, id } = this
    if (input.length > 30) {
      const tips: any = this.$t('tips.maxProjectName')
      this.$message.warning(tips)
      return false
    }
    if (textarea.length > 200) {
      const tips: any = this.$t('tips.maxProjectInfo')
      this.$message.warning(tips)
      return false
    }
    if (!input) {
      const tips: any = this.$t('tips.projectName')
      this.$message.warning(tips)
      return false
    }
    const data = { projectName: input, projectDesc: textarea, id }
    const { code } = await setProject(data)
    if (code === 10000) {
      this.$router.push('/project/all')
    }
  }
  private async getDetail() {
    const { data } = await getProjectDetail(this.id)
    this.input = data.projectName
    this.textarea = data.projectDesc
  }
  created() {
    this.id = this.$route.query.pid
    this.getDetail()
  }
}
</script>

<style scoped lang="stylus">
.edit
  .edit-item
    width 700px
    padding-top 10px
    margin-bottom 40px
    span
      display block
      letter-spacing: 0.32px;
      color: #000;
      line-height 24px
      padding-bottom 8px
      margin-bottom 10px
    .edit-input
      >>> .el-input__inner
        height 40px!important
        line-height 40px!important
        border-radius 0!important
      >>> .el-textarea__inner
        resize: none;
        height 91px
        border-radius 0!important
    .cancel
      margin-right 60px
  .edit-btn
    display flex
</style>
