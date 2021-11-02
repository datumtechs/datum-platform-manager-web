<template>
  <div class="meta-data">
    <el-table
      :data="list"
      border
      style="width: 100%;min-height: 540px;color:#000"
      :header-cell-style="{ background: '#FAFAFA', color: '#000' }"
    >
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
import { Vue, Component } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import { getColumnList } from '@/api/home'
@Component({
  name: 'MetaData',
  components: {
    Pagination,
  },
})
export default class MetaData extends Vue {
  private list = []
  private total = 0
  private listQuery = {
    current: 1,
    size: 10,
  }
  private async getList() {
    const metaDataId = this.$route.params.metaid
    const { current, size } = this.listQuery
    const { data } = await getColumnList({ metaDataId, current, size })
    this.list = data.items
    this.total = data.total
  }
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="stylus">
.meta-data
  padding 30px
  line-height 28px
  .pagination
    >>> .el-pagination
      .btn-prev, .el-pager, .btn-next, .el-pagination__jump
        float right
      .btn-next
        margin-right 40px
</style>
