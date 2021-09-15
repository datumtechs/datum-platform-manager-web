<template>
  <div class="table">
    <div class="search-wrap">
      <template v-if="!multipleSelection.length">
        <div class="search-block">
          <i class="search-icon el-icon-search" @click="getList"></i>
          <el-input
            v-model="input"
            :placeholder="placeholder"
            @keyup.enter.native="getList"
          ></el-input>
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
            :height="40"
            :width="100"
            @click="SelectDelete"
            class="select-btn-item"
          >
            {{ $t('project.delete') }}
          </JzButton>
          <JzButton
            type="jz-button--primary"
            :height="40"
            :width="100"
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
        class="table-wrap"
        :header-cell-style="{ background: '#FAFAFA', color: '#000' }"
        :cell-style="{ padding: '6px 0' }"
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
                @click="handleNext(scope.row.id, scope.row[item.prop])"
              >
                {{ scope.row[item.prop] }}
              </span>
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            sortable
            :prop="item.prop"
            :label="item.label"
            :key="index"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row[item.prop] }}
                <tempalte
                  v-if="
                    isReapply(scope.row[item.prop]) &&
                      index === keyList.length - 1
                  "
                >
                  <el-button
                    type="text"
                    @click="handleReapply(index, scope.row)"
                    style="margin-left:10px"
                  >
                    重新申请
                  </el-button>
                </tempalte>
              </span>
            </template>
          </el-table-column>
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
        <el-table-column width="50" class="column-more">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              width="60"
              :ref="`popover-${scope.$index}`"
            >
              <p class="more-warp">
                <el-button
                  type="text"
                  class="delete"
                  @click="handleDelete(scope.row[tableId])"
                >
                  删除
                </el-button>
              </p>
              <div slot="reference">
                <i class="el-icon-more icon-more"></i>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import JzButton from '@/components/JzButton.vue'
import { QueryType } from '@/api/types'
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
  // 删除字段的key
  @Prop({ default: 'id' }) private tableId!: string
  private listQuery: QueryType = {
    current: 1,
    size: 10,
  }
  private input = ''
  // 选择表格项
  private multipleSelection = []

  private isReapply(val: string) {
    return this.$route.name === 'data' && val === '已拒绝'
  }

  @Emit('changeList')
  getList() {
    return {
      list: this.listQuery,
      input: this.input,
    }
  }
  // 删除选中
  @Emit('selectDelete')
  private SelectDelete() {
    const id = this.tableId
    const selectId = this.multipleSelection.map((item: any) => item[id])
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
  private handleNext(id: number, name: string) {
    return { id, name }
  }
  // 点击操作按钮
  @Emit('clickBtn')
  private handleBtn(index: number, row: any) {
    return {
      index,
      row,
    }
  }
  @Emit('clickDelete')
  private handleDelete(id: number) {
    // 解决多个popover无法关闭问题
    for (const key in this.$refs) {
      if (key.indexOf('popover-') !== -1) {
        try {
          ;(this.$refs[key] as any).doClose()
        } catch (error) {
          console.log('popoverError==>', error)
        }
      }
    }
    return id
  }
  // 个人资源 handleReapply
  handleReapply() {
    console.log('重新申请')
  }
  created() {
    console.log(this.$route.name)
  }
}
</script>

<style scoped lang="stylus">
.search-wrap
  margin-bottom 15px
.table-first
  width: 100%;
  color #5f4ffb
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
        cursor pointer
      >>> .el-input__inner
        // border: 1px solid #!important;
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
    display flex
    justify-content space-between
    span
      color #5F4FFB
      font-size: 18px;
      font-weight: 600;
    .select-btn
      display flex
      .select-btn-item
        margin-right 20px
  .table-block
    .table-wrap
      width: 100%;
      min-height: 450px;
      border: 1px solid #EBEEF5;
      border-bottom 0
      .icon-more
        transform:rotate(90deg)
        color rgba(0,0,0,0.30);
        cursor pointer
    >>> .el-table__header-wrapper
          .el-checkbox__inner
            margin-left 5px
    .pagination
      >>> .el-pagination
        .btn-prev, .el-pager, .btn-next, .el-pagination__jump
          float right
        .btn-next
          margin-right 40px
.more-warp
  width 70px
  height 70px
  .delete
    margin-top: -10px;
    margin-left: 5px;
  div
    height 34px
    line-height 34px
    width 100%
</style>
<style>
.el-popover {
  min-width: 70px;
}
.el-button--text {
  color: #5f4ffb;
}
</style>
