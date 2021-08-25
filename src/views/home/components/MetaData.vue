<template>
  <div class="meta-data">
    <el-table :data="list" border style="width: 100%;min-height: 450px;">
      <el-table-column prop="number" label="序号"></el-table-column>
      <el-table-column prop="field" label="字段"> </el-table-column>
      <el-table-column prop="type" label="数据类型"> </el-table-column>
      <el-table-column prop="describe" label="描述"> </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
      layout="sizes, total, jumper, next, pager, prev"
      class="pagination"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
interface MetaDataType {
  number: number
  field: string
  type: string
  describe: string
}
@Component({
  name: 'MetaData',
  components: {
    Pagination,
  },
})
export default class MetaData extends Vue {
  private list: MetaDataType[] = []
  private total = 4
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20,
  }
  created() {
    this.getList()
  }
  private async getList() {
    this.listLoading = true
    // const { data } = await getArticles(this.listQuery)
    let data = {
      total: 4,
      items: [
        {
          number: 1,
          field: '2016-05-02',
          type: '王小虎',
          describe: '上海市普陀区金沙江路 1518 弄',
        },
        {
          number: 1,
          field: '2016-05-02',
          type: '王小虎',
          describe: '上海市普陀区金沙江路 1518 弄',
        },
        {
          number: 1,
          field: '2016-05-02',
          type: '王小虎',
          describe: '上海市普陀区金沙江路 1518 弄',
        },
        {
          number: 1,
          field: '2016-05-02',
          type: '王小虎',
          describe: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    }
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
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
