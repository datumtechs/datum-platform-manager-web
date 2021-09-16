<template>
  <div class="enviroment">
    <div class="title">
      {{ $t('workflow.enviroment') }}
    </div>
    <div class="button-bolck">
      <jz-button @click="handleSave" type="jz-button--primary" class="save">
        {{ $t('workflow.save') }}
      </jz-button>
      <jz-button @click="handleCancel">
        {{ $t('workflow.cancel') }}
      </jz-button>
    </div>
    <div class="block">
      <!-- <div class="text">依赖</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="3"
        :file-list="fileList"
      >
        <el-button size="small" type="primary" class="info-upload"
          ><i class="el-icon-upload el-icon--right"></i> 点击上传</el-button
        >
        <div slot="tip" class="el-upload__tip">仅支持txt文件，多个依赖换行</div>
      </el-upload> -->
      <div class="block-title">
        计算资源（最低要求）
      </div>
      <div class="block select">
        <div class="text">CPU</div>
        <el-select v-model="cpuValue" placeholder="请选择">
          <el-option
            v-for="(item, key, index) in cpuOptions"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="block select">
        <div class="text">内存</div>
        <el-select v-model="memoryValue" placeholder="请选择">
          <el-option
            v-for="(item, key, index) in memoryOptions"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="block select">
        <div class="text">GPU</div>
        <el-select v-model="gpuValue" placeholder="请选择">
          <el-option
            v-for="(item, key, index) in gpuOptions"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="block select">
        <div class="text">宽带</div>
        <el-select v-model="broadband" placeholder="请选择">
          <el-option
            v-for="(item, key, index) in broadbandOptions"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  cpuOptions,
  memoryOptions,
  gpuOptions,
  broadbandOptions,
} from '@/status'
import JzButton from '@/components/JzButton.vue'
import { saveNodeResource } from '@/api/workflow'
import { WorkflowModule } from '@/store/modules/workflow'

@Component({
  name: 'EnviromentView',
  components: {
    JzButton,
  },
})
export default class EnviromentView extends Vue {
  @Prop({ required: true }) private nodeId!: number

  private fileList = []
  private cpuValue = '1'
  private memoryValue = '1'
  private gpuValue = '1'
  private broadband = '1'
  get cpuOptions() {
    return cpuOptions
  }
  get memoryOptions() {
    return memoryOptions
  }
  get gpuOptions() {
    return gpuOptions
  }
  get broadbandOptions() {
    return broadbandOptions
  }

  private async handleSave() {
    const { nodeId, cpuValue, memoryValue, gpuValue, broadband } = this
    const params = {
      costBandwidth: broadband,
      costCpu: cpuValue,
      costGpu: gpuValue,
      costMem: memoryValue,
      workflowNodeId: nodeId,
    }
    const { msg } = await saveNodeResource(params)
    this.$message.success(msg)
  }
  private handleCancel() {
    console.log('取消')
  }
  created() {
    const info: any = WorkflowModule.algorithms
    this.cpuValue = String(info.costCpu)
    this.memoryValue = String(info.costMem)
    this.gpuValue = String(info.costGpu)
    this.broadband = String(info.costBandwidth)
  }
}
</script>

<style scoped lang="stylus">
.enviroment
  height 100%
  font-size 14px
  .title
    color #333
    font-size 16px
    font-weight: 650;
    line-height 30px
    margin-bottom 20px
  .button-bolck
    position relative
    top: -50px;
    display flex
    justify-content flex-end
    .save
      margin-right 15px
  .block
    .text
      padding-bottom 10px
      font-size 14px
    .info-upload
      height 40px
      text-align left
      color #8C8C8C
      width 220px
      background #fff
      border 0
  .block-title
    // margin 25px 0 15px 0
  .select
    margin-top 15px
    .text
      font-size 12px
      padding-left 4px
</style>
