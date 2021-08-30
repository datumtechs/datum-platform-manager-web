<template>
  <div class="table">
    <div class="search-wrap">
      <template v-if="!multipleSelection.length">
        <div class="search-block">
          <i class="search-icon el-icon-search"></i>
          <el-input v-model="input" :placeholder="placeholder"></el-input>
        </div>
        <div>
          <slot name="search-button"></slot>
        </div>
      </template>
      <!-- 数据选中展示  -->
      <div class="select-block" v-else>
        <span>选中 {{ multipleSelection.length }} 条</span>
        <div class="select-btn">
          <JzButton
            type="jz-button--primary"
            :height="48"
            @click="SelectDelete"
          >
            {{ $t('project.delete') }}
          </JzButton>
          <JzButton
            type="jz-button--primary"
            :height="48"
            @click="toggleSelection"
          >
            {{ $t('project.cancel') }}
          </JzButton>
        </div>
      </div>
    </div>
    <div class="table-block">
      <el-table
        :data="list"
        style="width: 100%;min-height: 450px;"
        :header-cell-style="{ background: '#eee', color: '#333' }"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <!-- 选择框 -->
        <el-table-column type="selection" width="50"></el-table-column>
        <!-- 组件依赖keyList -->
        <template v-for="(item, index) in keyList">
          <el-table-column
            v-if="!index"
            :prop="item.prop"
            :label="item.label"
            :key="index"
          >
            <template slot-scope="scope">
              <span
                class="table-first"
                v-if="pathName"
                @click="handleNext(scope.row.id)"
              >
                {{ scope.row[item.prop] }}
              </span>
              <span v-else>
                {{ scope.row[item.prop] }}
                <tempalte v-if="isReapply(scope.row[item.prop])">
                  <el-button
                    type="text"
                    @click="handleReapply(index, scope.row)"
                  >
                    重新申请
                  </el-button>
                </tempalte>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            sortable
            :prop="item.prop"
            :label="item.label"
            :key="index"
          ></el-table-column>
        </template>
        <!-- 操作 -->
        <el-table-column label="操作" v-if="isOperate">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-for="(item, index) in btnList"
              @click="handleBtn(index, scope.row)"
              :key="index"
              :disabled="item.disabled"
            >
              {{ $t(item.lable) }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import JzButton from '@/components/JzButton.vue'

@Component({
  name: 'tables',
  components: {
    Pagination,
    JzButton,
  },
})
export default class Tables extends Vue {
  @Prop({ required: true, default: 20 }) private total!: number
  @Prop({ required: true, default: '' }) private placeholder!: string
  @Prop({ default: true }) private keyList!: any
  @Prop({ required: true, default: [] }) private list!: any
  @Prop({ required: true, default: [] }) private btnList!: any
  @Prop({ default: true }) private pathName!: boolean
  @Prop({ default: true }) private isOperate!: boolean

  private listQuery = {
    page: 1,
    limit: 20,
  }
  private input = ''
  // 选择表格项
  private multipleSelection = []

  private isReapply(val: string) {
    return this.$route.name === 'resources' && val === '已解决'
  }

  @Emit('changeList')
  getList() {
    return this.listQuery
  }
  // 删除选中
  @Emit('selectDelete')
  private SelectDelete() {
    const selectId = this.multipleSelection.map((item: any) => {
      return item.number
    })
    console.log('multipleSelection', selectId)
    return selectId
  }
  // 取消选择
  private toggleSelection() {
    ;(this.$refs['multipleTable'] as any).clearSelection()
  }
  private handleSelectionChange(val: any) {
    this.multipleSelection = val
  }
  // 名称跳转
  @Emit('clickName')
  private handleNext(val: number) {
    return val
  }
  // 点击操作按钮
  @Emit('clickBtn')
  private handleBtn(index: number, row: any) {
    return {
      index,
      row,
    }
  }
  // 个人资源 handleReapply
  handleReapply() {
    console.log('重新申请')
  }
}
</script>

<style scoped lang="stylus">
.table-first
  width: 100%;
  color #0F62FE
  cursor pointer
  display inline-block

.table
  max-width 1200px
  .search-wrap
    display flex
    height: 48px;
    padding-top 5px
    position relative
    .search-block
      width 100%
      .search-icon
        position absolute
        top 21px
        left 12px
        z-index 10
        font-size 16px
      >>> .el-input__inner
        border: 0!important;
        border-radius: 0!important;
        padding: 3px 3px 3px 40px;
        height 48px!important;
        line-height 48px!important;
        font-size: 14px;
        letter-spacing: 0.16px;
      >>> .el-input__inner:focus
        border: 2px solid rgba(15, 98, 254, 1)!important;
  .select-block
    width 100%
    height 48px
    box-sizing border-box
    padding-left 20px
    line-height 48px
    color #fff
    background rgba(15, 98, 254, 1)
    display flex
    justify-content space-between
    .select-btn
      display flex
  .table-block
    >>> .el-table__header-wrapper
          .el-checkbox__inner
            margin-left 5px
    .pagination
      >>> .el-pagination
        .btn-prev, .el-pager, .btn-next, .el-pagination__jump
          float right
        .btn-next
          margin-right 40px
</style>
