<template>
  <div class="detail">
    <div :class="[isHomeDetail ? '' : 'margin']">
      <jz-button
        type="jz-button--primary"
        class="authorize"
        @click="handleAuthorize"
        :height="42"
        v-if="isHomeDetail"
      >
        {{ $t('detail.apply') }}
      </jz-button>
      <div class="detail-block">
        <jz-nav
          type="detail"
          :tabs="tabs"
          @clickTable="handleTable"
          :tabIndex="tabIndex"
        ></jz-nav>
        <template>
          <MetaData
            v-if="tabIndex"
            :list="list"
            @changeList="changeList"
            :total="total"
          ></MetaData>
          <DataDetail v-else :data="describe"></DataDetail>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import DataDetail from './components/DataDetail.vue'
import MetaData from './components/MetaData.vue'
import JzButton from '@/components/JzButton.vue'
import JzNav from '@/components/JzNav.vue'
import { getDataDetail } from '@/api/home'

@Component({
  name: 'detail',
  components: {
    DataDetail,
    MetaData,
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
  private describe = {}
  private list = []
  private tabs: string[] = ['description', 'metadata']
  private tabIndex = 0
  get isHomeDetail() {
    return this.$route.name === 'detail'
  }

  private handleTable(index: number) {
    this.tabIndex = index
  }
  private handleAuthorize() {
    const id = this.$route.params.id
    this.$router.push(`/home/${id}/authorize`)
  }
  // 元数据列表分页
  changeList(parmams: any) {
    console.log(parmams)
    this.listQuery = parmams
    this.getList()
  }
  private async getList() {
    const id = this.$route.params.id
    const { current, size } = this.listQuery
    const { data } = await getDataDetail({ id, current, size })
    // this.market = data.items
    this.describe = data
    this.list = data.metaDataColumnsVoPageVo.items
    this.total = data.metaDataColumnsVoPageVo.total
  }
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.detail
  padding 20px 28px
  .authorize
    width 160px
    line-height 40px
    height 42px
    font-size 16px
  .detail-block
    width: 95%;
    height: 646px;
    background: inherit;
    background-color: rgba(224, 224, 224, 1);
    box-sizing: border-box;
  .margin
    margin-top 20px
</style>
