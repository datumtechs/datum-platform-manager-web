<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { scrollTo } from '@/utils/scroll-to'

@Component({
  name: 'Pagination',
})
export default class extends Vue {
  @Prop({ required: true }) private total!: number
  @Prop({ default: 1 }) private page!: number
  @Prop({ default: 20 }) private limit!: number
  @Prop({ default: () => [10, 20, 30, 50] }) private pageSizes!: number[]
  @Prop({ default: 'sizes, total, prev, pager, next, jumper' })
  private layout!: string
  @Prop({ default: true }) private background!: boolean
  @Prop({ default: true }) private autoScroll!: boolean
  @Prop({ default: false }) private hidden!: boolean
  get currentPage() {
    return this.page
  }

  set currentPage(value) {
    this.$emit('update:page', value)
  }

  get pageSize() {
    return this.limit
  }

  set pageSize(value) {
    this.$emit('update:limit', value)
  }

  handleSizeChange(value: number) {
    this.$emit('pagination', { page: this.currentPage, limit: value })
    if (this.autoScroll) {
      scrollTo(0, 800)
    }
  }

  handleCurrentChange(value: number) {
    this.$emit('pagination', { page: value, limit: this.pageSize })
    if (this.autoScroll) {
      scrollTo(0, 800)
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-container {
  padding: 24px 0px 5px;
  >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #5f4ffb;
  }
  >>> .el-pagination{
    padding 0
  }
  >>> .el-pagination__sizes{
    margin-left: -6px;
  }
  >>> .btn-next{
    background #fff
    border 1px solid #ccc
  }
  >>> .btn-prev{
    background #fff
    border 1px solid #ccc
  }
}

.pagination-container.hidden {
  display: none;
}
</style>
