<template>
  <div class="common-wrapper">
    <div class="data-wrapper">
      <Breadcrumb />
      <div class="pd20">
        <div class="data-wrapper-title">{{ curName }}</div>
        <ul class="tabs-box">
          <li
            v-for="tab in tabList"
            :key="tab.id"
            class="tabs-mini-box pointer"
            :class="{ activeTab: tab.name === curFlowTab }"
            @click="tabClick(tab.name)"
          >
            {{ tab.label }}
          </li>
        </ul>
        <div class="workflow-table-box">
          <Info v-if="curFlowTab === 'information'" :info-form="infoForm" />
          <Flow v-if="curFlowTab === 'workflows'" :project-id="projectId" />
          <Records v-if="curFlowTab === 'records'" :project-id="projectId" />
          <!-- <Job v-if="curFlowTab === 'jobs'" :project-id="projectId" /> -->
          <!-- <Participants v-if="curFlowTab === 'participants'" :project-id="projectId" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Breadcrumb from 'components/breadcrumb/Breadcrumb.vue'
import Info from './components/Info.vue'
import Flow from './components/Flow.vue'
// import Job from './components/Job.vue'
import Records from './components/Records.vue'
import { projectApi } from 'apis'
export default {
  components: { Breadcrumb, Records, Info, Flow },
  props: {},
  data() {
    const that = this
    return {
      infoForm: {
        name: '',
        desc: ''
      },
      curName: that.$route.query.name
    }
  },
  computed: {
    ...mapGetters('workflow', ['curFlowTab']),
    projectId: function () {
      return this.$route.query.id + ''
    },

    tabList: function () {
      return [
        {
          id: 0,
          name: 'information',
          label: this.$t('projects.information')
        },
        {
          id: 1,
          name: 'workflows',
          label: this.$t('projects.workflows')
        },
        {
          id: 2,
          name: 'records',
          label: this.$t('projects.records')
        }
        // {
        //   id: 3,
        //   name: 'jobs',
        //   label: this.$t('projects.jobs')
        // }
        // {
        //   id: 4,
        //   name: 'participants',
        //   label: this.$t('projects.participants')
        // }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    ...mapMutations('workflow', ['SET_CUR_WORKFLOW']),
    tabClick(name) {
      this.SET_CUR_WORKFLOW(name)
    },
    initData() {
      projectApi
        .queryProjectDetails({
          id: this.projectId
        })
        .then(res => {
          const { code, data } = res
          if (code === 10000) {
            this.infoForm.name = data.projectName
            this.infoForm.desc = data.projectDesc
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.select-title {
  height: 18px;
  font-family: DINPro-Medium, Ali-Medium;
  font-size: 16px;
  color: #120d33;
  line-height: 18px;
  margin-top: 16px;
}
</style>