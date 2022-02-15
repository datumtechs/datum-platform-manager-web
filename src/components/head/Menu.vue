<template>
  <div class="menu-box">
    <ul v-for="menu in menus" :key="menu.id" class="menu-mini-box pointer" @click="linkTo(menu.name)">
      <li class="menu-text" :class="{ active: $route.path.split('/').includes(menu.name) }">
        {{ $t(`${menu.label}`) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { normalList, loginList } from 'constants'
export default {
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters('app', [ 'user' ]),
    routerName () {
      return this.$route.name
    },
    menus () {
      if (this.user) {
        return loginList
      }
      return normalList
    }
  },
  watch: {
    user: {
      handler: function (val) {
        if (val && this.$route.name === 'home') {
          this.$router.push({ name: 'cases' })
        }
      }
    }
  },
  mounted () {},
  methods: {
    ...mapMutations('app', [ 'SET_CURFULLPAGE', 'SET_CURPAGEINDEX' ]),
    routerGo (name) {
      this.$router.push({
        name
      })
    },
    linkTo (name) {
      this.routerGo(name)
      // cases 页面跳转
      // 是否在home页
      // if (this.routerName === 'home') {
      //   // 在home页直接滑动
      //   this.SET_CURFULLPAGE('recommendedServices')
      // } else {
      //   // 非本页需要跳转后再滑动

      //   // setTimeout(() => {  //勿删 3.0 需要跳转
      //   //   this.SET_CURFULLPAGE('allServices')
      //   // }, 300)
      //   setTimeout(() => {
      //     this.SET_CURPAGEINDEX(4)
      //     this.SET_CURFULLPAGE('recommendedServices')
      //   }, 300)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #ffffff;
  display: flex;
  .menu-mini-box {
    margin-right: 10px;
    position: relative;
    width: 100px;
    font-size: 16px;
    li.menu-text {
      line-height: 46px;
      &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        border-bottom: 2px solid #15e5fa;
        width: 0%;
        transition: width 0.3s;
      }
      &:hover {
        background: #672cdf;
        border-radius: 1px;
        font-family: DINPro-Bold, Ali-Bold;
      }
      &.active {
        background: #672cdf;
        border-radius: 1px;
      }
    }
  }
}
</style>
