<template>
  <div class="case-warp">
    <div class="case-title">
      <span> {{ $t('case.title') }} </span>
    </div>
    <div class="block-wrap">
      <div
        class="block-wrap-item"
        v-for="(item, index) in marketList"
        :key="index"
      >
        <div class="item-img"></div>
        <div class="item-info">
          <div class="item-title">{{ item.projectName }}</div>
          <div class="item-describe">{{ item.projectDesc }}</div>
          <div class="item-button">
            <jz-button
              @click="handleDetail(item.id)"
              type="jz-button--primary"
              class="btn"
            >
              {{ $t('case.project') }}
            </jz-button>
            <jz-button
              type="jz-button--primary"
              @click="handleDescription(item.id)"
              class="btn"
            >
              {{ $t('case.guidance') }}
            </jz-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JzButton from '@/components/JzButton.vue'
import { addProject, getProjectTemplate } from '@/api/project'

@Component({
  name: 'case',
  components: {
    JzButton,
  },
})
export default class CaseIndex extends Vue {
  private marketList = []
  // 案例说明
  private handleDescription(id: string | number) {
    console.log('/case/description/' + id)
    // this.$router.push('/case/description/' + id)
    // window.open('/case/description/' + id, '_blank')
  }
  // 创建项目
  private handleDetail(id: string | number) {
    const caseId = String(id)
    this.$router.push({
      path: '/project/create',
      query: { id: caseId },
    })
  }
  private async getList() {
    const { data } = await getProjectTemplate()
    console.log('data==>', data)
    this.marketList = data.filter((item: any) => item.id > 0)
  }
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.case-warp
  width 100%
  .case-title
    display block
    max-width 1150px
    margin 40px auto 30px
    span
      font-weight: 400;
      font-style: normal;
      font-size: 24px;
  .block-wrap
    max-width 1200px
    margin 0 auto
    display flex
    flex-flow: row wrap;
    .block-wrap-item
      width: 368px;
      margin 0 48px 48px 0
      box-sizing: border-box;
      background: #FFFFFF;
      box-shadow: 0px 20px 40px 0px rgba(205,205,205,0.18);
      .item-img
        width: 100%;
        height: 200px;
        background #eee
      .item-info
        padding 20px 25px
        .item-title
          font-size: 18px;
          color: #000000;
          font-weight: 500;
          padding-bottom 10px
        .item-describe
          height 53px
          font-size: 14px;
          color: rgba(0,0,0,0.60);
          font-weight: 400;
          line-height: 18px;
        .item-button
          display flex
          padding-bottom 10px
          .btn
            border-radius 0
            margin-right 25px
</style>
