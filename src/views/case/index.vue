<template>
  <div class="case-warp">
    case
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'case',
})
export default class LoginIndex extends Vue {
  private case: object = {
    user_name: '',
    passwd: '',
  }
}
</script>

<style scoped lang="stylus">
.case-warp
  width 100%
</style>
