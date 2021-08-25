<template>
  <div class="workflow">
    流程图
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component({
  name: 'workflow',
})
export default class workflowIndex extends Vue {
  created() {
    // console.log(this.$route)
  }
}
</script>

<style scoped lang="stylus"></style>
