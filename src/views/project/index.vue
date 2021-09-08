<template>
  <div class="project" :class="isWorkeFlow ? 'project-workflow' : ''">
    <div class="project-wrap">
      <jz-nav
        v-if="isNav"
        type="project"
        :tabs="tabs"
        @clickTable="handleTable"
        :tabIndex="tabIndex"
      ></jz-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import JzNav from '@/components/JzNav.vue'

@Component({
  name: 'projectItem',
  components: {
    JzNav,
  },
})
export default class ProjectIndex extends Vue {
  private isWorkeFlow: boolean = false
  private isNav: boolean = true
  get queryId() {
    return Number(this.$route.params.id)
  }
  private tabs: string[] = ['work', 'jobs']
  private tabIndex = 0
  // 点击tab 跳转对应页面
  private handleTable(index: number) {
    if (this.tabIndex !== index) {
      this.tabIndex = index
      const type = this.tabIndex ? 'jobs' : 'work'
      this.$router.push(`/project/${this.queryId}/${type}`)
    }
  }
  created() {
    this.changeRoute()
  }
  @Watch('$route', { deep: true })
  changeRoute() {
    const name: string = this.$route.name || ''
    this.tabIndex = name === 'jobs' ? 1 : 0
    this.isWorkeFlow = name === 'workflow'
    this.isNav = this.tabs.indexOf(name) > -1 ? true : false
  }
}
</script>

<style scoped lang="stylus">
.project
  width 1200px
  margin 20px auto
  .project-wrap
    padding 30px
    padding-top 0
.project-workflow
  width 100%
  margin 0px auto
  .project-wrap
    padding 0
</style>
