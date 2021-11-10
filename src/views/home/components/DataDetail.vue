<template>
  <div class="data-detail">
    <div class="detail-item" v-for="(item, index) in dataDesc" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="item-info" v-if="item.describes && item.describes.length > 0">
        <div v-for="(desc, i) in item.describes" :key="i">
          <div class="lable">
            {{ desc.lable }}
          </div>
          <div class="info">
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
import { getDataDetail } from '@/api/home'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'
import { formatBytes } from '@/utils/format'
import { UserModule } from '@/store/modules/user'
import alayaService from '@/services/alayaService'

@Component({
  name: 'DataDetail',
})
export default class DataDetail extends Vue {
  private data: any = {}
  private authTypeList: string[] = ['按次数/按时间', '按时间', '按次数']
  private expireList: string[] = ['未过期', '已过期']
  private authStateList: string[] = [
    '未知',
    '还未发布的数据授权',
    '已发布的数据授权',
    '已撤销的数据授权 <失效前主动撤回的>',
    '已经失效的数据授权 <过期or达到使用上限的or被拒绝的>',
  ]
  private industryList: string[] = [
    '',
    '金融业（银行）',
    '金融业（保险）',
    '金融业（证券）',
    '金融业（其他）',
    'ICT',
    '制造业',
    '能源业',
    '交通运输业',
    '医疗健康业',
    '公共服务业',
    '传媒广告业',
    '其他行业',
  ]
  private dataDesc: any = [
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
  get isLogin() {
    return !!UserModule.token && alayaService.checkAddress()
  }
  private async getList() {
    const metaDataId = this.$route.params.id
    const metaDataPkId = this.$route.params.metaDataPkId
    const parmans = {
      metaDataPkId,
      userMetaDataId: metaDataId,
    }
    const { data } = await getDataDetail(parmans)
    // 动态展示字段
    const authMetadataState = {
      lable: '数据授权信息有效性：',
      value: 'authMetadataState',
    }
    const authValueStr = {
      lable: '授权值：',
      value: 'authValueStr',
    }
    const expire = {
      lable: '是否过期：',
      value: 'expire',
    }
    const usedTimes = {
      lable: '已使用次数：',
      value: 'usedTimes',
    }
    const len = this.dataDesc - 1
    if (this.isLogin) {
      this.dataDesc[3]['describes'].push(authMetadataState)
      this.dataDesc[3]['describes'].push(authValueStr)
    }
    if (data.authType === 1) {
      this.dataDesc[3]['describes'].push(expire)
    }
    if (data.authType === 2) {
      this.dataDesc[3]['describes'].push(usedTimes)
    }
    this.data = data
    this.data.fileType = data.fileType ? 'csv' : '未知'
    this.data.size = formatBytes(data.size)
    this.data.authType = this.authTypeList[data.authType]
    this.data.industry = this.industryList[data.industry]
    this.data.expire = this.expireList[data.expire]
    this.data.authMetadataState = this.authStateList[data.authMetadataState]
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
          width 400px
          color #000
  .detail-item:first-child
    margin-top 0
</style>
