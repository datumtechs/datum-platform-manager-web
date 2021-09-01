<template>
  <div
    :class="[type, align]"
    :style="`width:${width}px;height:${height}px;line-height:${height - 2}px`"
    @click="handleClick"
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
  @Prop({ default: 'jz-button' }) private type!: string
  @Prop({ default: 'center' }) private align!: string
  @Prop({ default: 80 }) private width!: number
  @Prop({ default: 30 }) private height!: number
  handleClick(evt: any) {
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
// .jz-button--primary:hover
//   background rgba(3, 83, 233, 1)
</style>
