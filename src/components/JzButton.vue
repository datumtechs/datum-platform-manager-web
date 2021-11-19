<template>
  <div
    :class="[type, align, disabled ? 'disabled' : '']"
    :style="`width:${width}px;height:${height}px;line-height:${height - 2}px`"
    @click="handleClick"
    ref="jzButton"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'JzButton',
})
export default class JzButton extends Vue {
  // jz-button--primary: 蓝色 jz-button： 白色
  @Prop({ default: 'jz-button' }) private type!: string
  @Prop({ default: false }) private disabled!: boolean
  @Prop({ default: 'center' }) private align!: string
  @Prop({ default: 80 }) private width!: number
  @Prop({ default: 30 }) private height!: number
  handleClick(evt: any) {
    // 配合v-preventReClick指令，节流
    const disabled = (this.$refs as any).jzButton.disabled
    if (disabled) return
    this.$emit('click', evt)
  }
}
</script>

<style scoped lang="stylus">
.jz-button,.jz-button--primary
  width 80px
  height 30px
  line-height 28px
  box-sizing: border-box;
  border-radius: 0px;
  font-size 14px
  border: 1px solid rgba(95,79,251, .6);
  border-radius: 4px;
  color rgba(106,118,149,1)
  cursor pointer
  transform 0.6s
  border-radius: 4px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
.disabled
  border: 1px solid #8f89ca;
  background: #8f89ca;
  cursor: not-allowed;
.center
  text-align center
.left
  text-align left
  text-indent: 20px;
.right
  text-align right
// .jz-button:hover
//   color #fff
//   background #5F4FFB;
.jz-button--primary
  color #fff
  border: 1px solid #5F4FFB;
  background: #5F4FFB;
</style>
