<template>
  <div v-if="viewModel === 'edit'" class="handle-box">
    <div
      v-for="item in handleList"
      :ref="`handle-${item.name}`"
      :key="item.id"
      class="handle-mini-box pointer"
      @click="handlerFn(item.name)"
    >
      <img src="@/assets/images/projects/rolling.svg" />
      <span class="handle-text">{{ item.label }}</span>
    </div>
    <!-- job取消 创建任务作业取消 <div
      class="handle-mini-box pointer"
      :class="workFlowStatus !== 2 || nodeList.length === 0 ? 'disable' : ''"
      @click="establishJob"
    >
      <span class="handle-text">{{ this.$t('projects.newJob') }}</span>
    </div> -->
    <JobFlow :show-add-dialog.sync="showAddDialog" :project-id="projectId" :workflow-list="workflowList" />
    <WarnDialog :show.sync="showWarning" :title="warnTitle" @deleteCb="deleteCb">
      <p slot="content">{{ $t('projects.confirmDeleteWorkflow') }} ?</p>
    </WarnDialog>
  </div>
</template>

<script>
import { projectApi } from 'apis'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import alayaService from '@/vendor/Web3Service'
import JobFlow from './JobFlow.vue'
import WarnDialog from 'components/WarnDialog'
export default {
  components: { JobFlow, WarnDialog },
  props: {
    workflowId: {
      type: String,
      default: ''
    },
    workFlowStatus: {
      type: Number,
      default: 0
    },
    projectId: {
      type: String,
      default: ''
    },
    viewModel: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {
      warnTitle: this.$t('projects.deleteWorkFlow'),
      showWarning: false,
      showAddDialog: false,
      workflowList: [],
      workStateTimer: 0,
      endState: false,
      statusList: []
    }
  },
  computed: {
    ...mapGetters('workflow', [ 'curNodeId', 'nodeList', 'algorithms', 'curModel' ]),
    ...mapGetters('app', [ 'address' ]),
    handleList: function () {
      const commonBtnList = [
        { id: 1, label: this.$t('projects.save'), name: 'save' },
        { id: 3, label: this.$t('projects.start'), name: 'start' },
        { id: 4, label: this.$t('projects.delete'), name: 'delete' },
        { id: 7, label: this.$t('projects.viewEvent'), name: 'viewEvent' }
      ]
      if (this.workFlowStatus === 1) {
        commonBtnList[1].label = this.$t('projects.end')
        commonBtnList[1].name = 'end'
      }
      return commonBtnList
    }
  },
  watch: {
    workFlowStatus: function (val, oldVal) {
      if (val !== 1) {
        window.clearTimeout(this.workStateTimer)
      }
    }
  },
  mounted () {},
  beforeDestroy () {
    window.clearTimeout(this.workStateTimer)
  },
  methods: {
    ...mapMutations('workflow', [ 'RESET_NODE_LIST' ]),
    ...mapActions('app', [ 'getSign' ]),
    establishJob () {
      if (this.workFlowStatus !== 2) {
        return this.$message.warning(this.$t('tip.plzWaitForSuccess'))
      }
      if (this.nodeList.length === 0) {
        return // this.$message.warning(this.$t('tip.plzWaitForSuccess'))
      }
      this.showAddDialog = true
    },
    handlerFn (name) {
      const classList = this.$refs[`handle-${name}`][0].getAttribute('class')
      if (classList.includes('active')) return
      this[name]()
    },
    startLoading (type) {
      this.$nextTick(() => {
        this.$refs[`handle-${type}`][0].setAttribute('class', 'handle-mini-box notAllowed active')
      })
    },
    stopLoading (type) {
      this.$nextTick(() => {
        this.$refs[`handle-${type}`][0].setAttribute('class', 'handle-mini-box pointer')
      })
    },
    hasModel () {
      let flag = true
      this.nodeList.map((item, index) => {
        // modelId: 模型的id， inputModel：0：不需要模型 1需要模型
        if (!index && item.nodeAlgorithmVo.inputModel && (item.model === null || item.model === undefined)) {
          flag = false
        }
      })
      return flag
    },
    checkInputList (type) {
      let flag = true
      this.nodeList.map((node, index) => {
        if (type) {
          if (
            !node.workflowNodeInputVoList ||
            !node.workflowNodeInputVoList[0] ||
            !node.workflowNodeInputVoList[1] ||
            !node.workflowNodeInputVoList[0]?.keyColumn ||
            !node.workflowNodeInputVoList[1]?.keyColumn ||
            !node.workflowNodeInputVoList[0]?.dataColumnIds ||
            !node.workflowNodeInputVoList[1]?.dataColumnIds ||
            (!node.nodeAlgorithmVo.inputModel && !node.workflowNodeInputVoList[0]?.dependentVariable) || // 配置训练算法时因变量改为必选，保存/启动时做必填校验
            !node.workflowNodeOutputVoList ||
            !node.workflowNodeSenderIdentityId ||
            (node.nodeAlgorithmVo.inputModel && index === 0 && (node.model === null || node.model === undefined))
          ) {
            flag = false
          }
        } else {
          if (
            !node.workflowNodeInputVoList ||
            !node.workflowNodeOutputVoList ||
            !node.workflowNodeSenderIdentityId ||
            (!node.nodeAlgorithmVo.inputModel && !node.workflowNodeInputVoList[0]?.dependentVariable) || // 配置训练算法时因变量改为必选，保存/启动时做必填校验
            (node.nodeAlgorithmVo.inputModel && index === 0 && (node.model === null || node.model === undefined))
          ) {
            flag = false
          }
        }
      })
      return flag
    },
    /*
    启动工作流
    启动前判断，用户是否修改过
    原数据 copySaveParams， 启动时getSaveParams()
  */
    async start () {
      if (!this.checkInputList('start')) return this.$message.warning(this.$t('tip.plzFillInput'))
      // if (this.handleisAuth()) return
      // if (!this.nodeList.length) {
      //   const tips = this.$t('tip.noNode')
      //   this.$message.error(tips)
      //   return
      // }
      // if (!this.hasModel()) {
      //   const tips = this.$t('tip.inputModel')
      //   this.$message.error(tips)
      //   return
      // }
      const min = Number(this.algorithms.minNumbers)
      const inputValue = this.valueListNumber
      if (inputValue < min) {
        if (this.lan === 'zh') {
          return this.$message.warning(`至少输入${min}个数据协同方`)
        } else {
          return this.$message.warning(`Enter at least ${min} data collaborators`)
        }
      }
      if (!inputValue && !min) {
        let isInput = false
        this.nodeList.forEach(item => {
          if (item.workflowNodeInputVoList && item.workflowNodeInputVoList.length === 0) {
            isInput = true
          }
        })
        if (isInput) {
          const tips = this.$t('tips.inputDataCoordination')
          return this.$message.warning(tips)
        }
      }
      this.startLoading('start')
      try {
        const sign = await this.getSign()
        const { workflowId, nodeList } = this
        const workflowNodeReqList = this.getSaveParams().workflowNodeReqList
        const saveFlag = this.copySaveParams === JSON.stringify(workflowNodeReqList) ? 0 : 1
        const params = {
          address: this.address,
          endNode: nodeList.length,
          saveFlag, // 0：不需要，1：需要
          sign,
          startNode: 1,
          workflowId,
          workflowNodeReqList
        }
        const { code, msg } = await projectApi.startWorkflow(params)
        if (code === 10000) {
          this.stopLoading('start')
          this.$message.success(msg)
          await this.$parent.getWorkState()
          this.checkWorkState()
        } else {
          this.stopLoading('start')
        }
        this.copySaveParams = JSON.stringify(workflowNodeReqList)
      } catch (error) {
        this.stopLoading('start')
      }
    },
    async getSign () {
      const checkAddress = alayaService.checkAddress()
      if (checkAddress) {
        const sign = await alayaService.signForWallet()
        return sign
      } else {
        const tips = this.$t('tips.noToken')
        this.$message.error(tips)
        // UserModule.ResetToken()
        // throw new Error(tips)
      }
    },
    // 终止工作流
    async end () {
      // if (this.handleisAuth()) return
      const { workflowId } = this
      this.startLoading('end')
      try {
        const { code, msg } = await projectApi.endWorkflow({ workflowId })
        this.stopLoading('end')
        if (code === 10000) {
          this.$message.success(msg)
          await this.$parent.getWorkState()
          this.checkWorkState()
        }
      } catch (error) {
        this.stopLoading('end')
      }
    },
    save () {
      if (!this.checkInputList()) return this.$message.warning(this.$t('tip.plzFillInput'))
      const req = this.getSaveParams()
      this.startLoading('save')
      projectApi
        .saveWorkflowNodes(req)
        .then(res => {
          this.stopLoading('save')
          const { code, msg } = res
          if (code === 10000) {
            this.$message.success(msg)
          }
        })
        .catch(e => {
          this.stopLoading('save')
        })
    },
    deleteCb () {
      this.startLoading('delete')
      projectApi
        .clearWorkflow({
          workflowId: this.workflowId
        })
        .then(res => {
          this.showWarning = false
          this.stopLoading('delete')
          const { code, msg } = res
          if (code === 10000) {
            this.RESET_NODE_LIST()
            this.$emit('cleanNode')
            this.$message.success(msg)
          }
        })
        .catch(e => {
          this.showWarning = false
          this.stopLoading('delete')
        })
    },
    delete () {
      this.showWarning = true
    },
    _isObject (o) {
      return Object.prototype.toString.call(o) === '[object Object]'
    },
    getModelId (model) {
      if (this._isObject(model)) return model.modelId
      if (model === null) return 0
      return model
    },
    getSaveParams () {
      const { workflowId, nodeList } = this
      const workflowNodeReqList = nodeList.map((item, index) => {
        return {
          workflowNodeSenderIdentityId: item.workflowNodeSenderIdentityId,
          algorithmId: item.algorithmId,
          modelId: this.getModelId(item.model),
          inputModel: item.nodeAlgorithmVo.inputModel,
          nodeName: item.nodeName,
          nodeStep: index + 1,
          // workflowId,
          workflowNodeCodeReq: {
            calculateContractCode: item.nodeAlgorithmVo.calculateContractCode,
            dataSplitContractCode: '',
            editType: 1 // 1-sql, 2-noteBook
          },
          workflowNodeInputReqList: item.workflowNodeInputVoList || [],
          workflowNodeOutputReqList: item.workflowNodeOutputVoList || [],
          workflowNodeResourceReq: {
            // 转成bps
            costBandwidth: Number(item.nodeAlgorithmVo.costBandwidth),
            costCpu: Number(item.nodeAlgorithmVo.costCpu),
            costGpu: item.nodeAlgorithmVo.costGpu,
            // 分钟转小时
            runTime: Number(item.nodeAlgorithmVo.runTime),
            // mb转b
            costMem: Number(item.nodeAlgorithmVo.costMem)
          }
        }
      })
      // debugger
      return {
        workflowId,
        workflowNodeReqList
      }
    },
    repeat (func, ms) {
      const that = this
      that.workStateTimer = window.setTimeout(() => {
        func()
        that.repeat(func, ms)
      }, ms)
    },
    checkWorkState () {
      const that = this
      // 判断节点是否运作中
      const isRun = this.workFlowStatus === 1
      if (isRun) {
        if (this.workStateTimer) {
          window.clearTimeout(this.workStateTimer)
          this.workStateTimer = null
        }
        this.repeat(that.$parent.getWorkState, 5000)
      } else {
        if (this.workStateTimer) {
          window.clearTimeout(this.workStateTimer)
          this.workStateTimer = null
        }
      }
    },
    viewEvent () {
      this.$emit('TaskLog')
      this.$emit('showLog')
    }
  }
}
</script>
<style lang="scss" scoped>
.handle-box {
  height: 36px;
  border-bottom: 1px solid #ebeef9;
  display: flex;
  .handle-mini-box {
    font-family: DINPro-Medium, Ali-Medium;
    font-size: 12px;
    color: #333333;
    line-height: 36px;
    padding: 0 16px;
    .handle-text,
    img {
      vertical-align: middle;
    }
    img {
      display: none;
      padding-right: 6px;
    }
    &.active > img {
      display: inline-block;
    }
    &:hover {
      color: #672cdf;
      background: #f1effd;
    }
    &.disable {
      cursor: not-allowed;
      &:hover {
        color: #adadad;
        background: #f1effd;
      }
    }
  }
}
</style>