<template>
  <div class="drawer-wrap">
    <h3>{{ $t('home.' + configs.title) }}</h3>
    <div class="line"></div>
    <ul>
      <li v-for="(item, index) in configs.list" :key="index">
        <span @click="handleItem(item.to)">
          {{ $t('home.' + item.lable) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({
  name: 'RightDrawer',
})
export default class LayoutIndex extends Vue {
  @Prop() historyIndex?: any
  public configList = [
    {
      title: 'resources',
      list: [
        {
          to: '/resources/data',
          lable: 'data',
        },
        // {
        //   to: '/index',
        //   lable: 'algorithm',
        // },
        // {
        //   to: '/index',
        //   lable: 'service',
        // },
      ],
    },
    {
      title: 'account',
      list: [
        {
          to: '/account/nickname',
          lable: 'nickname',
        },
        {
          to: '/index',
          lable: 'signout',
        },
      ],
    },
  ]
  get configs() {
    const { historyIndex } = this
    return this.configList[historyIndex[historyIndex.length - 1]]
  }
  @Emit('clickItem')
  private handleItem(path: string) {
    this.$router.push(path)
  }
}
</script>
<style scoped lang="stylus">
.drawer-wrap{
  width 300px
  height calc(100vh - 60px);
  background #000
  box-sizing border-box
  position fixed
  top 60px
  right 0px
  z-index 99
  color #c6c6c6
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
  font-size: 14px;
  h3{
    margin: 10px 16px
    font-weight: 650;
    font-style: normal;
    color: #C6C6C6;
  }
  .line{
    width 90%;
    height 1px
    margin: 7px 16px
    background #444
  }
  ul li{
    align-self: center;
    padding: 7px 16px 7px 16px;
    box-sizing: border-box;
    cursor pointer
    span{
      display block
    }
  }
  ul li:hover{
    background #545c64
  }
}
</style>
