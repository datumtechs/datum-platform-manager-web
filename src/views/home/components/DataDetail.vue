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
import { getDataDetail } from '@/api/home'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'
@Component({
  name: 'DataDetail',
})
export default class DataDetail extends Vue {
  private data: any = {}
  private authTypeList:string[] = ['按次数/按时间', '按时间', '按次数']
  private dataDesc = [
    {
      title: '简介',
      describe: 'dataDesc',
    },
    {
      title: '基本信息',
      describes: [
        {
          lable: '数据名称：',
          value: 'dataName',
        },
        {
          lable: '机构：',
          value: 'identityName',
        },
        {
          lable: '数据节点：',
          value: 'identityId',
        },
        {
          lable: '所属行业：',
          value: 'industry',
        },
      ],
    },
    {
      title: '规格',
      describes: [
        {
          lable: '存储格式：',
          value: 'fileType',
        },
        {
          lable: '大小：',
          value: 'size',
        },
        {
          lable: '算法所属大类：',
          value: 'industry',
        },
        {
          lable: '数据条数：',
          value: 'rows',
        },
        {
          lable: '发布时间：',
          value: 'createTime',
        },
        {
          lable: '更新时间：',
          value: 'updateTime',
        },

        // {
        //   lable: '更新频率：',
        //   value: '贷款逾期数据',
        // },
        // {
        //   lable: '更新方式：',
        //   value: '贷款逾期数据',
        // },
      ],
    },
    {
      title: '交易',
      describes: [
        {
          lable: '支持授权方式：',
          value: 'authType',
        },
      ],
    },
  ]

  private async getList() {
    const { data } = await getDataDetail(this.$route.params.id)
    this.data = data
    this.data.fileType = data.fileType ? 'csv' : '未知'
    this.data.size = data.size + ' byte'
    this.data.authType = this.authTypeList[data.authType]
    BreadcrumbModule.SET_DATADETAIL(data.dataName)
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
          width 160px
          color rgba(0,0,0,0.50)
        .info
          width 200px
          color #000
  .detail-item:first-child
    margin-top 0
</style>
