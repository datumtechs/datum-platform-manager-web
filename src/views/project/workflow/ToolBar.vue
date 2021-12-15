<template>
  <div class="tool-bar">
    <div class="tool-bar-wrap">
      <div :class="isAuth ? 'disable-icon' : ''" @click="handleSave">
        <svg-icon
          :name="toolStateList[0] ? 'w-loading' : 'w-save'"
          :class="['icon-button ', toolStateList[0] ? 'w-loading' : '']"
          :color="isAuth ? '#666' : '#5F4FFB'"
          width="28"
          height="28"
        />
        <span>
          {{ $t('workflow.save') }}
        </span>
      </div>
      <div
        :class="isAuth ? 'disable-icon' : ''"
        @click="handleEndWorkflow"
        v-if="startShow === 1"
      >
        <svg-icon
          :name="toolStateList[0] ? 'w-loading' : 'w-end'"
          :class="['icon-button ', toolStateList[1] ? 'w-loading' : '']"
          :color="isAuth ? '#666' : '#5F4FFB'"
          :width="toolStateList[0] ? '34' : lan ? '54' : '26'"
          :height="toolStateList[0] ? '34' : '26'"
        />
        <span>{{ $t('workflow.terminate') }}</span>
      </div>
      <div
        :class="isAuth ? 'disable-icon' : ''"
        @click="handleStartWorkflow"
        v-else
      >
        <svg-icon
          :name="toolStateList[2] ? 'w-loading' : 'w-start'"
          :class="['icon-button ', toolStateList[2] ? 'w-loading' : '']"
          :color="isAuth ? '#666' : '#5F4FFB'"
          width="30"
          height="30"
        />
        <span>{{ $t('workflow.start') }}</span>
      </div>
      <div :class="isAuth ? 'disable-icon' : ''" @click="handleEmpty">
        <svg-icon
          :name="toolStateList[3] ? 'w-loading' : 'w-delete'"
          :class="['icon-button ', toolStateList[3] ? 'w-loading' : '']"
          :color="isAuth ? '#666' : '#5F4FFB'"
          width="27"
          height="25"
        />
        <span>{{ $t('workflow.empty') }}</span>
      </div>
      <div :class="!isSuccess || isAuth ? 'disable-icon' : ''" @click="openJob">
        <svg-icon
          name="w-create"
          class="icon-button"
          :color="!isSuccess || isAuth ? '#666' : '#5F4FFB'"
          width="50"
          height="28"
        />
        <span>{{ $t('workflow.newJob') }}</span>
      </div>
    </div>
    <subjobs-dialog ref="createJobDialog" :modalState="false"></subjobs-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import SubjobsDialog from '../components/SubjobsDialog.vue'
@Component({
  name: 'ToolBar',
  components: {
    SubjobsDialog,
  },
})
export default class ToolBarIndex extends Vue {
  @Prop({ required: true, default: [] }) private toolStateList!: any
  @Prop({ required: true, default: 0 }) private startShow!: number
  @Prop({ required: true, default: false }) private isSuccess!: boolean
  @Prop({ required: true, default: false }) private lan!: boolean
  // 查看者权限
  get isAuth() {
    const role = Number(this.$route.params.role)
    return role === 3
  }
  @Emit('handleSave')
  private handleSave() {
    return true
  }
  @Emit('handleEndWorkflow')
  private handleEndWorkflow() {
    return true
  }
  @Emit('handleStartWorkflow')
  private handleStartWorkflow() {
    return true
  }
  @Emit('handleEmpty')
  private handleEmpty() {
    return true
  }
  private openJob() {
    if (this.isSuccess) {
      ;(this.$refs.createJobDialog as any).handleOpen(0)
    }
  }
}
</script>

<style scoped lang="stylus">
.tool-bar
  position absolute
  z-index 1
  right 20px
  top 0
  color #000
  .tool-bar-wrap
    display inline-block
    margin-right 15px
    font-size 12px
    cursor pointer
    display: flex;
    div
      display flex
      flex-direction column
      padding 0 15px
      align-self flex-end
      .w-loading
        animation:turn 1s linear infinite;
      .icon-button
        margin-bottom 6px
      div:hover
      span
        color #5F4FFB
        text-align: center;
      @keyframes turn{
        0%{-webkit-transform:rotate(0deg);}
        25%{-webkit-transform:rotate(90deg);}
        50%{-webkit-transform:rotate(180deg);}
        75%{-webkit-transform:rotate(270deg);}
        100%{-webkit-transform:rotate(360deg);}
      }
    .disable-icon
      cursor:not-allowed
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      -khtml-user-select: none;
      user-select: none;
      span
        color #666
</style>
