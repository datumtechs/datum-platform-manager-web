<template>
  <div class="task-table-wrapper">
    <el-table v-loading="taskLoading" border style="width: 100%" :data="tableData">
      <el-table-column type="index" :label="`${$t('common.num')}`" :index="indexMethod" width="80"></el-table-column>
      <el-table-column prop="taskName" :label="`${$t('node.taskName')}`"></el-table-column>
      <!-- <el-table-column prop="taskType" :label="`${$t('node.taskType')}`"> Privacy joint AI training </el-table-column> -->
      <el-table-column :label="`${$t('node.capacity')}`">
        <template slot-scope="{ row }">
          <p v-for=" role in getRole(row)" :key="role">{{ $t(`roles.${role}`) }}</p>
        </template>
      </el-table-column>
      <!-- TODO 任务开始时间 还是任务创建时间 -->
      <el-table-column :label="`${$t('node.taskStartTime')}`">
        <template slot-scope="{ row }">{{ dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss') }}</template>
      </el-table-column>
      <el-table-column :label="`${$t('node.taskSpent')}`">
        <template
          slot-scope="{ row }"
        >{{ formatDuring(new Date(row.endAt).getTime() - new Date(row.createAt).getTime()) }}</template>
      </el-table-column>
      <el-table-column :label="`${$t('common.actions')}`" width="100">
        <template slot-scope="{ row }">
          <span class="pointer link-btn" @click="viewDetail(row)">{{ $t('node.viewDetail') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div></div>
      <el-pagination
        background
        :total="totalRows"
        :page-size="taskPagesize"
        :current-page="taskCurpage"
        :page-sizes="[ 4, 20, 50, 100 ]"
        layout="total,sizes, prev, pager, next"
        class="pagination"
        @current-change="handleTaskPageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { formatDuring } from '../../../utils/utils'
export default {
  components: {},
  props: {
    taskLoading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    },
    taskCurpage: {
      type: Number,
      default: 1
    },
    taskPagesize: {
      type: Number,
      default: 4
    },
    nodeName: {
      type: String,
      default: ''
    },
    totalRows: {
      type: Number,
      default: 0
    },
    identityId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    dayjs,
    formatDuring,
    getRole (row) {
      const roles = {
        isAlgoProvider: row.isAlgoProvider,
        isDataProvider: row.isDataProvider,
        isPowerProvider: row.isPowerProvider,
        isResultReceiver: row.isResultReceiver,
        isTaskSponsor: row.isTaskSponsor
      }
      const ary = []
      Object.keys(roles).forEach(r => {
        if (roles[ r ] === 0) {
          delete roles[ r ]
        } else {
          ary.push(r)
        }
      })
      return ary
      // ary.forEach(r => this.$t(`roles.${r}`))
      // console.log(ary)
    },
    handleSizeChange (val) {
      this.$emit('update:taskPagesize', val)
    },
    handleTaskPageChange (page) {
      this.$emit('handleTaskPageChange', page)
    },
    viewDetail (item) {
      this.$router.push({
        name: 'taskDetail',
        query: {
          taskId: item.id
        }
      })
    },
    indexMethod (index) {
      return (this.taskCurpage - 1) * this.taskPagesize + index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrapper > .task-table-wrapper {
  margin-top: 20px;
  &::v-deep .el-table tr {
    height: 32px;
  }
}
</style>
