<template>
  <div class="create">
    <div class="create-title">
      {{ $t('route.create') }}
    </div>
    <div class="create-item">
      <span>选择案例模板</span>
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
          <span>
            {{ $t(item.lable) }}
          </span>
          <i class="el-icon-success select-icon"></i>
        </div>
      </div>
    </div>
    <div class="create-item">
      <span>名称</span>
      <div class="edit-input">
        <el-input v-model="input" placeholder="请输入项目名称"></el-input>
      </div>
    </div>
    <div class="create-item">
      <span>描述</span>
      <div class="create-input">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入项目描述"
          v-model="textarea"
        >
        </el-input>
      </div>
    </div>
    <div class="create-item">
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
import { getLanguage } from '@/utils/auth'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'create',
  components: {
    JzButton,
  },
})
export default class createIndex extends Vue {
  private templateIndex = 0
  private templates = [
    {
      id: 1,
      lable: 'create.blank',
    },
    {
      id: 2,
      lable: 'create.blacklist',
    },
    {
      id: 3,
      lable: 'create.qualified',
    },
    {
      id: 4,
      lable: 'create.collaborative',
    },
    {
      id: 5,
      lable: 'create.scorecard',
    },
  ]
  private input = ''
  private textarea = ''
  private data = {
    input: '',
    textarea: '',
  }
  private handleSelect(index: number) {
    this.templateIndex = index
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
  get isEnglish() {
    return AppModule.language === 'en'
  }
  created() {
    // api
    const data = {
      input: '',
      textarea: '',
    }
    this.data = data
    this.input = data.input
    this.textarea = data.textarea
  }
}
</script>

<style scoped lang="stylus">
.create
  padding 20px 0 0 60px
  .create-title
    font-weight: 650;
    font-style: normal;
    font-size: 24px;
    margin-bottom 20px
  .create-item
    width 700px
    padding 10px 0 20px 0
    span
      display block
      letter-spacing: 0.32px;
      color: #393939;
      line-height 24px
      padding-bottom 8px
    .submit
      margin-right 60px
    .template
      display flex
      width 1000px
      .template-item
        width: 132px;
        height: 64px;
        background-color: #f4f4f4;
        margin-right 10px
        line-height 64px;
        text-align center
        cursor pointer
        position relative
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
        background-color: #e4e1e1;
      .active
        border 1px solid #333
        background-color: #e4e1e1;
        .select-icon
          display block
</style>
