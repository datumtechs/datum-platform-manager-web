<template>
  <div class="drawer-detail-box">
    <div class="drawer-detail-title flex-box">
      <p class="main">{{ $t('projects.environment') }}</p>
      <!-- <el-button size="mini" type="primary" @click="saveEnv">{{ $t('projects.save') }}</el-button> 自动存储vuex -->
    </div>
    <div class="drawer-detail-content">
      <div>
        <p class="drawer-detail-content-title">{{ $t('projects.computingPower') }}</p>
        <div class="drawer-env-select-box">
          <p class="drawer-env-select-title">{{ $t('node.cpu') }}</p>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-select
                v-model="envObj.cpu"
                size="mini"
                :disabled="viewModel === 'view'"
                class="drawer-env-select"
                @change="handleCpuChangeFn"
              >
                <el-option
                  v-for="option in cpuList"
                  :key="option.id"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="8"> </el-col>
          </el-row>
        </div>
        <div class="drawer-env-select-box">
          <p class="drawer-env-select-title">{{ $t('node.memory') }}</p>

          <el-row :gutter="10">
            <el-col :span="16">
              <el-input-number
                v-model="envObj.memory"
                :disabled="viewModel === 'view'"
                size="mini"
                class="drawer-env-select"
                :min="1"
                @change="handleMemoryChangeFn"
              ></el-input-number>
            </el-col>
            <el-col :span="8">
              <span class="drawer-env-unit">Mb</span>
            </el-col>
          </el-row>
        </div>
        <div class="drawer-env-select-box">
          <p class="drawer-env-select-title">{{ $t('node.bandwidth') }}</p>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input-number
                v-model="envObj.bandwidth"
                :disabled="viewModel === 'view'"
                size="mini"
                class="drawer-env-select"
                :min="1"
                @change="handleBandwidthChangeFn"
              ></el-input-number>
            </el-col>
            <el-col :span="8">
              <span class="drawer-env-unit">Mbps</span>
            </el-col>
          </el-row>
        </div>
        <div class="drawer-env-select-box">
          <p class="drawer-detail-content-title" style="margin-bottom: 10px">{{ $t('projects.maxDuration') }}</p>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input-number
                v-model="envObj.maxDuration"
                :disabled="viewModel === 'view'"
                size="mini"
                class="drawer-env-select"
                :min="1"
                @change="handleRuntimeChangeFn"
              ></el-input-number>
            </el-col>
            <el-col :span="8">
              <span class="drawer-env-unit">{{ $t('common.minute') }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  components: {},
  props: {
    code: {
      type: String,
      default: ''
    },
    envObj: {
      type: Object,
      default: () => {
        return {
          maxDuration: 1,
          cpu: 1,
          memory: 1,
          bandwidth: 3
        }
      }
    },
    viewModel: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {}
  },
  computed: {
    cpuList: function () {
      return [
        { id: 1, label: `1 ${this.$t('common.cores')}`, value: 1 },
        { id: 2, label: `2 ${this.$t('common.cores')}`, value: 2 },
        { id: 3, label: `4 ${this.$t('common.cores')}`, value: 4 },
        { id: 4, label: `8 ${this.$t('common.cores')}`, value: 8 },
        { id: 5, label: `16 ${this.$t('common.cores')}`, value: 16 }
      ]
    },
    memoryUnitList: function () {
      return [
        { id: 1, label: `Gb`, value: 1 },
        { id: 2, label: `Mb`, value: 2 }
      ]
    },
    bandwidthUnitList: function () {
      return [ { id: 1, label: `Mbps`, value: 3 } ]
    },
    timeUnitList: function () {
      return [
        { id: 1, label: `${this.$t('common.minute')}`, value: 3 },
        { id: 2, label: `${this.$t('common.hours')}`, value: 10 }
      ]
    }
  },
  methods: {
    ...mapMutations('workflow', [ 'SET_ENV', 'SET_ENV_BY_TYPE' ]),
    handleCpuChangeFn (cpu) {
      this.SET_ENV_BY_TYPE({ type: 'costCpu', data: cpu })
    },
    handleMemoryChangeFn (costMem) {
      this.SET_ENV_BY_TYPE({ type: 'costMem', data: costMem })
    },
    handleBandwidthChangeFn (costBandwidth) {
      this.SET_ENV_BY_TYPE({ type: 'costBandwidth', data: costBandwidth })
    },
    handleRuntimeChangeFn (runTime) {
      this.SET_ENV_BY_TYPE({ type: 'runTime', data: runTime })
    }
    // saveEnv () {
    //   // 缓存至内存中
    //   const obj = {
    //     costBandwidth: this.envObj.bandwidth,
    //     costMem: this.envObj.memory,
    //     costCpu: this.envObj.cpu,
    //     runTime: this.envObj.maxDuration
    //   }
    //   this.SET_ENV(obj)
    //   this.$message.success(this.$t('tip.saveSucceeded'))
    // }
  }
}
</script>
<style lang="scss" scoped>
</style>