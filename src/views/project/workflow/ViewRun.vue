<template>
  <!-- 运行结果弹窗 -->
  <div class="results">
    <el-dialog
      title="运行结果预览"
      :visible.sync="resultsVisible"
      :before-close="handleClose"
    >
      <div class="wrap">
        <div class="name">{{ nodeName }}</div>
        <el-table :data="gridData" class="results-tabel">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="fileName" label="FileName"></el-table-column>
          <el-table-column prop="filePath" label="FilePath"></el-table-column>
          <el-table-column
            prop="metadataId"
            label="MetadataId"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="CreateTime"
          ></el-table-column>
          <el-table-column
            prop="updateTime"
            label="UpdateTime"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { getTaskResult } from '@/api/workflow'
@Component({
  name: 'ViewResults',
})
export default class ViewResult extends Vue {
  @Prop({ required: true, default: false }) private resultsVisible!: boolean
  @Prop({ required: true, default: '' }) private nodeName!: string

  private gridData = []
  @Emit('update:resultsVisible')
  private handleClose() {
    return false
  }
  async getResultsList(taskId: string | number) {
    const { data } = await getTaskResult(taskId)
    // this.gridData = Array(20).fill(data)
    this.gridData = data
  }
}
</script>

<style scoped lang="stylus">
.wrap
  padding 20px
  .name
    margin-bottom 20px
  .results-tabel
    height: 450px;
</style>
