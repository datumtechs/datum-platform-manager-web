<template>
  <div
    :class="[type, align]"
    :style="`width:${width}px;height:${height}px;line-height:${height}px`"
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
  @Prop({ default: 100 }) private width!: number
  @Prop({ default: 34 }) private height!: number
  handleClick(evt: any) {
    this.$emit('click', evt)
  }
}
</script>

<style scoped lang="stylus">
.jz-button,.jz-button--primary
  width 120px
  height 34px
  line-height 32px
  box-sizing: border-box;
  border-radius: 0px;
  font-size 14px
  border 1px solid rgba(15, 98, 254, 1)
  color rgba(15, 98, 254, 1)
  cursor pointer
  transform 0.6s
.center
  text-align center
.left
  text-align left
  text-indent: 20px;
.right
  text-align right
.jz-button:hover
  color #fff
  background rgba(15, 98, 254, 1)
.jz-button--primary
  color #fff
  background rgba(15, 98, 254, 1)
  border-radius: 0px;
.jz-button--primary:hover
  background rgba(3, 83, 233, 1)
</style>
