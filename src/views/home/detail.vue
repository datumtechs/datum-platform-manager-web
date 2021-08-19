<template>
  <div class="detail">
    <div>
      <div class="jz-el-button--primary authorize">
        申请授权
      </div>
      <div class="detail-block">
        <div class="nav-muen">
          <div
            :class="[tabIndex === index ? 'active' : '', 'nav-muen-item']"
            v-for="(item, index) in tabs"
            :key="index"
            @click="handleTable(index)"
          >
            {{ item }}
          </div>
        </div>
        <template>
          <MetaData v-if="tabIndex"></MetaData>
          <DataDetail v-else></DataDetail>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import DataDetail from './components/DataDetail.vue'
import MetaData from './components/MetaData.vue'
@Component({
  name: 'detail',
  components: {
    DataDetail,
    MetaData,
  },
})
export default class LoginIndex extends Vue {
  private tabs: string[] = ['数据描述', '元数据']
  private tabIndex = 0
  private handleTable(index: number) {
    this.tabIndex = index
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
