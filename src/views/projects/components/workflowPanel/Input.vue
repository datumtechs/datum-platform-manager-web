<template>
  <div class="drawer-detail-box">
    <div class="drawer-detail-title flex-box">
      <p class="main">{{ $t('projects.input') }}</p>
      <!-- <el-button size="mini" type="primary" @click="saveInput">{{ $t('projects.save') }}</el-button> -->
    </div>
    <div class="drawer-detail-content" style="margin-bottom: 60px">
      <div>
        <p class="drawer-detail-content-title">
          {{ `${$t('roles.taskSponsor')}` }}
        </p>
        <p class="drawer-detail-content-content">
          <el-select
            v-model="taskSender"
            size="small"
            style="width: 85%"
            :disabled="viewModel === 'view'"
            placeholder=""
            filterable
            @change="handleSenderChange"
          >
            <el-option v-for="item in orgList" :key="item.identityId" :label="item.nodeName" :value="item.identityId">
            </el-option>
          </el-select>
        </p>
      </div>
      <div v-if="showModel">
        <p class="drawer-detail-content-title">{{ $t('projects.model') }}</p>
        <p class="drawer-detail-content-content">
          <el-select
            v-if="curNodeIndex !== 0"
            v-model="modelValue"
            size="small"
            style="width: 85%"
            :disabled="viewModel === 'view'"
            filterable
            :placeholder="$t('tip.selectModel')"
            @change="handleModelChange"
          >
            <el-option v-for="(item, index) in modelOptions" :key="index" :label="item.fileName" :value="item.modelId">
            </el-option>
          </el-select>
          <el-cascader
            v-else
            :key="modelKey"
            v-model="modelValue"
            :disabled="viewModel === 'view'"
            size="small"
            :span="12"
            :props="{
              // checkStrictly: true,
              label: 'name', // label value
              value: 'code', // 指定选项的值为选项对象的某个属性值
              lazy: true,
              lazyLoad: (node, resolve) => {
                modelLazyLoad(node, resolve)
              }
            }"
            @change="
              e => {
                changeModelValue(e)
              }
            "
          ></el-cascader>
        </p>
      </div>
      <!-- TODO 增加任务发起方 -->
      <!-- {{ selectLayout }} -->
      <div v-for="(item, index) in selectLayout" :key="index">
        <p class="drawer-detail-content-title">
          {{ `${$t('roles.dataProvider')}-${index + 1}` }}
          <!-- TODO 改名称为数据提供方 -->
        </p>
        <p class="drawer-detail-content-content">
          <!-- <el-select size="mini">
            <option v-for="item in orgs" :key="item.identityId" :label="item.label" :value="item.value"></option>
          </el-select> -->
          <el-cascader
            :key="cascaderKey[index]"
            v-model="inputValue[index]"
            :disabled="viewModel === 'view'"
            size="small"
            :span="12"
            :props="{
              // checkStrictly: true,
              label: 'name', // label value
              value: 'code', // 指定选项的值为选项对象的某个属性值
              lazy: true,
              lazyLoad: (node, resolve) => {
                inputLazyLoad(node, resolve, index)
              }
            }"
            @change="
              e => {
                changeInputValue(e, index)
              }
            "
          ></el-cascader>
          <Transfer
            :ref="`Columns${index}`"
            :view-model="viewModel"
            :column-data="columnsList[index]"
            :transfer-index="index"
            :algorithms="algorithms"
            @saveToStore="saveToStore"
          ></Transfer>
          <!-- <i v-if="index > minLen - 1" class="el-icon-delete delete-input-btn pointer" @click="delToInput(index)"></i> -->
        </p>
      </div>
      <!-- <div class="add-input-btn pointer" @click="addToInput()">
        <span class="add-input-text">{{ $t('common.add') }}</span>
        <i class="el-icon-plus"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { projectApi } from 'apis'
import Transfer from './Transfer.vue'
export default {
  components: { Transfer },
  props: {
    viewModel: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {
      taskSender: '',
      columnsList: [],
      cascaderKey: [],
      inputValue: [],
      // inputValueOrg: [],
      modelValue: '',
      modelKey: -1,
      selectLayout: [],
      modelOptions: [
        {
          fileName: this.$t('projects.preNodeResult'),
          modelId: 0
        }
      ]
    }
  },

  computed: {
    ...mapGetters('workflow', [
      'orgs',
      'orgList',
      'nodeList',
      'curNodeId',
      'algorithms',
      'curNodeIndex',
      'curModel',
      'workflowNodeInputVoList',
      'workflowNodeSenderIdentityId'
    ]),
    showModel: function () {
      return this.algorithms.inputModel
    },
    inputValueOrg: function () {
      return this.inputValue.map(item => item[0])
    },
    minLen: function () {
      // 算法最少的参与方 0位发起 1+系统方
      return this.algorithms.minNumbers
    }
  },
  watch: {},
  mounted () {
    this.init()
  },
  beforeDestroy () {},
  methods: {
    ...mapMutations('workflow', [
      'SET_ORG_DISABLED',
      'SET_INPUT_LIST',
      'SAVE_ORG_OPTIONS',
      'SET_INPUT_LEN',
      'SET_TASK_SENDER',
      'SET_CUR_MODEL',
      'SET_VO_LIST'
    ]),
    ...mapActions('workflow', [ 'getModels', 'saveOrgs' ]),
    handleModelChange (val) {
      this.SET_CUR_MODEL(val)
    },
    handleSenderChange (val) {
      this.SET_TASK_SENDER(val)
    },
    async init () {
      await this.saveOrgs()
      this.initInputPanel()
      // 回显
      this.handleInputValue()
      this.handleCascaderKey()
    },
    async handleInputValue () {
      const { workflowNodeInputVoList, workflowNodeSenderIdentityId, curModel } = this
      const that = this
      const res = []
      if (workflowNodeInputVoList && workflowNodeInputVoList.length) {
        that.taskSender = workflowNodeSenderIdentityId
        // 反选model
        that.selectLayout = workflowNodeInputVoList
        const organizations = that.orgs.map(item => item.identityId)
        workflowNodeInputVoList.map((item, index) => {
          // 需要检测已选组织id，是否存在组织列表里面
          if (organizations.includes(item.identityId)) {
            res[index] = [
              item.identityId,
              item.dataTableId
              // item.dataColumnIds
            ]
            // 回显穿梭框
            that.getColumnList(item.dataTableId, index, {
              keyColumn: item.keyColumn,
              dependentVariable: item.dependentVariable,
              dataColumnIds: item.dataColumnIds
            })
          }
        })
      }
      if (that.showModel) {
        if (curModel === undefined) {
          that.modelValue = ''
        } else if (curModel && Object.keys(curModel).length > 0) {
          that.modelValue = [ curModel.identityId, curModel.modelId ]
        } else {
          that.modelValue = 0
        }
      } else {
        that.modelValue = 0
      }

      that.inputValue = res
      that.SET_INPUT_LEN(that.inputValue.length)
      that.upCascaderKeys()
    },
    setModelCascader () {
      this.changeModelValue()
    },
    changeModelValue (e) {
      this.modelKey++
      if (Array.isArray(e)) {
        this.SET_CUR_MODEL(e[1])
      }
    },
    delToInput (index) {
      if (index <= this.minLen - 1) return
      this.selectLayout.splice(index, 1)
      this.inputValue.splice(index, 1)
      this.cascaderKey.splice(index, 1)
      this.upCascaderKeys()
    },
    initInputPanel () {
      this.selectLayout = Array(this.minLen).fill({})
    },
    async saveInput () {
      const that = this
      // if (!this.taskSender) {
      //   return this.$message.warning(this.$t('tip.plzSelectSender'))
      // }

      // if (this.showModel) {
      //   if (this.curNodeIndex === 0 && this.modelValue.length === 0) {
      //     return this.$message.warning(this.$t('tip.inputModel'))
      //   }
      //   if (this.curNodeIndex !== 0 && this.modelValue === null) {
      //     return this.$message.warning(this.$t('tip.inputModel'))
      //   }
      // }

      // // TODO: 对任务发起方做校验
      // if (this.inputValue.length < this.minLen) {
      //   if (this.lang === 'zh') {
      //     return this.$message.warning(`至少输入${this.minLen}个数据协同方`)
      //   } else {
      //     return this.$message.warning(`Enter at least ${this.minLen} data collaborators`)
      //   }
      // }

      // if (!this.inputValue[0]) {
      //   return this.$message.warning(this.$t('tips.inputDataSend'))
      // }
      // 校验组织是否失效
      // this.checkOrgState()
      if (that.showModel) {
        if (Array.isArray(that.modelValue)) {
          that.SET_CUR_MODEL(that.modelValue[1])
        } else {
          that.SET_CUR_MODEL(0)
        }
      }
      const columnLists = that.handleColumnList()
      const inputVoList = []
      that.inputValue.map((item, index) => {
        if (item && item.length && columnLists[index]) {
          const params = {
            keyColumn: Number(columnLists[index].keyColumn),
            dataColumnIds: columnLists[index].dataColumnIds,
            dataTableId: item[1],
            identityId: item[0]
          }
          // 只有发起方有因变量
          if (index === 0) {
            params.dependentVariable = Number(columnLists[index].dependentVariable)
          }
          inputVoList.push(params)
        }
      })
      // 提交输入数据
      this.SET_INPUT_LIST(inputVoList)
      this.SET_TASK_SENDER(that.taskSender)
      this.$message.success(that.$t('tip.saveSucceeded'))
      // 缓存选中的选项
      // 过滤空值
      // this.inputValue = this.inputValue.filter(Boolean)
      // 输出提供List // TODO 此处org相关逻辑要删除
      // this.SET_ORG_ID(this.getListFirst(this.inputValue))
      // this.SAVE_ORG_OPTIONS()
      // this.SET_INPUT_LEN(this.inputValue.length)
    },
    handleColumnList () {
      // const res = this.inputValue.map(item => {})
      const res = []
      this.inputValue.forEach((item, index) => {
        const data = this.$refs['Columns' + index][0].getList()
        res.push(data)
      })
      return res
    },
    // Cascader回显更新key
    upCascaderKeys () {
      this.changeInputValue(true, -1)
      this.changeModelValue(true)
    },
    async modelLazyLoad (node, resolve) {
      const { level } = node
      const that = this
      let nodes
      try {
        if (level === 0) {
          setTimeout(() => {
            nodes = that.orgList.map(org => ({
              code: org.identityId,
              name: org.nodeName,
              leaf: level >= 2
            }))
            resolve(nodes)
          }, 200)
        } else if (level === 1) {
          const params = { algorithmId: that.algorithms.algorithmId, identityId: node.data.code }
          const { data } = await projectApi.queryModelsByOrg(params)
          const nextNodes = data.map(item => ({
            code: item.modelId,
            name: item.fileName,
            leaf: level >= 1 //  >=2： 展示3级 >= 1： 展示2级
          }))
          resolve(nextNodes)
        }
        resolve(nodes)
      } catch (error) {
        console.log(error)
      }
    },
    async inputLazyLoad (node, resolve, index) {
      const { level } = node
      try {
        let nodes
        if (level === 0) {
          // 第一层
          const { inputValue, inputValueOrg } = this
          setTimeout(() => {
            if (inputValue.length) {
              // 已做了选择
              const isDisabled = item => {
                if (inputValueOrg[index] === item.identityId) {
                  return false
                } else {
                  return item.disabled
                }
              }
              nodes = this.orgs.map(item => ({
                code: item.identityId,
                name: item.identityName,
                leaf: level >= 2,
                disabled: isDisabled(item)
              }))
            } else {
              nodes = this.orgs.map(org => ({
                code: org.identityId,
                name: org.identityName,
                leaf: level >= 2,
                disabled: org.disabled
              }))
            }
            resolve(nodes)
          }, 200)
        } else if (level === 1) {
          const params = { identityId: node.data.code }
          const { data } = await this.getTables(params)
          const nextNodes = data.map(item => ({
            code: item.metaDataId,
            name: item.dataName,
            leaf: level >= 1 //  >=2： 展示3级 >= 1： 展示2级
          }))
          resolve(nextNodes)
        }
        resolve(nodes)
      } catch (err) {
        console.log(err)
      }
    },
    getListFirst (list) {
      if (!list) return []
      return list.map(item => {
        if (item && item.length && item[0]) {
          return item[0]
        }
      })
    },
    changeInputValue (e, index) {
      console.log(e, index)
      if (e && e.length === 0) {
        this.columnsList[index] = []
      }
      if (e) {
        const ids = this.getListFirst(this.inputValue)
        this.SET_ORG_DISABLED(ids)
        // // 更新key，渲染el-cascader组件，使用options最新的值
        const upList = []
        this.cascaderKey.map((item, i) => {
          if (index !== i) {
            upList.push(i)
          }
        })
        upList.map(i => {
          this.cascaderKey[i] = this.cascaderKey[i] + 1
        })
        // 获取列的数据
        if (e && e.length === 2) {
          this.getColumnList(e[e.length - 1], index)
        }
      }
    },
    // 初始化cascaderKey
    handleCascaderKey () {
      this.cascaderKey = []
      this.selectLayout.map((item, index) => {
        this.cascaderKey[index] = String(index)
      })
    },
    async getColumnList (id, index, params) {
      const that = this
      const { data } = await projectApi.getAllAuthColumns(id)
      this.$set(this.columnsList, index, data)
      // this.columnsList.splice(index, 1, data)
      // that.columnsList[index] = data
      // this.$forceUpdate()
      // 回显
      if (params) {
        this.$nextTick(() => {
          that.$refs[`Columns${index}`][0].handleEcho(params)
        })
      }
    },
    getTables (data) {
      return projectApi.getAllAuthTables(data)
    },
    saveToStore (transferIndex) {
      console.log(transferIndex)
      const that = this
      const columnObj = that.$refs['Columns' + transferIndex][0].getList()
      const columnLists = Array(2).fill({})
      columnLists[transferIndex] = columnObj

      const params = {
        keyColumn: Number(columnLists[transferIndex].keyColumn),
        dataColumnIds: columnLists[transferIndex].dataColumnIds,
        dataTableId: that.inputValue[transferIndex][1],
        identityId: that.inputValue[transferIndex][0]
      }
      if (transferIndex === 0) {
        params.dependentVariable = Number(columnLists[transferIndex].dependentVariable)
      }
      this.SET_VO_LIST({ params, transferIndex })
      // that.inputValue.map((item, index) => {
      //   if (item && item.length && columnLists[index]) {
      //     const params = {
      //       keyColumn: Number(columnLists[index].keyColumn),
      //       dataColumnIds: columnLists[index].dataColumnIds,
      //       dataTableId: item[1],
      //       identityId: item[0]
      //     }
      //     // 只有发起方有因变量
      //     if (index === 0) {
      //       params.dependentVariable = Number(columnLists[index].dependentVariable)
      //     }
      //     inputVoList.push(params)
      //   }
      // })
      // 提交输入数据
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-detail-content-content {
  position: relative;
  ::v-deep .el-cascader,
  .el-cascader--small {
    width: 85%;
    .el-input {
      width: 100%;
    }
    .el-input__inner {
      margin-right: 30px;
    }
  }
  ::v-deep .el-select .el-select--small {
    width: 85%;
  }
}
.add-input-btn {
  font-family: DINPro-Medium, Ali-Medium;
  font-size: 12px;
  color: #120d33;
  line-height: 18px;
  .add-input-text {
    padding-right: 6px;
  }
}
.delete-input-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>