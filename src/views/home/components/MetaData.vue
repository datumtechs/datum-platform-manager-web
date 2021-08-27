<template>
  <div class="meta-data">
    <el-table :data="list" border style="width: 100%;min-height: 450px;">
      <el-table-column prop="id" label="序号">
        <template slot-scope="scope">
          <span>
            {{ (listQuery.current - 1) * listQuery.size + scope.$index + 1 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="columnName" label="字段"> </el-table-column>
      <el-table-column prop="columnType" label="数据类型"> </el-table-column>
      <el-table-column prop="columnDesc" label="描述"> </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
      layout="sizes, total, jumper, next, pager, prev"
      class="pagination"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'MetaData',
  components: {
    Pagination,
  },
})
export default class MetaData extends Vue {
  @Prop() private list!: any
  @Prop({ default: 0 }) private total!: number

  private listQuery = {
    current: 1,
    size: 20,
  }
  @Emit('changeList')
  getList() {
    return this.listQuery
  }
}
</script>

<style scoped lang="stylus">
.meta-data
  padding 30px 20px
  line-height 28px
  .pagination
    >>> .el-pagination
      .btn-prev, .el-pager, .btn-next, .el-pagination__jump
        float right
      .btn-next
        margin-right 40px
</style>
