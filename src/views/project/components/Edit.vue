<template>
  <div class="edit">
    <div class="edit-item">
      <span>名称</span>
      <div class="edit-input">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="edit-item">
      <span>描述</span>
      <div class="edit-input">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </div>
    </div>
    <div class="edit-item">
      <jz-button
        type="jz-button--primary"
        align="left"
        :height="48"
        @click="handleSubmit"
        class="submit"
      >
        {{ $t('project.submit') }}
      </jz-button>
      <jz-button @click="handlecancel" :height="48" align="left">
        {{ $t('project.cancel') }}
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
    width 680px
    padding 10px 0 30px 0
    span
      display block
      letter-spacing: 0.32px;
      color: #393939;
      line-height 24px
      padding-bottom 10px
    .submit
      margin-right 60px
</style>
