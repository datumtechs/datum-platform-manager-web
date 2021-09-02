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
      >
        {{ $t('project.submit') }}
      </jz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'

@Component({
  name: 'edit',
  components: {
    JzButton,
  },
})
export default class editIndex extends Vue {
  private input = ''
  private textarea = ''
  private data = {
    input: '',
    textarea: '',
  }
  // 取消
  private handlecancel() {
    const { input, textarea } = this.data
    this.input = input
    this.textarea = textarea
    this.$router.push('/project/all')
  }
  private handleSubmit() {
    const { input, textarea } = this
    // post api
    const data = { input, textarea }

    // code 200 ok
    this.$router.push('/project/all')
  }
  created() {
    // api
    const data = {
      input: '黑名单',
      textarea: '黑名单描述',
    }
    this.data = data
    this.input = data.input
    this.textarea = data.textarea
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
