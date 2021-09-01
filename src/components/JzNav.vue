<template>
  <div class="nav-muen">
    <div
      :class="[tabIndex === index ? 'active' : '', 'nav-muen-item']"
      v-for="(item, index) in tabs"
      :key="index"
      @click="handleTable(index)"
    >
      {{ $t(`${type}.${item}`) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component({
  name: 'JzNav',
})
export default class JzNav extends Vue {
  @Prop({ default: 0 }) private tabIndex!: number
  // 语言前缀的字段
  @Prop({ default: 'home' }) private type!: string
  @Prop({ default: [] }) private tabs!: any
  @Emit('clickTable')
  private handleTable(index: number) {
    return index
  }
}
</script>

<style scoped lang="stylus">
.nav-muen
  display flex
  .nav-muen-item
    width: 136px;
    height: 54px;
    font-size: 18px;
    text-align center
    line-height 54px
    box-sizing: border-box;
    border-top 2px solid rgba(224, 224, 224, 1)
    background #fff
    cursor pointer
    letter-spacing: 0.16px;
    color: #000;
    transform 0.4s
    font-weight: 500;
  .nav-muen-item.active
    border-top 2px solid rgba(15, 98, 254, 1)
    color #5F4FFB
    background: rgba(95,79,251,0.05);
</style>
