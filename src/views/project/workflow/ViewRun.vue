<template>
  <!-- 运行结果弹窗 -->
  <div class="results">
    <el-dialog
      title="运行结果预览"
      :visible.sync="resultsVisible"
      :before-close="handleClose"
      width="720px"
    >
      <div class="wrap">
        <div class="name">{{ nodeName }}</div>
        <div class="results-detail" v-if="gridData">
          <div class="item">
            <div class="lable">
              ID
            </div>
            <div class="info">
              {{ gridData.id }}
            </div>
          </div>
          <div class="item">
            <div class="lable">
              FileName
            </div>
            <div class="info">
              {{ gridData.fileName }}
            </div>
          </div>
          <div class="item">
            <div class="lable">
              FilePath
            </div>
            <div class="info">
              {{ gridData.filePath }}
            </div>
          </div>
          <div class="item">
            <div class="lable">
              MetadataId
            </div>
            <div class="info">
              {{ gridData.metadataId }}
            </div>
          </div>
          <div class="item">
            <div class="lable">
              CreateTime
            </div>
            <div class="info">
              {{ gridData.createTime }}
            </div>
          </div>
          <div class="item">
            <div class="lable">
              UpdateTime
            </div>
            <div class="info">
              {{ gridData.updateTime }}
            </div>
          </div>
        </div>
        <div class="results-no" v-else>
          暂无数据
        </div>
        <!-- <el-table :data="gridData" class="results-tabel">
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
        </el-table> -->
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

  private gridData = null
  @Emit('update:resultsVisible')
  private handleClose() {
    return false
  }
  async getResultsList(taskId: string | number) {
    const { data } = await getTaskResult(taskId)
    //  目前只有一条数据，详情展示
    if (data && data.length) {
      this.gridData = data[0]
    }
  }
}
</script>

<style scoped lang="stylus">
.wrap
  padding 20px
  padding-top: 0;
  height: 400px;
  overflow-y: auto;
  .name
    font-size: 18px
  .results-tabel
    padding 10px
    height: 420px;
    overflow-y: auto;
    box-sizing: border-box
  .results-detail
    margin-top 25px
    margin-left 10px
    .item
      display: flex
      flex-direction: row
      font-size: 16px
      margin-bottom: 20px
      .lable
        width: 120px
      .info
        width 540px
  .results-no
    margin-top 100px
    font-size: 12px
    width 100%
    text-align: center
</style>
