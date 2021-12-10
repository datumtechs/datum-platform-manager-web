<template>
  <div class="data-detail">
    <div class="detail-item" v-for="(item, index) in dataDesc" :key="index">
      <div class="title">{{ $t(item.title) }}</div>
      <div class="item-info" v-if="item.describes && item.describes.length > 0">
        <div v-for="(desc, i) in item.describes" :key="i">
          <div class="lable">{{ $t(desc.lable) }}：</div>
          <div class="info" :class="isEnglish && desc.move ? 'info-en' : ''">
            {{ data[desc.value] }}
          </div>
        </div>
      </div>
      <div class="item-info" v-else>{{ data[item.describe] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getAlgorithmsDetail } from '@/api/algorithm'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'AlgorithmDetail',
})
export default class AlgorithmDetail extends Vue {
  private data: any = {}
  private dataDesc = [
    {
      title: 'detail.introduction',
      describe: 'algorithmDesc',
    },
    {
      title: 'detail.basic',
      describes: [
        {
          lable: 'detail.algorithmName',
          value: 'algorithmName',
        },
        {
          lable: 'detail.author',
          value: 'author',
        },
        {
          lable: 'detail.maxNumbers',
          value: 'maxNumbers',
          move: true,
        },
        {
          lable: 'detail.minNumbers',
          value: 'minNumbers',
          move: true,
        },
        {
          lable: 'detail.supportLanguage',
          value: 'supportLanguage',
        },
        {
          lable: 'detail.supportOsSystem',
          value: 'supportOsSystem',
          move: true,
        },
        {
          lable: 'detail.algorithmTypeDesc',
          value: 'algorithmTypeDesc',
        },
      ],
    },
  ]
  get isEnglish() {
    return AppModule.language === 'en'
  }
  private async getList() {
    const { data } = await getAlgorithmsDetail(this.$route.params.id)
    this.data = data
    this.data.supportLanguage = this.data.supportLanguage.replace(/"/g, '')
    this.data.supportOsSystem = this.data.supportOsSystem.replace(/"/g, '')
    BreadcrumbModule.SET_ALGOR(data.algorithmName)
  }
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.data-detail
  padding 30px
  line-height 28px
  .detail-item
    margin-top 20px
    .title
      font-weight: 500;
      font-size 18px
      margin-bottom 10px
    .item-info
      display flex
      flex-flow: column !important;
      margin-bottom 10px
      max-width: 1000px;
      flex-flow: row wrap;
      div
        display flex
        font-size 14px
        margin-bottom: 4px;
        .lable
          width 145px
          color rgba(0,0,0,0.50)
        .info
          width 200px
          color #000
        .info-en
          transform: translateY(26px)
  .detail-item:first-child
    margin-top 0
</style>
