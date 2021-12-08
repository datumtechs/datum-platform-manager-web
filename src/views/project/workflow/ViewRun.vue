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
              IP
            </div>
            <div class="info">
              {{ gridData.ip }}
            </div>
          </div>
          <div class="item">
            <div class="lable">
              Port
            </div>
            <div class="info">
              {{ gridData.port }}
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
          <el-link
            class="download"
            :disabled="isDownload"
            type="primary"
            @click="downloadResults"
            >下载运行结果</el-link
          >
        </div>
        <div class="results-no" v-else>
          暂无数据
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { getTaskResult, downloadTaskResultFile } from '@/api/workflow'
import { Message } from 'element-ui'

@Component({
  name: 'ViewResults',
})
export default class ViewResult extends Vue {
  @Prop({ required: true, default: false }) private resultsVisible!: boolean
  @Prop({ required: true, default: '' }) private nodeName!: string
  private taskId?: number
  private gridData = null
  private isDownload = false
  @Emit('update:resultsVisible')
  private handleClose() {
    return false
  }
  // 下载运行结果
  private downloadResults() {
    if (this.isDownload) return
    this.isDownload = true
    const that = this
    const id = this.taskId
    downloadTaskResultFile({
      id,
      compress: 1, // 1:zip, 2: tar.gz
    }).then((res: any) => {
      if (res) {
        that.download(res, that.nodeName)
        // Message.success(this.$t('tips.operationSucces'))
        that.isDownload = false
      } else {
        Message.error(that.$t('tips.operationFailed'))
        that.isDownload = false
      }
    })
  }
  private download(data: any, fileName: string) {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', `${fileName}.zip`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  async getResultsList(taskId: string) {
    const { data } = await getTaskResult(taskId)
    //  目前只有一条数据，详情展示
    if (data && data.length) {
      this.gridData = data[0]
      this.taskId = data[0].id
    }
  }
}
</script>

<style scoped lang="stylus">
.wrap
  padding 20px
  padding-top: 0;
  height: 480px;
  overflow-y: auto;
  .name
    font-size: 18px
  .results-tabel
    padding 10px
    height: 500px;
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
    .download
      float right
      margin-right 10px
  .results-no
    margin-top 100px
    font-size: 12px
    width 100%
    text-align: center
</style>
