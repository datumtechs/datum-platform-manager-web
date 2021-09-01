<template>
  <div id="common">
    <el-row class="content-title" v-if="isShow">
      <el-col :span="24">
        <Breadcrumb height="56px"></Breadcrumb>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { Route } from 'vue-router'

@Component({
  components: {
    Breadcrumb,
  },
})
export default class CommonComponent extends Vue {
  private isShow: boolean = false
  private getMatched() {
    let matched = this.$route.matched.filter(
      (item) => item.meta && item.meta.title,
    )
    // matched[1].meta.title = '贷款'
    this.isShow = matched.length > 1 ? true : false
  }
  created() {
    this.getMatched()
  }
  @Watch('$route')
  private onRouteChanges(route: Route) {
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getMatched()
  }
}
</script>

<style lang="stylus" scoped>
#common
  .content-title
    height 54px
    line-height 54px
    overflow hidden
    margin 0 auto
    margin-top: 4px;
    width 1164px
</style>
