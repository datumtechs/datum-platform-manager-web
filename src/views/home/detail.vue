<template>
  <div class="detail">
    <div :class="[isHomeDetail ? '' : 'margin']" class="detail-wrap">
      <div class="wrap-title">
        <div class="detail-block">
          <jz-nav
            type="detail"
            :tabs="tabs"
            @clickTable="handleTable"
            :tabIndex="tabIndex"
          ></jz-nav>
        </div>
        <jz-button
          type="jz-button--primary"
          class="authorize"
          @click="handleAuthorize"
          :height="42"
          :width="116"
          v-if="isHomeDetail && !authType"
        >
          {{ $t('detail.apply') }}
        </jz-button>
      </div>
      <div class="wrap-info">
        <template v-if="isAlgo">
          <AlgorithmDetail></AlgorithmDetail>
        </template>
        <template v-else>
          <MetaData v-if="tabIndex"></MetaData>
          <DataDetail @getAuthType="getAuthType" v-else></DataDetail>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import DataDetail from './components/DataDetail.vue'
import MetaData from './components/MetaData.vue'
import AlgorithmDetail from './components/AlgorithmDetail.vue'
import JzButton from '@/components/JzButton.vue'
import JzNav from '@/components/JzNav.vue'

@Component({
  name: 'detail',
  components: {
    DataDetail,
    MetaData,
    AlgorithmDetail,
    JzButton,
    JzNav,
  },
})
export default class Detail extends Vue {
  private total = 0
  private listQuery = {
    current: 1,
    size: 20,
  }
  private authType = 1
  private list = []
  private tabIndex = 0
  get tabs() {
    if (this.isAlgo) {
      return ['algorithmDesc']
    } else {
      return ['dataDesc', 'metadata']
    }
  }
  get isHomeDetail() {
    return this.$route.name === 'dataDetail'
  }
  // 详情授权类型
  getAuthType(type: number) {
    this.authType = type
  }

  private handleTable(index: number) {
    this.tabIndex = index
  }
  private handleAuthorize() {
    const id = this.$route.params.id
    const metaid = this.$route.params.metaid
    const userMateDataId = this.$route.params.userMateDataId
    this.$router.push(`/data/${id}/${userMateDataId}/authorize/${metaid}`)
  }
  get isAlgo() {
    return this.$route.name === 'algorithmDetail'
  }
}
</script>

<style scoped lang="stylus">
.detail
  width 1200px
  margin 20px auto
  .detail-wrap
    padding 0px 28px
    .wrap-title
      display flex
      justify-content space-between
      .authorize
        width 160px
        line-height 40px
        height 42px
        font-size 16px
      .detail-block
        // width: 95%;
        // height: 646px;
        // background: inherit;
        // background-color: rgba(224, 224, 224, 1);
        // box-sizing: border-box;
      .margin
        margin-top 20px
    .wrap-info
      box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
      min-height 712px
      background: #fff;
</style>
