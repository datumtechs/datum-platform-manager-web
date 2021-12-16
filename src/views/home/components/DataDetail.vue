<template>
  <div class="data-detail">
    <div class="detail-item" v-for="(item, index) in dataDesc" :key="index">
      <div class="title">{{ $t(item.title) }}</div>
      <div class="item-info" v-if="item.describes && item.describes.length > 0">
        <div v-for="(desc, i) in item.describes" :key="i">
          <div class="lable">{{ $t(desc.lable) }}：</div>
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
import { Vue, Component, Emit } from 'vue-property-decorator'
import { getDataDetail } from '@/api/home'
import { BreadcrumbModule } from '@/store/modules/breadcrumb'
import { formatBytes } from '@/utils/format'
import { UserModule } from '@/store/modules/user'
import alayaService from '@/services/alayaService'
import { AppModule } from '@/store/modules/app'
import { authTypeList, expireList, authStateList, industryList } from '@/status'

@Component({
  name: 'DataDetail',
})
export default class DataDetail extends Vue {
  private data: any = {}
  get authTypeList() {
    return authTypeList
  }
  get expireList() {
    return expireList
  }
  get authStateList() {
    return authStateList
  }
  get industryList() {
    return industryList
  }
  private dataDesc: any = [
    {
      title: 'detail.introduction',
      describe: 'dataDesc',
    },
    {
      title: 'detail.basic',
      describes: [
        {
          lable: 'detail.name',
          value: 'dataName',
        },
        {
          lable: 'detail.institution',
          value: 'identityName',
        },
        {
          lable: 'detail.node',
          value: 'identityId',
        },
        {
          lable: 'detail.industry',
          value: 'industry',
        },
      ],
    },
    {
      title: 'detail.specification',
      describes: [
        {
          lable: 'detail.format',
          value: 'fileType',
        },
        {
          lable: 'detail.size',
          value: 'size',
        },
        {
          lable: 'detail.rows',
          value: 'rows',
        },
        {
          lable: 'detail.launchtime',
          value: 'createTime',
        },
        {
          lable: 'detail.updatetime',
          value: 'updateTime',
        },
      ],
    },
  ]
  get language() {
    return AppModule.language
  }
  get isLogin() {
    return !!UserModule.token && alayaService.checkAddress()
  }
  created() {
    this.getList()
  }
  @Emit('getAuthType')
  private async getList() {
    const metaDataPkId = Number(this.$route.params.id)
    const userMetaDataId = Number(this.$route.params.userMateDataId)
    const parmans = {
      metaDataPkId: isNaN(metaDataPkId) ? null : metaDataPkId,
      userMetaDataId: isNaN(userMetaDataId) ? null : userMetaDataId,
    }
    const { data } = await getDataDetail(parmans)
    // 动态展示字段
    this.handleField(data)
    return this.data.authType
  }
  /*
    详情页交易字段展示分为，1 未授权 2 按次数，按时间（1已授权）
      未授权：
        授权方式 authType
      按次数：
        授权方式 authType
        授权状态  authStatus
        授权值 authValue
        已使用次数 usedTimes
      按时间：
        授权方式 authType
        授权状态  authStatus
        授权值 authValue
        是否过期  expire
  */
  private handleField(data: any) {
    const { language } = this
    const authMetadataState = {
      lable: 'detail.effectiveness',
      value: 'authMetadataState',
    }
    const authValueStr = {
      lable: 'detail.authValue',
      value: 'authValueStr',
    }
    const expire = {
      lable: 'detail.expired',
      value: 'expire',
    }
    const usedTimes = {
      lable: 'detail.usedcount',
      value: 'usedTimes',
    }
    if (this.isLogin) {
      this.dataDesc.push({
        title: 'detail.exchange',
        describes: [
          {
            lable: 'detail.authType',
            value: 'authTypeStr',
          },
        ],
      })
    }
    if (this.isLogin && data.authType) {
      this.dataDesc[3]['describes'].push(authMetadataState)
      this.dataDesc[3]['describes'].push(authValueStr)
    }
    // 按时间
    if (data.authType === 1) {
      this.dataDesc[3]['describes'].push(expire)
    }
    // 按次数
    if (data.authType === 2) {
      this.dataDesc[3]['describes'].push(usedTimes)
    }
    this.data = data
    this.data.fileType = data.fileType ? 'csv' : '未知'
    this.data.size = formatBytes(data.size)
    this.data.authTypeStr = this.authTypeList[language][data.authType]
    this.data.industry = this.industryList[language][data.industry]
    this.data.expire = this.expireList[language][data.expire || 0]
    this.data.authMetadataState = this.authStateList[language][data.authStatus]
    // 面包屑路由名称
    BreadcrumbModule.SET_DATADETAIL(data.dataName)
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
