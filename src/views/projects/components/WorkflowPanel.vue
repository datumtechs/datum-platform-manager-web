<template>
  <div v-loading="loading" class="drawer-wrapper">
    <div class="drawer-tab-wrapper">
      <div
        v-for="tab in tabList"
        :key="tab.id"
        class="drawer-tab-box pointer"
        :class="{ active: curTab === tab.name }"
        @click="selectTab(tab)"
      >
        <p>{{ tab.label }}</p>
      </div>
    </div>
    <div v-if="showNodePanel" :key="viewKey" class="drawer-content-box">
      <Overview v-show="curTab === 'overview'" :overview-obj="overviewObj" />
      <Input v-show="curTab === 'input'" v-bind="$attrs" />
      <Output v-show="curTab === 'output'" v-bind="$attrs" />
      <Code v-show="curTab === 'code'" :code="code" />
      <Environment v-show="curTab === 'environment'" v-bind="$attrs" :env-obj="envObj" />
    </div>
    <div v-else class="drawer-content-box">
      <p>{{ $t('projects.overflowTip') }}</p>
    </div>
  </div>
</template>

<script>
import Environment from './workflowPanel/Environment.vue'
import Output from './workflowPanel/Output.vue'
import Input from './workflowPanel/Input.vue'
import Overview from './workflowPanel/Overview.vue'
import Code from './workflowPanel/Code.vue'
import { projectApi, userApi } from 'apis'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { Overview, Input, Output, Code, Environment },
  // props: {
  //   width: {
  //     type: Number,
  //     default: 340
  //   }
  // },
  data () {
    return {
      nodeVo: {},
      viewKey: 0,
      curTab: 'overview',
      loading: false,
      overviewObj: {
        algorithmName: '',
        algorithmDesc: '',
        author: '',
        maxNumbers: '',
        minNumbers: '',
        supportLanguage: ''
      },
      code: '',
      envObj: {
        maxDuration: 1,
        cpu: 1,
        memory: 1,
        bandwidth: 3
      }
    }
  },
  computed: {
    ...mapGetters('workflow', [ 'curNodeId', 'nodeList', 'showNodePanel', 'curNodeIndex' ]),
    tabList: function () {
      return [
        { id: 1, label: this.$t('projects.overview'), name: 'overview' },
        { id: 2, label: this.$t('projects.input'), name: 'input' },
        { id: 3, label: this.$t('projects.output'), name: 'output' },
        { id: 4, label: this.$t('projects.code'), name: 'code' },
        { id: 5, label: this.$t('projects.environment'), name: 'environment' }
      ]
    }
  },
  watch: {
    curNodeIndex: function (val) {
      this.viewKey++
      this.curTab = 'overview'
    }
  },
  mounted () {
    this.$bus.$on('showPanel', id => {
      this.getPanelData(id)
    })
    this.initOrgList()
  },
  methods: {
    ...mapMutations('workflow', [ 'SET_ORG_LIST' ]),
    initOrgList () {
      userApi
        .getOrgList({
          current: 1,
          size: 10
        })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            this.SET_ORG_LIST(data)
          }
        })
    },
    selectTab (item) {
      this.curTab = item.name
    },
    getPanelData (id) {
      this.nodeList.forEach(item => {
        if (id === item.algorithmId) {
          const data = item.nodeAlgorithmVo
          this.overviewObj.algorithmName = data.algorithmName
          this.overviewObj.algorithmDesc = data.algorithmDesc
          this.overviewObj.author = data.author
          this.overviewObj.maxNumbers = data.maxNumbers
          this.overviewObj.minNumbers = data.minNumbers
          this.overviewObj.supportLanguage = data.supportLanguage
          this.code = data.calculateContractCode
          this.envObj.cpu = data.costCpu
          this.envObj.memory = data.costMem
          this.envObj.bandwidth = data.costBandwidth
          this.envObj.maxDuration = data.runTime
        }
      })
    },
    queryAlgorithmDetails (id) {
      this.loading = true
      projectApi
        .queryAlgorithmDetails(id)
        .then(res => {
          this.loading = false
          const { code, data } = res
          if (code === 10000) {
            debugger
            this.details = data
            this.overviewObj.algorithmName = data.algorithmName
            this.overviewObj.algorithmDesc = data.algorithmDesc
            this.overviewObj.author = data.author
            this.overviewObj.maxNumbers = data.maxNumbers
            this.overviewObj.minNumbers = data.minNumbers
            this.overviewObj.supportLanguage = data.supportLanguage
            this.code = data.calculateContractCode
            this.envObj.cpu = data.costCpu
            this.envObj.memory = data.costMem
            this.envObj.bandwidth = data.costBandwidth
            this.envObj.maxDuration = data.runTime
          }
        })
        .catch(e => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-wrapper {
  // height: calc(100% - 40px);
  // width: 340px;
  flex: 0 0 340px;
  // position: absolute;
  background-color: #fff;
  border: 1px solid #ebeef9;
  // box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%);
  right: 0;
  .drawer-tab-wrapper {
    display: flex;
    height: 36px;
    border-bottom: 1px solid #ebeef9;
    .drawer-tab-box {
      flex: auto;
      text-align: center;
      & > p {
        font-size: 12px;
        color: #333333;
        text-align: center;
        line-height: 36px;
      }
      &:hover {
        & > p {
          font-family: DINPro-Medium, Ali-Medium;
          color: #672cdf;
        }
      }
      &.active {
        border-bottom: 3px solid #672cdf;
        & > p {
          font-family: DINPro-Medium, Ali-Medium;
          color: #672cdf;
        }
      }
    }
  }
  ::v-deep .drawer-content-box {
    width: 340px;
    padding: 20px;
    height: calc(100% - 40px);
    .drawer-detail-box {
      height: calc(100% - 20px);
      .normal-text {
        font-size: 12px;
        color: #120d33;
        line-height: 18px;
      }
      .drawer-detail-title {
        text-align: left;
        p.main {
          @extend .normal-text;
          font-size: 16px;
          font-family: DINPro-Medium, Ali-Medium;
        }
        p.sub {
          @extend .normal-text;
          line-height: 17px;
          color: #333333;
        }
        &.flex-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .drawer-detail-content {
        margin: 22px 0;
        overflow-y: scroll;
        padding: 10px;
        height: calc(100% - 20px);
        .drawer-detail-content-title {
          @extend .normal-text;
          font-family: DINPro-Medium, Ali-Medium;
        }
        .drawer-detail-content-content {
          @extend .normal-text;
          margin: 6px 0 19px;
          .switch-text {
            @extend .normal-text;
            margin-left: 6px;
            color: #333333;
          }
        }
        .drawer-env-select-box {
          margin-bottom: 12px;
          .drawer-env-select-title {
            margin: 8px 0;
            @extend .normal-text;
            color: #333333;
          }
          .drawer-env-select {
            width: 100%;
          }
          .drawer-env-unit {
            @extend .normal-text;
            line-height: 26px;
          }
        }
      }
      .unit {
        padding-left: 20px;
      }
    }
  }
}
</style>