<template>
  <div class="tool-bar">
    <div class="tool-bar-wrap">
      <div @click="handleSave">
        <svg-icon
          :name="toolStateList[0] ? 'w-loading' : 'w-save'"
          :class="['icon-button ', toolStateList[0] ? 'w-loading' : '']"
          color="#5F4FFB"
          width="28"
          height="28"
        />
        <span>
          保存
        </span>
      </div>
      <div @click="handleEndWorkflow" v-if="startShow === 1">
        <svg-icon
          :name="toolStateList[0] ? 'w-loading' : 'w-end'"
          :class="['icon-button ', toolStateList[1] ? 'w-loading' : '']"
          color="#5F4FFB"
          width="34"
          height="34"
        />
        <span>
          终止
        </span>
      </div>
      <div @click="handleStartWorkflow" v-else>
        <svg-icon
          :name="toolStateList[2] ? 'w-loading' : 'w-start'"
          :class="['icon-button ', toolStateList[2] ? 'w-loading' : '']"
          color="#5F4FFB"
          width="30"
          height="30"
        />
        <span>
          启动
        </span>
      </div>
      <div @click="handleEmpty">
        <svg-icon
          :name="toolStateList[3] ? 'w-loading' : 'w-delete'"
          :class="['icon-button ', toolStateList[3] ? 'w-loading' : '']"
          color="#5F4FFB"
          width="27"
          height="25"
        />
        <span>
          清空
        </span>
      </div>
      <div>
        <svg-icon
          name="w-create"
          class="icon-button"
          :class="!isRun ? 'disable-icon' : ''"
          color="#5F4FFB"
          width="50"
          height="28"
        />
        <span>
          创建作业
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component({
  name: 'ToolBar',
})
export default class ToolBarIndex extends Vue {
  @Prop({ required: true, default: [] }) private toolStateList!: any
  @Prop({ required: true, default: 0 }) private startShow!: number
  @Prop({ required: true, default: false }) private isRun!: boolean
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
    padding 5px
    display inline-block
    margin-right 15px
    font-size 14px
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
      .disable-icon
        // cursor: 
      div:hover
      span
        color #5F4FFB
      @keyframes turn{
      0%{-webkit-transform:rotate(0deg);}
      25%{-webkit-transform:rotate(90deg);}
      50%{-webkit-transform:rotate(180deg);}
      75%{-webkit-transform:rotate(270deg);}
      100%{-webkit-transform:rotate(360deg);}
    }
</style>
