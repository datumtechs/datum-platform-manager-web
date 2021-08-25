<template>
  <div class="project">
    <jz-nav
      v-if="isNav"
      type="project"
      :tabs="tabs"
      @clickTable="handleTable"
      :tabIndex="tabIndex"
    ></jz-nav>
    <router-view></router-view>
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
    this.isNav = this.tabs.indexOf(name) > -1 ? true : false
  }
}
</script>

<style scoped lang="stylus"></style>
