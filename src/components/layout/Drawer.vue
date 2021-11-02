<template>
  <div class="drawer-wrap">
    <h3>{{ $t('home.' + configs.title) }}</h3>
    <ul>
      <li
        v-for="(item, index) in configs.list"
        :key="index"
        @click="handleItem(item.to)"
      >
        <svg-icon :name="item.lable" class="item-icon" width="15" height="15" />
        <span>
          {{ $t('home.' + item.lable) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

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
        //   to: '',
        //   lable: 'algorithm',
        // },
        // {
        //   to: '',
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
          to: '/',
          lable: 'signout',
        },
      ],
    },
  ]
  get configs() {
    const { historyIndex } = this
    return this.configList[historyIndex - 1]
  }
  @Emit('clickItem')
  private async handleItem(path: string) {
    if (!UserModule.token) {
      this.$message.error('Please login!')
      return false
    }
    if (path.length) {
      if (path === '/') {
        await UserModule.LogOut()
      }
      this.$router.push(path)
    }
  }
}
</script>
<style scoped lang="stylus">
.drawer-wrap{
  width 271px
  height calc(100vh - 60px);
  background: #FFFFFF;
  box-shadow: 0px 20px 40px 0px rgba(209,209,209,0.18);
  box-sizing border-box
  position fixed
  top 62px
  right 0px
  z-index 100
  color #c6c6c6

  padding-left 28px
  h3{
    margin 15px 0 10px 0
    font-style: normal;
    font-size: 18px;
    color: #000000;
    letter-spacing: 0;
    font-weight: 500;
    font-family: PingFangSC-Medium;
  }
  ul li{
    align-self: center;
    padding: 10px 16px 10px 0px;
    box-sizing: border-box;
    cursor pointer
    color #000
    .item-icon{
      margin-right 10px
      vertical-align: -2px;
    }
    span{
      font-size: 15px
    }
  }
  ul li:hover .item-icon {
    >>> path {
      stroke: #5F4FFB;
      fill: #5F4FFB;
   }
  }
  ul li:hover span{
    color: #5F4FFB
  }
}
</style>
