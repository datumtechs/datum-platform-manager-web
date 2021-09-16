<template>
  <div class="data-detail">
    <div class="detail-item" v-for="(item, index) in dataDesc" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="item-info" v-if="item.describes && item.describes.length > 0">
        <div v-for="(desc, i) in item.describes" :key="i">
          <div class="lable">{{ desc.lable }}</div>
          <div class="info">{{ data[desc.value] }}</div>
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

@Component({
  name: 'AlgorithmDetail',
})
export default class AlgorithmDetail extends Vue {
  private data: any = {}
  private dataDesc = [
    {
      title: '简介',
      describe: 'algorithmDesc',
    },
    {
      title: '基本信息',
      describes: [
        {
          lable: '算法名称：',
          value: 'algorithmName',
        },
        {
          lable: '作者：',
          value: 'author',
        },
        {
          lable: '支持协同方最大数量：',
          value: 'maxNumbers',
        },
        {
          lable: '支持协同方最小数量：',
          value: 'minNumbers',
        },
        {
          lable: '支持语言：',
          value: 'supportLanguage',
        },
        {
          lable: '支持操作系统：',
          value: 'supportOsSystem',
        },
        {
          lable: '算法所属大类：',
          value: 'algorithmTypeDesc',
        },
      ],
    },
  ]

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
<<<<<<< HEAD
          width 145px
=======
          width 160px
>>>>>>> e12739139b18859955c8636ae400580f9a82daf2
          color rgba(0,0,0,0.50)
        .info
          width 200px
          color #000
  .detail-item:first-child
    margin-top 0
</style>
