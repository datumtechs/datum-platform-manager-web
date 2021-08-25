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
    width 180px
    margin-right 4px
    padding: 12px 68px 10px 18px;
    box-sizing: border-box;
    border-bottom 2px solid rgba(224, 224, 224, 1)
    cursor pointer
    font-size: 14px;
    letter-spacing: 0.16px;
    color: #393939;
    transform 0.4s
  .nav-muen-item:hover
    border-bottom 2px solid rgba(111, 111, 111, 1)
  .nav-muen-item.active
    border-bottom 2px solid rgba(15, 98, 254, 1)
    color #393939
    font-weight: 650;
    font-style: normal;
</style>
