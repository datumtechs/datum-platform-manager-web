<template>
  <div class="head-box">
    <div class="head-top-box">
      <div class="head-top-box-left pointer" @click="linkToHome">
        <img src="~assets/images/logo/logo1.svg" alt="" class="logo" />
        <span class="name">Moirae</span>
      </div>
      <Menu />
      <div class="head-top-box-right">
        <div v-if="user" class="logout-box" @click="changeShowDrawer">
          <el-tooltip class="item" effect="dark" :content="user" placement="top-start">
            <span class="user-name">{{ getSubStr(user) }}</span>
          </el-tooltip>
          <!-- <span class="pointer" @click="logoutFn">{{ $t('head.logout') }}</span> -->
        </div>
        <div v-else class="login-box pointer" @click="connect">
          <span>{{ $t('head.connect') }} Moirae</span>
        </div>
        <div class="head-top-box-lang">
          <img v-if="lang === 'zh'" src="~assets/images/head/1.icon5.svg" alt="" class="pointer" @click="changeLang" />
          <img v-else src="~assets/images/head/1.icon6.svg" alt="" class="pointer" @click="changeLang" />
        </div>
      </div>
    </div>
    <ConnectorDialog v-if="showConnector" :show-connector.sync="showConnector" />
    <PersonalCenter :address="address" :show-drawer="showDrawer" @logoutFn="logoutFn" @close="close" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConnectorDialog from '../ConnectorDialog.vue'
import Menu from './Menu.vue'
import PersonalCenter from './PersonalCenter.vue'
import { loadLanguageAsync } from '@/i18n'
export default {
  name: 'Head',
  components: { ConnectorDialog, Menu, PersonalCenter },
  data () {
    return {
      showConnector: false,
      showDrawer: false
    }
  },
  computed: {
    ...mapGetters('app', [ 'address', 'user' ])
  },
  mounted () {
    this.$bus.$on('showConnector', flag => {
      this.showConnector = flag
    })
  },
  methods: {
    ...mapActions('app', [ 'getLogout' ]),
    close () {
      this.showDrawer = false
    },
    linkToHome () {
      this.$router.push({
        name: 'home'
      })
    },
    changeShowDrawer () {
      this.showDrawer = !this.showDrawer
    },
    logoutFn () {
      this.getLogout()
      this.close()
    },
    getSubStr (str) {
      if (!str) return ''
      if (str.length < 14) return str
      return str.substr(0, 6) + '...' + str.substr(str.length - 8, 8)
    },
    connect () {
      // TODO 判断当前对象是否有 alaya (是否安装了钱包插件)
      this.showConnector = true
    },
    async changeLang () {
      await loadLanguageAsync(this.$i18n.locale === 'zh' ? 'en' : 'zh')
      localStorage.setItem('lang', this.$i18n.locale)
    }
  }
}
</script>

<style lang="scss" scoped>
$head-height: 46px;
.head-box {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1000;
  .head-top-box {
    padding: 0 6.1%;
    @media screen and (min-width: 1920px) {
      padding: 0 10%;
    }
    display: flex;
    height: 46px;
    background: #120d33;
    justify-content: space-between;
    align-items: center;
    .head-top-box-left {
      display: flex;
      align-items: center;
      .logo {
        width: 110px;
      }
      .name {
        font-family: DINPro-Medium, Ali-Medium;
        font-size: 20px;
        color: #ffffff;
        letter-spacing: 0;
        padding-left: 8px;
      }
    }
    .head-top-box-right {
      display: flex;
      align-items: center;
      height: 100%;
      .head-top-box-lang {
        width: 20px;
        height: 20px;
      }
    }
    .logout-box {
      color: #ffffff;
      margin-right: 30px;
      height: 100%;
      line-height: $head-height;
      cursor: pointer;
    }
    .login-box {
      margin-right: 20px;
      background-color: #1cc2eb;
      width: 156px;
      height: 28px;
      line-height: 28px;
      border-radius: 1px;
      text-align: center;
      & > span {
        font-family: DINPro-Medium, Ali-Medium;
        font-size: 16px;
        color: #090916;
        letter-spacing: 0;
        // padding: 4px 10px;
      }
    }
  }
}
</style>
