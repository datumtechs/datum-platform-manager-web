<template>
  <div class="detail">
    <div>
      <jz-button
        type="jz-button--primary"
        class="authorize"
        @click="handleAuthorize"
        :height="42"
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
            :data="describe.metaDataColumnsVoList"
            @changeList="changeList"
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
  private describe = {}
  private tabs: string[] = ['description', 'metadata']
  private tabIndex = 0
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
  }
  private async init() {
    const id = this.$route.params.id
    const { data } = await getDataDetail(id)
    // this.market = data.items
    this.describe = data
  }
  created() {
    this.init()
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
</style>
