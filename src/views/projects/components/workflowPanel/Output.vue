<template>
  <div class="drawer-detail-box">
    <div class="drawer-detail-title flex-box">
      <p class="main">{{ $t('projects.output') }}</p>
      <!-- <el-button v-if="isToCollaborator" size="mini" type="primary" @click="saveFn">{{
        $t('projects.save')
      }}</el-button> -->
    </div>
    <div class="drawer-detail-content">
      <div>
        <p class="drawer-detail-content-title">{{ $t('projects.saveToCollaborators') }}</p>
        <p class="drawer-detail-content-content">{{ $t('projects.saveNotes') }}</p>
        <!-- <p class="drawer-detail-content-content">
          <el-switch v-model="isToCollaborator" style="height: 16px" active-color="#672CDF" inactive-color="#D1D6EB">
          </el-switch>
          <span v-if="isToCollaborator" class="switch-text">{{ $t('common.yes') }}</span>
          <span v-else class="switch-text">{{ $t('common.no') }}</span>
        </p> -->

        <!-- 此处组织选项重置成 接口查询相关逻辑删除 -->
        <el-checkbox-group
          v-if="workflowNodeSenderIdentityId"
          v-model="checkList"
          :disabled="viewModel === 'view'"
          class="drawer-checkbox"
          @change="handleCheckboxChange"
        >
          <el-checkbox
            v-for="(item, index) in orgList"
            :key="index"
            :label="item.identityId"
            :disabled="isDisable(item.identityId)"
          >
            <span class="checkbox-label">{{ item.nodeName }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <p class="drawer-detail-content-title">{{ $t('projects.storageForm') }}</p>
        <p class="drawer-detail-content-content">{{ $t('projects.Plaintext') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {},
  props: {
    viewModel: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {
      checkList: [],
      isToCollaborator: false
    }
  },
  computed: {
    ...mapGetters('workflow', [
      'orgOptions',
      'curNodeIndex',
      'workflowNodeOutputVoList',
      'orgList',
      'workflowNodeSenderIdentityId'
    ])
  },
  watch: {
    workflowNodeSenderIdentityId: {
      handler: function (val) {
        this.initData()
      },
      deep: true
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    ...mapMutations('workflow', [ 'SET_OUTPUT' ]),
    isDisable (id) {
      return this.workflowNodeSenderIdentityId === id
    },
    initData () {
      this.checkList = []
      const that = this
      if (that.workflowNodeOutputVoList && that.workflowNodeOutputVoList.length) {
        const list = Array.from(new Set(that.workflowNodeOutputVoList.map(item => item.identityId)))
        if (!list.includes(this.workflowNodeSenderIdentityId)) {
          list.push(that.workflowNodeSenderIdentityId)
        }
        return this.checkValue(list)
      }
      // 如果 仅仅是保存了input 返回output 选中发起方并disable
      that.orgList.map(item => {
        if (item.identityId === that.workflowNodeSenderIdentityId) {
          that.checkList.push(item.identityId)
          that.SET_OUTPUT(JSON.parse(JSON.stringify(that.checkList)))
          that.isToCollaborator = true
        }
      })
    },
    checkValue (list) {
      this.orgList.map(item => {
        if (list.includes(item.identityId)) {
          this.checkList.push(item.identityId)
          this.isToCollaborator = true
        }
      })
    },
    handleCheckboxChange () {
      this.SET_OUTPUT(JSON.parse(JSON.stringify(this.checkList)))
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-checkbox {
  display: flex;
  flex-direction: column;
  margin: 20px;
  .checkbox-label {
    color: #672cdf;
  }
}
::v-deep .el-switch__core {
  height: 16px !important;
  width: 28px !important;
  &:after {
    width: 12px !important;
    height: 12px !important;
  }
}
::v-deep .el-switch.is-checked .el-switch__core::after {
  margin-left: -13px;
}
</style>